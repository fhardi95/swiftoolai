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

const SEOPARAGRAPH = `SwiftoolAI's AI Bio Generator helps you craft a compelling, professional bio in seconds. Whether you need a LinkedIn summary, an Instagram bio, a Twitter/X profile, or a personal website introduction, simply describe yourself and our AI will generate a polished, engaging bio tailored to your platform and personality. No writing experience needed — completely free, no sign-up required.`;

const FAQS = [
  { question: "What is an AI Bio Generator?", answer: "An AI Bio Generator uses artificial intelligence to create professional, engaging bios based on information you provide about yourself — your name, role, skills, and personality." },
  { question: "What platforms can I use the generated bio for?", answer: "The tool generates bios suitable for LinkedIn, Instagram, Twitter/X, TikTok, personal websites, email signatures, and any other platform where you need a short professional introduction." },
  { question: "Is it free?", answer: "Yes — completely free, no account required." },
  { question: "How long does it take?", answer: "Just a few seconds. Enter your details and click Generate." },
  { question: "Can I edit the bio after generating it?", answer: "Absolutely. The AI generates a strong draft that you can personalise and adjust before using." },
];

export default function BioGeneratorPage() {
  return (
    <>
      <ToolLayout
        title="AI Bio Generator"
        description="Create a professional, engaging bio for any platform in seconds. Free, no sign-up required."
        inputPlaceholder="Describe yourself: your name, role, key skills, achievements, and personality. E.g. 'Sarah, UX designer at a fintech startup, passionate about accessibility, 5 years experience, loves hiking...'"
        systemPrompt="You are a professional bio writer. Create an engaging, concise, and professional bio based on the user's description. The bio should be natural, compelling, and suitable for professional platforms. Write in third person unless the user specifies first person. Keep it between 100-200 words."
        outputLabel="Your Bio"
      />
      <div style={_s.wrap}>
        <section style={_s.section}>
          <div style={_s.tag}>About</div>
          <h2 style={_s.h2}>About Our Free AI Bio Generator</h2>
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
          <h2 style={_s.h2}>Explore More Free AI Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              ["Cover Letter Generator", "/tools/cover-letter-generator"],
              ["AI Email Writer", "/tools/ai-email-writer"],
              ["LinkedIn Post Generator", "/tools/linkedin-post-generator"],
              ["Resume Bullet Writer", "/tools/resume-bullet-writer"],
              ["Grammar Checker", "/tools/grammar-checker"],
              ["Paraphrasing Tool", "/tools/paraphrasing-tool"],
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
