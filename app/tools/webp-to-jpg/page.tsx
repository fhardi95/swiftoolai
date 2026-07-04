import type { Metadata } from "next";
import WebpToJpgClient from "./WebpToJpgClient";

export const metadata: Metadata = {
  title: "WebP to JPG Converter Free Online – Convert Images Instantly | SwiftoolAI",
  description:
    "Convert WebP images to JPG online for free with SwiftoolAI. Fast, private, and watermark-free — all processing happens in your browser, no server uploads. No sign-up needed. Perfect for sharing WebP images on platforms that don't support the format.",
  keywords: [
    "WebP to JPG converter free",
    "convert WebP to JPG online",
    "WebP to JPEG converter free",
    "WebP image converter",
    "convert WebP to JPG no sign up",
    "browser based WebP converter",
    "WebP to JPG instant",
    "free WebP to JPEG tool",
    "WebP to JPG no watermark",
    "online WebP converter",
    "download WebP as JPG",
    "WebP to JPG private",
    "best WebP to JPG converter",
    "convert WebP images free",
  ],
  openGraph: {
    title: "Free WebP to JPG Converter — Instant & Private | SwiftoolAI",
    description:
      "Convert WebP to JPG instantly in your browser. Free, private, no server uploads, no sign-up.",
    url: "https://www.swiftoolai.com/tools/webp-to-jpg",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/webp-to-jpg" },
};

const SEOPARAGRAPH = `WebP is a modern image format offering excellent compression, but many platforms, email clients, and applications still require the widely-compatible JPG format. SwiftoolAI's **WebP to JPG Converter** solves this instantly and for free. Upload your WebP file and receive a high-quality JPG download in seconds. All conversion happens directly in your browser — your images never leave your device, ensuring complete privacy with no server uploads. Whether you're sharing images on platforms that don't support WebP, preparing photos for email, or needing broader compatibility, our free online tool delivers clean, watermark-free JPG results without any registration.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's WebP to JPG Converter?",
    answer:
      "It is a free online tool that converts WebP image files to JPG format entirely in your browser, instantly and without uploading files to any server.",
  },
  {
    question: "How do I convert WebP to JPG?",
    answer:
      "Upload your WebP file and click Convert. Your JPG file will be ready to download in seconds.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Are my images kept private?",
    answer:
      "Yes, completely. All processing happens in your browser. Your images never leave your device and are never sent to any server.",
  },
  {
    question: "Why would I need to convert WebP to JPG?",
    answer:
      "WebP is not universally supported. Many email clients, social media platforms, image editing tools, and websites require JPG. Converting to JPG ensures your images are compatible with all platforms.",
  },
  {
    question: "Will the converted JPG have a watermark?",
    answer:
      "No. All JPG files converted with SwiftoolAI are completely watermark-free.",
  },
  {
    question: "Will converting to JPG reduce image quality?",
    answer:
      "JPG uses lossy compression, so there may be a very slight quality reduction, though for most purposes this is imperceptible. The output maintains high visual quality suitable for web and sharing use.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "No account or sign-up needed. Use the converter immediately.",
  },
];

const _s = {
  wrap: { maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
  faqItem: (last: boolean) => ({ borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.06)", paddingBottom: 16, marginBottom: 16 } as React.CSSProperties),
  faqQ: { fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 } as React.CSSProperties,
  link: { color: "#2563eb", fontSize: 13, textDecoration: "none" }  as React.CSSProperties,
};

export default function WebpToJpgPage() {
  return (
    <>
      <WebpToJpgClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free WebP to JPG Converter</h2>
          <p style={{..._s.p}}>{SEOPARAGRAPH}</p>
        </section>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>FAQ</div>
          <h2 style={{..._s.h2}}>Frequently Asked Questions</h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{..._s.faqItem(i === FAQS.length - 1)}}>
                <div style={{..._s.faqQ}}>{faq.question}</div>
                <p style={{..._s.p, marginBottom: 0}}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>More Tools</div>
          <h2 style={{..._s.h2}}>Explore More Free Converter Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/svg-to-png" style={{..._s.link}}>SVG to PNG Converter</a>
            <a href="https://www.swiftoolai.com/tools/png-to-pdf" style={{..._s.link}}>PNG to PDF Converter</a>
            <a href="https://www.swiftoolai.com/tools/cdr-to-jpg" style={{..._s.link}}>CDR to JPG Converter</a>
            <a href="https://www.swiftoolai.com/tools/image-compressor" style={{..._s.link}}>Image Compressor</a>
            <a href="https://www.swiftoolai.com/tools/color-picker" style={{..._s.link}}>Color Picker</a>
            <a href="https://www.swiftoolai.com/tools/qr-code-generator" style={{..._s.link}}>QR Code Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
