"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WebP to JPG Converter — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/webp-to-jpg",
  description: "Free online WebP to JPG converter. Runs in your browser — no upload required.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

interface ConvertedFile { name: string; originalUrl: string; convertedUrl: string; originalSize: number; convertedSize: number; }

function formatBytes(b: number) {
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  return (b / (1024 * 1024)).toFixed(2) + " MB";
}

export default function WebpToJpgClient() {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [quality, setQuality] = useState(92);
  const inputRef = useRef<HTMLInputElement>(null);

  const convertFile = (file: File): Promise<ConvertedFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d")!.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (!blob) return;
            resolve({
              name: file.name.replace(/\.webp$/i, ".jpg"),
              originalUrl: URL.createObjectURL(file),
              convertedUrl: URL.createObjectURL(blob),
              originalSize: file.size,
              convertedSize: blob.size,
            });
          }, "image/jpeg", quality / 100);
        };
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (incoming: FileList) => {
    const webpFiles = Array.from(incoming).filter((f) => f.type === "image/webp" || f.name.endsWith(".webp"));
    const converted = await Promise.all(webpFiles.map(convertFile));
    setFiles((prev) => [...prev, ...converted]);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            WebP to JPG Converter
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Convert WebP images to JPG in your browser. No upload, 100% private. Batch convert multiple files at once.
          </p>
        </div>

        {/* Quality */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 16 }}>
          <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>JPG Quality</label>
          <input type="range" min={60} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} style={{ flex: 1, accentColor: "var(--accent)" }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--accent)", fontSize: "1rem", minWidth: 36 }}>{quality}%</span>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 16, padding: "3rem 2rem", textAlign: "center", cursor: "pointer",
            background: dragging ? "var(--accent-light)" : "var(--surface)", transition: "all 0.2s", marginBottom: "1.5rem",
          }}
        >
          <input ref={inputRef} type="file" accept="image/webp,.webp" multiple style={{ display: "none" }} onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔄</div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>Drop WebP files here or click to upload</p>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Multiple files supported — converted instantly in your browser</p>
        </div>

        {/* Results */}
        {files.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>{files.length} file{files.length > 1 ? "s" : ""} converted</p>
              <button onClick={() => setFiles([])} style={{ fontSize: 13, color: "var(--muted)", background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "4px 12px", cursor: "pointer" }}>Clear all</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {files.map((f, i) => (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={f.convertedUrl} alt={f.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted)" }}>{formatBytes(f.originalSize)} → <span style={{ color: "var(--success)", fontWeight: 700 }}>{formatBytes(f.convertedSize)}</span></p>
                  </div>
                  <a
                    href={f.convertedUrl} download={f.name}
                    style={{ flexShrink: 0, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Related tools */}
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.95rem" }}>More image tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "1rem" }}>
            <Link href="/tools/image-compressor" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Image Compressor →</Link>
            <Link href="/tools/svg-to-png" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>SVG to PNG →</Link>
            <Link href="/tools/png-to-pdf" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>PNG to PDF →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
