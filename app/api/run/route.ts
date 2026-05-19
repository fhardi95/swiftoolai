import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { systemPrompt, userInput } = await req.json();

  if (!userInput?.trim()) {
    return NextResponse.json({ error: "No input provided" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userInput }] }],
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Upstream API error" }, { status: 502 });
  }

  const data = await res.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return NextResponse.json({ result });
}
