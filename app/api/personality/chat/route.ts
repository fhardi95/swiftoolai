import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkAndRecordUsage } from "@/lib/usage";
import { supabaseAdmin } from "@/lib/supabase-admin";

const TOOL_SLUG = "personality-os";
const MAX_HISTORY_TURNS = 12; // keep the stored history small

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to chat with your AI." }, { status: 401 });
  }
  const userId = session.user.id;

  const usageCheck = await checkAndRecordUsage(userId, TOOL_SLUG);
  if (!usageCheck.allowed) {
    return NextResponse.json({ error: usageCheck.reason, upgradeRequired: true }, { status: 429 });
  }

  let message: string;
  try {
    const body = await req.json();
    message = String(body?.message || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!message || message.length < 2) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const { data: profile } = await supabaseAdmin
    .from("personality_profiles")
    .select("digest, chat_history")
    .eq("user_id", userId)
    .single();

  if (!profile?.digest) {
    return NextResponse.json(
      { error: "Complete your personality assessment first so the AI has context on you." },
      { status: 400 }
    );
  }

  const history: { role: "user" | "assistant"; content: string }[] = Array.isArray(profile.chat_history)
    ? profile.chat_history
    : [];

  const systemPrompt = `You are a personalized AI coach with deep knowledge of this specific user's personality profile:

${profile.digest}

Use this profile to give tailored, specific advice — reference their actual traits and tendencies rather than generic advice anyone could get. Be direct, warm, and genuinely useful. Keep responses focused and conversational (2-5 short paragraphs max unless they ask for something longer like a full plan).`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service is not configured." }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [...history, { role: "user", content: message }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${data?.error?.message || "Unknown error"}` }, { status: 502 });
    }

    const reply = data.content?.[0]?.text || "Sorry, I couldn't generate a response.";

    const updatedHistory = [
      ...history,
      { role: "user" as const, content: message },
      { role: "assistant" as const, content: reply },
    ].slice(-MAX_HISTORY_TURNS * 2);

    await supabaseAdmin
      .from("personality_profiles")
      .update({ chat_history: updatedHistory, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    return NextResponse.json({ reply });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
