import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Background removal using remove.bg API (industry standard, reliable on Vercel)
// Falls back to a client-side message if REMOVEBG_API_KEY is not set

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }

    if (imageFile.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 20 MB." }, { status: 400 });
    }

    const apiKey = process.env.REMOVEBG_API_KEY;

    if (!apiKey) {
      // No API key configured — return a signal to use client-side fallback
      return NextResponse.json({ fallback: true });
    }

    // Call remove.bg API
    const rbFormData = new FormData();
    rbFormData.append("image_file", imageFile);
    rbFormData.append("size", "auto");

    const rbRes = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: rbFormData,
    });

    if (!rbRes.ok) {
      const errText = await rbRes.text();
      console.error("remove.bg error:", errText);
      // Fall back to client-side if remove.bg fails (e.g. quota)
      return NextResponse.json({ fallback: true });
    }

    // Return the PNG as base64 so the client can display/download it
    const arrayBuffer = await rbRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({ result: base64, mimeType: "image/png" });
  } catch (err) {
    console.error("Background remover error:", err);
    return NextResponse.json({ fallback: true });
  }
}
