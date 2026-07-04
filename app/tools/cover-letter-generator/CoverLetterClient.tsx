"use client";
import { useState } from "react";
import Link from "next/link";

// ─── Schema.org structured data ──────────────────────────────────────────────
const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free AI Cover Letter Generator — SwiftToolAI",
  url: "https://swiftoolai.com/tools/cover-letter-generator",
  description:
    "Generate a professional, tailored cover letter instantly with AI. Free, no sign-up required.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  featureList: [
    "AI-generated cover letters",
    "Tailored to job title and company",
    "Multiple tone options",
    "Customisable skills and experience",
    "Instant results",
    "Copy to clipboard",
    "No sign-up required",
  ],
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I write a cover letter with AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With SwiftToolAI's free AI cover letter generator, enter the job title, company name, and your key skills or experience. The AI writes a complete, tailored cover letter in seconds — no sign-up required.",
      },
    },
    {
      "@type": "Question",
      name: "Is this cover letter generator completely free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SwiftToolAI's AI cover letter generator is 100% free. No account, no credit card, and no hidden limits.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a cover letter be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cover letter should typically be 3–4 short paragraphs and fit on one page (250–400 words). SwiftToolAI's AI generates the perfect length automatically — concise, impactful, and professional.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this cover letter generator for any job?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI cover letter generator works for any industry and job level — from entry-level positions to senior executive roles. Just enter the job title, company, and your relevant skills.",
      },
    },
    {
      "@type": "Question",
      name: "Should I customise the AI-generated cover letter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI produces a strong starting point tailored to the role. We recommend reading it through, personalising any specific achievements or numbers, and adjusting the tone to match your voice before sending.",
      },
    },
    {
      "@type": "Question",
      name: "What should a cover letter include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong cover letter should include: an attention-grabbing opening, why you want this specific role and company, your most relevant skills and achievements, and a confident closing with a call to action. SwiftToolAI's AI cover letter generator includes all of these automatically.",
      },
    },
  ],
};

// ─── Types & data ─────────────────────────────────────────────────────────────
type Tone = "professional" | "enthusiastic" | "confident" | "formal" | "friendly";

const TONES: { value: Tone; label: string; emoji: string; desc: string }[] = [
  { value: "professional", label: "Professional", emoji: "💼", desc: "Polished and business-like" },
  { value: "enthusiastic", label: "Enthusiastic", emoji: "🚀", desc: "Energetic and passionate" },
  { value: "confident", label: "Confident", emoji: "⚡", desc: "Bold and assertive" },
  { value: "formal", label: "Formal", emoji: "🎩", desc: "Traditional and structured" },
  { value: "friendly", label: "Friendly", emoji: "😊", desc: "Warm and personable" },
];

const EXAMPLES = [
  { jobTitle: "Software Engineer", company: "Google", skills: "React, Node.js, 3 years experience, team leadership" },
  { jobTitle: "Marketing Manager", company: "Nike", skills: "Social media, SEO, campaign management, 5 years experience" },
  { jobTitle: "Graphic Designer", company: "Canva", skills: "Figma, Adobe Suite, brand identity, UX/UI" },
  { jobTitle: "Data Analyst", company: "Spotify", skills: "Python, SQL, data visualisation, Excel" },
  { jobTitle: "Nurse", company: "NHS", skills: "Patient care, 4 years experience, ICU, teamwork" },
];

