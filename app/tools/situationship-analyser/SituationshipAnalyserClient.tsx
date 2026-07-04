"use client";
import { useState } from "react";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Situationship Analyser — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/situationship-analyser",
  description: "Free AI situationship analyser. Describe your romantic situation and get an honest AI read — including red flags, green flags, and what to do next.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is a situationship?", acceptedAnswer: { "@type": "Answer", text: "A situationship is a romantic connection that lacks clear definition or commitment — more than friends, but not officially a relationship. Both parties often avoid labelling it, leading to confusion and emotional ambiguity." } },
    { "@type": "Question", name: "How does the AI situationship analyser work?", acceptedAnswer: { "@type": "Answer", text: "You describe your situation in your own words, and our AI analyses the emotional dynamics, identifies red and green flags, assesses what the other person likely wants, and gives you honest, actionable advice." } },
    { "@type": "Question", name: "Is my situation kept private?", acceptedAnswer: { "@type": "Answer", text: "Yes. Your description is sent securely to generate the analysis and is never stored or shared after processing." } },
  ],
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  situationship: { label: "Situationship", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  undefined: { label: "Undefined", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  "one-sided": { label: "One-Sided", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  toxic: { label: "Toxic Dynamic", color: "#991b1b", bg: "#fef2f2", border: "#fca5a5" },
  "almost-relationship": { label: "Almost Relationship", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  healthy: { label: "Healthy Connection", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
};

export default function SituationshipAnalyserClient() {
  const [situation, setSituation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    verdict: string; status: string; summary: string;
    redFlags: string[]; greenFlags: string[];
    whatTheyWant: string; whatYouShouldDo: string;
    chanceOfRelationship: number;
  }>(null);
  const [error, setError] = useState("");

  const handleAnalyse = async () => {
    if (situation.trim().length < 20) { setError("Please describe your situation in a bit more detail."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/situationship-analyser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation }),
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

  const reset = () => { setSituation(""); setResult(null); setError(""); };

  const statusCfg = result ? (STATUS_CONFIG[result.status] || STATUS_CONFIG["undefined"]) : null;
  const chance = result?.chanceOfRelationship ?? 0;
  const chanceColor = chance >= 60 ? "#16a34a" : chance >= 35 ? "#d97706" : "#dc2626";

  const s = {
    section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "1.4rem 1.6rem", marginBottom: "1rem", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" } as React.CSSProperties,
    h3: { fontWeight: 700, fontSize: 13, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 10 },
    p: { fontSize: 15, lineHeight: 1.7, color: "#374151", margin: 0 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf2f8", border: "1px solid #fbcfe8", borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#9d174d", marginBottom: "1rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            💬 AI Relationship Analyst · Free · Private
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,2.8rem)", letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#111827", lineHeight: 1.15 }}>
            Situationship Analyser
          </h1>
          <p style={{ color: "#6b7280", fontSize: 17, lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
            Describe what&apos;s going on between you two — the AI will give you an honest, no-filter read: red flags, green flags, what they actually want, and what you should do.
          </p>
        </div>

        {/* Input */}
        {!result && (
          <div style={{ ...s.section, marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 10 }}>
              Describe your situation <span style={{ fontWeight: 400, color: "#9ca3af" }}>(be as honest and detailed as you like)</span>
            </label>
            <textarea
              value={situation}
              onChange={e => setSituation(e.target.value)}
              placeholder="e.g. We've been talking for 4 months, we text every day, we've been on 3 dates but he hasn't asked me to be his girlfriend. He's very affectionate in person but pulls away over text. He's mentioned an ex a few times…"
              rows={7}
              style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", fontSize: 15, lineHeight: 1.6, color: "#111827", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{situation.length} characters · minimum 20</span>
              <button
                onClick={handleAnalyse}
                disabled={loading || situation.trim().length < 20}
                style={{ background: "#9d174d", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: loading || situation.trim().length < 20 ? "not-allowed" : "pointer", opacity: loading || situation.trim().length < 20 ? 0.6 : 1, boxShadow: "0 4px 14px rgba(157,23,77,0.3)", transition: "opacity 0.15s" }}
              >
                {loading ? "Analysing…" : "💬 Analyse My Situation"}
              </button>
            </div>
            {loading && <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, marginTop: "1rem" }}>🧠 AI is reading between the lines…</p>}
          </div>
        )}

        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", color: "#dc2626", fontSize: 14, marginBottom: "1.5rem" }}>{error}</div>}

        {/* Results */}
        {result && statusCfg && (
          <div>
            {/* Verdict Banner */}
            <div style={{ background: "#111827", borderRadius: 16, padding: "2rem", textAlign: "center", marginBottom: "1.25rem", color: "#fff" }}>
              <div style={{ display: "inline-block", background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.border}`, borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
                {statusCfg.label}
              </div>
              <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 800, margin: "0 0 0.5rem", color: "#f9fafb", fontFamily: "'Syne', sans-serif" }}>{result.verdict}</h2>
              <p style={{ color: "#d1d5db", fontSize: 15, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 1.5rem" }}>{result.summary}</p>

              {/* Chance meter */}
              <div style={{ maxWidth: 360, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>
                  <span>Chance of becoming a real relationship</span>
                  <span style={{ color: chanceColor, fontWeight: 700 }}>{chance}%</span>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${chance}%`, background: chanceColor, borderRadius: 100, transition: "width 1s ease" }} />
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: "1rem", marginBottom: "1rem" }}>
              {/* Red Flags */}
              <div style={{ ...s.section, background: "#fef2f2", border: "1px solid #fecaca", marginBottom: 0 }}>
                <h3 style={{ ...s.h3, color: "#991b1b" }}>🚩 Red Flags</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.redFlags.map((f, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#7f1d1d", padding: "4px 0", lineHeight: 1.5 }}>
                      <span style={{ color: "#dc2626", fontWeight: 700, flexShrink: 0 }}>✗</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Green Flags */}
              <div style={{ ...s.section, background: "#f0fdf4", border: "1px solid #bbf7d0", marginBottom: 0 }}>
                <h3 style={{ ...s.h3, color: "#166534" }}>✅ Green Flags</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {result.greenFlags.map((f, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#166534", padding: "4px 0", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What they want */}
            <div style={{ ...s.section, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              <h3 style={{ ...s.h3, color: "#1e40af" }}>🔍 What They Likely Want</h3>
              <p style={{ ...s.p, color: "#1e40af" }}>{result.whatTheyWant}</p>
            </div>

            {/* What you should do */}
            <div style={{ ...s.section, background: "#fdf2f8", border: "1px solid #fbcfe8" }}>
              <h3 style={{ ...s.h3, color: "#9d174d" }}>💡 What You Should Do</h3>
              <p style={{ ...s.p, color: "#831843" }}>{result.whatYouShouldDo}</p>
            </div>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button onClick={reset} style={{ background: "#9d174d", color: "#fff", border: "none", borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(157,23,77,0.3)" }}>
                🔄 Analyse Another Situation
              </button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: "2rem", lineHeight: 1.6 }}>
          ⚠️ For self-reflection and entertainment purposes only. This tool does not store your responses. Always trust your own judgment in relationships.
        </p>
      </div>
    </>
  );
}
