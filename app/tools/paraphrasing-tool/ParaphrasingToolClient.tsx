"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Paraphrasing Tool — SwiftToolAI",
  url: "https://swiftoolai.com/tools/paraphrasing-tool",
  description: "Free AI paraphrasing tool. Rephrase any text instantly in multiple styles.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a paraphrasing tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A paraphrasing tool (also called a paraphraser or rephrase tool) uses AI to reword text while preserving the original meaning. It's used by students, writers, and professionals to avoid repetition, simplify complex text, or adapt content for different audiences.",
      },
    },
    {
      "@type": "Question",
      name: "Is this paraphrasing tool free with no sign-up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SwiftToolAI's paraphrasing tool is completely free and requires no account or email address. Just paste your text, choose a style, and click Paraphrase.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between paraphrasing and summarising?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paraphrasing rewrites text in different words while keeping the same length and meaning. Summarising condenses the text into a shorter version covering only the key points. Use our AI summarizer for summaries and this tool for full rewrites.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a paraphrasing tool for essays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, paraphrasing tools are widely used to help rephrase research sources in your own words for essays and academic work. Always review the output and ensure it accurately reflects the original source before submitting.",
      },
    },
    {
      "@type": "Question",
      name: "How is SwiftToolAI's paraphraser different from Quillbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SwiftToolAI's paraphrasing tool is powered by Claude AI, requires no sign-up, and has no daily word limits — unlike Quillbot which restricts free users to 125 words per paraphrase and requires an account for full access.",
      },
    },
  ],
};

type Mode = "standard" | "fluent" | "creative" | "formal" | "simple";

const MODES: { value: Mode; label: string; desc: string }[] = [
  { value: "standard", label: "Standard", desc: "Natural rewrite" },
  { value: "fluent", label: "Fluent", desc: "Smooth & readable" },
  { value: "creative", label: "Creative", desc: "Fresh expression" },
  { value: "formal", label: "Formal", desc: "Professional tone" },
  { value: "simple", label: "Simple", desc: "Easy to read" },
];

function buildPrompt(text: string, mode: Mode): string {
  const instructions: Record<Mode, string> = {
    standard: "Rewrite the following text in different words while preserving the exact meaning. Keep the same length and structure.",
    fluent: "Rewrite the following text to flow naturally and smoothly. Improve readability while keeping all original meaning intact.",
    creative: "Rewrite the following text with fresh, creative expression. Use varied vocabulary and sentence structures while keeping the core meaning.",
    formal: "Rewrite the following text in a formal, professional tone suitable for business or academic writing. Keep all original meaning.",
    simple: "Rewrite the following text using simple, clear language that anyone can understand. Avoid jargon and complex sentences.",
  };
  return `${instructions[mode]} Output ONLY the rewritten text — no preamble, no explanation, no quotes around it.\n\nTEXT:\n${text}`;
}

