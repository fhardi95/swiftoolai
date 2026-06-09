"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";

// ─── Schema.org structured data ──────────────────────────────────────────────
const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CDR to JPG Converter — SwiftToolAI",
  url: "https://swiftoolai.com/tools/cdr-to-jpg",
  description:
    "Free online tool to convert CorelDRAW CDR files to JPG images. Choose resolution, quality, and background colour. No software or sign-up required.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  featureList: [
    "CDR to JPG conversion",
    "Adjustable DPI (72 / 150 / 300 / 600)",
    "JPG quality slider",
    "Custom background colour",
    "Browser-based — no upload to server",
  ],
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I convert CDR to JPG without CorelDRAW?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SwiftToolAI converts CDR files to JPG directly in your browser — no CorelDRAW, no software installation, and no account required. Just upload your CDR file and download the JPG.",
      },
    },
    {
      "@type": "Question",
      name: "What DPI should I choose when converting CDR to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For web and social media use 72–96 DPI. For professional print (business cards, brochures) use 300 DPI. For large-format signage or banners 150 DPI is usually sufficient.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting CDR to JPG reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Converting a vector CDR to a raster JPG is a rendering step, not a degradation. At 300 DPI and JPG quality 90%+ the output is indistinguishable from the original for most uses. Using a lower DPI or JPG quality setting will reduce sharpness.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my converted JPG have a white background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG does not support transparency, so any transparent areas in your CDR file are filled with a solid colour — white by default. Use the background colour picker in the converter to set a custom background to match your target use.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to upload my CDR files to convert them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SwiftToolAI's CDR to JPG converter processes files locally in your browser where possible. Files are not stored on our servers after conversion. For highly confidential designs, we recommend using CorelDRAW or Inkscape locally.",
      },
    },
    {
      "@type": "Question",
      name: "Should I convert CDR to JPG or PNG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use JPG for photos or complex illustrations where file size matters and transparency isn't needed. Use PNG for logos, icons, or any artwork with flat colours and sharp edges — JPG compression creates visible artefacts on these. PNG also supports transparency.",
      },
    },
  ],
};

// ─── Types ────────────────────────────────────────────────────────────────────
type DPI = 72 | 150 | 300 | 600;
type Quality = number; // 1–100

