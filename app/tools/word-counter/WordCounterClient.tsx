"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

// ─── Schema.org structured data ──────────────────────────────────────────────
const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter Online — SwiftToolAI",
  url: "https://swiftoolai.com/tools/word-counter",
  description:
    "Free online word counter tool. Count words, characters, sentences, paragraphs and reading time instantly.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  featureList: [
    "Word count",
    "Character count",
    "Sentence count",
    "Paragraph count",
    "Reading time estimate",
    "Keyword density",
    "Top keywords",
  ],
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I count words online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste or type your text into SwiftToolAI's free word counter above. Your word count, character count, sentence count, and reading time will update instantly — no sign-up or download required.",
      },
    },
    {
      "@type": "Question",
      name: "How many words is a standard essay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard school or university essay is typically 500–1,500 words. A short essay is around 500 words, a standard essay 1,000–1,200 words, and a long essay or dissertation chapter can be 2,000–5,000 words or more.",
      },
    },
    {
      "@type": "Question",
      name: "Does the character counter include spaces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SwiftToolAI's character counter shows two figures: characters with spaces and characters without spaces, so you can use whichever your platform requires.",
      },
    },
    {
      "@type": "Question",
      name: "How many words can I read per minute?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average adult reads approximately 200–250 words per minute. SwiftToolAI's word counter calculates your estimated reading time based on 238 words per minute, the widely-cited research average.",
      },
    },
    {
      "@type": "Question",
      name: "How many characters does Twitter/X allow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Twitter/X allows up to 280 characters per post. Use the character counter above to make sure your tweet fits within the limit before posting.",
      },
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function computeStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed === "" ? 0 : (trimmed.match(/[^.!?]*[.!?]+/g) || []).length;
  const paragraphs =
    trimmed === ""
      ? 0
      : trimmed.split(/\n\s*\n/).filter((p) => p.trim() !== "").length || (trimmed ? 1 : 0);
  const readingTime = Math.ceil(words / 238);
  const speakingTime = Math.ceil(words / 130);

  const stopwords = new Set([
    "that","this","with","from","they","have","been","were","will","your","more",
    "also","when","their","what","about","which","into","some","there","would","like",
    "just","than","then","very","only","over","such","even","most","after","before",
  ]);
  const freq: Record<string, number> = {};
  trimmed
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !stopwords.has(w))
    .forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      pct: words > 0 ? ((count / words) * 100).toFixed(1) : "0",
    }));

  return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime, speakingTime, topKeywords };
}

