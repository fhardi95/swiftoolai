import type { Metadata } from "next";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor Free Online – Reduce JPG PNG WebP Size | SwiftoolAI",
  description:
    "Compress JPG, PNG, and WebP images online for free without losing quality. SwiftoolAI's Image Compressor processes everything in your browser — 100% private, no uploads to servers, no sign-up needed. Reduce image file size instantly for faster websites.",
  keywords: [
    "image compressor online free",
    "compress image without losing quality",
    "reduce image file size",
    "JPG compressor online",
    "PNG compression tool free",
    "WebP image compressor",
    "photo size reducer online",
    "image optimizer free",
    "browser based image compressor",
    "compress images for website",
    "lossless image compression",
    "image file size reducer",
    "free photo compressor",
    "bulk image compressor online",
  ],
  openGraph: {
    title: "Free Image Compressor — Compress JPG, PNG & WebP Online | SwiftoolAI",
    description:
      "Reduce image file sizes in your browser instantly. Private, no server uploads, no sign-up required.",
    url: "https://www.swiftoolai.com/tools/image-compressor",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: {
    canonical: "https://www.swiftoolai.com/tools/image-compressor",
  },
};

const SEOPARAGRAPH = `Image optimization is crucial for website performance, user experience, and search engine rankings. SwiftoolAI's **Image Compressor** provides a powerful, free online solution to reduce image file sizes without sacrificing visual quality. Large, unoptimized images are a leading cause of slow-loading websites, higher bounce rates, and lower engagement. Our advanced compression technology reduces JPG, PNG, and WebP file sizes while preserving the integrity of your visuals. Critically, all processing happens directly in your browser — your images never leave your device, ensuring complete privacy. Whether you're a web developer, photographer, or business owner, our tool delivers professional-grade results with zero restrictions, no server uploads, and no sign-up required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's Image Compressor?",
    answer:
      "SwiftoolAI's Image Compressor is a free online tool that reduces the file size of JPG, PNG, and WebP images while preserving visual quality. All processing happens in your browser for complete privacy.",
  },
  {
    question: "How does the Image Compressor work?",
    answer:
      "Upload your image, and our compression algorithms process it directly in your browser. The tool applies optimal compression techniques to reduce file size while maintaining acceptable visual quality. Download the compressed image instantly.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no hidden costs, premium tiers, usage limits, or sign-up requirements.",
  },
  {
    question: "Will compression reduce image quality?",
    answer:
      "Our compressor minimizes quality loss while achieving significant file size reductions. You will typically see substantial size decreases with minimal to no perceptible quality difference, especially for web use.",
  },
  {
    question: "Are my images kept private?",
    answer:
      "Yes, completely. All processing happens locally in your browser. Your images never leave your device and are never uploaded to any server.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "JPG/JPEG, PNG, and WebP formats are fully supported.",
  },
  {
    question: "Why should I compress images?",
    answer:
      "Compressed images load faster, improving website performance, user experience, Core Web Vitals scores, and SEO rankings. They also save storage space and reduce bandwidth usage.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Since processing happens in your browser, there is no server-side file size limit. Performance depends on your device's capabilities.",
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

export default function ImageCompressorPage() {
  return (
    <>
      <ImageCompressorClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free Online Image Compressor</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free Image Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/svg-to-png" style={{..._s.link}}>SVG to PNG Converter</a>
            <a href="https://www.swiftoolai.com/tools/png-to-pdf" style={{..._s.link}}>PNG to PDF Converter</a>
            <a href="https://www.swiftoolai.com/tools/webp-to-jpg" style={{..._s.link}}>WebP to JPG Converter</a>
            <a href="https://www.swiftoolai.com/tools/cdr-to-jpg" style={{..._s.link}}>CDR to JPG Converter</a>
            <a href="https://www.swiftoolai.com/tools/color-picker" style={{..._s.link}}>Color Picker</a>
            <a href="https://www.swiftoolai.com/tools/qr-code-generator" style={{..._s.link}}>QR Code Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
