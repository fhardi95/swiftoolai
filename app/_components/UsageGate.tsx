// app/_components/UsageGate.tsx
// Drop this into any tool page to show usage bar + upgrade prompt.
// Handles the 429 "limit reached" error from API routes automatically.

"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface UsageData {
  plan: "free" | "pro";
  used: number;
  limit: number;
  remaining: number;
  isPro: boolean;
}

interface UsageGateProps {
  /** Called when the AI result comes back with a 429 upgradeRequired error */
  onLimitReached?: () => void;
}

// ─── Hook: fetch usage on mount ───────────────────────────────────────────────
export function useUsage() {
  const { data: session } = useSession();
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) { setLoading(false); return; }
    fetch("/api/usage")
      .then(r => r.json())
      .then(d => { setUsage(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [session]);

  const refresh = () => {
    if (!session?.user) return;
    fetch("/api/usage").then(r => r.json()).then(setUsage);
  };

  return { usage, loading, refresh };
}

// ─── Usage bar component ──────────────────────────────────────────────────────
export function UsageBar() {
  const { usage, loading } = useUsage();

  if (loading || !usage || usage.isPro) return null;

  const pct = Math.min((usage.used / usage.limit) * 100, 100);
  const isHigh = pct >= 80;
  const isDone = pct >= 100;

  return (
    <div style={{
      background: isDone ? "#fef2f2" : isHigh ? "#fffbeb" : "#f0f9ff",
      border: `1px solid ${isDone ? "#fecaca" : isHigh ? "#fde68a" : "#bae6fd"}`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    }}>
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: isDone ? "#dc2626" : isHigh ? "#d97706" : "#0369a1" }}>
            {isDone ? "Daily limit reached" : `${usage.remaining} AI runs left today`}
          </span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{usage.used}/{usage.limit}</span>
        </div>
        <div style={{ height: 5, background: "rgba(0,0,0,0.08)", borderRadius: 100, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: isDone ? "#ef4444" : isHigh ? "#f59e0b" : "#2563eb",
            borderRadius: 100,
            transition: "width 0.4s",
          }} />
        </div>
      </div>
      <UpgradeButton small />
    </div>
  );
}

// ─── Upgrade modal / inline prompt ───────────────────────────────────────────
export function UpgradePrompt({ onDismiss }: { onDismiss?: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const { url, error } = await res.json();
    if (url) window.location.href = url;
    else { alert(error || "Something went wrong"); setLoading(false); }
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 16,
      padding: "2rem",
      textAlign: "center",
      maxWidth: 420,
      margin: "0 auto",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⚡</div>
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: "1.3rem",
        letterSpacing: "-0.03em", color: "#111827",
        marginBottom: "0.5rem",
      }}>
        Daily limit reached
      </h3>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: "1.5rem" }}>
        You've used all <strong>10 free AI runs</strong> today. Upgrade to Pro
        for <strong>unlimited access</strong> to all AI tools.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            background: "#2563eb", color: "#fff",
            border: "none", borderRadius: 10,
            padding: "13px 24px",
            fontWeight: 700, fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {loading ? "Redirecting…" : "✨ Upgrade to Pro — $9/month"}
        </button>

        <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
          Cancel anytime · Unlimited AI runs · All 24 tools
        </p>

        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              background: "none", border: "none",
              color: "#9ca3af", fontSize: 13,
              cursor: "pointer", marginTop: 4,
            }}
          >
            Maybe later
          </button>
        )}
      </div>

      {/* Pro features list */}
      <div style={{
        marginTop: "1.5rem",
        background: "#f9fafb",
        borderRadius: 10,
        padding: "1rem",
        textAlign: "left",
      }}>
        {[
          "Unlimited AI runs daily",
          "All 24 tools, including new ones",
          "Priority processing",
          "No ads",
        ].map(f => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 13, color: "#374151" }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Small upgrade button ─────────────────────────────────────────────────────
export function UpgradeButton({ small }: { small?: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const { url, error } = await res.json();
    if (url) window.location.href = url;
    else { alert(error || "Something went wrong"); setLoading(false); }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      style={{
        background: "#2563eb", color: "#fff",
        border: "none", borderRadius: 8,
        padding: small ? "6px 14px" : "10px 20px",
        fontWeight: 700,
        fontSize: small ? 12 : 14,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {loading ? "…" : "✨ Go Pro — $9/mo"}
    </button>
  );
}