const LIMITS = [
  { label: "Tweet / X post", max: 280 },
  { label: "Google meta description", max: 160 },
  { label: "LinkedIn post", max: 3000 },
  { label: "Instagram caption", max: 2200 },
  { label: "Facebook post", max: 63206 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function WordCounterClient() {
  const [text, setText] = useState("");
  const stats = computeStats(text);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const StatCard = ({
    label,
    value,
    sub,
    accent,
  }: {
    label: string;
    value: string | number;
    sub?: string;
    accent?: string;
  }) => (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span
        style={{
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.75rem",
          color: accent || "var(--accent)",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      {sub && <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{sub}</span>}
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "1.5rem", fontSize: 13, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>
          {" › "}
          <Link href="/tools" style={{ color: "var(--muted)" }}>Tools</Link>
          {" › "}
          <span style={{ color: "var(--text)" }}>Word Counter</span>
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
          Free Word Counter Online
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem", lineHeight: 1.65 }}>
          Instantly count{" "}
          <strong style={{ color: "var(--text)" }}>words, characters, sentences & paragraphs</strong> — plus reading
          time and top keywords. No sign-up, no limits.
        </p>

        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Paste or type your text here — word count updates instantly…"
          aria-label="Text input for word counter"
          style={{
            width: "100%",
            minHeight: 220,
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

        {text && (
          <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
            <button
              onClick={() => setText("")}
              style={{
                fontSize: 12,
                color: "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Clear text
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "0.75rem",
            marginTop: "1.5rem",
          }}
        >
          <StatCard label="Words" value={stats.words.toLocaleString()} />
          <StatCard label="Characters" value={stats.chars.toLocaleString()} sub="with spaces" accent="#facc15" />
          <StatCard label="Characters" value={stats.charsNoSpaces.toLocaleString()} sub="without spaces" accent="#facc15" />
          <StatCard label="Sentences" value={stats.sentences.toLocaleString()} accent="#4ade80" />
          <StatCard label="Paragraphs" value={stats.paragraphs.toLocaleString()} accent="#4ade80" />
          <StatCard
            label="Reading Time"
            value={stats.readingTime === 0 ? "—" : `${stats.readingTime} min`}
            sub="at 238 wpm"
            accent="#a78bfa"
          />
          <StatCard
            label="Speaking Time"
            value={stats.speakingTime === 0 ? "—" : `${stats.speakingTime} min`}
            sub="at 130 wpm"
            accent="#a78bfa"
          />
        </div>

        {/* Platform limits */}
        <div style={{ marginTop: "2rem" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: "0.75rem",
              letterSpacing: "-0.01em",
            }}
          >
            Character Limit Checker
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {LIMITS.map((lim) => {
              const pct = Math.min(100, (stats.chars / lim.max) * 100);
              const over = stats.chars > lim.max;
              return (
                <div
                  key={lim.label}
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${over ? "rgba(248,113,113,0.4)" : "var(--border)"}`,
                    borderRadius: 10,
                    padding: "0.6rem 1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: "0.35rem",
                    }}
                  >
                    <span style={{ color: "var(--text)" }}>{lim.label}</span>
                    <span style={{ color: over ? "#f87171" : "var(--muted)" }}>
                      {stats.chars} / {lim.max}
                      {over ? " ⚠️ Over limit" : " ✓"}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 2,
                      background: "var(--surface2, rgba(255,255,255,0.06))",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: over ? "#f87171" : "var(--accent)",
                        borderRadius: 2,
                        transition: "width 0.2s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Keywords */}
        {stats.topKeywords.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "0.75rem",
                letterSpacing: "-0.01em",
              }}
            >
              Top Keywords in Your Text
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {stats.topKeywords.map((kw) => (
                <div
                  key={kw.word}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "0.4rem 0.85rem",
                    fontSize: 13,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--text)", fontWeight: 600 }}>{kw.word}</span>
                  <span style={{ color: "var(--muted)" }}>×{kw.count}</span>
                  <span
                    style={{
                      color: "var(--accent)",
                      fontSize: 11,
                      background: "rgba(108,99,255,0.1)",
                      borderRadius: 4,
                      padding: "1px 5px",
                    }}
                  >
                    {kw.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              marginBottom: "0.4rem",
              fontSize: "0.95rem",
            }}
          >
            More free AI writing tools
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>
            Rewrite, fix grammar, or generate a professional bio — all free, no sign-up.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link
              href="/tools/rewriter"
              style={{ fontSize: 13, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
            >
              AI Text Rewriter →
            </Link>
            <Link
              href="/tools/grammar-checker"
              style={{ fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
            >
              Grammar Checker →
            </Link>
            <Link
              href="/tools/ai-summarizer"
              style={{ fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
            >
              AI Summarizer →
            </Link>
          </div>
        </div>

        {/* SEO content */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Why Use an Online Word Counter?
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Whether you're writing an essay, a blog post, or a social media caption, knowing your{" "}
            <strong style={{ color: "var(--text)" }}>exact word count</strong> keeps you on target. SwiftToolAI's free
            word counter tool updates in real time as you type — no button clicks, no page reloads.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Unlike the built-in word counter in Microsoft Word or Google Docs, our online character counter also shows{" "}
            <strong style={{ color: "var(--text)" }}>reading time, speaking time, keyword density</strong>, and
            platform-specific character limits for Twitter, LinkedIn, Instagram, and more.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Word Counter for Students & Writers
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Students at UK universities frequently need to hit word counts of 1,000, 2,500, or 5,000 words for
            coursework and dissertations. Our word count checker for essays shows exactly how many words you've written.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15 }}>
            After counting, use our{" "}
            <Link href="/tools/rewriter" style={{ color: "var(--accent)" }}>free AI text rewriter</Link>{" "}
            to polish your draft, or the{" "}
            <Link href="/tools/grammar-checker" style={{ color: "var(--accent)" }}>grammar checker</Link>{" "}
            to catch any errors before submitting.
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
