"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free AI Summarizer — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/ai-summarizer",
  description:
    "Free AI text summarizer. Summarize articles, essays, and documents into concise bullet points or paragraphs.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  featureList: [
    "AI-powered text summarization",
    "Bullet point or paragraph output",
    "Short, medium or detailed summary length",
    "No sign-up required",
    "Unlimited use",
  ],
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I summarize text with AI for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your text into SwiftToolAI's free AI summarizer above, choose your preferred length and format, then click 'Summarise'. The AI will condense your text into key points in seconds — no account or payment needed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best free AI text summarizer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SwiftToolAI's AI summarizer is one of the best free options in 2026 — it requires no sign-up, has no daily limits, and lets you choose between bullet point and paragraph formats with adjustable summary length.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use an AI summarizer for essays and research papers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI summarizers are ideal for condensing long research papers, essays, and academic articles into digestible key points. Always read the original source before citing it in your own work.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a summary be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A summary is typically 10–25% of the original text's length. For a 1,000-word article, aim for a 100–250 word summary. SwiftToolAI lets you choose short (3–5 sentences), medium, or detailed summaries.",
      },
    },
    {
      "@type": "Question",
      name: "Is this AI summarizer free with no sign-up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SwiftToolAI's text summarizer is completely free and requires no account, email address, or payment. Just paste your text and click Summarise.",
      },
    },
  ],
};

type Format = "bullets" | "paragraph";
type Length = "short" | "medium" | "detailed";

function buildPrompt(text: string, format: Format, length: Length): string {
  const lengthGuide = {
    short: "3 to 5 sentences or bullet points",
    medium: "6 to 10 sentences or bullet points",
    detailed: "10 to 15 sentences or bullet points covering all main points",
  }[length];

  const formatGuide =
    format === "bullets"
      ? `Return a bullet-point list (each bullet starting with "• ") with ${lengthGuide}.`
      : `Return a coherent paragraph summary of ${lengthGuide}.`;

  return `Summarise the following text concisely and accurately. ${formatGuide} Preserve the key facts, arguments, and conclusions. Do not add information not present in the original text. Output ONLY the summary — no preamble, no "Here is the summary:", just the summary itself.

TEXT TO SUMMARISE:
${text}`;
}

