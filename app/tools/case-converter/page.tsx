import type { Metadata } from "next";
import CaseConverterClient from "./CaseConverterClient";

export const metadata: Metadata = {
  title: "Case Converter Free Online – Change Text Case Instantly | SwiftoolAI",
  description:
    "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, kebab-case, and snake_case instantly with SwiftoolAI's free online Case Converter. No sign-up needed. Perfect for developers, writers, and students.",
  keywords: [
    "case converter online free",
    "text case changer",
    "uppercase to lowercase converter",
    "title case generator",
    "sentence case formatter",
    "camelCase converter",
    "PascalCase converter",
    "kebab-case generator",
    "snake_case converter",
    "capitalize words online",
    "change text case online",
    "text formatting tool free",
    "word case converter",
    "online text case tool",
  ],
  openGraph: {
    title: "Free Case Converter — Change Text Case Instantly Online",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, camelCase & more. Free, instant, no sign-up.",
    url: "https://www.swiftoolai.com/tools/case-converter",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/case-converter" },
};

const SEOPARAGRAPH = `In writing, programming, and data entry, consistent text casing is crucial for readability and adherence to style guidelines. SwiftoolAI's **Case Converter** provides a robust, free online solution to instantly transform your text into any format. Whether you need UPPERCASE for headings, Title Case for document titles, camelCase or snake_case for code variables, or proper Sentence case for clean writing — our tool handles it all with precision and speed. Designed for writers, developers, students, and professionals, this intuitive text case changer eliminates manual retyping and formatting errors, saving you time and ensuring your text always meets the desired presentation standards, with no registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's Case Converter?",
    answer:
      "SwiftoolAI's Case Converter is a free online tool that instantly changes the casing of any text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, kebab-case, and snake_case.",
  },
  {
    question: "How do I use the Case Converter?",
    answer:
      "Paste your text into the input area, select your desired case format, and the tool instantly converts and displays the result. Copy the converted text with one click.",
  },
  {
    question: "Is the Case Converter free?",
    answer:
      "Yes — completely free, no sign-up, no registration, no hidden costs. Use it as often as you need.",
  },
  {
    question: "What case formats are supported?",
    answer:
      "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, kebab-case, and snake_case are all supported.",
  },
  {
    question: "Who needs a Case Converter?",
    answer:
      "Writers use it for consistent heading and title formatting. Developers use it for variable and function naming conventions in code. Students use it for essay and report formatting. Data teams use it to standardize text fields.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. Being a fully web-based tool, the Case Converter works on any device — desktop, laptop, tablet, or smartphone — with just a browser.",
  },
  {
    question: "Is my text stored?",
    answer:
      "No. We do not store any text you enter. All processing happens in real-time and your data is not retained.",
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

export default function CaseConverterPage() {
  return (
    <>
      <CaseConverterClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free Online Case Converter</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/word-counter" style={{..._s.link}}>Word Counter</a>
            <a href="https://www.swiftoolai.com/tools/word-unscrambler" style={{..._s.link}}>Word Unscrambler</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/rewriter" style={{..._s.link}}>AI Text Rewriter</a>
            <a href="https://www.swiftoolai.com/tools/ai-summarizer" style={{..._s.link}}>AI Summarizer</a>
            <a href="https://www.swiftoolai.com/tools/password-generator" style={{..._s.link}}>Password Generator</a>
            <a href="https://www.swiftoolai.com/tools/color-picker" style={{..._s.link}}>Color Picker</a>
          </div>
        </section>

      </div>
    </>
  );
}
