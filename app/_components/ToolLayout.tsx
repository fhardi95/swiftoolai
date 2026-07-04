"use client";
import { useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

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
  const { data: session, status } = useSession();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [usageCount, setUsageCount] = useState(() => {
    if (typeof window !== "undefined") return parseInt(localStorage.getItem("sta_usage") || "0");
    return 0;
  });
  const FREE_LIMIT = 50;
  const abortRef = useRef<AbortController | null>(null);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <div style={{ height: 36, width: 320, background: "#f3f4f6", borderRadius: 8, marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 20, width: 240, background: "#f3f4f6", borderRadius: 6, marginBottom: "2rem", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 300, background: "#f3f4f6", borderRadius: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
      </div>
    );
  }

  // ── Auth gate — not signed in ─────────────────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {/* Tool header — still visible */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            letterSpacing: "-0.03em", marginBottom: "0.6rem", color: "#111827",
          }}>{title}</h1>
          <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>{description}</p>
        </div>

        {/* Blurred preview */}
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: "1.5rem" }}>
          {/* Fake tool UI behind blur */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
            filter: "blur(4px)", pointerEvents: "none", userSelect: "none",
            opacity: 0.6,
          }} className="tool-grid">
            {["Your text", outputLabel].map(label => (
              <div key={label} style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 12, minHeight: 240,
              }}>
                <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f9fafb", borderRadius: "12px 12px 0 0" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>{label}</span>
                </div>
                <div style={{ padding: 14 }}>
                  {[100, 80, 90, 60].map((w, i) => (
                    <div key={i} style={{ height: 12, width: `${w}%`, background: "#f3f4f6", borderRadius: 4, marginBottom: 10 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Overlay sign-in card */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(249,250,251,0.85)",
            backdropFilter: "blur(2px)",
          }}>
            <div style={{
              background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 16, padding: "2rem 2.5rem",
              textAlign: "center", maxWidth: 380,
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
            }}>
              <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>🔐</div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "1.2rem", color: "#111827", marginBottom: "0.5rem",
              }}>
                Sign in to use {title}
              </h2>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Create a free account to access all 24 AI tools. Takes 10 seconds — just Google sign-in.
              </p>

              <button
                onClick={() => signIn("google", { callbackUrl: window.location.href })}
                style={{
                  width: "100%", padding: "12px 20px",
                  background: "#fff", border: "1.5px solid #e5e7eb",
                  borderRadius: 9, display: "flex",
                  alignItems: "center", justifyContent: "center", gap: 10,
                  fontSize: 14, fontWeight: 600, color: "#111827",
                  cursor: "pointer", marginBottom: 10,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#2563eb")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google — it&apos;s free
              </button>

              <Link href="/auth/signin" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none" }}>
                View all sign-in options →
              </Link>
            </div>
          </div>
        </div>

        {/* Perks below */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {[
            ["⚡", "24 free AI tools"],
            ["📊", "Personal dashboard"],
            ["🔒", "100% private"],
            ["🆓", "Always free"],
          ].map(([icon, label]) => (
            <div key={label} style={{
              background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: 8, padding: "10px 14px",
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, color: "#374151",
            }}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>

        <style>{`@media (max-width:600px){ .tool-grid{grid-template-columns:1fr !important} }`}</style>
      </div>
    );
  }

  // ── Authenticated tool UI ─────────────────────────────────────────────────
  async function handleRun() {
    if (!input.trim() || loading) return;
    if (usageCount >= FREE_LIMIT) {
      setError(`You've used all ${FREE_LIMIT} free runs this month. Pro plan coming soon!`);
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userInput: input }),
        signal: abortRef.current.signal,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setOutput(data.result || "");

      const newCount = usageCount + 1;
      setUsageCount(newCount);
      if (typeof window !== "undefined") {
        localStorage.setItem("sta_usage", String(newCount));
        // Track this tool as recently used
        const recent: string[] = JSON.parse(localStorage.getItem("sta_recent") || "[]");
        const path = window.location.pathname;
        const updated = [path, ...recent.filter(h => h !== path)].slice(0, 10);
        localStorage.setItem("sta_recent", JSON.stringify(updated));
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
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
  const user = session?.user;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.25rem" }}>

      {/* Header row with user badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            letterSpacing: "-0.03em", marginBottom: "0.6rem", color: "#111827",
          }}>{title}</h1>
          <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>{description}</p>
        </div>

        {/* Signed-in badge */}
        <Link href="/dashboard" style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 100, padding: "5px 12px 5px 5px",
          textDecoration: "none",
        }}>
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" width={24} height={24} style={{ borderRadius: "50%" }} />
          ) : (
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>Dashboard</span>
        </Link>
      </div>

      {extraControls && <div style={{ marginBottom: "1.25rem" }}>{extraControls}</div>}

      {/* Editor */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "1rem", marginBottom: "1rem",
      }} className="tool-grid">
        {/* Input */}
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "var(--radius)", display: "flex", flexDirection: "column", minHeight: 280 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f9fafb", borderRadius: "var(--radius) var(--radius) 0 0" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>Your text</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>{input.length} / {maxChars}</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value.slice(0, maxChars))}
            placeholder={inputPlaceholder}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", resize: "none", padding: "14px", fontSize: 15, color: "#111827", lineHeight: 1.65, minHeight: 220 }}
          />
        </div>

        {/* Output */}
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "var(--radius)", display: "flex", flexDirection: "column", minHeight: 280 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f9fafb", borderRadius: "var(--radius) var(--radius) 0 0" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9ca3af" }}>{outputLabel}</span>
            {output && (
              <button onClick={copyOutput} style={{ fontSize: 11, color: copied ? "#16a34a" : "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div style={{ flex: 1, padding: "14px", fontSize: 15, lineHeight: 1.65, color: output ? "#111827" : "#9ca3af", fontStyle: output ? "normal" : "italic", whiteSpace: "pre-wrap", overflowY: "auto", minHeight: 220 }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#9ca3af" }}>
                <div style={{ width: 16, height: 16, border: "2px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                Generating…
              </div>
            ) : output || "Your result will appear here…"}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: "1rem" }}>
          {error}
          {usageCount >= FREE_LIMIT && (
            <> — <Link href="/dashboard" style={{ color: "#dc2626", fontWeight: 600 }}>View dashboard</Link></>
          )}
        </div>
      )}

      <button onClick={handleRun} disabled={!input.trim() || loading} style={{
        width: "100%", padding: "14px",
        background: "#2563eb", color: "#fff",
        border: "none", borderRadius: "var(--radius-sm)",
        fontSize: 15, fontWeight: 600,
        cursor: input.trim() && !loading ? "pointer" : "not-allowed",
        opacity: input.trim() && !loading ? 1 : 0.5,
        marginBottom: "1rem", transition: "opacity 0.15s",
        boxShadow: "0 2px 8px rgba(37,99,235,0.2)",
      }}>
        {loading ? "Generating…" : "Generate ⌘↵"}
      </button>

      {/* Usage bar */}
      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "var(--radius-sm)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
            Free uses: <strong style={{ color: "#111827" }}>{usageCount}</strong> / {FREE_LIMIT}
          </div>
          <div style={{ height: 4, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 100, background: usagePct >= 80 ? "#ef4444" : "#2563eb", width: `${usagePct}%`, transition: "width 0.4s" }} />
          </div>
        </div>
        <Link href="/dashboard" style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          My Dashboard →
        </Link>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) { .tool-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
