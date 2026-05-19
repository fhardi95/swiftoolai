"use client";
import { useState, useRef } from "react";

interface ToolLayoutProps {
  title: string;
  description: string;
  inputPlaceholder: string;
  systemPrompt: string;
  outputLabel?: string;
  extraControls?: React.ReactNode;
  maxChars?: number;
}

export default function ToolLayout({
  title, description, inputPlaceholder,
  systemPrompt, outputLabel = "Result",
  extraControls, maxChars = 1000,
}: ToolLayoutProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [usageCount, setUsageCount] = useState(() => {
    if (typeof window !== "undefined") return parseInt(localStorage.getItem("sta_usage") || "0");
    return 0;
  });
  const FREE_LIMIT = 15;
  const abortRef = useRef<AbortController | null>(null);

  async function handleRun() {
    if (!input.trim() || loading) return;
    if (usageCount >= FREE_LIMIT) {
      setError("You've used all 15 free runs this month. Upgrade to Pro for unlimited access.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userInput: input }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setOutput(data.result || "");

      const newCount = usageCount + 1;
      setUsageCount(newCount);
      if (typeof window !== "undefined") localStorage.setItem("sta_usage", String(newCount));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const usagePct = Math.min((usageCount / FREE_LIMIT) * 100, 100);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.25rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          letterSpacing: "-0.03em", marginBottom: "0.6rem",
        }}>{title}</h1>
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.6 }}>{description}</p>
      </div>

      {extraControls && <div style={{ marginBottom: "1.25rem" }}>{extraControls}</div>}

      {/* Editor */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem", marginBottom: "1rem",
      }} className="tool-grid">
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", display: "flex", flexDirection: "column",
          minHeight: 280,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 14px", borderBottom: "1px solid var(--border)",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>Your text</span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{input.length} / {maxChars}</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value.slice(0, maxChars))}
            placeholder={inputPlaceholder}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              resize: "none", padding: "14px", fontSize: 15, color: "var(--text)",
              lineHeight: 1.65, minHeight: 220,
            }}
          />
        </div>

        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", display: "flex", flexDirection: "column",
          minHeight: 280,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 14px", borderBottom: "1px solid var(--border)",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>{outputLabel}</span>
            {output && (
              <button onClick={copyOutput} style={{
                fontSize: 11, color: copied ? "var(--success)" : "var(--muted)",
                background: "none", border: "none", cursor: "pointer",
              }}>{copied ? "✓ Copied!" : "Copy"}</button>
            )}
          </div>
          <div style={{
            flex: 1, padding: "14px", fontSize: 15, lineHeight: 1.65,
            color: output ? "var(--text)" : "var(--muted)",
            fontStyle: output ? "normal" : "italic",
            whiteSpace: "pre-wrap", overflowY: "auto", minHeight: 220,
          }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
                <div style={{
                  width: 16, height: 16,
                  border: "2px solid var(--border-active)", borderTopColor: "var(--accent)",
                  borderRadius: "50%", animation: "spin 0.7s linear infinite",
                }} />
                Generating…
              </div>
            ) : output || "Your result will appear here…"}
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.3)",
          borderRadius: "var(--radius-sm)", padding: "10px 14px",
          fontSize: 13, color: "#f87171", marginBottom: "1rem",
        }}>{error}</div>
      )}

      <button onClick={handleRun} disabled={!input.trim() || loading} style={{
        width: "100%", padding: "14px",
        background: "var(--accent)", color: "#fff",
        border: "none", borderRadius: "var(--radius-sm)",
        fontSize: 15, fontWeight: 500,
        cursor: input.trim() && !loading ? "pointer" : "not-allowed",
        opacity: input.trim() && !loading ? 1 : 0.5,
        marginBottom: "1rem",
        transition: "opacity 0.15s",
      }}>
        {loading ? "Generating…" : "Generate ⌘↵"}
      </button>

      {/* Usage bar */}
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)", padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
            Free uses: <strong style={{ color: "var(--text)" }}>{usageCount}</strong> / {FREE_LIMIT}
          </div>
          <div style={{ height: 3, background: "var(--surface2)", borderRadius: 100, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 100,
              background: usagePct >= 100 ? "#f87171" : "var(--accent)",
              width: `${usagePct}%`, transition: "width 0.4s",
            }} />
          </div>
        </div>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>No account needed</span>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) { .tool-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
