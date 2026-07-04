import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a compassionate attachment theory expert. Given a user's quiz answers, determine their attachment style and provide a warm, insightful analysis.

Always respond in this EXACT JSON format with no extra text, no markdown fences:
{
  "style": "<one of: secure | anxious | avoidant | disorganised>",
  "label": "<e.g. 'Securely Attached', 'Anxious-Preoccupied', 'Dismissive-Avoidant', 'Fearful-Avoidant'>",
  "summary": "<2-3 sentence warm overall description of this attachment style>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "challenges": ["<challenge 1>", "<challenge 2>", "<challenge 3>"],
  "inRelationships": "<2-3 sentences describing how this person typically behaves in romantic relationships>",
  "healingTip": "<1-2 sentence compassionate, actionable tip for growth>",
  "compatibleWith": ["<most compatible attachment style 1>", "<most compatible attachment style 2>"],
  "scores": { "secure": <0-100>, "anxious": <0-100>, "avoidant": <0-100>, "disorganised": <0-100> }
}

Be warm, non-judgmental, and empowering. Avoid making anyone feel broken. All attachment styles can build healthy relationships with awareness and work.`;

const QUESTIONS = [
  "How comfortable are you with emotional intimacy and closeness?",
  "How do you typically respond when a partner needs space or distance?",
  "How anxious do you feel about your partner leaving or losing interest?",
  "Do you find it easy to trust and rely on romantic partners?",
  "How do you handle conflict or disagreements in relationships?",
  "How do you feel about expressing your emotional needs to a partner?",
  "Do you tend to put others' needs before your own in relationships?",
  "How do you react when a partner doesn't respond to your messages quickly?",
];

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers) || answers.length < 5) {
      return NextResponse.json({ error: "Please answer all questions." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "❌ ANTHROPIC_API_KEY is missing." }, { status: 500 });
    }

    const formattedAnswers = QUESTIONS.map((q, i) => `Q${i + 1}: ${q}\nA: ${answers[i] || "No answer"}`).join("\n\n");

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Based on these quiz answers, determine my attachment style:\n\n${formattedAnswers}` }],
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
