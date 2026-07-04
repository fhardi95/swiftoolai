// lib/personality-questions.ts
// Question bank for the AI Personality OS assessment.
// 8 traits × 5 questions = 40 questions. Each answer is 1–5 (Strongly disagree → Strongly agree).
// `reverse: true` means a high agreement score maps to a LOW trait score.

export type TraitKey =
  | "structure"      // structured/planned (high) vs spontaneous (low)
  | "analytical"     // analytical/logical (high) vs intuitive/emotional (low)
  | "drive"          // achievement-driven (high) vs comfort-seeking (low)
  | "directness"     // direct communicator (high) vs diplomatic/indirect (low)
  | "conceptual"     // conceptual/big-picture learner (high) vs hands-on/practical (low)
  | "security"       // secure attachment style (high) vs anxious/avoidant (low)
  | "regulation"     // calm under pressure (high) vs reactive/volatile (low)
  | "riskTolerance";  // risk-taking (high) vs risk-averse (low)

export interface Question {
  id: string;
  trait: TraitKey;
  text: string;
  reverse?: boolean;
}

export const TRAIT_LABELS: Record<TraitKey, { high: string; low: string; label: string }> = {
  structure:      { label: "Structure vs. Spontaneity",     high: "Structured Planner",     low: "Spontaneous Improviser" },
  analytical:     { label: "Analytical vs. Intuitive",      high: "Analytical Thinker",     low: "Intuitive Feeler" },
  drive:          { label: "Drive & Ambition",              high: "High-Drive Achiever",    low: "Comfort-Oriented" },
  directness:     { label: "Communication Style",           high: "Direct Communicator",    low: "Diplomatic Communicator" },
  conceptual:     { label: "Learning Style",                high: "Conceptual Learner",     low: "Hands-On Learner" },
  security:       { label: "Relationship Security",         high: "Securely Attached",      low: "Guarded / Anxious" },
  regulation:     { label: "Emotional Regulation",           high: "Steady Under Pressure",  low: "Emotionally Reactive" },
  riskTolerance:  { label: "Risk Tolerance",                 high: "Risk-Taker",             low: "Risk-Averse" },
};

