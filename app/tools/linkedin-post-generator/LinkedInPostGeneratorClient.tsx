"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LinkedIn Post Generator — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/linkedin-post-generator",
  description: "AI-powered LinkedIn post generator. Create engaging posts in seconds.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long should a LinkedIn post be?",
      acceptedAnswer: { "@type": "Answer", text: "The LinkedIn algorithm favours posts between 1,200 and 1,600 characters. Posts that use short paragraphs, line breaks, and a strong opening hook — before the 'see more' cut — tend to get the highest engagement." },
    },
    {
      "@type": "Question",
      name: "How often should I post on LinkedIn?",
      acceptedAnswer: { "@type": "Answer", text: "Most LinkedIn growth experts recommend posting 3–5 times per week for consistent visibility. Quality matters more than frequency — one strong post beats five mediocre ones." },
    },
    {
      "@type": "Question",
      name: "What makes a good LinkedIn post?",
      acceptedAnswer: { "@type": "Answer", text: "A strong hook in the first line, a clear point of view, short punchy paragraphs, and a call to action or question at the end. Storytelling and personal insights tend to outperform purely promotional content." },
    },
  ],
};

const TONES = ["Professional", "Conversational", "Inspirational", "Storytelling", "Thought Leadership", "Humorous"];
const GOALS = ["Share insight", "Build personal brand", "Promote a product", "Celebrate a win", "Ask a question", "Share a story"];

export default function LinkedInPostGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [goal, setGoal] = useState("Share insight");
  const [extras, setExtras] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const systemPrompt = `You are an expert LinkedIn content strategist who writes high-performing posts. 
Write a LinkedIn post that will get strong engagement. Follow these rules:
- Open with a powerful hook (first line must stop the scroll — no "I" at the start)
- Use short paragraphs (1-3 lines each), separated by line breaks
- Include a clear point of view or insight
- End with a question or CTA to drive comments
- Total length: 1,200–1,600 characters
- No hashtag spam — use max 3 relevant hashtags at the very end
- Do NOT add a title or preamble — just output the post text ready to copy-paste`;

      const userInput = `Topic: ${topic}
Tone: ${tone}
Goal: ${goal}
${extras ? `Additional context: ${extras}` : ""}`;

      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userInput }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data.result);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: 10,
    border: "1px solid var(--border)", background: "var(--bg)",
    fontSize: 14, color: "var(--text)", outline: "none",
  };

  const chipStyle = (active: boolean) => ({
    padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
    border: "1px solid var(--border)", cursor: "pointer",
    background: active ? "var(--accent)" : "var(--surface)",
    color: active ? "#fff" : "var(--text)",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            LinkedIn Post Generator
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Generate engaging LinkedIn posts with AI. Enter your topic, pick your tone, and get a ready-to-publish post in seconds.
          </p>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          {/* Topic */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>
              What is your post about? *
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Lessons learned from launching my first SaaS product, how AI is changing recruitment, my experience switching careers at 35…"
              style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
            />
          </div>

          {/* Tone */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Tone</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TONES.map((t) => <button key={t} style={chipStyle(tone === t)} onClick={() => setTone(t)}>{t}</button>)}
            </div>
          </div>

          {/* Goal */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Goal</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {GOALS.map((g) => <button key={g} style={chipStyle(goal === g)} onClick={() => setGoal(g)}>{g}</button>)}
            </div>
          </div>

          {/* Extras */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>
              Additional context <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input style={inputStyle} placeholder="e.g. target audience, key stats, specific points to include…" value={extras} onChange={(e) => setExtras(e.target.value)} />
          </div>

          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            style={{ width: "100%", background: loading || !topic.trim() ? "var(--muted)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, cursor: loading || !topic.trim() ? "default" : "pointer" }}
          >
            {loading ? "Generating…" : "Generate LinkedIn Post ✦"}
          </button>
        </div>

        {error && (
          <div style={{ background: "var(--accent2-light)", border: "1px solid var(--accent2-glow)", borderRadius: 10, padding: "1rem", marginBottom: "1rem", color: "var(--accent2)", fontSize: 14 }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Your LinkedIn Post</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={copy}
                  style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied ? "var(--success)" : "var(--surface2)", color: copied ? "#fff" : "var(--text)" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={generate}
                  style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: "var(--surface2)", color: "var(--text)" }}
                >
                  Regenerate
                </button>
              </div>
            </div>
            <div style={{ background: "var(--bg)", borderRadius: 10, padding: "1.25rem", whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.75, color: "var(--text)" }}>
              {result}
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>{result.length} characters</p>
          </div>
        )}

        {/* FAQ */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          {faqLD.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: "1rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "var(--accent)", marginBottom: "0.4rem" }}>{item.name}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
