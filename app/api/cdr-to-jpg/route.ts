import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkAndRecordUsage } from '@/lib/usage';
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

export const runtime = "nodejs";
export const maxDuration = 60; // seconds

/**
 * POST /api/cdr-to-jpg
 *
 * Body: multipart/form-data
 *   file     — .cdr file (required)
 *   dpi      — output resolution, e.g. "300" (default: "300")
 *   quality  — JPG quality 1–100, e.g. "92" (default: "92")
 *   bgColor  — hex background colour, e.g. "#ffffff" (default: "#ffffff")
 *
 * Response: image/jpeg blob on success, JSON { error } on failure.
 *
 * Dependencies (must be installed on the server / Docker image):
 *   - Inkscape ≥ 1.0  (for CDR parsing via libcdr)
 *   - ImageMagick      (for PNG → JPG conversion with quality / background)
 *
 * Installation:
 *   apt-get install -y inkscape imagemagick
 */

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150 MB

export async function POST(req: NextRequest) {
  let tmpDir: string | null = null;

  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const dpi = Number(formData.get("dpi") ?? 300);
    const quality = Math.min(100, Math.max(1, Number(formData.get("quality") ?? 92)));
    const bgColor = String(formData.get("bgColor") ?? "#ffffff").replace(/[^#0-9a-fA-F]/g, "");

    // ── Validation ──────────────────────────────────────────────────────────
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith(".cdr")) {
      return NextResponse.json({ error: "Only .cdr files are accepted." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds the 150 MB size limit." }, { status: 413 });
    }
    if (![72, 96, 150, 300, 600].includes(dpi)) {
      return NextResponse.json({ error: "Invalid DPI value." }, { status: 400 });
    }

    // ── Write uploaded CDR to a temp directory ───────────────────────────────
    const id = randomUUID();
    tmpDir = join(tmpdir(), `cdr-to-jpg-${id}`);
    await mkdir(tmpDir, { recursive: true });

    const cdrPath = join(tmpDir, "input.cdr");
    const pngPath = join(tmpDir, "output.png");
    const jpgPath = join(tmpDir, "output.jpg");

    const bytes = await file.arrayBuffer();
    await writeFile(cdrPath, Buffer.from(bytes));

    // ── Step 1: Inkscape — render CDR → PNG ──────────────────────────────────
    // Inkscape uses libcdr to parse CorelDRAW files.
    // --export-area-page ensures the full page (not just the bounding box) is exported.
    const inkscapeCmd = [
      "inkscape",
      `"${cdrPath}"`,
      "--export-type=png",
      `"--export-filename=${pngPath}"`,
      `--export-dpi=${dpi}`,
      "--export-area-page",
    ].join(" ");

    await execAsync(inkscapeCmd, { timeout: 50_000 });

    // ── Step 2: ImageMagick — flatten PNG onto background → JPG ─────────────
    // -flatten composites the PNG over a solid background (handles transparency).
    const magickCmd = [
      "convert",
      `"${pngPath}"`,
      `-background "${bgColor}"`,
      "-flatten",
      `-quality ${quality}`,
      `"${jpgPath}"`,
    ].join(" ");

    await execAsync(magickCmd, { timeout: 20_000 });

    // ── Return JPG ───────────────────────────────────────────────────────────
    const jpgBuffer = await readFile(jpgPath);
    const outputName = file.name.replace(/\.cdr$/i, ".jpg");

    return new NextResponse(jpgBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${outputName}"`,
        "Content-Length": String(jpgBuffer.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (err: unknown) {
    console.error("[cdr-to-jpg]", err);

    const message =
      err instanceof Error && err.message.includes("inkscape")
        ? "CDR file could not be parsed. The file may be corrupt, an unsupported CorelDRAW version, or use features not supported by libcdr. Try saving the file as CDR v15 (X5) in CorelDRAW and re-uploading."
        : "Conversion failed. Please try again or use CorelDRAW / Inkscape locally.";

    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    // ── Clean up temp files ──────────────────────────────────────────────────
    if (tmpDir) {
      for (const name of ["input.cdr", "output.png", "output.jpg"]) {
        await unlink(join(tmpDir, name)).catch(() => {});
      }
      await unlink(tmpDir).catch(() => {});
    }
  }
}
