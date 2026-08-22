import { NextRequest, NextResponse } from "next/server";

// Two real providers live behind this one endpoint:
// - "claude-sonnet-4-6" is the model shown on the dedicated, explicitly
//   Anthropic-branded /models/claude-sonnet-4-6 page — it must keep
//   calling the real Anthropic API. Quietly serving a different model
//   there while the page still says "Claude Sonnet 4.6, by Anthropic"
//   would misrepresent the product to users.
// - "gpt-5-mini" is the model used by the unbranded, generic
//   /tools/free-ai-chat widget, which never promised any specific
//   provider — that one now genuinely runs on OpenAI.
const PROVIDERS: Record<string, "anthropic" | "openai"> = {
  "claude-sonnet-4-6": "anthropic",
  "gpt-5-mini": "openai",
};

export async function POST(req: NextRequest) {
  try {
    const { messages, model } = await req.json();

    const provider = PROVIDERS[model];
    if (!provider) return NextResponse.json({ error: "Invalid model" }, { status: 400 });

    if (provider === "anthropic") {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
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
    }

    // OpenAI
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        max_completion_tokens: 2048,
        messages: [
          { role: "system", content: "You are a helpful AI assistant. Be concise, clear, and friendly." },
          ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[models/chat]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
