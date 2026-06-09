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
      setError("You've used all 15 free runs this month.");
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

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setOutput(data.result || "");

      const newCount = usageCount + 1;
      setUsageCount(newCount);
      if (typeof window !== "undefined") localStorage.setItem("sta_usage", String(newCount));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
          letterSpacing: "-0.03em", marginBottom: "0.6rem", color: "#111827",
        }}>{title}</h1>
        <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>{description}</p>
      </div>

      {extraControls && <div style={{ marginBottom: "1.25rem" }}>{extraControls}</div>}

      {/* Editor */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem", marginBottom: "1rem",
      }} className="tool-grid">
        {/* Input */}
        <div style={{
          background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "var(--radius)", display: "flex", flexDirection: "column",
          minHeight: 280,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#f9fafb", borderRadius: "var(--radius) var(--radius) 0 0",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>Your text</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>{input.length} / {maxChars}</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value.slice(0, maxChars))}
            placeholder={inputPlaceholder}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              resize: "none", padding: "14px", fontSize: 15, color: "#111827",
              lineHeight: 1.65, minHeight: 220,
            }}
          />
        </div>

        {/* Output */}
        <div style={{
          background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "var(--radius)", display: "flex", flexDirection: "column",
          minHeight: 280,
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#f9fafb", borderRadius: "var(--radius) var(--radius) 0 0",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>{outputLabel}</span>
            {output && (
              <button onClick={copyOutput} style={{
                fontSize: 11, color: copied ? "#16a34a" : "#2563eb",
                background: "none", border: "none", cursor: "pointer", fontWeight: 600,
              }}>{copied ? "✓ Copied!" : "Copy"}</button>
            )}
          </div>
          <div style={{
            flex: 1, padding: "14px", fontSize: 15, lineHeight: 1.65,
            color: output ? "#111827" : "#9ca3af",
            fontStyle: output ? "normal" : "italic",
            whiteSpace: "pre-wrap", overflowY: "auto", minHeight: 220,
          }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#9ca3af" }}>
                <div style={{
                  width: 16, height: 16,
                  border: "2px solid #bfdbfe", borderTopColor: "#2563eb",
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
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "var(--radius-sm)", padding: "10px 14px",
          fontSize: 13, color: "#dc2626", marginBottom: "1rem",
        }}>{error}</div>
      )}

      <button onClick={handleRun} disabled={!input.trim() || loading} style={{
        width: "100%", padding: "14px",
        background: "#2563eb", color: "#fff",
        border: "none", borderRadius: "var(--radius-sm)",
        fontSize: 15, fontWeight: 600,
        cursor: input.trim() && !loading ? "pointer" : "not-allowed",
        opacity: input.trim() && !loading ? 1 : 0.5,
        marginBottom: "1rem",
        transition: "opacity 0.15s",
        boxShadow: "0 2px 8px rgba(37,99,235,0.2)",
      }}>
        {loading ? "Generating…" : "Generate ⌘↵"}
      </button>

      {/* Usage bar */}
      <div style={{
        background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "var(--radius-sm)", padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
            Free uses: <strong style={{ color: "#111827" }}>{usageCount}</strong> / {FREE_LIMIT}
          </div>
          <div style={{ height: 4, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 100,
              background: usagePct >= 100 ? "#ef4444" : "#2563eb",
              width: `${usagePct}%`, transition: "width 0.4s",
            }} />
          </div>
        </div>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>No account needed</span>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) { .tool-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
