// SERVER COMPONENT — exports metadata (no "use client")
import type { Metadata } from "next";
import WordUnscramblerClient from "./WordUnscramblerClient";

export const metadata: Metadata = {
  title: "Word Unscrambler Free Online – Solve Scrambled Words Instantly | SwiftoolAI",
  description:
    "Unscramble any set of letters instantly with SwiftoolAI's free Word Unscrambler. Find all valid words from scrambled letters — perfect for Scrabble, Wordle, crosswords, and word puzzles. No sign-up needed. Sort results by word length for easy browsing.",
  keywords: [
    "word unscrambler free online",
    "unscramble letters tool",
    "anagram solver online",
    "Scrabble word finder",
    "Wordle helper tool",
    "unscramble words from letters",
    "word puzzle solver",
    "crossword helper",
    "scrambled word solver",
    "find words from letters",
    "word unscrambler no sign up",
    "best word unscrambler free",
    "words with letters tool",
    "jumble word solver",
  ],
  openGraph: {
    title: "Free Word Unscrambler — Solve Scrambled Words Instantly | SwiftoolAI",
    description:
      "Enter scrambled letters and instantly find all valid words. Sort by length. Free, no sign-up. Great for Scrabble and Wordle.",
    url: "https://www.swiftoolai.com/tools/word-unscrambler",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: {
    canonical: "https://www.swiftoolai.com/tools/word-unscrambler",
  },
};

const SEOPARAGRAPH = `Stuck on a word puzzle, Scrabble game, or Wordle challenge? SwiftoolAI's **Word Unscrambler** instantly finds all valid words that can be formed from your scrambled letters. Enter any combination of letters and our tool searches an extensive dictionary to surface every possible word — sorted by length for easy scanning. Whether you're a competitive Scrabble player looking for high-scoring plays, a crossword enthusiast working through a tricky clue, a Wordle player seeking hints, or simply learning English vocabulary, our free online word unscrambler delivers fast, comprehensive results with no registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's Word Unscrambler?",
    answer:
      "It is a free online tool that finds all valid English words that can be formed from a set of scrambled letters, instantly and sorted by word length.",
  },
  {
    question: "How do I use the Word Unscrambler?",
    answer:
      "Enter your scrambled letters into the input field and click Unscramble. The tool searches a comprehensive dictionary and displays all valid words you can make from those letters, sorted by length.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "What word games can I use this for?",
    answer:
      "Scrabble, Words with Friends, Wordle, crossword puzzles, word jumbles, anagram games, and any other word puzzle that requires finding words from a set of letters.",
  },
  {
    question: "How many letters can I enter?",
    answer:
      "You can enter any number of letters. The tool will find all valid dictionary words that can be formed using some or all of those letters.",
  },
  {
    question: "Does it find words of all lengths?",
    answer:
      "Yes. Results include words of all lengths — from 2-letter words to the longest possible combination — sorted so you can quickly find the best option for your game.",
  },
  {
    question: "Is the word list comprehensive?",
    answer:
      "Yes. The tool uses an extensive English dictionary covering common words, Scrabble-valid words, and a wide vocabulary range.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "No account or sign-up needed. Use the Word Unscrambler immediately.",
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

export default function WordUnscramblerPage() {
  return (
    <>
      <WordUnscramblerClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free Word Unscrambler</h2>
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
            <a href="https://www.swiftoolai.com/tools/case-converter" style={{..._s.link}}>Case Converter</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/ai-summarizer" style={{..._s.link}}>AI Summarizer</a>
            <a href="https://www.swiftoolai.com/tools/password-generator" style={{..._s.link}}>Password Generator</a>
            <a href="https://www.swiftoolai.com/tools/qr-code-generator" style={{..._s.link}}>QR Code Generator</a>
            <a href="https://www.swiftoolai.com/tools/rewriter" style={{..._s.link}}>AI Text Rewriter</a>
          </div>
        </section>

      </div>
    </>
  );
}
