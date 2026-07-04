// SERVER COMPONENT — exports metadata (no "use client")
import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter Free Online – Count Words, Characters & More | SwiftoolAI",
  description:
    "Count words, characters, sentences, paragraphs, and estimated reading time instantly with SwiftoolAI's free online Word Counter. Real-time results as you type. No sign-up needed. Perfect for essays, articles, social media posts, and SEO content.",
  keywords: [
    "word counter online free",
    "character counter online",
    "word count tool",
    "count words in text free",
    "sentence counter online",
    "paragraph counter",
    "reading time calculator",
    "word counter for essays",
    "SEO word count tool",
    "social media character counter",
    "word counter no sign up",
    "free word count checker",
    "real time word counter",
    "online word count tool",
  ],
  openGraph: {
    title: "Free Word Counter Online — Words, Characters & Reading Time | SwiftoolAI",
    description:
      "Count words, characters, sentences, and paragraphs with estimated reading time in real time. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/word-counter",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: {
    canonical: "https://www.swiftoolai.com/tools/word-counter",
  },
};

const SEOPARAGRAPH = `Whether you're writing an essay with a strict word limit, crafting an SEO-optimized blog post, composing a tweet, or preparing a professional document, knowing your exact word and character count is essential. SwiftoolAI's **Word Counter** provides instant, real-time statistics as you type — including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. Our free online tool is perfect for students, writers, bloggers, content marketers, and social media managers who need precise text metrics without any fuss. No installation, no sign-up, no limits — just accurate counts delivered instantly.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's Word Counter?",
    answer:
      "It is a free online tool that counts words, characters (with and without spaces), sentences, paragraphs, and calculates estimated reading time in real time as you type or paste text.",
  },
  {
    question: "How do I use it?",
    answer:
      "Simply type or paste your text into the tool. Word count, character count, sentence count, paragraph count, and reading time all update instantly as you write.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "What statistics does the Word Counter provide?",
    answer:
      "Word count, character count with spaces, character count without spaces, sentence count, paragraph count, and estimated reading time.",
  },
  {
    question: "Why do I need a word counter?",
    answer:
      "Word counters are essential for meeting essay word limits, staying within social media character restrictions (Twitter/X, Instagram bio), writing SEO-optimized content to target lengths, and ensuring professional documents meet specific requirements.",
  },
  {
    question: "Is there a text length limit?",
    answer:
      "No. The Word Counter handles texts of any length, from a single sentence to entire documents.",
  },
  {
    question: "Is my text kept private?",
    answer:
      "Yes. Text you enter into the Word Counter is processed locally and is not stored or transmitted to our servers.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. The Word Counter is fully responsive and works perfectly on smartphones and tablets as well as desktops.",
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

export default function WordCounterPage() {
  return (
    <>
      <WordCounterClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free Online Word Counter</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free Writing Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/case-converter" style={{..._s.link}}>Case Converter</a>
            <a href="https://www.swiftoolai.com/tools/word-unscrambler" style={{..._s.link}}>Word Unscrambler</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/ai-summarizer" style={{..._s.link}}>AI Summarizer</a>
            <a href="https://www.swiftoolai.com/tools/rewriter" style={{..._s.link}}>AI Text Rewriter</a>
            <a href="https://www.swiftoolai.com/tools/ai-email-writer" style={{..._s.link}}>AI Email Writer</a>
            <a href="https://www.swiftoolai.com/tools/cover-letter-generator" style={{..._s.link}}>Cover Letter Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