export default function AISummarizerClient() {
  const [inputText, setInputText] = useState("");
  const [format, setFormat] = useState<Format>("bullets");
  const [length, setLength] = useState<Length>("medium");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const wordCount = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;

  async function handleSummarise() {
    if (!inputText.trim() || inputText.trim().split(/\s+/).length < 30) {
      setError("Please enter at least 30 words to summarise.");
      return;
    }
    setError("");
    setLoading(true);
    setSummary("");

    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: 'ai-summarizer',
          systemPrompt: 'You are an expert at summarizing text clearly and concisely.',
          userInput: buildPrompt(inputText, format, length),
        }),
      });
      if (res.status === 429) { const d = await res.json(); setError(d.error || 'Daily limit reached. Upgrade to Pro.'); setLoading(false); return; }
      if (res.status === 401) { setError('Please sign in to use this tool.'); setLoading(false); return; }
      const data = await res.json();
      const text = data.result ?? '';
      if (!text) throw new Error('Empty response');
      setSummary(text.trim());
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  function handleCopy() {
    if (!summary) return;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const TabBtn = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      style={{
        padding: "0.45rem 1rem",
        borderRadius: 8,
        border: active ? "1px solid rgba(108,99,255,0.4)" : "1px solid var(--border)",
        background: active ? "rgba(108,99,255,0.12)" : "var(--surface)",
        color: active ? "var(--accent)" : "var(--muted)",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "1.5rem", fontSize: 13, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>
          {" › "}
          <Link href="/tools" style={{ color: "var(--muted)" }}>Tools</Link>
          {" › "}
          <span style={{ color: "var(--text)" }}>AI Summarizer</span>
        </nav>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "0.6rem",
          }}
        >
          Free AI Text Summarizer
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem", lineHeight: 1.65 }}>
          Paste any article, essay, or document and get a{" "}
          <strong style={{ color: "var(--text)" }}>clear, accurate summary in seconds</strong>. No sign-up, no limits,
          completely free.
        </p>

        {/* Options */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>
              Format
            </p>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <TabBtn active={format === "bullets"} onClick={() => setFormat("bullets")}>• Bullet Points</TabBtn>
              <TabBtn active={format === "paragraph"} onClick={() => setFormat("paragraph")}>¶ Paragraph</TabBtn>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>
              Length
            </p>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {(["short", "medium", "detailed"] as Length[]).map((l) => (
                <TabBtn key={l} active={length === l} onClick={() => setLength(l)}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </TabBtn>
              ))}
            </div>
          </div>
        </div>

        {/* Input */}
        <div style={{ position: "relative" }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your article, essay, research paper or any text here…"
            aria-label="Text to summarize"
            style={{
              width: "100%",
              minHeight: 240,
              background: "var(--surface)",
              border: "1px solid var(--border-active)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              color: "var(--text)",
              fontSize: 15,
              lineHeight: 1.7,
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <div style={{ position: "absolute", bottom: 10, right: 14, fontSize: 12, color: "var(--muted)", pointerEvents: "none" }}>
            {wordCount.toLocaleString()} words
          </div>
        </div>

        {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: "0.5rem" }}>⚠️ {error}</p>}

        <button
          onClick={handleSummarise}
          disabled={loading || !inputText.trim()}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            borderRadius: 10,
            border: "none",
            background: "var(--accent)",
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "'Syne', sans-serif",
            cursor: loading || !inputText.trim() ? "not-allowed" : "pointer",
            opacity: loading || !inputText.trim() ? 0.65 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Summarising…" : "✦ Summarise Text"}
        </button>

        {/* Output */}
        {(loading || summary) && (
          <div
            style={{
              marginTop: "1.75rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                Summary
              </span>
              {summary && (
                <button
                  onClick={handleCopy}
                  style={{ fontSize: 12, color: copied ? "var(--success, #4ade80)" : "var(--accent)", background: "none", border: "none", cursor: "pointer" }}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div style={{ padding: "1.25rem", minHeight: 80 }}>
              {loading ? (
                <div style={{ color: "var(--muted)", fontSize: 14 }}>Generating summary…</div>
              ) : (
                <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", whiteSpace: "pre-wrap" }}>{summary}</div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>
            More free AI writing tools
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>
            Rewrite, fix grammar, count words — all free, no sign-up required.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/rewriter" style={{ fontSize: 13, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
              AI Text Rewriter →
            </Link>
            <Link href="/tools/grammar-checker" style={{ fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
              Grammar Checker →
            </Link>
            <Link href="/tools/word-counter" style={{ fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
              Word Counter →
            </Link>
          </div>
        </div>

        {/* SEO content */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            What Is an AI Text Summarizer?
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            An <strong style={{ color: "var(--text)" }}>AI text summarizer</strong> uses artificial intelligence to
            condense long articles, research papers, essays, or documents into a shorter version that preserves the key
            points. Instead of spending 20 minutes reading a lengthy report, you can get the core ideas in under 30
            seconds.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            SwiftToolAI's free summarizer is powered by Claude — one of the most accurate AI models available in 2026 —
            ensuring your summaries are coherent, factually faithful, and ready to use.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Free AI Summarizer for Students
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Students use our <strong style={{ color: "var(--text)" }}>free text summarizer</strong> to quickly digest
            academic papers, lecture notes, and textbook chapters — no account, no paywall, unlike Quillbot or similar
            tools.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15 }}>
            After summarising, use our{" "}
            <Link href="/tools/rewriter" style={{ color: "var(--accent)" }}>AI text rewriter</Link>{" "}
            to paraphrase the summary in your own words — perfect for note-taking and revision.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2.5rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          {faqLD.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: "1rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "var(--accent)", marginBottom: "0.4rem" }}>
                {item.name}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
