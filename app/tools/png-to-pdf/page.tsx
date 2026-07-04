import type { Metadata } from "next";
import PngToPdfClient from "./PngToPdfClient";

export const metadata: Metadata = {
  title: "PNG to PDF Converter Free Online – Convert Images to PDF | SwiftoolAI",
  description:
    "Convert PNG images to PDF online for free with SwiftoolAI. Combine multiple PNG files into a single PDF document instantly. 100% private — all processing happens in your browser. No sign-up needed. Fast, easy, and watermark-free.",
  keywords: [
    "PNG to PDF converter free",
    "convert PNG to PDF online",
    "PNG to PDF online free",
    "combine PNG images into PDF",
    "merge PNG to PDF",
    "image to PDF converter",
    "multiple PNG to PDF",
    "PNG to PDF no sign up",
    "browser based PNG to PDF",
    "free image to PDF tool",
    "convert photo to PDF free",
    "PNG PDF maker online",
    "watermark free PNG to PDF",
    "best PNG to PDF converter",
  ],
  openGraph: {
    title: "Free PNG to PDF Converter — Convert & Combine Images Instantly | SwiftoolAI",
    description:
      "Convert PNG images to PDF in seconds. Combine multiple images into one PDF. Free, private, no sign-up.",
    url: "https://www.swiftoolai.com/tools/png-to-pdf",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/png-to-pdf" },
};

const SEOPARAGRAPH = `Converting PNG images to PDF is a common need for professionals, students, and anyone sharing visual content in a document-friendly format. SwiftoolAI's **PNG to PDF Converter** makes this process instant and completely free. Upload one or multiple PNG images, arrange them in your preferred order, and download a clean, watermark-free PDF in seconds. All processing happens directly in your browser — your images are never uploaded to any server, ensuring complete privacy. Whether you're compiling photos, combining screenshots, archiving designs, or preparing a document submission, our free online tool handles it all with zero restrictions and no sign-up required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's PNG to PDF Converter?",
    answer:
      "It is a free online tool that converts PNG images into PDF documents — individually or by combining multiple PNGs into a single PDF — all processed locally in your browser.",
  },
  {
    question: "How do I convert PNG to PDF?",
    answer:
      "Upload your PNG file(s), arrange the order if combining multiple images, then click Convert. Your PDF will be ready to download in seconds.",
  },
  {
    question: "Can I combine multiple PNG images into one PDF?",
    answer:
      "Yes. You can upload multiple PNG files and merge them into a single PDF document with the images appearing in your chosen order.",
  },
  {
    question: "Is the converter free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Are my images kept private?",
    answer:
      "Yes, completely. All processing happens in your browser. Your images are never uploaded to any server and remain 100% private.",
  },
  {
    question: "Does the PDF have a watermark?",
    answer:
      "No. All PDFs created with SwiftoolAI's PNG to PDF Converter are completely watermark-free.",
  },
  {
    question: "What image quality will the PDF have?",
    answer:
      "The PDF preserves the original quality of your PNG images, so the output document will be as sharp and clear as the source files.",
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

export default function PngToPdfPage() {
  return (
    <>
      <PngToPdfClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free PNG to PDF Converter</h2>
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
