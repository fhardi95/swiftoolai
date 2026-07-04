"use client";
import { useState } from "react";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Attachment Style Quiz — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/attachment-style-quiz",
  description: "Free AI attachment style quiz. Answer 8 questions and discover if you're secure, anxious, avoidant, or disorganised — with a full breakdown and healing tips.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are the 4 attachment styles?", acceptedAnswer: { "@type": "Answer", text: "The four attachment styles are: Secure (comfortable with intimacy and independence), Anxious (fear of abandonment, needs reassurance), Avoidant (values independence, struggles with closeness), and Disorganised (mix of anxious and avoidant, often linked to early trauma)." } },
    { "@type": "Question", name: "How accurate is an online attachment style quiz?", acceptedAnswer: { "@type": "Answer", text: "Online quizzes provide a helpful starting point for self-understanding. For clinical assessment, speak with a therapist trained in attachment theory. Our quiz uses AI to analyse your personal answers rather than fixed multiple-choice scores, making it more nuanced than standard quizzes." } },
  ],
};

const QUESTIONS = [
  { id: 1, q: "How comfortable are you with emotional intimacy and closeness with a partner?", placeholder: "e.g. I enjoy being close but sometimes feel smothered if a partner is too needy…" },
  { id: 2, q: "How do you typically respond when a partner needs space or distance from you?", placeholder: "e.g. I usually feel anxious and wonder if I've done something wrong…" },
  { id: 3, q: "How anxious do you feel about a partner losing interest or leaving you?", placeholder: "e.g. I often overthink small things and check my phone constantly…" },
  { id: 4, q: "Do you find it easy to trust and rely on romantic partners?", placeholder: "e.g. I struggle to open up and prefer to handle things independently…" },
  { id: 5, q: "How do you handle conflict or disagreements in relationships?", placeholder: "e.g. I tend to shut down or go quiet rather than discuss the issue…" },
  { id: 6, q: "How comfortable are you expressing your emotional needs to a partner?", placeholder: "e.g. I find it hard to ask for what I need and often drop hints instead…" },
  { id: 7, q: "Do you tend to prioritise your partner's needs over your own?", placeholder: "e.g. I often say yes to keep the peace even when I don't want to…" },
  { id: 8, q: "How do you feel when a partner doesn't reply quickly to messages?", placeholder: "e.g. I start to spiral and assume the worst, or I barely notice…" },
];

