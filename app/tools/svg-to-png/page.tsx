import type { Metadata } from "next";
import SvgToPngClient from "./SvgToPngClient";

export const metadata: Metadata = {
  title: "SVG to PNG Converter Free Online – Convert Vector to Image | SwiftoolAI",
  description:
    "Convert SVG files to high-quality PNG images online for free with SwiftoolAI. Choose your output size and background color. All processing happens in your browser — 100% private, no server uploads, no sign-up needed. Instant, watermark-free results.",
  keywords: [
    "SVG to PNG converter free",
    "convert SVG to PNG online",
    "SVG to PNG free online",
    "vector to PNG converter",
    "SVG to image converter",
    "SVG to PNG no sign up",
    "browser based SVG converter",
    "SVG to raster image online",
    "free SVG to PNG tool",
    "convert SVG file online",
    "SVG to PNG high quality",
    "download SVG as PNG",
    "SVG PNG converter no watermark",
    "best SVG to PNG converter",
  ],
  openGraph: {
    title: "Free SVG to PNG Converter — Instant, Private, No Sign-Up | SwiftoolAI",
    description:
      "Convert SVG to PNG in your browser. Choose size and background. Free, private, no sign-up.",
    url: "https://www.swiftoolai.com/tools/svg-to-png",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/svg-to-png" },
};

const SEOPARAGRAPH = `SVG (Scalable Vector Graphics) files are ideal for logos and icons, but many platforms, emails, and applications require raster PNG images. SwiftoolAI's **SVG to PNG Converter** bridges this gap instantly and for free. Upload your SVG file, choose your desired output dimensions and background color (transparent or solid), and download a crisp, high-quality PNG in seconds. All conversion happens directly in your browser — your files never leave your device, ensuring complete privacy. Whether you're a designer exporting assets, a developer preparing web graphics, or anyone needing a PNG version of an SVG, our free tool delivers clean, watermark-free results with no registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's SVG to PNG Converter?",
    answer:
      "It is a free online tool that converts SVG vector files into PNG raster images in your browser, with options to set output size and background color.",
  },
  {
    question: "How do I convert SVG to PNG?",
    answer:
      "Upload your SVG file, choose your desired output size and background (transparent or a solid color), then click Convert. Your PNG is ready to download in seconds.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Are my files kept private?",
    answer:
      "Yes, completely. All processing happens in your browser. Your SVG files never leave your device and are never uploaded to any server.",
  },
  {
    question: "Can I choose the output size?",
    answer:
      "Yes. You can specify the output dimensions for your PNG, allowing you to export at any size you need — from small icons to large, high-resolution images.",
  },
  {
    question: "Can I get a transparent background?",
    answer:
      "Yes. You can choose a transparent background to preserve the original SVG transparency, or select a solid background color.",
  },
  {
    question: "Does the PNG have a watermark?",
    answer:
      "No. All PNG files exported with SwiftoolAI's SVG to PNG Converter are completely watermark-free.",
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

export default function SvgToPngPage() {
  return (
    <>
      <SvgToPngClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free SVG to PNG Converter</h2>
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
            <a href="https://www.swiftoolai.com/tools/png-to-pdf" style={{..._s.link}}>PNG to PDF Converter</a>
            <a href="https://www.swiftoolai.com/tools/webp-to-jpg" style={{..._s.link}}>WebP to JPG Converter</a>
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
