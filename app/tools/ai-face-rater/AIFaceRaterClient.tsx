"use client";
import { useState, useRef, useCallback } from "react";

// ─── Schema.org structured data ──────────────────────────────────────────────
const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Face Rater — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/ai-face-rater",
  description:
    "Free online AI face rating tool. Upload a photo and get an instant AI-powered attractiveness score with personalized feedback on facial features, symmetry, and aesthetics.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "AI facial attractiveness score out of 10",
    "Detailed feature-by-feature feedback",
    "Facial symmetry analysis",
    "Aesthetic style suggestions",
    "No sign-up or account required",
    "100% private — image not stored",
  ],
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the AI face rater work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI Face Rater uses advanced multimodal AI to analyse your uploaded photo. It evaluates facial symmetry, feature proportions, skin clarity, and overall aesthetic harmony to generate a score out of 10 along with personalised, constructive feedback.",
      },
    },
    {
      "@type": "Question",
      name: "Is the AI face rating accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool provides an AI-generated aesthetic analysis based on general facial harmony principles. It is intended for fun and self-improvement insights, not as a definitive measure of beauty. Beauty is subjective and deeply personal.",
      },
    },
    {
      "@type": "Question",
      name: "Is my photo stored or shared?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your photo is sent securely to generate the rating and is never stored on our servers. We do not share, sell, or retain any images submitted through this tool.",
      },
    },
    {
      "@type": "Question",
      name: "What photo should I upload for the best result?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload a clear, well-lit frontal face photo with no filters or heavy editing for the most accurate analysis. Good natural lighting and a plain background produce the best results.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rate someone else's face?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only upload photos of people who have given their consent. Do not upload photos of minors. Use this tool responsibly and respectfully.",
      },
    },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────
function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => {
      const result = r.result as string;
      res(result.split(",")[1]);
    };
    r.onerror = () => rej(new Error("Failed to read file"));
    r.readAsDataURL(file);
  });
}

const SCORE_COLOR = (score: number) => {
  if (score >= 8) return "#16a34a";
  if (score >= 6) return "#2563eb";
  if (score >= 4) return "#d97706";
  return "#dc2626";
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIFaceRaterClient() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }
    setFile(f);
    setResult(null);
    setScore(null);
    setError("");
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleRate = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    setScore(null);

    try {
      const base64 = await toBase64(file);
      const mediaType = file.type as
        | "image/jpeg"
        | "image/png"
        | "image/gif"
        | "image/webp";

      // Call our server-side route — keeps the API key secure and avoids CORS
      const response = await fetch("/api/rate-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "API error");

      const parsed = data.result;

      setScore(parsed.score);
      setResult(JSON.stringify(parsed));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setResult(null);
    setScore(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  let parsed: {
    score: number;
    verdict: string;
    summary: string;
    strengths: string[];
    tips: string[];
    symmetry: string;
    vibe: string;
  } | null = null;
  try {
    if (result) parsed = JSON.parse(result);
  } catch {
    /* ignore */
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {/* ── Hero Header ── */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: "#2563eb",
              marginBottom: "1rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            ✨ AI-Powered · Free · No Sign-up
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
              color: "#111827",
              lineHeight: 1.15,
            }}
          >
            AI Face Rater
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: 17,
              lineHeight: 1.65,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Upload your photo and get an instant AI-powered attractiveness score,
            symmetry analysis, and personalised aesthetic feedback — free, private,
            and no account needed.
          </p>
        </div>

        {/* ── Upload Area ── */}
        {!preview && (
          <div
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? "#2563eb" : "#d1d5db"}`,
              borderRadius: 16,
              background: dragging ? "#eff6ff" : "#f9fafb",
              padding: "4rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: "1rem" }}>🤳</div>
            <p style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 6 }}>
              Drop your photo here
            </p>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: "1.5rem" }}>
              or click to browse — JPG, PNG, WEBP supported
            </p>
            <span
              style={{
                display: "inline-block",
                background: "#2563eb",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Choose Photo
            </span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onInputChange}
            />
          </div>
        )}

        {/* ── Preview + Rate ── */}
        {preview && !parsed && (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                marginBottom: "1.5rem",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Uploaded face for AI rating"
                style={{ maxWidth: "100%", maxHeight: 400, display: "block" }}
              />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={handleRate}
                disabled={loading}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 36px",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                  transition: "opacity 0.15s",
                }}
              >
                {loading ? "Analysing…" : "⭐ Rate My Face"}
              </button>
              <button
                onClick={reset}
                style={{
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Change Photo
              </button>
            </div>
            {loading && (
              <p style={{ color: "#6b7280", fontSize: 14, marginTop: "1rem" }}>
                🔍 AI is analysing facial features, symmetry &amp; aesthetics…
              </p>
            )}
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#dc2626",
              fontSize: 14,
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        {/* ── Results Card ── */}
        {parsed && (
          <div>
            {/* Score Banner */}
            <div
              style={{
                background: "#111827",
                borderRadius: 16,
                padding: "2rem",
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "#fff",
              }}
            >
              <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Rated face"
                    style={{
                      width: 90, height: 90,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid rgba(255,255,255,0.2)",
                    }}
                  />
                )}
                <div>
                  <div
                    style={{
                      fontSize: "clamp(3rem, 8vw, 5rem)",
                      fontWeight: 800,
                      color: SCORE_COLOR(parsed.score),
                      lineHeight: 1,
                    }}
                  >
                    {parsed.score}
                    <span style={{ fontSize: "1.5rem", color: "#9ca3af" }}>/10</span>
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#f9fafb",
                      marginTop: 4,
                    }}
                  >
                    {parsed.verdict}
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div style={{ marginTop: "1.5rem", maxWidth: 400, margin: "1.5rem auto 0" }}>
                <div
                  style={{
                    height: 8,
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(parsed.score / 10) * 100}%`,
                      background: SCORE_COLOR(parsed.score),
                      borderRadius: 100,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#6b7280",
                    marginTop: 4,
                  }}
                >
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* Detail cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {/* Summary */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 12,
                  padding: "1.25rem",
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  🌟 Overall Impression
                </h3>
                <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.6 }}>
                  {parsed.summary}
                </p>
              </div>

              {/* Vibe */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 12,
                  padding: "1.25rem",
                }}
              >
                <h3 style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  ✨ Aesthetic Vibe
                </h3>
                <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.6 }}>
                  {parsed.vibe}
                </p>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f3f4f6" }}>
                  <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>Symmetry: </span>
                  <span style={{ fontSize: 13, color: "#374151" }}>{parsed.symmetry}</span>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 12,
                padding: "1.25rem",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                💪 Your Strengths
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {parsed.strengths.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 15,
                      color: "#166534",
                      padding: "4px 0",
                    }}
                  >
                    <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 12,
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#1e40af", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                💡 Friendly Tips
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {parsed.tips.map((t, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: 15,
                      color: "#1e40af",
                      padding: "4px 0",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reset */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={reset}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "13px 32px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                }}
              >
                🔄 Rate Another Photo
              </button>
            </div>
          </div>
        )}

        {/* ── Disclaimer ── */}
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: 12,
            marginTop: "2rem",
            lineHeight: 1.6,
          }}
        >
          ⚠️ For entertainment and self-improvement purposes only. Beauty is subjective. This tool does not
          store your photos. Only upload photos with the subject&apos;s consent.
        </p>
      </div>
    </>
  );
}
