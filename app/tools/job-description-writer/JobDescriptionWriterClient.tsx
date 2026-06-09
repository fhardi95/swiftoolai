"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Job Description Writer — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/job-description-writer",
  description: "AI-powered job description writer. Generate professional job postings in seconds.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const LEVELS = ["Entry level", "Mid level", "Senior", "Lead", "Manager", "Director", "C-level"];

export default function JobDescriptionWriterClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [level, setLevel] = useState("Mid level");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [extras, setExtras] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!jobTitle.trim()) return;
    setLoading(true); setError(""); setResult("");
    try {
      const systemPrompt = `You are a professional HR copywriter who writes compelling, inclusive job descriptions that attract top candidates.

Write a complete job description with these sections:
1. Brief company overview (2-3 sentences, if company name given)
2. The Role (2-3 sentences about the position)
3. Key Responsibilities (6-8 bullet points)
4. Requirements (5-7 must-haves)
5. Nice to Have (3-4 items)
6. What We Offer (4-5 benefits/perks)

Rules:
- Use inclusive language (avoid gendered words)
- Be specific and concrete — no vague fluff
- Make the role sound exciting and meaningful
- Format clearly with headers and bullet points
- Do not add a preamble — output the job description directly`;

      const userInput = `Job Title: ${jobTitle}
${company ? `Company: ${company}` : ""}
Type: ${jobType}
Level: ${level}
${location ? `Location: ${location}` : ""}
${skills ? `Key skills/requirements: ${skills}` : ""}
${extras ? `Additional info: ${extras}` : ""}`;

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

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, color: "var(--text)", outline: "none" };
  const chipStyle = (active: boolean) => ({ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: active ? "var(--accent)" : "var(--surface)", color: active ? "#fff" : "var(--text)" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Job Description Writer
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Generate a professional, ready-to-post job description with AI. Just fill in the details — done in seconds.
          </p>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
            <div>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Job Title *</label>
              <input style={inputStyle} placeholder="e.g. Senior React Developer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Company <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
              <input style={inputStyle} placeholder="e.g. Acme Ltd" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Job Type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TYPES.map((t) => <button key={t} style={chipStyle(jobType === t)} onClick={() => setJobType(t)}>{t}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Experience Level</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {LEVELS.map((l) => <button key={l} style={chipStyle(level === l)} onClick={() => setLevel(l)}>{l}</button>)}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
            <div>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Location <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
              <input style={inputStyle} placeholder="e.g. London / Remote" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Key Skills <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
              <input style={inputStyle} placeholder="e.g. React, TypeScript, 5yrs exp" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Additional notes <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
            <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} placeholder="e.g. salary range, specific perks, team size, culture notes…" value={extras} onChange={(e) => setExtras(e.target.value)} />
          </div>

          <button
            onClick={generate}
            disabled={loading || !jobTitle.trim()}
            style={{ width: "100%", background: loading || !jobTitle.trim() ? "var(--muted)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, cursor: loading || !jobTitle.trim() ? "default" : "pointer" }}
          >
            {loading ? "Writing job description…" : "Generate Job Description ✦"}
          </button>
        </div>

        {error && <div style={{ background: "var(--accent2-light)", border: "1px solid var(--accent2-glow)", borderRadius: 10, padding: "1rem", marginBottom: "1rem", color: "var(--accent2)", fontSize: 14 }}>{error}</div>}

        {result && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Job Description</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={copy} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied ? "var(--success)" : "var(--surface2)", color: copied ? "#fff" : "var(--text)" }}>{copied ? "Copied!" : "Copy"}</button>
                <button onClick={generate} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: "var(--surface2)", color: "var(--text)" }}>Regenerate</button>
              </div>
            </div>
            <div style={{ background: "var(--bg)", borderRadius: 10, padding: "1.25rem", whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.8, color: "var(--text)" }}>
              {result}
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>Related tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/cover-letter-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Cover Letter Generator →</Link>
            <Link href="/tools/resume-bullet-writer" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Resume Bullet Writer →</Link>
            <Link href="/tools/cold-email-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Cold Email Generator →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
