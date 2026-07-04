"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/qr-code-generator",
  description: "Free online QR code generator. Create QR codes for URLs, text, Wi-Fi, email, and phone.",
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
      name: "Are these QR codes free to use commercially?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. QR codes generated on SwiftToolAI are completely free with no watermark, and you can use them for personal or commercial purposes without restriction." },
    },
    {
      "@type": "Question",
      name: "Do QR codes expire?",
      acceptedAnswer: { "@type": "Answer", text: "Static QR codes (like those created here) never expire. They encode the data directly, so they will work as long as the destination URL or content remains valid." },
    },
    {
      "@type": "Question",
      name: "What size should a QR code be for print?",
      acceptedAnswer: { "@type": "Answer", text: "For reliable scanning, a QR code should be at least 2cm × 2cm in print. Use our 512px or 1024px download options for high-resolution print use." },
    },
  ],
};

type QRType = "url" | "text" | "email" | "phone" | "wifi";

const TYPES: { value: QRType; label: string }[] = [
  { value: "url", label: "URL" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "wifi", label: "Wi-Fi" },
];

export default function QrCodeGeneratorClient() {
  const [type, setType] = useState<QRType>("url");
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ssid, setSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiSec, setWifiSec] = useState("WPA");
  const [fgColor, setFgColor] = useState("#111827");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getQrContent = () => {
    switch (type) {
      case "url": return url;
      case "text": return text;
      case "email": return `mailto:${email}`;
      case "phone": return `tel:${phone}`;
      case "wifi": return `WIFI:T:${wifiSec};S:${ssid};P:${wifiPass};;`;
    }
  };

  const generateQR = async () => {
    const content = getQrContent();
    if (!content || content === "https://" || content === "mailto:" || content === "tel:") return;
    setLoading(true);
    try {
      // Use qrserver API for reliable generation
      const encodedContent = encodeURIComponent(content);
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedContent}&color=${fgColor.replace("#","")}&bgcolor=${bgColor.replace("#","")}&format=png`;
      setQrDataUrl(apiUrl);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { generateQR(); }, [type, url, text, email, phone, ssid, wifiPass, wifiSec, fgColor, bgColor, size]);

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: 10,
    border: "1px solid var(--border)", background: "var(--bg)",
    fontSize: 14, color: "var(--text)", outline: "none",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            QR Code Generator
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Create QR codes for URLs, text, Wi-Fi, email, or phone. Free, no watermark, instant download.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Left: controls */}
          <div>
            {/* Type selector */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    border: "1px solid var(--border)", cursor: "pointer",
                    background: type === t.value ? "var(--accent)" : "var(--surface)",
                    color: type === t.value ? "#fff" : "var(--text)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Inputs per type */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {type === "url" && <input style={inputStyle} placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />}
              {type === "text" && <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder="Enter any text…" value={text} onChange={(e) => setText(e.target.value)} />}
              {type === "email" && <input style={inputStyle} placeholder="hello@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />}
              {type === "phone" && <input style={inputStyle} placeholder="+44 7700 900000" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />}
              {type === "wifi" && (
                <>
                  <input style={inputStyle} placeholder="Wi-Fi network name (SSID)" value={ssid} onChange={(e) => setSsid(e.target.value)} />
                  <input style={inputStyle} placeholder="Password" type="password" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} />
                  <select style={inputStyle} value={wifiSec} onChange={(e) => setWifiSec(e.target.value)}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No password</option>
                  </select>
                </>
              )}
            </div>

            {/* Colours & size */}
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label style={{ fontSize: 13, color: "var(--muted)", width: 80 }}>Foreground</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: 40, height: 32, border: "none", cursor: "pointer", borderRadius: 6 }} />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{fgColor}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label style={{ fontSize: 13, color: "var(--muted)", width: 80 }}>Background</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: 40, height: 32, border: "none", cursor: "pointer", borderRadius: 6 }} />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{bgColor}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label style={{ fontSize: 13, color: "var(--muted)", width: 80 }}>Size</label>
                <select style={{ ...inputStyle, width: "auto" }} value={size} onChange={(e) => setSize(Number(e.target.value))}>
                  <option value={128}>128 px</option>
                  <option value={256}>256 px</option>
                  <option value={512}>512 px</option>
                  <option value={1024}>1024 px (print)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: preview */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{
              width: "100%", aspectRatio: "1", background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 16,
            }}>
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <p style={{ color: "var(--muted)", fontSize: 13 }}>Enter content to generate</p>
              )}
            </div>
            {qrDataUrl && (
              <a
                href={qrDataUrl}
                download="qr-code.png"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "100%", textAlign: "center", background: "var(--accent)", color: "#fff", padding: "0.7rem 1rem", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                Download QR Code PNG
              </a>
            )}
          </div>
        </div>

        {/* SEO */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
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
