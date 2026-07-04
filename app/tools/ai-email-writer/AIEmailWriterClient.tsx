"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free AI Email Writer — SwiftToolAI",
  url: "https://swiftoolai.com/tools/ai-email-writer",
  description: "Free AI email writer. Generate professional emails instantly. No sign-up.",
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
      name: "How do I write a professional email with AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With SwiftToolAI's free AI email writer, simply describe what you want to say, choose a tone, and click Generate Email. The AI writes a complete, ready-to-send email in seconds — no sign-up required.",
      },
    },
    {
      "@type": "Question",
      name: "What types of emails can the AI email writer generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SwiftToolAI's AI email writer can generate any type of email — follow-up emails, job application emails, apology emails, complaint emails, thank you emails, meeting request emails, cold outreach emails, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Is this AI email writer completely free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SwiftToolAI's AI email writer is 100% free with no account, no daily limits, and no payment required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write a professional email asking for something?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Be clear and concise about what you're requesting, provide context, and maintain a polite tone. Use SwiftToolAI's email writer — type your request in the description box, select 'Formal' or 'Professional' tone, and the AI will structure it correctly for you.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to write cold outreach emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select 'Persuasive' tone and describe your outreach goal. The AI will write a compelling cold email with a strong opening, value proposition, and clear call to action.",
      },
    },
  ],
};

type Tone = "professional" | "friendly" | "formal" | "persuasive" | "apologetic";

const TONES: { value: Tone; label: string; emoji: string }[] = [
  { value: "professional", label: "Professional", emoji: "💼" },
  { value: "friendly", label: "Friendly", emoji: "😊" },
  { value: "formal", label: "Formal", emoji: "🎩" },
  { value: "persuasive", label: "Persuasive", emoji: "🎯" },
  { value: "apologetic", label: "Apologetic", emoji: "🙏" },
];

const EMAIL_EXAMPLES = [
  "Follow up after a job interview",
  "Ask my manager for a pay rise",
  "Apologise for missing a deadline",
  "Request a meeting with a client",
  "Complain about a faulty product",
  "Thank a colleague for their help",
  "Cold outreach to a potential client",
  "Decline a job offer politely",
];

function buildPrompt(description: string, tone: Tone, recipient: string, senderName: string): string {
  const toneGuide: Record<Tone, string> = {
    professional: "professional and confident",
    friendly: "warm, friendly and approachable",
    formal: "highly formal and respectful",
    persuasive: "persuasive and compelling with a clear call to action",
    apologetic: "sincere, apologetic and empathetic",
  };

  return `Write a complete email that is ${toneGuide[tone]}.

Purpose: ${description}
${recipient ? `Recipient: ${recipient}` : ""}
${senderName ? `Sender name: ${senderName}` : ""}

Output ONLY the email with Subject line first (format: "Subject: ..."), then a blank line, then the full email body. No preamble, no explanation. Include appropriate greeting and sign-off.`;
}

