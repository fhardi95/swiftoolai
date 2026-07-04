"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

const MONTHLY_PRICE = 9;
const YEARLY_PRICE = 69; // ≈ $5.75/mo — framed as "save 36%" vs monthly x12
const YEARLY_SAVINGS_PCT = Math.round(100 - (YEARLY_PRICE / (MONTHLY_PRICE * 12)) * 100);

const FREE_FEATURES = [
  "10 AI tool runs per day",
  "All 24+ utility tools (unlimited)",
  "No credit card required",
];

const PRO_FEATURES = [
  "Unlimited AI tool runs",
  "Priority access to new tools",
  "No daily limits, ever",
  "Faster response times",
  "Support future tool development",
];

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your dashboard whenever you like — you'll keep Pro access until the end of your current billing period.",
  },
  {
    q: "What happens when I hit the free limit?",
    a: "Utility tools (word counter, password generator, QR codes, etc.) stay unlimited and free forever. AI-powered tools reset to 10 free runs every day, or go unlimited on Pro.",
  },
  {
    q: "Do you offer refunds?",
    a: "If something isn't working as expected, contact us within 7 days of your purchase and we'll sort it out.",
  },
];

export default function PricingPage() {
  const { data: session, status } = useSession();
  const [yearly, setYearly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = useCallback(async (interval: "month" | "year") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // If the user just signed in via the "Get Pro" button, resume checkout automatically.
  useEffect(() => {
    if (status !== "authenticated") return;
    const params = new URLSearchParams(window.location.search);
    const resume = params.get("checkout");
    if (resume === "month" || resume === "year") {
      window.history.replaceState({}, "", "/pricing");
      startCheckout(resume);
    }
  }, [status, startCheckout]);

  const handleUpgradeClick = () => {
    const interval = yearly ? "year" : "month";
    if (!session) {
      signIn("google", { callbackUrl: `/pricing?checkout=${interval}` });
      return;
    }
    startCheckout(interval);
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "4.5rem 1.25rem 2.5rem",
          textAlign: "center",
          background: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 260,
            background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          Simple pricing.<br />
          <span style={{ color: "#2563eb" }}>Cancel anytime.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 480, margin: "0 auto 2rem" }}>
          Start free, no card needed. Upgrade when you outgrow the daily limit.
        </p>

        {/* Toggle */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "#f3f4f6",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 100,
            padding: 4,
          }}
        >
          <button
            onClick={() => setYearly(false)}
            style={{
              padding: "8px 20px",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              background: !yearly ? "#111827" : "transparent",
              color: !yearly ? "#fff" : "#6b7280",
              transition: "all 0.15s",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            style={{
              padding: "8px 20px",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              background: yearly ? "#111827" : "transparent",
              color: yearly ? "#fff" : "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
            }}
          >
            Yearly
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: yearly ? "#16a34a" : "#dcfce7",
                color: yearly ? "#fff" : "#16a34a",
                borderRadius: 100,
                padding: "2px 8px",
              }}
            >
              Save {YEARLY_SAVINGS_PCT}%
            </span>
          </button>
        </div>
      </section>

      {/* ── Plans ── */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.25rem 1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}
          className="pricing-grid"
        >
          {/* Free card */}
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 16,
              padding: "2rem 1.75rem",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Free
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 40, color: "#111827" }}>$0</span>
              <span style={{ fontSize: 14, color: "#9ca3af" }}>/forever</span>
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: "1.5rem" }}>Perfect for trying things out</p>

            <Link
              href={session ? "/dashboard" : "#"}
              onClick={(e) => { if (!session) { e.preventDefault(); signIn("google", { callbackUrl: "/dashboard" }); } }}
              style={{
                display: "block",
                textAlign: "center",
                padding: "11px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
                color: "#111827",
                fontWeight: 600,
                fontSize: 14,
                marginBottom: "1.5rem",
                textDecoration: "none",
              }}
            >
              {session ? "Go to dashboard" : "Sign in free"}
            </Link>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {FREE_FEATURES.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#374151" }}>
                  <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro card */}
          <div
            style={{
              background: "#111827",
              border: "1px solid #111827",
              borderRadius: 16,
              padding: "2rem 1.75rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "#2563eb",
                color: "#fff",
                borderRadius: 100,
                padding: "3px 10px",
              }}
            >
              Most popular
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Pro
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 40, color: "#fff" }}>
                ${yearly ? (YEARLY_PRICE / 12).toFixed(2).replace(/\.00$/, "") : MONTHLY_PRICE}
              </span>
              <span style={{ fontSize: 14, color: "#9ca3af" }}>/mo</span>
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: "1.5rem" }}>
              {yearly ? `Billed $${YEARLY_PRICE}/year` : "Billed monthly, cancel anytime"}
            </p>

            <button
              onClick={handleUpgradeClick}
              disabled={loading}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "11px",
                borderRadius: 10,
                border: "none",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: "1.5rem",
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Redirecting…" : "Get Pro →"}
            </button>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {PRO_FEATURES.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#e5e7eb" }}>
                  <span style={{ color: "#60a5fa", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {error && (
          <p style={{ textAlign: "center", color: "#ef4444", fontSize: 13, marginTop: "1rem" }}>{error}</p>
        )}
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 24,
            textAlign: "center",
            marginBottom: "1.75rem",
            color: "#111827",
          }}
        >
          Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((item, i) => (
            <div key={item.q} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {item.q}
                <span style={{ fontSize: 12, color: "#9ca3af" }}>{openFaq === i ? "▴" : "▾"}</span>
              </button>
              {openFaq === i && (
                <p style={{ padding: "0 18px 16px", fontSize: 13.5, color: "#6b7280", lineHeight: 1.6 }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 680px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
