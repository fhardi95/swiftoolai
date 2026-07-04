"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Compressor — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/image-compressor",
  description: "Free online image compressor. Compress JPG, PNG and WebP images in your browser.",
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
      name: "Does image compression reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the compression level. At 80% quality, most images look identical to the original but are 40–70% smaller. At 60% quality, you may notice very slight softness. Our tool lets you choose the quality level so you stay in control.",
      },
    },
    {
      "@type": "Question",
      name: "Is my image uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SwiftToolAI's image compressor runs entirely in your browser using the Canvas API. Your image never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats can I compress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can compress JPG, PNG, and WebP images. The output is always saved as JPG for maximum compatibility and smallest file size.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum image size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no server-side limit because compression happens in your browser. Very large images (over 30MB) may take a few seconds to process depending on your device.",
      },
    },
  ],
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ImageCompressorClient() {
  const [original, setOriginal] = useState<{ file: File; url: string; size: number } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const compress = useCallback((file: File, q: number) => {
    setProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
            setProcessing(false);
          },
          "image/jpeg",
          q / 100
        );
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginal({ file, url, size: file.size });
    setCompressed(null);
    compress(file, quality);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleQualityChange = (q: number) => {
    setQuality(q);
    if (original) compress(original.file, q);
  };

  const saving = original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : 0;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>
            ← Back to tools
          </Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Image Compressor
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Compress JPG, PNG &amp; WebP images in your browser. 100% private — your image never leaves your device.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 16,
            padding: "3rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "var(--accent-light)" : "var(--surface)",
            transition: "all 0.2s",
            marginBottom: "1.5rem",
          }}
        >
          <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>
            Drop an image here or click to upload
          </p>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>JPG, PNG, WebP — processed entirely in your browser</p>
        </div>

        {/* Quality slider */}
        {original && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>
                Quality
              </label>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--accent)", fontSize: "1.1rem" }}>
                {quality}%
              </span>
            </div>
            <input
              type="range" min={10} max={100} value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>
        )}

        {/* Results */}
        {original && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
            {/* Original */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Original</p>
              <img src={original.url} alt="Original" style={{ width: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8, marginBottom: 8 }} />
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{formatBytes(original.size)}</p>
            </div>

            {/* Compressed */}
            <div style={{ background: "var(--surface)", border: `1px solid ${compressed ? "var(--accent)" : "var(--border)"}`, borderRadius: 12, padding: "1rem", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Compressed</p>
              {processing ? (
                <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 13 }}>Processing…</div>
              ) : compressed ? (
                <>
                  <img src={compressed.url} alt="Compressed" style={{ width: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8, marginBottom: 8 }} />
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--success)" }}>{formatBytes(compressed.size)}</p>
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* Saving badge + download */}
        {compressed && !processing && (
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div style={{ background: "var(--accent-light)", border: "1px solid var(--border-active)", borderRadius: 8, padding: "0.5rem 1rem", fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
              {saving > 0 ? `🎉 ${saving}% smaller` : "No reduction at this quality"}
            </div>
            <a
              href={compressed.url}
              download={`compressed-${original?.file.name?.replace(/\.[^.]+$/, "")}.jpg`}
              style={{ background: "var(--accent)", color: "#fff", padding: "0.6rem 1.5rem", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
            >
              Download Compressed Image
            </a>
            <button
              onClick={() => { setOriginal(null); setCompressed(null); }}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: 10, padding: "0.6rem 1rem", fontSize: 13, color: "var(--muted)" }}
            >
              Reset
            </button>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>More free tools</p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>Convert, compress, and create — all free, no sign-up.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/webp-to-jpg" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>WebP to JPG →</Link>
            <Link href="/tools/svg-to-png" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>SVG to PNG →</Link>
            <Link href="/tools/png-to-pdf" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>PNG to PDF →</Link>
          </div>
        </div>

        {/* SEO */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Why Compress Images?
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Large images slow down websites, increase storage costs, and use unnecessary mobile data. Compressing images to the smallest acceptable file size improves page load times, boosts SEO rankings, and provides a better experience for your visitors.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            Google's Core Web Vitals score penalises pages with oversized images. A compressed JPG at 80% quality is visually identical to the original but can be 60% smaller — a huge win for performance with no visible trade-off.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
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
    </>
  );
}
