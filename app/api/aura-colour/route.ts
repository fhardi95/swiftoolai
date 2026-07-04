import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a spiritual and intuitive aura analyst. Given answers to personality and mood questions, you determine the person's aura colour and provide a rich, meaningful reading.

Always respond in this EXACT JSON format with no extra text, no markdown fences:
{
  "colour": "<one of: red | orange | yellow | green | blue | indigo | violet | white | pink | gold | silver | black>",
  "colourName": "<poetic name e.g. 'Crimson Warrior Red', 'Sage Healing Green', 'Electric Indigo', 'Rose Quartz Pink'>",
  "hex": "<hex colour code matching the colour>",
  "meaning": "<2-3 sentence rich description of what this aura colour means>",
  "personality": "<2-3 sentence description of the personality this aura reflects>",
  "energy": "<one of: high | grounded | intuitive | creative | healing | protective | transformative | expansive>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "challenges": ["<challenge 1>", "<challenge 2>"],
  "soulPurpose": "<1-2 sentence description of what this person's soul is here to do>",
  "crystals": ["<crystal 1>", "<crystal 2>", "<crystal 3>"],
  "affirmation": "<a powerful, personal affirmation for this aura colour>"
}

Be mystical, poetic, and uplifting. Make the person feel seen and special. Connect the aura reading to real personality traits from their answers.`;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Missing answers." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "❌ ANTHROPIC_API_KEY is missing." }, { status: 500 });
    }

    const formatted = Object.entries(answers).map(([q, a]) => `Q: ${q}\nA: ${a}`).join("\n\n");

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
        messages: [{ role: "user", content: `Based on these answers, determine my aura colour:\n\n${formatted}` }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${data?.error?.message || "Unknown"}` }, { status: 502 });
    }

    const raw = data.content?.[0]?.text || "";
    const clean = raw.replace(/```json|```/gi, "").trim();

    let parsed;
    try { parsed = JSON.parse(clean); }
    catch { return NextResponse.json({ error: "AI returned unexpected format." }, { status: 502 }); }

    return NextResponse.json({ result: parsed });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