// ─── Prompt builder ───────────────────────────────────────────────────────────
function buildPrompt(
  jobTitle: string,
  company: string,
  skills: string,
  yourName: string,
  experience: string,
  tone: Tone
): string {
  const toneMap = {
    professional: "professional, polished, and business-like",
    enthusiastic: "enthusiastic, energetic, and genuinely passionate about the role",
    confident: "confident, bold, and assertive — showcasing achievements strongly",
    formal: "formal, traditional, and structured — suitable for conservative industries",
    friendly: "warm, friendly, and personable while remaining professional",
  };

  return `Write a compelling cover letter for the following job application.

Job Title: ${jobTitle}
Company: ${company}
${skills ? `Key Skills & Experience: ${skills}` : ""}
${experience ? `Additional Background: ${experience}` : ""}
${yourName ? `Applicant Name: ${yourName}` : ""}
Tone: ${toneMap[tone]}

Instructions:
- Write 3–4 paragraphs, around 280–380 words total
- Opening paragraph: strong hook that shows genuine interest in ${company} specifically
- Middle paragraphs: highlight the most relevant skills and experience for the ${jobTitle} role
- Closing paragraph: confident call to action requesting an interview
- Use a professional letter format with "Dear Hiring Manager," greeting
- Sign off with "Yours sincerely," followed by ${yourName || "[Your Name]"}
- Do NOT include a date, address blocks, or subject line
- Output ONLY the cover letter text — no preamble, no explanation, no markdown`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CoverLetterClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [yourName, setYourName] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!jobTitle.trim() || !company.trim()) {
      setError("Please enter the job title and company name.");
      return;
    }
    setError("");
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are an expert career coach and professional cover letter writer with 15 years of experience helping candidates land jobs at top companies. You write compelling, tailored cover letters that get interviews.",
          userInput: buildPrompt(jobTitle, company, skills, yourName, experience, tone),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setOutput(data.result || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  function loadExample(ex: typeof EXAMPLES[0]) {
    setJobTitle(ex.jobTitle);
    setCompany(ex.company);
    setSkills(ex.skills);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border-active)",
    borderRadius: 10,
    padding: "0.65rem 1rem",
    color: "var(--text)",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: "1.5rem", fontSize: 13, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>{" › "}
          <Link href="/tools" style={{ color: "var(--muted)" }}>Tools</Link>{" › "}
          <span style={{ color: "var(--text)" }}>Cover Letter Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--accent-light)", border: "1px solid var(--accent-glow)",
            borderRadius: 20, padding: "4px 14px", marginBottom: "1rem",
          }}>
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Free AI Tool</span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.6rem",
          }}>
            AI Cover Letter <span style={{ color: "var(--accent)" }}>Generator</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.65, maxWidth: 600 }}>
            Enter the job details and your skills — get a{" "}
            <strong style={{ color: "var(--text)" }}>tailored, professional cover letter</strong>{" "}
            in seconds. No sign-up, completely free.
          </p>
        </div>

        {/* Example chips */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p style={labelStyle}>Try an example</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {EXAMPLES.map(ex => (
              <button
                key={ex.jobTitle}
                onClick={() => loadExample(ex)}
                style={{
                  fontSize: 12, padding: "5px 14px", borderRadius: 20,
                  border: "1px solid var(--border)", background: "var(--surface)",
                  color: "var(--muted)", cursor: "pointer", transition: "all 0.12s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                {ex.jobTitle} @ {ex.company}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", padding: "1.75rem",
          marginBottom: "1.25rem",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

            {/* Job title + Company */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="cl-grid">
              <div>
                <label style={labelStyle}>Job Title *</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Company Name *</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Google"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label style={labelStyle}>Your Key Skills & Experience</label>
              <textarea
                value={skills}
                onChange={e => setSkills(e.target.value)}
                placeholder="e.g. 3 years React & Node.js, led a team of 5, delivered 2 major product launches, strong communication skills…"
                rows={3}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            {/* Additional background */}
            <div>
              <label style={labelStyle}>Anything else to mention? <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(optional)</span></label>
              <input
                type="text"
                value={experience}
                onChange={e => setExperience(e.target.value)}
                placeholder="e.g. Career change, returning to work, specific achievement or award…"
                style={inputStyle}
              />
            </div>

            {/* Your name */}
            <div>
              <label style={labelStyle}>Your Name <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(optional)</span></label>
              <input
                type="text"
                value={yourName}
                onChange={e => setYourName(e.target.value)}
                placeholder="e.g. James Wilson"
                style={{ ...inputStyle, maxWidth: 260 }}
              />
            </div>

            {/* Tone */}
            <div>
              <label style={labelStyle}>Tone</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {TONES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    title={t.desc}
                    style={{
                      padding: "0.45rem 1rem", borderRadius: 8, cursor: "pointer",
                      border: tone === t.value ? "1px solid rgba(108,99,255,0.4)" : "1px solid var(--border)",
                      background: tone === t.value ? "rgba(108,99,255,0.12)" : "var(--surface2, #10101a)",
                      color: tone === t.value ? "var(--accent)" : "var(--muted)",
                      fontSize: 13, fontWeight: tone === t.value ? 600 : 400,
                      transition: "all 0.12s",
                    }}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#f87171", fontSize: 13, marginBottom: "0.75rem" }}>⚠️ {error}</p>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !jobTitle.trim() || !company.trim()}
          style={{
            width: "100%", padding: "0.85rem 2.5rem",
            borderRadius: 10, border: "none",
            background: "var(--accent)", color: "#fff",
            fontSize: "1rem", fontWeight: 700,
            fontFamily: "'Syne', sans-serif",
            cursor: loading || !jobTitle.trim() || !company.trim() ? "not-allowed" : "pointer",
            opacity: loading || !jobTitle.trim() || !company.trim() ? 0.6 : 1,
            marginBottom: "1.5rem",
            transition: "opacity 0.15s",
          }}
        >
          {loading ? "Writing your cover letter…" : "✦ Generate Cover Letter"}
        </button>

        {/* Output */}
        {(loading || output) && (
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, overflow: "hidden", marginBottom: "2rem",
          }}>
            <div style={{
              padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
                Your Cover Letter
              </span>
              {output && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      fontSize: 12, color: copied ? "#4ade80" : "var(--accent)",
                      background: "none", border: "none", cursor: "pointer", fontWeight: 600,
                    }}
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
              )}
            </div>
            <div style={{
              padding: "1.5rem", minHeight: 120,
              fontSize: 15, lineHeight: 1.85,
              color: loading ? "var(--muted)" : "var(--text)",
              fontStyle: loading ? "italic" : "normal",
              whiteSpace: "pre-wrap",
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}>
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
                  <div style={{
                    width: 16, height: 16,
                    border: "2px solid var(--border-active)", borderTopColor: "var(--accent)",
                    borderRadius: "50%", animation: "spin 0.7s linear infinite",
                  }} />
                  Writing your cover letter…
                </div>
              ) : output}
            </div>

            {output && (
              <div style={{
                padding: "0.75rem 1.25rem", borderTop: "1px solid var(--border)",
                background: "rgba(108,99,255,0.04)",
                fontSize: 12, color: "var(--muted)",
              }}>
                💡 Tip: personalise any specific numbers or achievements before sending.
              </div>
            )}
          </div>
        )}

        {/* Related tools */}
        <div style={{
          padding: "1.5rem", background: "var(--surface)",
          border: "1px solid var(--border)", borderRadius: 12, marginBottom: "3rem",
        }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.95rem" }}>
            More free AI writing tools
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { href: "/tools/ai-email-writer", label: "AI Email Writer" },
              { href: "/tools/bio-generator", label: "Bio Generator" },
              { href: "/tools/grammar-checker", label: "Grammar Checker" },
              { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
              { href: "/tools/rewriter", label: "Text Rewriter" },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))",
                  color: "var(--text)", border: "1px solid var(--border)",
                  padding: "8px 16px", borderRadius: 8, textDecoration: "none",
                }}
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <section>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            How to Write a Cover Letter with AI
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Writing a tailored cover letter for every job application is time-consuming. SwiftToolAI's{" "}
            <strong style={{ color: "var(--text)" }}>free AI cover letter generator</strong> does the heavy lifting in seconds. Simply enter the job title, company name, and your key skills — the AI handles the structure, tone, and wording for you.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "2rem" }}>
            The generated cover letter follows the proven format recruiters expect: a strong opening hook, a compelling middle section showcasing your most relevant experience, and a confident closing with a clear call to action. After generating, use our{" "}
            <Link href="/tools/grammar-checker" style={{ color: "var(--accent)" }}>grammar checker</Link>{" "}
            to review it before sending.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            What Makes a Great Cover Letter?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: "2.5rem" }}>
            {[
              { icon: "🎯", title: "Tailored to the role", body: "Mention the specific company and job title. Generic letters get ignored — personalisation gets interviews." },
              { icon: "⚡", title: "Strong opening hook", body: "Your first sentence must grab attention. Lead with your biggest relevant achievement or genuine enthusiasm for the company." },
              { icon: "📊", title: "Quantified achievements", body: "Use numbers where possible — 'increased sales by 30%' is far more compelling than 'improved sales performance'." },
              { icon: "✅", title: "Clear call to action", body: "End with a confident request for an interview and a professional sign-off. Don't leave the recruiter guessing." },
            ].map(tip => (
              <div key={tip.title} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 10, padding: "1.1rem",
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{tip.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{tip.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{tip.body}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          {faqLD.mainEntity.map((item, i) => (
            <details
              key={i}
              style={{
                marginBottom: "0.75rem", padding: "1rem 1.25rem",
                background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
              }}
            >
              <summary style={{ fontWeight: 600, fontSize: 14, cursor: "pointer", color: "var(--text)", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                {item.name}
                <span style={{ color: "var(--accent)", marginLeft: 8 }}>＋</span>
              </summary>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </section>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .cl-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
