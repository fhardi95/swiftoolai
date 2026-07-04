"use client";
import { useState } from "react";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Aura Colour Generator — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/aura-colour-generator",
  description: "Free AI aura colour generator. Answer 7 questions about your personality, energy, and mood and get your unique aura colour with a full spiritual reading.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const QUESTIONS = [
  { key: "energy", q: "How would you describe your general energy level day to day?", options: ["Constantly buzzing, always on the go", "Calm and steady", "Deep and thoughtful", "Creative and unpredictable", "Peaceful and nurturing"] },
  { key: "emotion", q: "Which emotion feels most familiar or prominent in your life right now?", options: ["Passion / drive", "Peace / contentment", "Sadness / longing", "Curiosity / wonder", "Love / compassion"] },
  { key: "nature", q: "Which element in nature do you feel most drawn to?", options: ["Fire", "Earth", "Water", "Air", "Space / cosmos"] },
  { key: "gift", q: "What is your greatest natural gift?", options: ["Leadership and action", "Creativity and expression", "Empathy and healing", "Wisdom and insight", "Spiritual connection"] },
  { key: "morning", q: "How do you typically feel in the morning?", options: ["Ready to conquer the day", "Slow and dreamy", "Reflective and introspective", "Excited about what comes", "Grateful and present"] },
  { key: "colour", q: "Which colour are you naturally drawn to in clothing or your home?", options: ["Reds and oranges", "Greens and browns", "Blues and teals", "Purples and indigos", "Whites and soft pastels"] },
  { key: "purpose", q: "What feels closest to your life purpose?", options: ["To create and inspire", "To protect and provide", "To heal and nurture", "To discover and understand", "To connect and love"] },
];

