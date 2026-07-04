import { metadata } from "./metadata";
export { metadata };
import ToolLayout from "../../_components/ToolLayout";

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

const SEOPARAGRAPH = `SwiftoolAI's free AI Text Rewriter lets you rewrite any text in multiple tones — Professional, Casual, Gen Z, Luxury, Academic, Sales Copy, and more. Paste your content, choose your tone, and get a perfectly rewritten version in seconds. Ideal for adapting content for different audiences and platforms — no sign-up needed.`;

const FAQS = [
  { question: "What tones can I rewrite text in?", answer: "Professional, Casual, Gen Z, Luxury, Academic, Sales Copy, Friendly, Formal, and more." },
  { question: "Does the rewriter change the meaning of my text?", answer: "No. It preserves your original message while transforming the tone and style to match your chosen setting." },
  { question: "Is it free?", answer: "Yes — completely free with no account required." },
  { question: "What types of content can I rewrite?", answer: "Emails, blog posts, social media captions, product descriptions, cover letters, essays, and any other text." },
  { question: "How long does it take?", answer: "Just a few seconds. Paste your text, select a tone, and click Generate." },
];

export default function RewriterPage() {
  return (
    <>
      <ToolLayout
        title="AI Text Rewriter"
        description="Rewrite any text in multiple tones — Professional, Casual, Gen Z, Luxury, Academic, and more. Free, no sign-up."
        inputPlaceholder="Paste the text you want to rewrite here..."
        systemPrompt="You are a professional writing assistant. Rewrite the provided text in a clear, engaging, and improved way while preserving the original meaning. Make it more polished, natural, and well-structured. Maintain the same approximate length unless brevity significantly improves the text."
        outputLabel="Rewritten Text"
      />
      <div style={_s.wrap}>
        <section style={_s.section}>
          <div style={_s.tag}>About</div>
          <h2 style={_s.h2}>About Our Free AI Text Rewriter</h2>
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
              ["Grammar Checker", "/tools/grammar-checker"],
              ["Paraphrasing Tool", "/tools/paraphrasing-tool"],
              ["AI Summarizer", "/tools/ai-summarizer"],
              ["AI Email Writer", "/tools/ai-email-writer"],
              ["Cover Letter Generator", "/tools/cover-letter-generator"],
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
