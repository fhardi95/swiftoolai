"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Resume Bullet Point Writer — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/resume-bullet-writer",
  description: "AI-powered resume bullet point writer. Turn duties into achievements.",
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
      name: "What is the best format for resume bullet points?",
      acceptedAnswer: { "@type": "Answer", text: "The strongest resume bullet points follow the CAR format: Context, Action, Result. Start with a strong action verb (Led, Built, Increased, Reduced), describe what you did, and quantify the result wherever possible (e.g. 'Increased conversion rate by 23%')." },
    },
    {
      "@type": "Question",
      name: "How many bullet points should I have per job on a CV?",
      acceptedAnswer: { "@type": "Answer", text: "Aim for 3–6 bullet points per role. For recent roles, use 5–6. For older roles, 2–3 is enough. Quality over quantity — every bullet should demonstrate impact, not just list tasks." },
    },
    {
      "@type": "Question",
      name: "Should resume bullet points include numbers?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, wherever possible. Quantified achievements stand out to recruiters and pass ATS filters more effectively. Numbers can include percentages, revenue figures, team sizes, time saved, or ranking improvements." },
    },
  ],
};

export default function ResumeBulletWriterClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [duty, setDuty] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = async () => {
    if (!duty.trim()) return;
    setLoading(true); setError(""); setResults([]);
    try {
      const systemPrompt = `You are an expert CV/resume writer who specialises in transforming bland job duties into powerful, achievement-focused bullet points that pass ATS systems and impress recruiters.

Generate 5 strong resume bullet points based on the input. Rules:
- Start each with a strong action verb (e.g. Led, Built, Increased, Streamlined, Delivered, Reduced, Launched)
- Follow the CAR format: Context → Action → Result
- Add plausible quantified results if none given (e.g. "by 30%", "saving 5 hrs/week", "for a team of 12")
- Keep each bullet to one line (max 20 words)
- Make them ATS-friendly with relevant keywords
- Output ONLY the 5 bullets, one per line, starting with • — no preamble, no numbering, no extra text`;

      const userInput = `Job title: ${jobTitle || "Not specified"}
Duty/responsibility: ${duty}`;

      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userInput }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      const bullets = data.result.split("\n").map((b: string) => b.trim()).filter((b: string) => b.startsWith("•") || b.startsWith("-") || b.length > 10);
      setResults(bullets);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (idx: number) => {
    navigator.clipboard.writeText(results[idx]);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, color: "var(--text)", outline: "none" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Resume Bullet Point Writer
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Turn bland job duties into powerful, achievement-focused CV bullet points. ATS-optimised, action-verb led. Free, no sign-up.
          </p>
        </div>

        {/* Tip box */}
        <div style={{ background: "var(--accent-light)", border: "1px solid var(--border-active)", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1.5rem", fontSize: 13, color: "var(--accent)" }}>
          💡 <strong>Tip:</strong> Describe one responsibility at a time for the best results. Include any metrics or outcomes you remember.
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>
              Job Title <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input style={inputStyle} placeholder="e.g. Marketing Manager, Software Engineer, Sales Executive…" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>
              What did you do? *
            </label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              placeholder="e.g. Managed the company's social media accounts and grew the following. Ran paid ads on Google and Facebook. Helped increase sales."
              value={duty}
              onChange={(e) => setDuty(e.target.value)}
            />
          </div>

          <button
            onClick={generate}
            disabled={loading || !duty.trim()}
            style={{ width: "100%", background: loading || !duty.trim() ? "var(--muted)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            {loading ? "Writing bullet points…" : "Generate 5 Bullet Points ✦"}
          </button>
        </div>

        {error && <div style={{ background: "var(--accent2-light)", border: "1px solid var(--accent2-glow)", borderRadius: 10, padding: "1rem", marginBottom: "1rem", color: "var(--accent2)", fontSize: 14 }}>{error}</div>}

        {results.length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Your Resume Bullets</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={copyAll} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copiedAll ? "var(--success)" : "var(--surface2)", color: copiedAll ? "#fff" : "var(--text)" }}>{copiedAll ? "Copied!" : "Copy all"}</button>
                <button onClick={generate} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: "var(--surface2)", color: "var(--text)" }}>Regenerate</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {results.map((bullet, i) => (
                <div key={i} style={{ background: "var(--bg)", borderRadius: 10, padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <p style={{ fontSize: 14, lineHeight: 1.6, flex: 1 }}>{bullet}</p>
                  <button onClick={() => copy(i)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === i ? "var(--success)" : "var(--surface2)", color: copied === i ? "#fff" : "var(--text)" }}>{copied === i ? "✓" : "Copy"}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related tools */}
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>Related tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/cover-letter-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Cover Letter Generator →</Link>
            <Link href="/tools/bio-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Bio Generator →</Link>
            <Link href="/tools/ai-email-writer" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>AI Email Writer →</Link>
          </div>
        </div>

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
