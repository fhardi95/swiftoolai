"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { QUESTIONS, TRAIT_LABELS, TraitKey } from "@/lib/personality-questions";
import { UsageBar } from "@/app/_components/UsageGate";

type Stage = "loading" | "intro" | "assessment" | "generating" | "report";

interface Report {
  archetype: string;
  summary: string;
  strengths: string[];
  growthAreas: string[];
  careerSuggestions: { title: string; why: string }[];
  businessIdeas: { idea: string; why: string }[];
  relationshipInsight: string;
  productivityTip: string;
  growthPlan: string[];
}

interface ChatMsg { role: "user" | "assistant"; content: string; }

const INSIGHT_MILESTONES: Record<number, string> = {
  10: "Nice start — I'm already picking up on your work style.",
  20: "Halfway there. Your decision-making patterns are becoming clear.",
  30: "Almost done — starting to see your communication and relationship style.",
};

export default function PersonalityOSClient() {
  const { data: session, status } = useSession();
  const [stage, setStage] = useState<Stage>("loading");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [traitScores, setTraitScores] = useState<Record<TraitKey, number> | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");

  // Chat state
  const [chatHistory, setChatHistory] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // ── Load existing profile on mount (if signed in) ──────────────────────────
  useEffect(() => {
    if (status !== "authenticated") {
      if (status === "unauthenticated") setStage("intro");
      return;
    }
    fetch("/api/personality/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.exists) {
          setTraitScores(d.traitScores);
          setReport(d.report);
          setChatHistory(d.chatHistory || []);
          setStage("report");
        } else {
          setStage("intro");
        }
      })
      .catch(() => setStage("intro"));
  }, [status]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  function selectAnswer(value: number) {
    const q = QUESTIONS[qIndex];
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    if (qIndex < QUESTIONS.length - 1) {
      setTimeout(() => setQIndex(qIndex + 1), 150);
    } else {
      submitAssessment(updated);
    }
  }

  async function submitAssessment(finalAnswers: Record<string, number>) {
    setStage("generating");
    setError("");
    try {
      const res = await fetch("/api/personality/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setTraitScores(data.traitScores);
      setReport(data.report);
      setStage("report");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStage("assessment");
    }
  }

  const sendChat = useCallback(async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput("");
    setChatHistory((h) => [...h, { role: "user", content: msg }]);
    setChatLoading(true);
    try {
      const res = await fetch("/api/personality/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (!res.ok) {
        setChatHistory((h) => [...h, { role: "assistant", content: `⚠️ ${data.error || "Something went wrong."}` }]);
      } else {
        setChatHistory((h) => [...h, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setChatHistory((h) => [...h, { role: "assistant", content: "⚠️ Something went wrong. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatLoading]);

  function retake() {
    setAnswers({});
    setQIndex(0);
    setReport(null);
    setTraitScores(null);
    setChatHistory([]);
    setStage("assessment");
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (stage === "loading" || status === "loading") {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "4rem 1.25rem", textAlign: "center" }}>
        <div style={{ width: 32, height: 32, border: "3px solid #dbeafe", borderTopColor: "#2563eb", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Intro / sign-in ──────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem 1.25rem 2rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "5px 14px", fontSize: 12, color: "#2563eb", fontWeight: 600, marginBottom: "1.5rem" }}>
          🧠 40 questions · ~10 minutes · AI-powered
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 5vw, 2.8rem)", letterSpacing: "-0.03em", color: "#111827", marginBottom: "1rem" }}>
          Meet your AI Personality OS
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 2rem" }}>
          Not just another personality quiz. Answer 40 questions once, and get an AI that actually
          knows how you think — then ask it anything: career moves, business ideas, why you
          procrastinate, how you should study, why relationships stall.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: "2rem" }}>
          {["Career fit", "Business ideas", "Relationship patterns", "Growth plan"].map((f) => (
            <div key={f} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: "12px 14px", fontSize: 13, fontWeight: 600, color: "#374151" }}>
              {f}
            </div>
          ))}
        </div>

        {session ? (
          <button onClick={() => setStage("assessment")} style={ctaBtn}>
            Start my assessment →
          </button>
        ) : (
          <>
            <button onClick={() => signIn("google", { callbackUrl: window.location.href })} style={ctaBtn}>
              Sign in free to start →
            </button>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 10 }}>Takes 10 seconds — just Google sign-in.</p>
          </>
        )}
      </div>
    );
  }

  // ── Assessment ───────────────────────────────────────────────────────────
  if (stage === "assessment") {
    const q = QUESTIONS[qIndex];
    const pct = ((qIndex) / QUESTIONS.length) * 100;
    const milestone = INSIGHT_MILESTONES[qIndex];

    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div style={{ height: 6, background: "#f3f4f6", borderRadius: 100, overflow: "hidden", marginBottom: "0.75rem" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#2563eb", borderRadius: 100, transition: "width 0.3s" }} />
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: "2rem" }}>
          Question {qIndex + 1} of {QUESTIONS.length}
        </div>

        {milestone && (
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#2563eb", fontWeight: 500, marginBottom: "1.5rem" }}>
            💡 {milestone}
          </div>
        )}

        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.4, marginBottom: "2rem", minHeight: 70 }}>
          {q.text}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { v: 1, label: "Strongly disagree" },
            { v: 2, label: "Disagree" },
            { v: 3, label: "Neutral" },
            { v: 4, label: "Agree" },
            { v: 5, label: "Strongly agree" },
          ].map((opt) => (
            <button
              key={opt.v}
              onClick={() => selectAnswer(opt.v)}
              style={{
                textAlign: "left", padding: "14px 18px", background: answers[q.id] === opt.v ? "#eff6ff" : "#fff",
                border: `1.5px solid ${answers[q.id] === opt.v ? "#2563eb" : "rgba(0,0,0,0.08)"}`,
                borderRadius: 10, fontSize: 14, fontWeight: 500,
                color: answers[q.id] === opt.v ? "#2563eb" : "#374151",
                cursor: "pointer", transition: "all 0.12s",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {qIndex > 0 && (
          <button onClick={() => setQIndex(qIndex - 1)} style={{ marginTop: "1.5rem", background: "none", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer" }}>
            ← Back
          </button>
        )}
        {error && <p style={{ color: "#ef4444", fontSize: 13, marginTop: "1rem" }}>{error}</p>}
      </div>
    );
  }

  // ── Generating ───────────────────────────────────────────────────────────
  if (stage === "generating") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "5rem 1.25rem", textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #dbeafe", borderTopColor: "#2563eb", borderRadius: "50%", margin: "0 auto 1.5rem", animation: "spin 0.8s linear infinite" }} />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", marginBottom: 8 }}>
          Building your profile…
        </h2>
        <p style={{ color: "#9ca3af", fontSize: 14 }}>Analysing your answers across 8 personality dimensions.</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── Report + Chat ────────────────────────────────────────────────────────
  if (stage === "report" && report && traitScores) {
    return (
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 1.25rem 4rem" }}>
        <UsageBar />

        {/* Archetype header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: 8 }}>Your Archetype</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", letterSpacing: "-0.03em", color: "#111827", marginBottom: "1rem" }}>
            {report.archetype}
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>{report.summary}</p>
        </div>

        {/* Trait bars */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Trait Breakdown</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(Object.keys(traitScores) as TraitKey[]).map((key) => {
              const score = traitScores[key];
              const info = TRAIT_LABELS[key];
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                    <span>{info.label}</span>
                    <span style={{ fontWeight: 600, color: "#111827" }}>{score >= 50 ? info.high : info.low}</span>
                  </div>
                  <div style={{ height: 8, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${score}%`, background: "#2563eb", borderRadius: 100 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths / Growth */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="pos-grid">
          <div style={cardStyle}>
            <h3 style={cardTitle}>💪 Strengths</h3>
            <ul style={listStyle}>{report.strengths.map((s) => <li key={s} style={listItem}>{s}</li>)}</ul>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>🌱 Growth Areas</h3>
            <ul style={listStyle}>{report.growthAreas.map((s) => <li key={s} style={listItem}>{s}</li>)}</ul>
          </div>
        </div>

        {/* Career */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>💼 Career Fit</h3>
          {report.careerSuggestions.map((c) => (
            <div key={c.title} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{c.title}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{c.why}</div>
            </div>
          ))}
        </div>

        {/* Business ideas */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>🚀 Business Ideas For You</h3>
          {report.businessIdeas.map((b) => (
            <div key={b.idea} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{b.idea}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{b.why}</div>
            </div>
          ))}
        </div>

        {/* Relationship + productivity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="pos-grid">
          <div style={cardStyle}>
            <h3 style={cardTitle}>💞 Relationship Style</h3>
            <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.7 }}>{report.relationshipInsight}</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>⚡ Productivity Tip</h3>
            <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.7 }}>{report.productivityTip}</p>
          </div>
        </div>

        {/* Growth plan */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>📅 Your 1-Week Growth Plan</h3>
          <ol style={{ ...listStyle, listStyle: "decimal", paddingLeft: 20 }}>
            {report.growthPlan.map((s) => <li key={s} style={listItem}>{s}</li>)}
          </ol>
        </div>

        {/* Chat */}
        <div style={{ ...cardStyle, marginBottom: "1rem" }}>
          <h3 style={cardTitle}>💬 Ask your AI anything</h3>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: "1rem" }}>
            It knows your profile. Try: &quot;What business should I start?&quot; or &quot;Why do I procrastinate?&quot;
          </p>

          <div style={{ maxHeight: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: "1rem" }}>
            {chatHistory.length === 0 && (
              <p style={{ fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}>No messages yet — ask your first question below.</p>
            )}
            {chatHistory.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%", padding: "10px 14px", borderRadius: 12,
                background: m.role === "user" ? "#2563eb" : "#f3f4f6",
                color: m.role === "user" ? "#fff" : "#111827",
                fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-wrap",
              }}>
                {m.content}
              </div>
            ))}
            {chatLoading && (
              <div style={{ alignSelf: "flex-start", fontSize: 13, color: "#9ca3af" }}>Thinking…</div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }}
              placeholder="Ask about your career, habits, relationships…"
              style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 14, outline: "none" }}
            />
            <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} style={{
              padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none",
              borderRadius: 8, fontWeight: 600, fontSize: 14,
              cursor: chatLoading || !chatInput.trim() ? "not-allowed" : "pointer",
              opacity: chatLoading || !chatInput.trim() ? 0.6 : 1,
            }}>
              Send
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button onClick={retake} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
            Retake assessment
          </button>
          {" · "}
          <Link href="/dashboard" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}>My Dashboard →</Link>
        </div>

        <style>{`@media (max-width: 640px) { .pos-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    );
  }

  return null;
}

const ctaBtn: React.CSSProperties = {
  padding: "14px 32px", background: "#2563eb", color: "#fff", border: "none",
  borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer",
  boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
};

const cardStyle: React.CSSProperties = {
  background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14,
  padding: "1.5rem", marginBottom: "1rem",
};

const cardTitle: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem",
  color: "#111827", marginBottom: "0.9rem",
};

const listStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 8, paddingLeft: 20, margin: 0 };
const listItem: React.CSSProperties = { fontSize: 13.5, color: "#374151", lineHeight: 1.6 };