const STYLE_CONFIG: Record<string, { color: string; bg: string; border: string; emoji: string }> = {
  secure: { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", emoji: "🌿" },
  anxious: { color: "#d97706", bg: "#fffbeb", border: "#fde68a", emoji: "🌊" },
  avoidant: { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", emoji: "🏔️" },
  disorganised: { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", emoji: "🌀" },
};

export default function AttachmentStyleQuizClient() {
  const [answers, setAnswers] = useState<string[]>(Array(8).fill(""));
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    style: string; label: string; summary: string;
    strengths: string[]; challenges: string[];
    inRelationships: string; healingTip: string;
    compatibleWith: string[];
    scores: { secure: number; anxious: number; avoidant: number; disorganised: number };
  }>(null);
  const [error, setError] = useState("");

  const updateAnswer = (i: number, val: string) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
  };

  const progress = Math.round(((currentStep) / QUESTIONS.length) * 100);
  const allAnswered = answers.every(a => a.trim().length >= 5);

  const handleSubmit = async () => {
    if (!allAnswered) { setError("Please answer all questions with at least a few words."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/attachment-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setAnswers(Array(8).fill("")); setCurrentStep(0); setResult(null); setError(""); };

  const cfg = result ? (STYLE_CONFIG[result.style] || STYLE_CONFIG["anxious"]) : null;

  const s = {
    card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "1.4rem 1.6rem", marginBottom: "1rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" } as React.CSSProperties,
    h3: { fontWeight: 700, fontSize: 13, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 10 },
    p: { fontSize: 14, lineHeight: 1.7, margin: 0 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#1e40af", marginBottom: "1rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            🧠 AI Attachment Analysis · Free · No Sign-up
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,2.8rem)", letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#111827", lineHeight: 1.15 }}>
            Attachment Style Quiz
          </h1>
          <p style={{ color: "#6b7280", fontSize: 17, lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
            Answer 8 open questions in your own words. Our AI analyses your responses and reveals your attachment style — secure, anxious, avoidant, or disorganised — with a full personalised breakdown.
          </p>
        </div>

        {!result && (
          <div>
            {/* Progress */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>
                <span>{answers.filter(a => a.trim().length >= 5).length} of {QUESTIONS.length} answered</span>
                <span>{progress}% complete</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: 100, transition: "width 0.3s ease" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {QUESTIONS.map((q, i) => (
                <div key={q.id} style={s.card}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: answers[i].trim().length >= 5 ? "#2563eb" : "#f3f4f6", color: answers[i].trim().length >= 5 ? "#fff" : "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0, transition: "all 0.2s" }}>{q.id}</div>
                    <label style={{ fontWeight: 700, fontSize: 14, color: "#111827", lineHeight: 1.5 }}>{q.q}</label>
                  </div>
                  <textarea
                    value={answers[i]}
                    onChange={e => { updateAnswer(i, e.target.value); if (i === currentStep) setCurrentStep(Math.min(i + 1, QUESTIONS.length - 1)); }}
                    placeholder={q.placeholder}
                    rows={3}
                    style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 14, lineHeight: 1.6, color: "#111827", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                </div>
              ))}
            </div>

            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", color: "#dc2626", fontSize: 14, margin: "1rem 0" }}>{error}</div>}

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={handleSubmit}
                disabled={loading || !allAnswered}
                style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 10, padding: "14px 36px", fontSize: 16, fontWeight: 700, cursor: loading || !allAnswered ? "not-allowed" : "pointer", opacity: loading || !allAnswered ? 0.6 : 1, boxShadow: "0 4px 14px rgba(29,78,216,0.3)", transition: "opacity 0.15s" }}
              >
                {loading ? "Analysing your answers…" : "🧠 Reveal My Attachment Style"}
              </button>
              {!allAnswered && <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>Answer all 8 questions to continue</p>}
              {loading && <p style={{ color: "#6b7280", fontSize: 14, marginTop: "1rem" }}>🔍 AI is reading your patterns…</p>}
            </div>
          </div>
        )}

        {result && cfg && (
          <div>
            {/* Result Banner */}
            <div style={{ background: "#111827", borderRadius: 16, padding: "2rem", textAlign: "center", marginBottom: "1.25rem", color: "#fff" }}>
              <div style={{ fontSize: 56, marginBottom: "0.75rem" }}>{cfg.emoji}</div>
              <div style={{ display: "inline-block", background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, borderRadius: 999, padding: "4px 16px", fontSize: 12, fontWeight: 700, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>{result.style} attachment</div>
              <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 800, margin: "0 0 0.75rem", color: "#f9fafb", fontFamily: "'Syne', sans-serif" }}>{result.label}</h2>
              <p style={{ color: "#d1d5db", fontSize: 15, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 1.5rem" }}>{result.summary}</p>

              {/* Score bars */}
              <div style={{ maxWidth: 380, margin: "0 auto", textAlign: "left" }}>
                {(Object.entries(result.scores) as [string, number][]).map(([style, score]) => (
                  <div key={style} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>
                      <span style={{ textTransform: "capitalize" }}>{style}</span><span style={{ fontWeight: 600 }}>{score}%</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${score}%`, background: STYLE_CONFIG[style]?.color || "#6b7280", borderRadius: 100 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ ...s.card, background: "#f0fdf4", border: "1px solid #bbf7d0", marginBottom: 0 }}>
                <h3 style={{ ...s.h3, color: "#166534" }}>💪 Your Strengths</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.strengths.map((str, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#166534", padding: "4px 0", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span>{str}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ ...s.card, background: "#fffbeb", border: "1px solid #fde68a", marginBottom: 0 }}>
                <h3 style={{ ...s.h3, color: "#92400e" }}>⚡ Growth Areas</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.challenges.map((ch, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#78350f", padding: "4px 0", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 700, flexShrink: 0 }}>→</span>{ch}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ ...s.card, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              <h3 style={{ ...s.h3, color: "#1e40af" }}>💑 How You Show Up in Relationships</h3>
              <p style={{ ...s.p, color: "#1e40af", fontSize: 15 }}>{result.inRelationships}</p>
            </div>

            <div style={{ ...s.card, background: "#f5f3ff", border: "1px solid #ddd6fe" }}>
              <h3 style={{ ...s.h3, color: "#6d28d9" }}>🌱 Your Healing Tip</h3>
              <p style={{ ...s.p, color: "#5b21b6", fontSize: 15 }}>{result.healingTip}</p>
            </div>

            {result.compatibleWith && result.compatibleWith.length > 0 && (
              <div style={s.card}>
                <h3 style={{ ...s.h3, color: "#374151" }}>❤️ Most Compatible With</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {result.compatibleWith.map((c, i) => (
                    <span key={i} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#374151" }}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button onClick={reset} style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(29,78,216,0.3)" }}>🔄 Retake the Quiz</button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: "2rem", lineHeight: 1.6 }}>
          ⚠️ For self-reflection and entertainment purposes only. For clinical assessment, please speak with a qualified therapist or psychologist. Your answers are never stored.
        </p>
      </div>
    </>
  );
}
