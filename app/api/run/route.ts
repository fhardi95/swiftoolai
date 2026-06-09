import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userInput } = await req.json();

    if (!userInput?.trim()) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "❌ ANTHROPIC_API_KEY is missing from environment variables." }, { status: 500 });
    }

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
        messages: [{ role: "user", content: userInput }],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || JSON.stringify(data);
      console.error("Anthropic error:", msg);
      return NextResponse.json({ error: `API error (${res.status}): ${msg}` }, { status: 502 });
    }

    const result = data.content?.[0]?.text || "";
    return NextResponse.json({ result });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Route error:", msg);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
