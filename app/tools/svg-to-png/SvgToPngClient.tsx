"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SVG to PNG Converter — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/svg-to-png",
  description: "Free SVG to PNG converter. Runs in your browser — no upload required.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const SIZES = [
  { label: "Original", value: 0 },
  { label: "256 px", value: 256 },
  { label: "512 px", value: 512 },
  { label: "1024 px", value: 1024 },
  { label: "2048 px", value: 2048 },
];

export default function SvgToPngClient() {
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [svgName, setSvgName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [outputSize, setOutputSize] = useState(0);
  const [transparent, setTransparent] = useState(true);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = (svg: string, name: string, size: number, transp: boolean) => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const w = size || img.naturalWidth || 512;
      const h = size ? Math.round((img.naturalHeight / img.naturalWidth) * size) : img.naturalHeight || 512;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      if (!transp) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      setPngUrl(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".svg") && file.type !== "image/svg+xml") return;
    setSvgName(file.name.replace(/\.svg$/i, ""));
    const reader = new FileReader();
    reader.onload = (e) => {
      const svg = e.target!.result as string;
      setSvgContent(svg);
      convert(svg, file.name, outputSize, transparent);
    };
    reader.readAsText(file);
  };

  const handleSizeChange = (size: number) => {
    setOutputSize(size);
    if (svgContent) convert(svgContent, svgName, size, transparent);
  };

  const handleTransparentChange = (val: boolean) => {
    setTransparent(val);
    if (svgContent) convert(svgContent, svgName, outputSize, val);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            SVG to PNG Converter
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Convert SVG vector files to PNG images. Choose output size and background. 100% private — runs in your browser.
          </p>
        </div>

        {/* Options */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1rem", display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Size</label>
            <select
              value={outputSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, color: "var(--text)" }}
            >
              {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Background</label>
            <button onClick={() => handleTransparentChange(true)} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: transparent ? "var(--accent)" : "var(--surface)", color: transparent ? "#fff" : "var(--text)" }}>Transparent</button>
            <button onClick={() => handleTransparentChange(false)} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: !transparent ? "var(--accent)" : "var(--surface)", color: !transparent ? "#fff" : "var(--text)" }}>White</button>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 16, padding: "3rem 2rem", textAlign: "center", cursor: "pointer",
            background: dragging ? "var(--accent-light)" : "var(--surface)", transition: "all 0.2s", marginBottom: "1.5rem",
          }}
        >
          <input ref={inputRef} type="file" accept=".svg,image/svg+xml" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div style={{ fontSize: 40, marginBottom: 12 }}>📐</div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>Drop your SVG file here or click to upload</p>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Converted instantly in your browser — no upload</p>
        </div>

        {/* Result */}
        {pngUrl && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
            <img src={pngUrl} alt="Converted PNG" style={{ maxWidth: "100%", maxHeight: 300, objectFit: "contain", borderRadius: 8, marginBottom: 16, background: transparent ? "repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 0 0 / 16px 16px" : "#fff" }} />
            <a
              href={pngUrl} download={`${svgName}.png`}
              style={{ display: "inline-block", background: "var(--accent)", color: "#fff", padding: "0.7rem 2rem", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
            >
              Download PNG
            </a>
          </div>
        )}

        {/* Related */}
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>More image tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/image-compressor" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Image Compressor →</Link>
            <Link href="/tools/webp-to-jpg" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>WebP to JPG →</Link>
            <Link href="/tools/png-to-pdf" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>PNG to PDF →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