export const QUESTIONS: Question[] = [
  // ── Structure vs Spontaneity ──
  { id: "q1",  trait: "structure", text: "I feel more comfortable when my day is planned out in advance." },
  { id: "q2",  trait: "structure", text: "I make to-do lists and actually follow them." },
  { id: "q3",  trait: "structure", text: "Last-minute changes to plans genuinely excite me rather than stress me.", reverse: true },
  { id: "q4",  trait: "structure", text: "I like having a clear routine for my mornings and evenings." },
  { id: "q5",  trait: "structure", text: "I often start projects without a clear plan and figure it out as I go.", reverse: true },

  // ── Analytical vs Intuitive ──
  { id: "q6",  trait: "analytical", text: "Before deciding something important, I make a pros-and-cons list or gather data." },
  { id: "q7",  trait: "analytical", text: "I trust my gut instinct more than a spreadsheet of facts.", reverse: true },
  { id: "q8",  trait: "analytical", text: "I enjoy breaking complex problems down into smaller logical steps." },
  { id: "q9",  trait: "analytical", text: "I often know something is right or wrong before I can explain why.", reverse: true },
  { id: "q10", trait: "analytical", text: "Numbers and evidence persuade me more than a compelling story." },

  // ── Drive & Ambition ──
  { id: "q11", trait: "drive", text: "I regularly set ambitious goals for myself, even when it's uncomfortable." },
  { id: "q12", trait: "drive", text: "I'd rather have a stable, comfortable life than chase a bigger but riskier goal.", reverse: true },
  { id: "q13", trait: "drive", text: "I feel restless if I'm not working toward something meaningful." },
  { id: "q14", trait: "drive", text: "Winning or being the best at something genuinely matters to me." },
  { id: "q15", trait: "drive", text: "I'm content coasting at work as long as I'm not stressed.", reverse: true },

  // ── Communication Style ──
  { id: "q16", trait: "directness", text: "I'd rather give someone blunt honest feedback than soften it too much." },
  { id: "q17", trait: "directness", text: "I choose my words very carefully to avoid upsetting people, even if it means being vague.", reverse: true },
  { id: "q18", trait: "directness", text: "People have told me I'm 'too direct' or 'too blunt' before." },
  { id: "q19", trait: "directness", text: "I prefer hinting at a problem rather than stating it outright.", reverse: true },
  { id: "q20", trait: "directness", text: "In a disagreement, I'll say exactly what I think rather than staying quiet." },

  // ── Learning Style ──
  { id: "q21", trait: "conceptual", text: "I learn best by understanding the big-picture theory before the details." },
  { id: "q22", trait: "conceptual", text: "I'd rather just start doing something and learn by trial and error.", reverse: true },
  { id: "q23", trait: "conceptual", text: "I enjoy thinking about abstract ideas and 'what if' scenarios." },
  { id: "q24", trait: "conceptual", text: "Hands-on practice teaches me far more than reading about a topic.", reverse: true },
  { id: "q25", trait: "conceptual", text: "I like connecting ideas across totally different fields." },

  // ── Relationship Security ──
  { id: "q26", trait: "security", text: "I find it easy to trust people I'm close to." },
  { id: "q27", trait: "security", text: "I often worry that people close to me will eventually leave or lose interest.", reverse: true },
  { id: "q28", trait: "security", text: "I'm comfortable depending on others and having others depend on me." },
  { id: "q29", trait: "security", text: "I tend to keep people at arm's length, even in close relationships.", reverse: true },
  { id: "q30", trait: "security", text: "Conflict in a relationship doesn't make me fear the relationship is over." },

  // ── Emotional Regulation ──
  { id: "q31", trait: "regulation", text: "When something goes wrong, I stay relatively calm and think clearly." },
  { id: "q32", trait: "regulation", text: "Small setbacks can throw off my whole mood for the day.", reverse: true },
  { id: "q33", trait: "regulation", text: "I rarely raise my voice or lose my temper, even when frustrated." },
  { id: "q34", trait: "regulation", text: "I tend to react quickly and emotionally before thinking things through.", reverse: true },
  { id: "q35", trait: "regulation", text: "Stressful situations rarely rattle me for long." },

  // ── Risk Tolerance ──
  { id: "q36", trait: "riskTolerance", text: "I'd rather take a risky bet with a big upside than a safe, guaranteed outcome." },
  { id: "q37", trait: "riskTolerance", text: "The idea of losing money or status keeps me from trying new things.", reverse: true },
  { id: "q38", trait: "riskTolerance", text: "I've made at least one big life decision most people would call risky." },
  { id: "q39", trait: "riskTolerance", text: "I prefer a predictable paycheck over an uncertain but higher-upside opportunity.", reverse: true },
  { id: "q40", trait: "riskTolerance", text: "I get a thrill from uncertainty rather than dreading it." },
];

export function scoreTraits(answers: Record<string, number>): Record<TraitKey, number> {
  const buckets: Record<TraitKey, number[]> = {
    structure: [], analytical: [], drive: [], directness: [],
    conceptual: [], security: [], regulation: [], riskTolerance: [],
  };

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (typeof raw !== "number" || raw < 1 || raw > 5) continue;
    const value = q.reverse ? 6 - raw : raw;
    buckets[q.trait].push(value);
  }

  const scores = {} as Record<TraitKey, number>;
  for (const trait of Object.keys(buckets) as TraitKey[]) {
    const vals = buckets[trait];
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 3;
    // Convert 1-5 average to a 0-100 score
    scores[trait] = Math.round(((avg - 1) / 4) * 100);
  }
  return scores;
}
