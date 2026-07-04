"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PNG to PDF Converter — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/png-to-pdf",
  description: "Free PNG to PDF converter. Runs in your browser — no upload required.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

interface ImageFile { file: File; url: string; id: string; }

export default function PngToPdfClient() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [pageSize, setPageSize] = useState<"fit" | "a4">("fit");
  const inputRef = useRef<HTMLInputElement>(null);
  const jsPDFRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => { jsPDFRef.current = (window as any).jspdf?.jsPDF || (window as any).jsPDF; };
    document.head.appendChild(script);
  }, []);

  const handleFiles = (incoming: FileList) => {
    const valid = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
    const newImages: ImageFile[] = valid.map((f) => ({ file: f, url: URL.createObjectURL(f), id: Math.random().toString(36).slice(2) }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const remove = (id: string) => setImages((prev) => prev.filter((img) => img.id !== id));

  const generatePdf = async () => {
    if (!images.length || !jsPDFRef.current) return;
    setGenerating(true);

    const loadImage = (src: string): Promise<HTMLImageElement> => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    try {
      const JsPDF = jsPDFRef.current;
      let doc: any = null;

      for (let i = 0; i < images.length; i++) {
        const img = await loadImage(images[i].url);
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        let pdfW: number, pdfH: number;
        if (pageSize === "a4") {
          pdfW = 210; pdfH = 297;
        } else {
          // Convert px to mm (96dpi → 25.4mm/inch)
          pdfW = (imgW / 96) * 25.4;
          pdfH = (imgH / 96) * 25.4;
        }

        if (i === 0) {
          doc = new JsPDF({ orientation: pdfW > pdfH ? "landscape" : "portrait", unit: "mm", format: pageSize === "a4" ? "a4" : [pdfW, pdfH] });
        } else {
          doc.addPage(pageSize === "a4" ? "a4" : [pdfW, pdfH], pdfW > pdfH ? "landscape" : "portrait");
        }

        if (pageSize === "a4") {
          // Scale to fit A4
          const ratio = Math.min(pdfW / imgW, pdfH / imgH);
          const w = imgW * ratio;
          const h = imgH * ratio;
          const x = (pdfW - w) / 2;
          const y = (pdfH - h) / 2;
          doc.addImage(images[i].url, "PNG", x, y, w, h);
        } else {
          doc.addImage(images[i].url, "PNG", 0, 0, pdfW, pdfH);
        }
      }

      doc.save("images.pdf");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            PNG to PDF Converter
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Convert PNG (or JPG) images to a PDF in your browser. Combine multiple images into one PDF. Free, no upload, 100% private.
          </p>
        </div>

        {/* Options */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Page size</label>
          <button onClick={() => setPageSize("fit")} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: pageSize === "fit" ? "var(--accent)" : "var(--surface)", color: pageSize === "fit" ? "#fff" : "var(--text)" }}>Fit to image</button>
          <button onClick={() => setPageSize("a4")} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1px solid var(--border)", cursor: "pointer", background: pageSize === "a4" ? "var(--accent)" : "var(--surface)", color: pageSize === "a4" ? "#fff" : "var(--text)" }}>A4</button>
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
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />
          <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>Drop PNG/JPG images here or click to upload</p>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Multiple files supported — each image becomes one PDF page</p>
        </div>

        {/* Image list */}
        {images.length > 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginBottom: "1.5rem" }}>
              {images.map((img) => (
                <div key={img.id} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img src={img.url} alt={img.file.name} style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
                  <button
                    onClick={() => remove(img.id)}
                    style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >×</button>
                </div>
              ))}
            </div>
            <button
              onClick={generatePdf}
              disabled={generating}
              style={{ width: "100%", background: generating ? "var(--muted)" : "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, cursor: generating ? "default" : "pointer" }}
            >
              {generating ? "Generating PDF…" : `Convert ${images.length} image${images.length > 1 ? "s" : ""} to PDF`}
            </button>
          </>
        )}

        {/* Related */}
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>More image tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/tools/image-compressor" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Image Compressor →</Link>
            <Link href="/tools/webp-to-jpg" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>WebP to JPG →</Link>
            <Link href="/tools/svg-to-png" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>SVG to PNG →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
