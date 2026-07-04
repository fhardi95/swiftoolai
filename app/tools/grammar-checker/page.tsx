import type { Metadata } from "next";
import ToolLayout from "../../_components/ToolLayout";

export const metadata: Metadata = {
  title: "Free Grammar Checker Online — Fix Grammar & Spelling Instantly | SwiftoolAI",
  description: "Check and fix grammar, spelling, and punctuation errors instantly with SwiftoolAI's free AI Grammar Checker. Paste your text and get a corrected version in seconds. No sign-up required.",
  alternates: { canonical: "https://www.swiftoolai.com/tools/grammar-checker" },
};

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

const SEOPARAGRAPH = `SwiftoolAI's free AI Grammar Checker instantly detects and corrects grammar, spelling, punctuation, and style errors in your text. Whether you're writing an email, essay, cover letter, or social post, paste your text and get a clean, corrected version in seconds — no account needed.`;

const FAQS = [
  { question: "What does the Grammar Checker fix?", answer: "It fixes grammar mistakes, spelling errors, punctuation issues, awkward phrasing, and style inconsistencies." },
  { question: "Is it free?", answer: "Yes — completely free, no account or sign-up required." },
  { question: "What types of text can I check?", answer: "Any text — emails, essays, cover letters, social posts, blog articles, reports, and more." },
  { question: "How accurate is the AI grammar checker?", answer: "Very accurate. It uses a state-of-the-art AI model to understand context and correct errors naturally, not just flag them." },
  { question: "Does it work for British and American English?", answer: "Yes. The AI handles both British and American English conventions." },
];

export default function GrammarCheckerPage() {
  return (
    <>
      <ToolLayout
        title="Grammar Checker"
        description="Fix grammar, spelling, and punctuation errors instantly with AI. Free, no sign-up required."
        inputPlaceholder="Paste your text here and the AI will fix any grammar, spelling, or punctuation errors..."
        systemPrompt="You are an expert grammar checker and editor. Carefully check the user's text for grammar, spelling, punctuation, and style errors. Return the corrected version of the text. If the text is already correct, return it as-is with a brief note that no errors were found. Preserve the original meaning and tone."
        outputLabel="Corrected Text"
      />
      <div style={_s.wrap}>
        <section style={_s.section}>
          <div style={_s.tag}>About</div>
          <h2 style={_s.h2}>About Our Free AI Grammar Checker</h2>
          <p style={_s.p}>{SEOPARAGRAPH}</p>
        </section>
        <section style={_s.section}>
          <div style={_s.tag}>FAQ</div>
          <h2 style={_s.h2}>Frequently Asked Questions</h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={_s.faqItem(i === FAQS.length - 1)}>
                <div style={_s.faqQ}>{faq.question}</div>
                <p style={{ ..._s.p, marginBottom: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={_s.section}>
          <div style={_s.tag}>More Tools</div>
          <h2 style={_s.h2}>Explore More Free AI Writing Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              ["AI Text Rewriter", "/tools/rewriter"],
              ["Paraphrasing Tool", "/tools/paraphrasing-tool"],
              ["AI Summarizer", "/tools/ai-summarizer"],
              ["Cover Letter Generator", "/tools/cover-letter-generator"],
              ["AI Email Writer", "/tools/ai-email-writer"],
              ["LinkedIn Post Generator", "/tools/linkedin-post-generator"],
            ].map(([label, href]) => (
              <a key={label} href={`https://www.swiftoolai.com${href}`} style={_s.link}
               
               >
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
