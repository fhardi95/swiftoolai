"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Color Picker — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/color-picker",
  description: "Free online colour picker. Convert HEX, RGB, HSL. Copy CSS code instantly.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function complementary(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return `#${(255 - r).toString(16).padStart(2, "0")}${(255 - g).toString(16).padStart(2, "0")}${(255 - b).toString(16).padStart(2, "0")}`;
}

function shades(hex: string): string[] {
  const { h, s } = rgbToHsl(...Object.values(hexToRgb(hex)) as [number, number, number]);
  return [90, 75, 60, 45, 30, 20, 10].map((l) => `hsl(${h},${s}%,${l}%)`);
}

export default function ColorPickerClient() {
  const [color, setColor] = useState("#2563eb");
  const [hexInput, setHexInput] = useState("#2563eb");
  const [copied, setCopied] = useState<string | null>(null);

  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);
  const comp = complementary(color);
  const palette = shades(color);

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleHexInput = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setColor(val);
  };

  const copyBtn = (label: string, value: string, key: string) => (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</p>
        <code style={{ fontSize: 14, fontFamily: "monospace" }}>{value}</code>
      </div>
      <button
        onClick={() => copy(value, key)}
        style={{ padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === key ? "var(--success)" : "var(--surface2)", color: copied === key ? "#fff" : "var(--text)", transition: "all 0.2s" }}
      >
        {copied === key ? "✓" : "Copy"}
      </button>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Color Picker
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Pick a colour and get HEX, RGB, HSL values instantly. Copy CSS code with one click.
          </p>
        </div>

        {/* Picker */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: "1.5rem" }}>
          <input
            type="color" value={color}
            onChange={(e) => { setColor(e.target.value); setHexInput(e.target.value); }}
            style={{ width: 80, height: 80, border: "2px solid var(--border)", borderRadius: 12, cursor: "pointer", padding: 4 }}
          />
          <div style={{ flex: 1 }}>
            <input
              type="text" value={hexInput}
              onChange={(e) => handleHexInput(e.target.value)}
              placeholder="#2563eb"
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 16, fontFamily: "monospace", color: "var(--text)" }}
            />
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>Click the swatch or type a HEX code</p>
          </div>
          <div style={{ width: 60, height: 80, borderRadius: 12, background: color, border: "2px solid var(--border)", boxShadow: `0 4px 20px ${color}40` }} />
        </div>

        {/* Values */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {copyBtn("HEX", color.toUpperCase(), "hex")}
          {copyBtn("RGB", `rgb(${r}, ${g}, ${b})`, "rgb")}
          {copyBtn("HSL", `hsl(${h}, ${s}%, ${l}%)`, "hsl")}
          {copyBtn("CSS Variable", `--color: ${color};`, "cssvar")}
        </div>

        {/* Complementary */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 10 }}>Complementary Colour</p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: comp, border: "1px solid var(--border)" }} />
            <code style={{ fontSize: 14, fontFamily: "monospace" }}>{comp.toUpperCase()}</code>
            <button onClick={() => copy(comp, "comp")} style={{ marginLeft: "auto", padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === "comp" ? "var(--success)" : "var(--surface2)", color: copied === "comp" ? "#fff" : "var(--text)" }}>
              {copied === "comp" ? "✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Shades */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 10 }}>Shades</p>
          <div style={{ display: "flex", gap: 6 }}>
            {palette.map((shade, i) => (
              <div
                key={i} title={shade}
                onClick={() => copy(shade, `shade-${i}`)}
                style={{ flex: 1, height: 48, borderRadius: 8, background: shade, cursor: "pointer", border: "1px solid rgba(0,0,0,0.08)", transition: "transform 0.15s" }}
              />
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>Click any shade to copy its HSL value</p>
        </div>
      </div>
    </>
  );
}