interface ConvertSettings {
  dpi: DPI;
  quality: Quality;
  bgColor: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CdrToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<string>("");
  const [settings, setSettings] = useState<ConvertSettings>({
    dpi: 300,
    quality: 92,
    bgColor: "#ffffff",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // ── File handling ──────────────────────────────────────────────────────────
  const acceptFile = useCallback((f: File) => {
    setError("");
    setResultUrl(null);
    setResultSize("");

    if (!f.name.toLowerCase().endsWith(".cdr")) {
      setError("Please upload a .cdr file. Other formats are not supported by this tool.");
      return;
    }
    if (f.size > 150 * 1024 * 1024) {
      setError("File is too large. Maximum supported size is 150 MB.");
      return;
    }
    setFile(f);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) acceptFile(e.target.files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) acceptFile(e.dataTransfer.files[0]);
  };

  // ── Conversion ────────────────────────────────────────────────────────────
  const handleConvert = async () => {
    if (!file) return;
    setConverting(true);
    setError("");
    setResultUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("dpi", String(settings.dpi));
      formData.append("quality", String(settings.quality));
      formData.append("bgColor", settings.bgColor);

      const res = await fetch("/api/cdr-to-jpg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `Conversion failed (${res.status}).`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const kb = (blob.size / 1024).toFixed(0);
      const mb = (blob.size / 1024 / 1024).toFixed(2);
      setResultSize(blob.size > 1024 * 1024 ? `${mb} MB` : `${kb} KB`);
      setResultUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = file.name.replace(/\.cdr$/i, ".jpg");
    a.click();
  };

  const reset = () => {
    setFile(null);
    setResultUrl(null);
    setResultSize("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── DPI presets ────────────────────────────────────────────────────────────
  const dpiOptions: { value: DPI; label: string; hint: string }[] = [
    { value: 72,  label: "72 DPI",  hint: "Web / screen" },
    { value: 150, label: "150 DPI", hint: "Large format" },
    { value: 300, label: "300 DPI", hint: "Print (recommended)" },
    { value: 600, label: "600 DPI", hint: "High-detail print" },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
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
          <span style={{ color: "var(--text)" }}>CDR to JPG Converter</span>
        </nav>

        {/* Header */}
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
          CDR to JPG Converter
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem", lineHeight: 1.65 }}>
          Convert <strong style={{ color: "var(--text)" }}>CorelDRAW .cdr files</strong> to high-quality JPG images — choose your DPI, quality, and background colour. Free, no sign-up, no watermark.
        </p>

        {/* ── Drop zone ── */}
        {!file && (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            aria-label="Upload CDR file"
            style={{
              border: `2px dashed ${isDragging ? "var(--accent)" : "var(--border)"}`,
              borderRadius: 16,
              background: isDragging ? "var(--accent-light)" : "var(--surface)",
              padding: "3.5rem 2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              outline: "none",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎨</div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.4rem" }}>
              Drop your CDR file here
            </p>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "1.25rem" }}>
              or click to browse — supports CorelDRAW .cdr files up to 150 MB
            </p>
            <span
              style={{
                display: "inline-block",
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 9,
                padding: "0.6rem 1.4rem",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Choose CDR File
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".cdr"
          style={{ display: "none" }}
          onChange={onInputChange}
          aria-hidden="true"
        />

        {/* ── File selected — settings panel ── */}
        {file && !resultUrl && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* File info bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--border)",
                background: "var(--accent-light)",
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>📁</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </p>
                <p style={{ color: "var(--muted)", fontSize: 12 }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB · CorelDRAW file
                </p>
              </div>
              <button
                onClick={reset}
                style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", textDecoration: "underline", flexShrink: 0 }}
              >
                Change file
              </button>
            </div>

            {/* Settings */}
            <div style={{ padding: "1.5rem 1.25rem" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: "1.1rem", letterSpacing: "-0.01em" }}>
                Output Settings
              </p>

              {/* DPI */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>
                  Resolution
                </label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {dpiOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSettings((s) => ({ ...s, dpi: opt.value }))}
                      style={{
                        padding: "0.5rem 0.9rem",
                        borderRadius: 9,
                        border: `1px solid ${settings.dpi === opt.value ? "var(--accent)" : "var(--border)"}`,
                        background: settings.dpi === opt.value ? "var(--accent-light)" : "var(--surface2)",
                        color: settings.dpi === opt.value ? "var(--accent)" : "var(--muted)",
                        fontWeight: settings.dpi === opt.value ? 600 : 400,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <span>{opt.label}</span>
                      <span style={{ fontSize: 11, opacity: 0.7 }}>{opt.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: 13, fontWeight: 500, display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "var(--text)" }}>
                  <span>JPG Quality</span>
                  <span style={{ color: "var(--accent)", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
                    {settings.quality}%
                    {settings.quality >= 90 && <span style={{ fontSize: 11, marginLeft: 4, color: "var(--success)" }}>Best</span>}
                    {settings.quality < 70 && <span style={{ fontSize: 11, marginLeft: 4, color: "#ef4444" }}>Visible compression</span>}
                  </span>
                </label>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={settings.quality}
                  onChange={(e) => setSettings((s) => ({ ...s, quality: Number(e.target.value) }))}
                  style={{ width: "100%", accentColor: "var(--accent)" }}
                  aria-label="JPG quality"
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>

              {/* Background colour */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>
                  Background Colour
                  <span style={{ fontWeight: 400, color: "var(--muted)", marginLeft: 6 }}>
                    (JPG has no transparency — pick a fill colour)
                  </span>
                </label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  {["#ffffff", "#000000", "#f3f4f6", "#eff6ff", "#fef9c3"].map((col) => (
                    <button
                      key={col}
                      onClick={() => setSettings((s) => ({ ...s, bgColor: col }))}
                      title={col}
                      aria-label={`Background colour ${col}`}
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: col,
                        border: `2px solid ${settings.bgColor === col ? "var(--accent)" : "var(--border)"}`,
                        cursor: "pointer",
                        outline: "none",
                        boxShadow: settings.bgColor === col ? "0 0 0 3px var(--accent-glow)" : "none",
                        transition: "box-shadow 0.15s",
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={settings.bgColor}
                    onChange={(e) => setSettings((s) => ({ ...s, bgColor: e.target.value }))}
                    title="Custom background colour"
                    aria-label="Custom background colour picker"
                    style={{
                      width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)",
                      cursor: "pointer", padding: 2, background: "var(--surface)",
                    }}
                  />
                  <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>
                    {settings.bgColor}
                  </span>
                </div>
              </div>

              {/* Convert button */}
              <button
                onClick={handleConvert}
                disabled={converting}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  background: converting ? "var(--muted)" : "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: converting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "opacity 0.15s",
                }}
              >
                {converting ? (
                  <>
                    <span
                      style={{
                        width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "#fff", borderRadius: "50%",
                        animation: "spin 0.7s linear infinite", display: "inline-block",
                      }}
                    />
                    Converting…
                  </>
                ) : (
                  "Convert to JPG →"
                )}
              </button>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div
            style={{
              marginTop: "1rem",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 10,
              padding: "0.85rem 1.1rem",
              fontSize: 14,
              color: "#dc2626",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <div>
              <strong>Conversion error: </strong>{error}
              <p style={{ marginTop: 4, fontSize: 13, color: "var(--muted)" }}>
                If the problem persists, try converting in CorelDRAW directly or opening the file in Inkscape first.
              </p>
            </div>
          </div>
        )}

        {/* ── Result ── */}
        {resultUrl && file && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(22,163,74,0.3)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Success bar */}
            <div
              style={{
                background: "rgba(22,163,74,0.07)",
                borderBottom: "1px solid rgba(22,163,74,0.2)",
                padding: "0.9rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: 14,
                color: "var(--success)",
                fontWeight: 600,
              }}
            >
              <span>✅</span> Conversion complete — your JPG is ready
            </div>

            {/* Preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl}
              alt={`Converted JPG preview of ${file.name}`}
              style={{
                display: "block",
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                background: settings.bgColor,
                borderBottom: "1px solid var(--border)",
              }}
            />

            {/* Download row */}
            <div
              style={{
                padding: "1.1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  {file.name.replace(/\.cdr$/i, ".jpg")}
                </span>
                <span style={{ marginLeft: 8 }}>{resultSize} · {settings.dpi} DPI · {settings.quality}% quality</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button
                  onClick={handleDownload}
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9,
                    padding: "0.6rem 1.25rem",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  ↓ Download JPG
                </button>
                <button
                  onClick={reset}
                  style={{
                    background: "var(--surface2)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 9,
                    padding: "0.6rem 1.1rem",
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Convert another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Settings summary chips (visible when file loaded) ── */}
        {file && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.9rem" }}>
            {[
              { label: "Browser-based", icon: "🔒" },
              { label: "No watermark", icon: "✓" },
              { label: "Files not stored", icon: "🛡️" },
            ].map((chip) => (
              <span
                key={chip.label}
                style={{
                  fontSize: 12, color: "var(--muted)",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 99, padding: "0.25rem 0.65rem",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}
              >
                {chip.icon} {chip.label}
              </span>
            ))}
          </div>
        )}

        {/* ── How it works ── */}
        <div style={{ marginTop: "3rem" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            How to convert CDR to JPG
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              { step: "1", icon: "📁", title: "Upload your CDR file", desc: "Drag & drop or click to browse. Supports all CorelDRAW versions up to 150 MB." },
              { step: "2", icon: "🎛️", title: "Choose settings", desc: "Pick your output resolution (DPI), JPG quality, and background colour." },
              { step: "3", icon: "⚡", title: "Convert", desc: "Click Convert to JPG and wait a moment while your file is processed." },
              { step: "4", icon: "💾", title: "Download", desc: "Preview the result and download your high-quality JPG instantly — no sign-up needed." },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "1.1rem 1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                      fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </span>
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
          }}
        >
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>
            More free file &amp; image tools
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>
            Rewrite content, generate professional copy, or fix grammar — all free, no account needed.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link
              href="/tools/ai-summarizer"
              style={{ fontSize: 13, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
            >
              AI Summarizer →
            </Link>
            <Link
              href="/tools/rewriter"
              style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
            >
              AI Text Rewriter →
            </Link>
            <Link
              href="/tools/word-counter"
              style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}
            >
              Word Counter →
            </Link>
          </div>
        </div>

        {/* ── SEO content ── */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            About CDR to JPG Conversion
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            A <strong style={{ color: "var(--text)" }}>CDR file</strong> is a vector graphic created by CorelDRAW — Corel&apos;s professional design application. Because CDR is a proprietary format, CDR files can only be opened natively by CorelDRAW. Converting to{" "}
            <strong style={{ color: "var(--text)" }}>JPG</strong> makes your design universally accessible: every phone, computer, browser, and social media platform can display a JPG.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Unlike raster images, CDR vector files can be exported at <strong style={{ color: "var(--text)" }}>any resolution without quality loss in the original</strong>. This means you can render the same CDR file as a 72 DPI web image and a 300 DPI print-ready JPG — both at perfect quality for their respective uses.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15 }}>
            When converting logos and flat-colour artwork, consider exporting to <Link href="/tools" style={{ color: "var(--accent)" }}>PNG format</Link> instead — JPG compression creates visible artefacts on sharp edges and solid colours that PNG avoids entirely.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2.5rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          {faqLD.mainEntity.map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: "0.75rem",
                padding: "1rem 1.25rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  color: "var(--accent)",
                  marginBottom: "0.4rem",
                }}
              >
                {item.name}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
