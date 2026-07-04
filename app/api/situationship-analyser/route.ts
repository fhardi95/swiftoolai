import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an empathetic relationship analyst. When given a description of a romantic situation, you provide a warm, honest, and insightful analysis.

Always respond in this EXACT JSON format with no extra text, no markdown fences:
{
  "verdict": "<short 3-6 word label e.g. 'Classic Situationship', 'One-Sided Attachment', 'Mutual Avoidance', 'Hidden Relationship', 'Transitional Connection'>",
  "status": "<one of: situationship | undefined | one-sided | toxic | almost-relationship | healthy>",
  "summary": "<2-3 sentence honest but kind overall read of the situation>",
  "redFlags": ["<red flag 1>", "<red flag 2>", "<red flag 3>"],
  "greenFlags": ["<green flag 1>", "<green flag 2>"],
  "whatTheyWant": "<honest 1-2 sentence assessment of what the other person likely wants>",
  "whatYouShouldDo": "<clear, kind, actionable advice in 2-3 sentences>",
  "chanceOfRelationship": <number 0-100>
}

Be honest but compassionate. Do not sugarcoat red flags. If the situation sounds toxic or one-sided, say so clearly. Always end on an empowering note.`;

export async function POST(req: NextRequest) {
  try {
    const { situation } = await req.json();

    if (!situation || situation.trim().length < 20) {
      return NextResponse.json({ error: "Please describe your situation in more detail." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "❌ ANTHROPIC_API_KEY is missing." }, { status: 500 });
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
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Analyse this situation: ${situation}` }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${data?.error?.message || "Unknown error"}` }, { status: 502 });
    }

    const raw = data.content?.[0]?.text || "";
    const clean = raw.replace(/```json|```/gi, "").trim();

    let parsed;
    try { parsed = JSON.parse(clean); }
    catch { return NextResponse.json({ error: "AI returned unexpected format. Please try again." }, { status: 502 }); }

    return NextResponse.json({ result: parsed });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