export default function AuraColourGeneratorClient() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    colour: string; colourName: string; hex: string;
    meaning: string; personality: string; energy: string;
    strengths: string[]; challenges: string[];
    soulPurpose: string; crystals: string[]; affirmation: string;
  }>(null);
  const [error, setError] = useState("");

  const allAnswered = QUESTIONS.every(q => answers[q.key]);
  const answered = QUESTIONS.filter(q => answers[q.key]).length;

  const handleSubmit = async () => {
    if (!allAnswered) { setError("Please answer all 7 questions."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const formattedAnswers: Record<string, string> = {};
      QUESTIONS.forEach(q => { formattedAnswers[q.q] = answers[q.key]; });
      const res = await fetch("/api/aura-colour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formattedAnswers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setAnswers({}); setResult(null); setError(""); };

  // Luminance helper for text colour
  const hexToLuma = (hex: string) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };
  const textOnAura = result ? (hexToLuma(result.hex) > 160 ? "#1a1a1a" : "#fff") : "#fff";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#6d28d9", marginBottom: "1rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            ✨ AI Spiritual Reading · Free · Instant
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,2.8rem)", letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#111827", lineHeight: 1.15 }}>
            Aura Colour Generator
          </h1>
          <p style={{ color: "#6b7280", fontSize: 17, lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
            Answer 7 questions about your energy, personality, and inner world. Our AI reveals your unique aura colour with a full spiritual reading — meaning, soul purpose, crystals, and your personal affirmation.
          </p>
        </div>

        {!result && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {QUESTIONS.map((q, i) => (
                <div key={q.key} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "1.4rem 1.6rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: answers[q.key] ? "#7c3aed" : "#f3f4f6", color: answers[q.key] ? "#fff" : "#9ca3af", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0, transition: "all 0.2s" }}>{i + 1}</div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", margin: 0, lineHeight: 1.4 }}>{q.q}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {q.options.map(opt => (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${answers[q.key] === opt ? "#7c3aed" : "#e5e7eb"}`, background: answers[q.key] === opt ? "#f5f3ff" : "#fafafa", transition: "all 0.15s" }}>
                        <input type="radio" name={q.key} value={opt} checked={answers[q.key] === opt} onChange={() => setAnswers(prev => ({ ...prev, [q.key]: opt }))} style={{ accentColor: "#7c3aed", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: answers[q.key] === opt ? "#6d28d9" : "#374151", fontWeight: answers[q.key] === opt ? 600 : 400 }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>
                <span>{answered} of 7 answered</span>
                <span>{Math.round((answered / 7) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((answered / 7) * 100)}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)", borderRadius: 100, transition: "width 0.3s ease" }} />
              </div>
            </div>

            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", color: "#dc2626", fontSize: 14, marginBottom: "1rem" }}>{error}</div>}

            <div style={{ textAlign: "center" }}>
              <button
                onClick={handleSubmit}
                disabled={loading || !allAnswered}
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff", border: "none", borderRadius: 10, padding: "14px 36px", fontSize: 16, fontWeight: 700, cursor: loading || !allAnswered ? "not-allowed" : "pointer", opacity: loading || !allAnswered ? 0.6 : 1, boxShadow: "0 4px 14px rgba(124,58,237,0.4)", transition: "opacity 0.15s" }}
              >
                {loading ? "Reading your energy…" : "✨ Reveal My Aura Colour"}
              </button>
              {loading && <p style={{ color: "#6b7280", fontSize: 14, marginTop: "1rem" }}>🌌 AI is tuning into your energy field…</p>}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div>
            {/* Aura Display */}
            <div style={{ borderRadius: 20, padding: "3rem 2rem", textAlign: "center", marginBottom: "1.25rem", background: result.hex, boxShadow: `0 8px 40px ${result.hex}66, 0 0 80px ${result.hex}33`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ fontSize: 64, marginBottom: "1rem" }}>✨</div>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: textOnAura, opacity: 0.8, marginBottom: "0.5rem" }}>Your Aura Colour</p>
              <h2 style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 800, color: textOnAura, margin: "0 0 0.5rem", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>{result.colourName}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: textOnAura, opacity: 0.9, maxWidth: 540, margin: "0 auto 1.25rem" }}>{result.meaning}</p>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 700, color: textOnAura, border: "1px solid rgba(255,255,255,0.3)" }}>
                Energy: {result.energy.charAt(0).toUpperCase() + result.energy.slice(1)}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem", marginBottom: "1rem" }}>
              {/* Personality */}
              <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "1.4rem 1.6rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6d28d9", marginBottom: 10 }}>🌟 Your Personality</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", margin: 0 }}>{result.personality}</p>
              </div>

              {/* Soul Purpose */}
              <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 14, padding: "1.4rem 1.6rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6d28d9", marginBottom: 10 }}>🌌 Soul Purpose</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5b21b6", margin: 0 }}>{result.soulPurpose}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: "1.4rem 1.6rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#166534", marginBottom: 10 }}>💫 Strengths</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.strengths.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#166534", padding: "4px 0", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 700 }}>✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 14, padding: "1.4rem 1.6rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#92400e", marginBottom: 10 }}>⚡ Growth Areas</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.challenges.map((c, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#78350f", padding: "4px 0", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 700 }}>→</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Crystals */}
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "1.4rem 1.6rem", marginBottom: "1rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#374151", marginBottom: 10 }}>💎 Your Crystals</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {result.crystals.map((c, i) => (
                  <span key={i} style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#6d28d9" }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Affirmation */}
            <div style={{ background: "#111827", borderRadius: 14, padding: "1.75rem", marginBottom: "1.5rem", textAlign: "center" }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "0.75rem" }}>Your Personal Affirmation</p>
              <p style={{ fontSize: "clamp(1rem,2.5vw,1.25rem)", color: "#f9fafb", lineHeight: 1.6, fontWeight: 600, fontStyle: "italic", margin: 0 }}>&ldquo;{result.affirmation}&rdquo;</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={reset} style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "#fff", border: "none", borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(124,58,237,0.4)" }}>
                ✨ Read My Aura Again
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: "2rem", lineHeight: 1.6 }}>
          ✨ For spiritual exploration and entertainment only. Aura readings are not scientific. Your responses are never stored.
        </p>
      </div>
    </>
  );
}
