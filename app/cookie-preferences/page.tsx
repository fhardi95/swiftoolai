"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "sta_cookie_prefs";

type Prefs = { analytics: boolean; functional: boolean };

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return { analytics: false, functional: true };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { analytics: false, functional: true };
}

const _s = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "3rem 1.25rem 5rem" } as React.CSSProperties,
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#111827" } as React.CSSProperties,
  sub: { color: "#6b7280", fontSize: 15, lineHeight: 1.6, marginBottom: "2.5rem" } as React.CSSProperties,
  card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.5rem", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" } as React.CSSProperties,
  row: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 } as React.CSSProperties,
  label: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#111827", marginBottom: 4 } as React.CSSProperties,
  desc: { color: "#6b7280", fontSize: 13, lineHeight: 1.7 } as React.CSSProperties,
  back: { fontSize: 13, color: "#6b7280", display: "inline-block", marginBottom: "2rem", textDecoration: "none" } as React.CSSProperties,
};

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button
      onClick={() => !disabled && onChange && onChange(!checked)}
      aria-pressed={checked}
      style={{
        flexShrink: 0,
        width: 48,
        height: 26,
        borderRadius: 100,
        border: "none",
        background: disabled ? "#d1d5db" : checked ? "#2563eb" : "#d1d5db",
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        transition: "background 0.2s",
      }}
    >
      <span style={{
        position: "absolute",
        top: 3,
        left: checked ? 25 : 3,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "left 0.2s",
      }} />
    </button>
  );
}

export default function CookiePreferencesPage() {
  const [prefs, setPrefs] = useState<Prefs>({ analytics: false, functional: true });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setPrefs(loadPrefs()); }, []);

  function save(newPrefs: Prefs) {
    setPrefs(newPrefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function clearLocalData() {
    localStorage.removeItem("sta_usage");
    localStorage.removeItem("sta_recent");
    localStorage.removeItem("sta_cookie_prefs");
    setPrefs({ analytics: false, functional: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const CATEGORIES = [
    {
      key: "necessary",
      label: "Strictly Necessary",
      desc: "These cookies are essential for authentication and core platform functionality. They cannot be disabled — without them you cannot sign in or use any tools.",
      checked: true,
      disabled: true,
    },
    {
      key: "functional",
      label: "Functional (Local Storage)",
      desc: "We use browser local storage to remember your usage count and recently used tools. This data stays on your device and is never sent to our servers.",
      checked: prefs.functional,
      disabled: false,
      onChange: (v: boolean) => save({ ...prefs, functional: v }),
    },
    {
      key: "analytics",
      label: "Analytics (Optional)",
      desc: "Allows us to use Google Analytics to collect anonymised data about how visitors use the platform — page views, traffic sources, and session duration. No personally identifiable information is collected.",
      checked: prefs.analytics,
      disabled: false,
      onChange: (v: boolean) => save({ ...prefs, analytics: v }),
    },
  ];

  return (
    <div style={_s.wrap}>
      <Link href="/" style={_s.back}>← Back to home</Link>
      <h1 style={_s.h1}>Cookie Preferences</h1>
      <p style={_s.sub}>
        Control how SwiftoolAI uses cookies and browser storage on your device. Strictly necessary cookies are always active. Changes take effect immediately and are saved to your browser.
      </p>

      {saved && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#15803d", marginBottom: "1.25rem", fontWeight: 600 }}>
          ✓ Preferences saved successfully.
        </div>
      )}

      {CATEGORIES.map(cat => (
        <div key={cat.key} style={_s.card}>
          <div style={_s.row}>
            <div style={{ flex: 1 }}>
              <div style={_s.label}>{cat.label}</div>
              <p style={{ ..._s.desc, marginBottom: 0 }}>{cat.desc}</p>
            </div>
            <div style={{ paddingTop: 4 }}>
              <Toggle checked={cat.checked} disabled={cat.disabled} onChange={cat.onChange} />
            </div>
          </div>
          {cat.disabled && (
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8, marginBottom: 0 }}>Always active — cannot be disabled</p>
          )}
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
        <button onClick={() => save({ analytics: true, functional: true })} style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Accept All
        </button>
        <button onClick={() => save({ analytics: false, functional: true })} style={{ padding: "10px 20px", background: "#fff", color: "#374151", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Accept Necessary Only
        </button>
        <button onClick={clearLocalData} style={{ padding: "10px 20px", background: "#fff", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Clear My Local Data
        </button>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
        <Link href="/cookie-policy" style={{ fontSize: 13, color: "#2563eb" }}>Cookie Policy →</Link>
        <Link href="/privacy" style={{ fontSize: 13, color: "#2563eb" }}>Privacy Policy →</Link>
      </div>
    </div>
  );
}
