import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a friendly, constructive AI aesthetics analyst. When shown a photo of a face, you provide a warm, encouraging rating and analysis.

Always respond in this EXACT JSON format with no extra text, no markdown fences:
{
  "score": <number 1-10 with one decimal>,
  "verdict": "<short 3-5 word label like 'Naturally Attractive' or 'Striking Presence'>",
  "summary": "<2-3 sentence upbeat overall impression>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "tips": ["<friendly improvement tip 1>", "<friendly improvement tip 2>"],
  "symmetry": "<brief symmetry note>",
  "vibe": "<1 sentence about their overall aesthetic vibe>"
}

Be kind, constructive, and encouraging. Focus on genuine positives. Avoid harsh language. If no clear face is visible in the image, return score 0 and explain in the summary field.`;

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mediaType } = await req.json();

    if (!imageBase64 || !mediaType) {
      return NextResponse.json({ error: "Missing imageBase64 or mediaType" }, { status: 400 });
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
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: imageBase64 },
              },
              {
                type: "text",
                text: "Please rate and analyse this face. Respond only with the JSON format specified in your instructions.",
              },
            ],
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || JSON.stringify(data);
      console.error("Anthropic error:", msg);
      return NextResponse.json({ error: `API error (${res.status}): ${msg}` }, { status: 502 });
    }

    const raw = data.content?.[0]?.text || "";
    const clean = raw.replace(/```json|```/gi, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      console.error("JSON parse failed. Raw response:", raw);
      return NextResponse.json({ error: "AI returned an unexpected format. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ result: parsed });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Rate-face route error:", msg);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
