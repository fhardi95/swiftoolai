import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Models | SwiftToolAI",
  description: "Chat with the world's best AI models for free. Access Claude Sonnet and more — all in one place.",
};

const MODELS = [
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    description: "Anthropic's smartest everyday model. Excellent at writing, coding, analysis, and complex reasoning.",
    tags: ["Writing", "Coding", "Analysis"],
    speed: "Fast",
    badge: "Popular",
    color: "#e8604c",
  },
];

export default function ModelsPage() {
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "3rem 1.25rem 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "4px 12px", marginBottom: "1rem" }}>
            AI Models
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", letterSpacing: "-0.03em", color: "#111827", marginBottom: "0.75rem" }}>
            Chat with the best AI models
          </h1>
          <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 540, lineHeight: 1.7 }}>
            Access powerful AI models in one place. No switching between apps — just pick a model and start chatting.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>
        {/* Model grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {MODELS.map(model => (
            <div key={model.id} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", position: "relative", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}>
              {model.badge && (
                <span style={{ position: "absolute", top: 16, right: 16, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 4, padding: "2px 7px" }}>
                  {model.badge}
                </span>
              )}

              {/* Logo */}
              <div style={{ width: 48, height: 48, borderRadius: 12, background: model.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", fontSize: 22 }}>
                🤖
              </div>

              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
                {model.provider}
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111827", marginBottom: "0.6rem", letterSpacing: "-0.02em" }}>
                {model.name}
              </h2>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {model.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.5rem" }}>
                {model.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, fontWeight: 600, background: "#f3f4f6", color: "#6b7280", borderRadius: 6, padding: "3px 8px" }}>{tag}</span>
                ))}
                <span style={{ fontSize: 11, fontWeight: 600, background: "#f0fdf4", color: "#16a34a", borderRadius: 6, padding: "3px 8px" }}>⚡ {model.speed}</span>
              </div>

              <Link href={`/models/${model.id}`} style={{ display: "block", width: "100%", padding: "11px", background: "#2563eb", color: "#fff", borderRadius: 9, textAlign: "center", fontWeight: 600, fontSize: 14, textDecoration: "none", boxSizing: "border-box" }}>
                Start chatting →
              </Link>
            </div>
          ))}

          {/* Coming soon cards */}
          {["Claude Haiku 4.5", "Claude Opus 4.8"].map(name => (
            <div key={name} style={{ background: "#fff", border: "1px dashed rgba(0,0,0,0.12)", borderRadius: 16, padding: "1.75rem", opacity: 0.6 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f3f4f6", marginBottom: "1.25rem" }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Anthropic</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#9ca3af", marginBottom: "0.6rem" }}>{name}</h2>
              <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.65, marginBottom: "1.5rem" }}>Coming soon to SwiftToolAI.</p>
              <div style={{ padding: "11px", background: "#f3f4f6", color: "#9ca3af", borderRadius: 9, textAlign: "center", fontWeight: 600, fontSize: 14 }}>Coming soon</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