export default function AIEmailWriterClient() {
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [recipient, setRecipient] = useState("");
  const [senderName, setSenderName] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!description.trim()) { setError("Please describe what your email is about."); return; }
    setError(""); setLoading(true); setOutput("");
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolSlug: 'ai-email-writer',
          systemPrompt: 'You are an expert email writer. Write clear, professional emails.',
          userInput: buildPrompt(description, tone, recipient, senderName),
        }),
      });
      if (res.status === 429) {
        const d = await res.json();
        setError(d.error || 'Daily limit reached. Upgrade to Pro for unlimited access.');
        setLoading(false); return;
      }
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

  const inputStyle = {
    width: "100%", background: "var(--surface)",
    border: "1px solid var(--border-active)", borderRadius: 10,
    padding: "0.65rem 1rem", color: "var(--text)", fontSize: 14,
    outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontSize: "0.68rem", fontWeight: 600 as const, letterSpacing: "0.08em",
    textTransform: "uppercase" as const, color: "var(--muted)", display: "block" as const,
    marginBottom: "0.4rem",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        <nav style={{ marginBottom: "1.5rem", fontSize: 13, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>{" › "}
          <Link href="/tools" style={{ color: "var(--muted)" }}>Tools</Link>{" › "}
          <span style={{ color: "var(--text)" }}>AI Email Writer</span>
        </nav>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.6rem" }}>
          Free AI Email Writer
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem", lineHeight: 1.65 }}>
          Describe what you need and get a <strong style={{ color: "var(--text)" }}>ready-to-send professional email</strong> in seconds. No sign-up, completely free.
        </p>

        {/* Example chips */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={labelStyle}>Try an example</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {EMAIL_EXAMPLES.map(ex => (
              <button key={ex} onClick={() => setDescription(ex)} style={{
                fontSize: 12, padding: "5px 12px", borderRadius: 20,
                border: "1px solid var(--border)", background: "var(--surface)",
                color: "var(--muted)", cursor: "pointer", transition: "all 0.12s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >{ex}</button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>What is this email about? *</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Follow up after a job interview at Acme Ltd, thank them for their time and ask about next steps…"
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="email-grid">
            <div>
              <label style={labelStyle}>Recipient (optional)</label>
              <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g. Hiring Manager, Sarah" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Your name (optional)</label>
              <input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} placeholder="e.g. James" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Tone</label>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {TONES.map(t => (
                <button key={t.value} onClick={() => setTone(t.value)} style={{
                  padding: "0.45rem 1rem", borderRadius: 8,
                  border: tone === t.value ? "1px solid rgba(108,99,255,0.4)" : "1px solid var(--border)",
                  background: tone === t.value ? "rgba(108,99,255,0.12)" : "var(--surface)",
                  color: tone === t.value ? "var(--accent)" : "var(--muted)",
                  fontSize: 13, fontWeight: tone === t.value ? 600 : 400, cursor: "pointer",
                }}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: "0.5rem" }}>⚠️ {error}</p>}

        <button onClick={handleGenerate} disabled={loading || !description.trim()} style={{
          marginTop: "1.25rem", padding: "0.75rem 2.5rem", borderRadius: 10,
          border: "none", background: "var(--accent)", color: "#fff",
          fontSize: "0.95rem", fontWeight: 600, fontFamily: "'Syne', sans-serif",
          cursor: loading || !description.trim() ? "not-allowed" : "pointer",
          opacity: loading || !description.trim() ? 0.65 : 1,
        }}>
          {loading ? "Writing email…" : "✦ Write My Email"}
        </button>

        {/* Output */}
        {(loading || output) && (
          <div style={{ marginTop: "1.75rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>Your Email</span>
              {output && (
                <button onClick={handleCopy} style={{ fontSize: 12, color: copied ? "#4ade80" : "var(--accent)", background: "none", border: "none", cursor: "pointer" }}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div style={{ padding: "1.25rem", minHeight: 80, fontSize: 14, lineHeight: 1.8, color: loading ? "var(--muted)" : "var(--text)", whiteSpace: "pre-wrap", fontFamily: "'Georgia', serif" }}>
              {loading ? "Writing your email…" : output}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.95rem" }}>More free AI writing tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { href: "/tools/rewriter", label: "Text Rewriter" },
              { href: "/tools/grammar-checker", label: "Grammar Checker" },
              { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
              { href: "/tools/bio-generator", label: "Bio Generator" },
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
            How to Write a Professional Email with AI
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Writing the perfect professional email takes time — getting the tone right, structuring your points clearly, and ending with a strong call to action. SwiftToolAI's <strong style={{ color: "var(--text)" }}>free AI email writer</strong> handles all of that in seconds.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Simply describe what you want to say, choose your tone (Professional, Friendly, Formal, Persuasive, or Apologetic), and optionally add the recipient's name and your own. The AI generates a complete email with subject line, greeting, body, and sign-off — ready to copy and send.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            AI Email Writer for Every Situation
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Whether you need to follow up after a job interview, ask your manager for a pay rise, or send a cold outreach email to a potential client — our <strong style={{ color: "var(--text)" }}>AI email generator</strong> covers every situation. After generating, use our <Link href="/tools/grammar-checker" style={{ color: "var(--accent)" }}>grammar checker</Link> to review the final draft.
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
        @media (max-width: 640px) { .email-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
