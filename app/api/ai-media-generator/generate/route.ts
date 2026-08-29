import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkAndRecordUsage } from "@/lib/usage";
import { HF_MODELS, startHfGeneration } from "@/lib/higgsfield";

export const runtime = "nodejs";
export const maxDuration = 30;

const TOOL_SLUG = "ai-media-generator";
const MAX_PROMPT_LEN = 2000;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  if (userId) {
    const usage = await checkAndRecordUsage(userId, TOOL_SLUG);
    if (!usage.allowed) {
      return NextResponse.json({ error: usage.reason, usage }, { status: 429 });
    }
  }

  let body: { model?: string; prompt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const model = body.model;
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

  if (!model || !HF_MODELS[model]) {
    return NextResponse.json({ error: "Unknown or missing model." }, { status: 400 });
  }
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }
  if (prompt.length > MAX_PROMPT_LEN) {
    return NextResponse.json(
      { error: `Prompt is too long (max ${MAX_PROMPT_LEN} characters).` },
      { status: 400 }
    );
  }

  const cfg = HF_MODELS[model];
  const result = await startHfGeneration(model, prompt);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    requestId: result.data.request_id,
    statusUrl: result.data.status_url,
    cancelUrl: result.data.cancel_url ?? null,
    status: result.data.status ?? "queued",
    kind: cfg.kind,
    model,
  });
}
