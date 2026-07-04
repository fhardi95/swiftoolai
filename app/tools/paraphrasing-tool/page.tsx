import type { Metadata } from "next";
import ParaphrasingToolClient from "./ParaphrasingToolClient";

export const metadata: Metadata = {
  title: "AI Paraphrasing Tool Free Online – Reword Text Instantly | SwiftoolAI",
  description:
    "Reword and rephrase any text in multiple styles with SwiftoolAI's free AI Paraphrasing Tool. Choose Standard, Fluent, Creative, or Formal mode. Preserves your meaning while improving clarity and originality. No sign-up needed. Perfect for students, writers, and professionals.",
  keywords: [
    "AI paraphrasing tool free",
    "paraphrase text online",
    "reword text AI free",
    "rephrase text tool",
    "free paraphraser online",
    "academic paraphrasing tool",
    "creative paraphrase AI",
    "formal text rewording",
    "sentence rephraser free",
    "paragraph paraphrasing tool",
    "QuillBot alternative free",
    "paraphrasing tool no sign up",
    "avoid plagiarism paraphraser",
    "best paraphrasing tool online",
  ],
  openGraph: {
    title: "Free AI Paraphrasing Tool — Rephrase Text in Multiple Styles | SwiftoolAI",
    description:
      "Paste your text and instantly reword it in Standard, Fluent, Creative, or Formal style. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/paraphrasing-tool",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/paraphrasing-tool" },
};

const SEOPARAGRAPH = `Expressing ideas in fresh, original ways is a skill that benefits writers, students, and professionals alike. SwiftoolAI's **AI Paraphrasing Tool** goes far beyond simple synonym replacement — our advanced AI understands the context and meaning of your text, producing high-quality paraphrases that maintain your original intent while improving clarity, style, and originality. Choose from multiple modes including Standard, Fluent, Creative, and Formal to perfectly match your needs. Whether you're rephrasing academic writing to avoid plagiarism, adapting content for different audiences, or finding a fresh way to express an idea, our free online tool delivers accurate, natural-sounding paraphrases in seconds — no sign-up required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's AI Paraphrasing Tool?",
    answer:
      "It is a free online tool that uses AI to reword and rephrase your text in multiple styles — Standard, Fluent, Creative, and Formal — while preserving the original meaning.",
  },
  {
    question: "How does the Paraphrasing Tool work?",
    answer:
      "Paste your text into the tool, choose your desired paraphrasing style, and click Paraphrase. The AI produces a rephrased version in seconds.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "What paraphrasing styles are available?",
    answer:
      "Standard (clear, neutral rephrasing), Fluent (natural, smooth writing), Creative (fresh, expressive phrasing), and Formal (professional, academic tone).",
  },
  {
    question: "Can it help avoid plagiarism?",
    answer:
      "Yes. The tool rephrases content in a new way while maintaining the original meaning, which is useful for producing original work based on reference material. However, always cite your sources appropriately.",
  },
  {
    question: "Who benefits most from this tool?",
    answer:
      "Students avoiding accidental plagiarism, writers seeking fresh ways to express ideas, professionals adapting content for different audiences, and anyone wanting to improve the clarity of their writing.",
  },
  {
    question: "Is my text kept private?",
    answer:
      "Yes. Text you enter is processed to generate the paraphrase and is not stored on our servers.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account or sign-up needed. Use the tool immediately.",
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

export default function ParaphrasingToolPage() {
  return (
    <>
      <ParaphrasingToolClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free AI Paraphrasing Tool</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free AI Writing Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/rewriter" style={{..._s.link}}>AI Text Rewriter</a>
            <a href="https://www.swiftoolai.com/tools/ai-summarizer" style={{..._s.link}}>AI Summarizer</a>
            <a href="https://www.swiftoolai.com/tools/word-counter" style={{..._s.link}}>Word Counter</a>
            <a href="https://www.swiftoolai.com/tools/case-converter" style={{..._s.link}}>Case Converter</a>
            <a href="https://www.swiftoolai.com/tools/ai-email-writer" style={{..._s.link}}>AI Email Writer</a>
            <a href="https://www.swiftoolai.com/tools/cover-letter-generator" style={{..._s.link}}>Cover Letter Generator</a>
            <a href="https://www.swiftoolai.com/tools/linkedin-post-generator" style={{..._s.link}}>LinkedIn Post Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
