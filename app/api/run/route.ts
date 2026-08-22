import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userInput } = await req.json();

    if (!userInput?.trim()) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "❌ OPENAI_API_KEY is missing from environment variables." }, { status: 500 });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        max_completion_tokens: 1024,
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userInput }],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || JSON.stringify(data);
      console.error("OpenAI error:", msg);
      return NextResponse.json({ error: `API error (${res.status}): ${msg}` }, { status: 502 });
    }

    const result = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ result });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Route error:", msg);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