export default function ParaphrasingToolClient() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("standard");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const wordCount = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;

  async function handleParaphrase() {
    if (wordCount < 5) { setError("Please enter at least 5 words."); return; }
    setError(""); setLoading(true); setOutput("");
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: 'paraphrasing-tool',
          systemPrompt: 'You are an expert writing assistant. Paraphrase text as instructed.',
          userInput: buildPrompt(input, mode),
        }),
      });
      if (res.status === 429) { const d = await res.json(); setError(d.error || 'Daily limit reached. Upgrade to Pro.'); setLoading(false); return; }
      if (res.status === 401) { setError('Please sign in to use this tool.'); setLoading(false); return; }
      const data = await res.json();
      const text = data.result ?? '';
      if (!text) throw new Error('Empty');
      setOutput(text.trim());
    } catch { setError("Something went wrong. Please try again."); }
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        <nav style={{ marginBottom: "1.5rem", fontSize: 13, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>{" › "}
          <Link href="/tools" style={{ color: "var(--muted)" }}>Tools</Link>{" › "}
          <span style={{ color: "var(--text)" }}>Paraphrasing Tool</span>
        </nav>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.6rem" }}>
          Free Paraphrasing Tool Online
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem", lineHeight: 1.65 }}>
          Rephrase any text instantly with AI — <strong style={{ color: "var(--text)" }}>5 writing styles</strong>, no word limit, no sign-up. The free Quillbot alternative.
        </p>

        {/* Mode selector */}
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Style</p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {MODES.map(m => (
              <button key={m.value} onClick={() => setMode(m.value)} style={{
                padding: "0.45rem 1rem", borderRadius: 8,
                border: mode === m.value ? "1px solid rgba(108,99,255,0.4)" : "1px solid var(--border)",
                background: mode === m.value ? "rgba(108,99,255,0.12)" : "var(--surface)",
                color: mode === m.value ? "var(--accent)" : "var(--muted)",
                fontSize: 13, fontWeight: mode === m.value ? 600 : 400, cursor: "pointer",
              }}>
                {m.label} <span style={{ fontSize: 11, opacity: 0.6 }}>— {m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two-column editor */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="paraphrase-grid">
          {/* Input */}
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>Original Text</div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste or type your text here…"
              style={{
                width: "100%", minHeight: 280, background: "var(--surface)",
                border: "1px solid var(--border-active)", borderRadius: 12,
                padding: "1rem 1.25rem", color: "var(--text)", fontSize: 14,
                lineHeight: 1.7, resize: "vertical", outline: "none",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
            <div style={{ position: "absolute", bottom: 10, right: 12, fontSize: 11, color: "var(--muted)", pointerEvents: "none" }}>
              {wordCount} words
            </div>
          </div>

          {/* Output */}
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem", display: "flex", justifyContent: "space-between" }}>
              <span>Paraphrased Text</span>
              {output && (
                <button onClick={handleCopy} style={{ fontSize: 11, color: copied ? "#4ade80" : "var(--accent)", background: "none", border: "none", cursor: "pointer" }}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div style={{
              minHeight: 280, background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "1rem 1.25rem", fontSize: 14, lineHeight: 1.7,
              color: loading ? "var(--muted)" : output ? "var(--text)" : "var(--muted)",
              whiteSpace: "pre-wrap",
            }}>
              {loading ? "Paraphrasing…" : output || "Your paraphrased text will appear here…"}
            </div>
          </div>
        </div>

        {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: "0.5rem" }}>⚠️ {error}</p>}

        <button
          onClick={handleParaphrase}
          disabled={loading || wordCount < 5}
          style={{
            marginTop: "1rem", padding: "0.75rem 2.5rem", borderRadius: 10,
            border: "none", background: "var(--accent)", color: "#fff",
            fontSize: "0.95rem", fontWeight: 600, fontFamily: "'Syne', sans-serif",
            cursor: loading || wordCount < 5 ? "not-allowed" : "pointer",
            opacity: loading || wordCount < 5 ? 0.65 : 1,
          }}
        >
          {loading ? "Paraphrasing…" : "✦ Paraphrase Text"}
        </button>

        {/* CTA */}
        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>More free AI writing tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "0.75rem" }}>
            {[
              { href: "/tools/rewriter", label: "Text Rewriter" },
              { href: "/tools/grammar-checker", label: "Grammar Checker" },
              { href: "/tools/ai-summarizer", label: "AI Summarizer" },
              { href: "/tools/word-counter", label: "Word Counter" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* SEO content */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            What Is a Paraphrasing Tool?
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            A <strong style={{ color: "var(--text)" }}>paraphrasing tool</strong> uses AI to rewrite text in different words while keeping the original meaning. Students use it to rephrase research sources, writers use it to avoid repetition, and professionals use it to adapt content for different audiences.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Free Paraphraser — No Word Limit, No Sign-Up
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Unlike Quillbot, which limits free users to 125 words per paraphrase, SwiftToolAI's <strong style={{ color: "var(--text)" }}>free paraphrasing tool</strong> has no word cap and requires no account. Choose from 5 styles — Standard, Fluent, Creative, Formal, or Simple — to match your needs.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15 }}>
            After paraphrasing, run your text through our <Link href="/tools/grammar-checker" style={{ color: "var(--accent)" }}>grammar checker</Link> to catch any errors, or use the <Link href="/tools/rewriter" style={{ color: "var(--accent)" }}>AI text rewriter</Link> for a more complete transformation.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2.5rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          {faqLD.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: "1rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "var(--accent)", marginBottom: "0.4rem" }}>{item.name}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </div>

      <style>{`
        @media (max-width: 640px) { .paraphrase-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
