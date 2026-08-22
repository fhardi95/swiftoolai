import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkAndRecordUsage } from "@/lib/usage";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { QUESTIONS, scoreTraits, TRAIT_LABELS } from "@/lib/personality-questions";

const TOOL_SLUG = "personality-os";

const SYSTEM_PROMPT = `You are an expert personality psychologist and career/business coach. You will be given a user's trait scores (0-100) across 8 dimensions, derived from a 40-question assessment. Write a rich, specific, personalized report.

Respond in this EXACT JSON format, no markdown fences, no extra text:
{
  "archetype": "<a punchy 2-4 word personality archetype name, e.g. 'The Analytical Builder', 'The Bold Connector'>",
  "summary": "<3-4 sentence narrative summary of who this person is, written directly to them as 'you'>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "growthAreas": ["<growth area 1>", "<growth area 2>", "<growth area 3>"],
  "careerSuggestions": [
    {"title": "<job/career title>", "why": "<1 sentence why it fits their profile>"},
    {"title": "<job/career title>", "why": "<1 sentence why it fits their profile>"},
    {"title": "<job/career title>", "why": "<1 sentence why it fits their profile>"}
  ],
  "businessIdeas": [
    {"idea": "<specific business idea>", "why": "<1 sentence why it fits their profile>"},
    {"idea": "<specific business idea>", "why": "<1 sentence why it fits their profile>"}
  ],
  "relationshipInsight": "<2-3 sentences on how they likely show up in relationships, based on security/directness/regulation traits>",
  "productivityTip": "<1-2 concrete, specific productivity or work-style tips based on their structure/conceptual/drive traits>",
  "growthPlan": ["<specific 1-week action step>", "<specific 1-week action step>", "<specific 1-week action step>"],
  "digest": "<a dense 3-5 sentence profile summary written in third person, e.g. 'This person is highly structured and analytical, with strong achievement drive...' — this will be reused as hidden context for a personalized AI chat, so pack it with useful specifics, not generic praise>"
}

Be specific and avoid generic horoscope-style language. Ground every claim in the actual trait scores given. Be warm but honest — call out real growth areas, don't just flatter.`;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to save your results." }, { status: 401 });
  }
  const userId = session.user.id;

  const usageCheck = await checkAndRecordUsage(userId, TOOL_SLUG);
  if (!usageCheck.allowed) {
    return NextResponse.json({ error: usageCheck.reason, upgradeRequired: true }, { status: 429 });
  }

  let answers: Record<string, number>;
  try {
    const body = await req.json();
    answers = body?.answers;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!answers || typeof answers !== "object" || Object.keys(answers).length < QUESTIONS.length) {
    return NextResponse.json({ error: `Please answer all ${QUESTIONS.length} questions.` }, { status: 400 });
  }

  const traitScores = scoreTraits(answers);

  const traitSummaryLines = (Object.keys(traitScores) as (keyof typeof traitScores)[])
    .map((key) => `${TRAIT_LABELS[key].label}: ${traitScores[key]}/100 (leans ${traitScores[key] >= 50 ? TRAIT_LABELS[key].high : TRAIT_LABELS[key].low})`)
    .join("\n");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service is not configured." }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        max_completion_tokens: 2048,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: `Here are this user's trait scores:\n\n${traitSummaryLines}` }],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${data?.error?.message || "Unknown error"}` }, { status: 502 });
    }

    const raw = data.choices?.[0]?.message?.content || "";
    const clean = raw.replace(/```json|```/gi, "").trim();

    let report;
    try {
      report = JSON.parse(clean);
    } catch {
      return NextResponse.json({ error: "AI returned an unexpected format. Please try again." }, { status: 502 });
    }

    const digest: string = report.digest || "";

    await supabaseAdmin.from("personality_profiles").upsert(
      {
        user_id: userId,
        answers,
        trait_scores: traitScores,
        report,
        digest,
        chat_history: [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    return NextResponse.json({ traitScores, report });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}
