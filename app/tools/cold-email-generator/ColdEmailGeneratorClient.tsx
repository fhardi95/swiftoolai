"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cold Email Generator — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/cold-email-generator",
  description: "AI-powered cold email generator. Write high-converting cold outreach emails in seconds.",
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
      name: "What makes a cold email effective?",
      acceptedAnswer: { "@type": "Answer", text: "The best cold emails are short (under 150 words), hyper-personalised to the recipient, lead with value not a pitch, and have a single low-friction CTA. Subject lines should be curiosity-driven or reference something specific to the prospect." },
    },
    {
      "@type": "Question",
      name: "How long should a cold email be?",
      acceptedAnswer: { "@type": "Answer", text: "Under 150 words is the sweet spot for B2B cold emails. Busy decision-makers won't read lengthy pitches. Get to the point fast — one sentence on who you are, one on the value you offer, one on the CTA." },
    },
    {
      "@type": "Question",
      name: "What is a good cold email reply rate?",
      acceptedAnswer: { "@type": "Answer", text: "A typical cold email reply rate is 1–5%. A well-crafted, personalised email targeting the right prospect can achieve 10–20% reply rates. Personalisation and a clear value proposition are the biggest levers." },
    },
  ],
};

const GOALS = ["Book a call", "Get a reply", "Share a resource", "Partnership proposal", "Job inquiry", "Agency pitch"];
const TONES = ["Professional", "Friendly", "Direct", "Consultative"];

export default function ColdEmailGeneratorClient() {
  const [senderRole, setSenderRole] = useState("");
  const [prospect, setProspect] = useState("");
  const [offer, setOffer] = useState("");
  const [goal, setGoal] = useState("Book a call");
  const [tone, setTone] = useState("Professional");
  const [painPoint, setPainPoint] = useState("");
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"subject" | "body" | "all" | null>(null);

  const generate = async () => {
    if (!offer.trim() || !prospect.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const systemPrompt = `You are an expert cold email copywriter who specialises in B2B outreach with consistently high reply rates.

Write a cold email and return it as JSON in exactly this format:
{"subject": "...", "body": "..."}

Rules for the email:
- Subject line: max 8 words, no spam words, curiosity-driven or personalised
- Body: max 120 words total
- Open with personalisation or a relevant observation (not "I hope this email finds you well")
- One clear value proposition — focus on their problem, not your features
- Single CTA — make it low friction (e.g. "Worth a 15-min chat?" not "Please book a meeting")
- Natural, human tone — no corporate fluff
- No unsubscribe links, legal disclaimers, or signatures (user will add)
- Output ONLY the JSON — no markdown, no preamble`;

      const userInput = `${senderRole ? `Sender: ${senderRole}` : ""}
Prospect/Target: ${prospect}
What I'm offering: ${offer}
Goal of email: ${goal}
Tone: ${tone}
${painPoint ? `Prospect pain point: ${painPoint}` : ""}`;

      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userInput }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      const parsed = JSON.parse(data.result.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (type: "subject" | "body" | "all") => {
    if (!result) return;
    const text = type === "all" ? `Subject: ${result.subject}\n\n${result.body}` : type === "subject" ? result.subject : result.body;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, color: "var(--text)", outline: "none" };
  const chipStyle = (active: boolean) => ({ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 as const, border: "1px solid var(--border)", cursor: "pointer" as const, background: active ? "var(--accent)" : "var(--surface)", color: active ? "#fff" : "var(--text)" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Cold Email Generator
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Write cold emails that actually get replies. AI-powered, personalised outreach in seconds. Free, no sign-up.
          </p>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
            <div>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Your Role <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
              <input style={inputStyle} placeholder="e.g. Freelance SEO consultant" value={senderRole} onChange={(e) => setSenderRole(e.target.value)} />
            </div>
            <div>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Who are you contacting? *</label>
              <input style={inputStyle} placeholder="e.g. E-commerce startup founder" value={prospect} onChange={(e) => setProspect(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>What are you offering? *</label>
            <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} placeholder="e.g. I help Shopify stores increase organic traffic through technical SEO and content strategy" value={offer} onChange={(e) => setOffer(e.target.value)} />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Prospect's pain point <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
            <input style={inputStyle} placeholder="e.g. low organic traffic, poor conversion rates, scaling issues…" value={painPoint} onChange={(e) => setPainPoint(e.target.value)} />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Goal</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {GOALS.map((g) => <button key={g} style={chipStyle(goal === g)} onClick={() => setGoal(g)}>{g}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Tone</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TONES.map((t) => <button key={t} style={chipStyle(tone === t)} onClick={() => setTone(t)}>{t}</button>)}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !offer.trim() || !prospect.trim()}
            style={{ width: "100%", background: loading || !offer.trim() || !prospect.trim() ? "var(--muted)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            {loading ? "Writing your email…" : "Generate Cold Email ✦"}
          </button>
        </div>

        {error && <div style={{ background: "var(--accent2-light)", border: "1px solid var(--accent2-glow)", borderRadius: 10, padding: "1rem", marginBottom: "1rem", color: "var(--accent2)", fontSize: 14 }}>{error}</div>}

        {result && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Your Cold Email</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => copy("all")} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === "all" ? "var(--success)" : "var(--surface2)", color: copied === "all" ? "#fff" : "var(--text)" }}>{copied === "all" ? "Copied!" : "Copy all"}</button>
                <button onClick={generate} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: "var(--surface2)", color: "var(--text)" }}>Regenerate</button>
              </div>
            </div>

            {/* Subject */}
            <div style={{ background: "var(--bg)", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Subject</p>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{result.subject}</p>
              </div>
              <button onClick={() => copy("subject")} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === "subject" ? "var(--success)" : "var(--surface2)", color: copied === "subject" ? "#fff" : "var(--text)" }}>{copied === "subject" ? "✓" : "Copy"}</button>
            </div>

            {/* Body */}
            <div style={{ background: "var(--bg)", borderRadius: 10, padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Body</p>
                <button onClick={() => copy("body")} style={{ padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === "body" ? "var(--success)" : "var(--surface2)", color: copied === "body" ? "#fff" : "var(--text)" }}>{copied === "body" ? "✓" : "Copy"}</button>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{result.body}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>{result.body.split(/\s+/).length} words</p>
            </div>
          </div>
        )}

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
