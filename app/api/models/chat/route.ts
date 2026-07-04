import { NextRequest, NextResponse } from "next/server";

const MODEL_MAP: Record<string, string> = {
  "claude-sonnet-4-6": "claude-sonnet-4-6",
};

export async function POST(req: NextRequest) {
  try {
    const { messages, model } = await req.json();

    const apiModel = MODEL_MAP[model];
    if (!apiModel) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: apiModel,
        max_tokens: 2048,
        system: "You are a helpful AI assistant. Be concise, clear, and friendly.",
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await res.json();
    const content = data.content?.[0]?.text ?? "Sorry, I couldn't generate a response.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[models/chat]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
