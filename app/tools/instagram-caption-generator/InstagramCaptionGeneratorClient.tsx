"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Instagram Caption Generator — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/instagram-caption-generator",
  description: "Free AI Instagram caption generator with hashtags.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const NICHES = ["Lifestyle", "Travel", "Food", "Fitness", "Fashion", "Business", "Tech", "Beauty", "Nature", "Art"];
const TONES = ["Inspiring", "Funny", "Casual", "Professional", "Emotional", "Witty", "Minimalist"];
const LENGTHS = ["Short (1–2 lines)", "Medium (3–5 lines)", "Long (story-style)"];

interface Caption { caption: string; hashtags: string; }

export default function InstagramCaptionGeneratorClient() {
  const [description, setDescription] = useState("");
  const [niche, setNiche] = useState("Lifestyle");
  const [tone, setTone] = useState("Casual");
  const [length, setLength] = useState("Medium (3–5 lines)");
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const generate = async () => {
    if (!description.trim()) return;
    setLoading(true); setError(""); setCaptions([]);
    try {
      const systemPrompt = `You are an expert Instagram content creator who writes high-engagement captions.

Generate 3 different Instagram captions for the given photo/post description. Return as JSON array:
[
  {"caption": "...", "hashtags": "..."},
  {"caption": "...", "hashtags": "..."},
  {"caption": "...", "hashtags": "..."}
]

Caption rules:
- Match the requested tone and length
- Open with a strong hook
- Use line breaks for readability
- End with a question or CTA to boost comments
- Hashtags: 15–20 relevant, mix of large (1M+), medium (100k–1M), and niche tags
- Separate captions from hashtags — user can choose to include them or not
- Output ONLY the JSON — no markdown fences, no preamble`;

      const userInput = `Photo/post description: ${description}
Niche: ${niche}
Tone: ${tone}
Length: ${length}`;

      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userInput }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      const parsed: Caption[] = JSON.parse(data.result.replace(/```json|```/g, "").trim());
      setCaptions(parsed);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, color: "var(--text)", outline: "none" };
  const chipStyle = (active: boolean) => ({ padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 as const, border: "1px solid var(--border)", cursor: "pointer" as const, background: active ? "var(--accent)" : "var(--surface)", color: active ? "#fff" : "var(--text)" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Instagram Caption Generator
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Generate 3 ready-to-post Instagram captions with hashtags. Pick your niche, tone, and length — done in seconds.
          </p>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 8 }}>Describe your photo or post *</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} placeholder="e.g. Sunset at the beach in Bali, golden hour, barefoot in the sand, feeling free and grateful…" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Niche</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {NICHES.map((n) => <button key={n} style={chipStyle(niche === n)} onClick={() => setNiche(n)}>{n}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Tone</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {TONES.map((t) => <button key={t} style={chipStyle(tone === t)} onClick={() => setTone(t)}>{t}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", display: "block", marginBottom: 10 }}>Length</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {LENGTHS.map((l) => <button key={l} style={chipStyle(length === l)} onClick={() => setLength(l)}>{l}</button>)}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !description.trim()}
            style={{ width: "100%", background: loading || !description.trim() ? "var(--muted)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            {loading ? "Generating captions…" : "Generate 3 Captions ✦"}
          </button>
        </div>

        {error && <div style={{ background: "var(--accent2-light)", border: "1px solid var(--accent2-glow)", borderRadius: 10, padding: "1rem", marginBottom: "1rem", color: "var(--accent2)", fontSize: 14 }}>{error}</div>}

        {captions.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {captions.map((cap, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--accent)" }}>Option {i + 1}</span>
                  <button
                    onClick={() => copy(i, `${cap.caption}\n\n${cap.hashtags}`)}
                    style={{ padding: "5px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === i ? "var(--success)" : "var(--surface2)", color: copied === i ? "#fff" : "var(--text)" }}
                  >
                    {copied === i ? "Copied!" : "Copy all"}
                  </button>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap", marginBottom: 12 }}>{cap.caption}</p>
                <p style={{ fontSize: 13, color: "var(--accent)", lineHeight: 1.6 }}>{cap.hashtags}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>More AI writing tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/linkedin-post-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>LinkedIn Post Generator →</Link>
            <Link href="/tools/ai-email-writer" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>AI Email Writer →</Link>
            <Link href="/tools/bio-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Bio Generator →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
