import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SwiftoolAI — Free AI Tools for Everyone",
  description:
    "SwiftoolAI is a free collection of 25+ AI-powered tools built for writers, creators, job seekers, and developers. Learn about our mission and the tools we offer.",
  alternates: { canonical: "https://www.swiftoolai.com/about" },
  openGraph: {
    title: "About SwiftoolAI — Free AI Tools for Everyone",
    description: "SwiftoolAI is a free collection of 25+ AI-powered tools. Learn about our mission, our tools, and why we built the platform.",
    url: "https://www.swiftoolai.com/about",
    siteName: "SwiftoolAI",
    type: "website",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SwiftoolAI",
  url: "https://www.swiftoolai.com",
  description: "A free collection of 25+ AI-powered tools for writers, creators, job seekers, and developers.",
  foundingDate: "2024",
  sameAs: [],
};

const _s = {
  wrap: { maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" } as React.CSSProperties,
  hero: { textAlign: "center" as const, marginBottom: "3.5rem" },
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: "-0.04em", color: "#111827", marginBottom: "1rem", lineHeight: 1.15 } as React.CSSProperties,
  heroSub: { color: "#6b7280", fontSize: 17, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 2rem" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.85, marginBottom: "0.85rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
  a: { color: "#2563eb", textDecoration: "none" } as React.CSSProperties,
  back: { fontSize: 13, color: "#6b7280", display: "inline-block", marginBottom: "2rem", textDecoration: "none" } as React.CSSProperties,
};

const TOOL_CATEGORIES = [
  {
    icon: "✍️",
    label: "AI Writing",
    tools: ["AI Detector", "Grammar Checker", "Paraphrasing Tool", "Text Rewriter", "AI Summarizer", "Word Counter"],
  },
  {
    icon: "💼",
    label: "Career & Jobs",
    tools: ["Cover Letter Generator", "Resume Bullet Writer", "AI Email Writer", "Job Description Writer", "LinkedIn Post Generator", "Cold Email Generator"],
  },
  {
    icon: "🖼️",
    label: "Image Tools",
    tools: ["Background Remover", "Image Compressor", "AI Face Rater", "WebP to JPG", "SVG to PNG", "PNG to PDF"],
  },
  {
    icon: "🛠️",
    label: "Utilities",
    tools: ["QR Code Generator", "Password Generator", "Case Converter", "Word Unscrambler", "Colour Picker", "Aura Colour Generator"],
  },
];

const STATS = [
  { value: "25+", label: "Free AI Tools" },
  { value: "100%", label: "Free to Use" },
  { value: "0", label: "Watermarks" },
  { value: "∞", label: "Ideas Unlocked" },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <div style={_s.wrap}>
        <Link href="/" style={_s.back}>← Back to home</Link>

        {/* Hero */}
        <div style={_s.hero}>
          <div style={{ fontSize: 52, marginBottom: "1rem", lineHeight: 1 }}>⚡</div>
          <h1 style={_s.h1}>
            Free AI tools for<br />everyone who creates.
          </h1>
          <p style={_s.heroSub}>
            SwiftoolAI is a growing collection of powerful, free AI-powered tools built for writers, creators, job seekers, students, and developers. No bloat. No paywalls. Just tools that work.
          </p>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", maxWidth: 500, margin: "0 auto" }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#111827", letterSpacing: "-0.03em" }}>{value}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <section style={_s.section}>
          <div style={_s.tag}>Our Mission</div>
          <h2 style={_s.h2}>Why We Built SwiftoolAI</h2>
          <p style={_s.p}>
            AI tools should be accessible to everyone — not locked behind expensive subscriptions, cluttered with ads, or buried in watermarks. We built SwiftoolAI because we were frustrated with the existing landscape: powerful AI was either too expensive, too complicated, or both.
          </p>
          <p style={_s.p}>
            Our goal is simple: take the best AI capabilities and wrap them in fast, focused, easy-to-use tools that anyone can open in a browser and use immediately. Whether you&apos;re a student writing an essay, a freelancer building a portfolio, a small business owner managing product photos, or a developer prototyping ideas — SwiftoolAI has something for you.
          </p>
          <p style={{ ..._s.p, marginBottom: 0 }}>
            Every tool on the platform is free. Every output is watermark-free. Privacy is treated as a default, not a premium feature.
          </p>
        </section>

        {/* Tools */}
        <section style={_s.section}>
          <div style={_s.tag}>Our Tools</div>
          <h2 style={_s.h2}>25+ Free AI Tools Across 4 Categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {TOOL_CATEGORIES.map(({ icon, label, tools }) => (
              <div key={label} style={{ padding: "1.1rem", background: "#f9fafb", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#111827", marginBottom: 8 }}>{label}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {tools.map(t => (
                    <li key={t} style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.9 }}>→ {t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link href="/tools" style={{ display: "inline-block", padding: "11px 24px", background: "#2563eb", color: "#fff", borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Browse All Tools →
            </Link>
          </div>
        </section>

        {/* Values */}
        <section style={_s.section}>
          <div style={_s.tag}>Our Values</div>
          <h2 style={_s.h2}>What We Stand For</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🆓", title: "Free first", body: "All tools are free. We believe access to AI shouldn't depend on your budget." },
              { icon: "🔒", title: "Privacy by default", body: "We process only what we need to. Where possible (like the Background Remover), processing happens in your browser." },
              { icon: "⚡", title: "Fast & focused", body: "Each tool does one thing well. No dashboards to navigate, no credits to manage — just results." },
              { icon: "🚫", title: "No watermarks, ever", body: "Your output is yours. We never stamp our logo on your work." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ padding: "1.1rem", background: "#f9fafb", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 4 }}>{title}</div>
                <p style={{ ..._s.p, fontSize: 13, marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Built with */}
        <section style={_s.section}>
          <div style={_s.tag}>Tech Stack</div>
          <h2 style={_s.h2}>Built With</h2>
          <p style={_s.p}>
            SwiftoolAI is an indie-built product running on a modern, lean stack. The platform is built with <strong>Next.js 14</strong> (App Router), deployed on <strong>Vercel</strong>, powered by <strong>Supabase</strong> for data, and uses <strong>Anthropic&apos;s Claude API</strong> for AI features. Authentication is handled by <strong>NextAuth.js</strong> with Google OAuth.
          </p>
          <p style={{ ..._s.p, marginBottom: 0 }}>
            The Background Remover uses <strong>@imgly/background-removal</strong> — a WebAssembly-based AI model that runs entirely in the browser, meaning your images never leave your device.
          </p>
        </section>

        {/* Contact CTA */}
        <section style={{ ...(_s.section), background: "#eff6ff", border: "1px solid #bfdbfe", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
          <h2 style={{ ..._s.h2, textAlign: "center", marginBottom: "0.5rem" }}>Get in Touch</h2>
          <p style={{ ..._s.p, maxWidth: 480, margin: "0 auto 1.25rem" }}>
            Have a suggestion for a new tool, spotted a bug, or just want to say hi? We&apos;d love to hear from you.
          </p>
          <Link href="/contact" style={{ display: "inline-block", padding: "11px 28px", background: "#2563eb", color: "#fff", borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Contact Us →
          </Link>
        </section>
      </div>
    </>
  );
}
