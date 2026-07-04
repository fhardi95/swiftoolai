import type { Metadata } from "next";
import AIEmailWriterClient from "./AIEmailWriterClient";

export const metadata: Metadata = {
  title: "AI Email Writer Free Online – Write Emails Instantly | SwiftoolAI",
  description:
    "Write professional, friendly, or formal emails in seconds with SwiftoolAI's free AI Email Writer. No sign-up needed. Describe your email goal and get a polished, ready-to-send draft instantly. Perfect for business emails, follow-ups, and cold outreach.",
  keywords: [
    "AI email writer",
    "free email writer online",
    "AI email generator",
    "professional email writer",
    "write emails with AI",
    "email writer no sign up",
    "business email generator",
    "automated email drafter",
    "cold email AI writer",
    "email composition tool",
    "sales email writer",
    "marketing email generator",
    "formal email generator",
    "email draft AI free",
  ],
  openGraph: {
    title: "AI Email Writer Free Online – Write Professional Emails Instantly",
    description:
      "Describe your email goal and get a polished draft in seconds. Free, no sign-up required.",
    url: "https://www.swiftoolai.com/tools/ai-email-writer",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/ai-email-writer" },
};

const SEOPARAGRAPH = `In today's fast-paced digital world, effective communication is paramount. SwiftoolAI's **AI Email Writer** is your free, instant solution for drafting professional, friendly, or formal emails in seconds. Whether you're composing a business proposal, a follow-up, a cold outreach, or a customer service reply, our advanced AI understands your intent and produces clear, compelling messages tailored to your tone and goal. No more staring at a blank screen — simply describe what you need and receive a polished, ready-to-send email draft instantly. Boost your productivity, eliminate writer's block, and communicate with confidence every time, completely free and without any sign-up requirement.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's AI Email Writer?",
    answer:
      "SwiftoolAI's AI Email Writer is a free online tool powered by artificial intelligence that generates professional, friendly, or formal emails based on your description. You provide the purpose and tone, and the AI creates a polished draft instantly.",
  },
  {
    question: "Is the AI Email Writer completely free?",
    answer:
      "Yes, it is 100% free with no hidden costs, subscriptions, or sign-up requirements. Use it as many times as you need.",
  },
  {
    question: "How do I use the AI Email Writer?",
    answer:
      "Simply type a brief description of the email you need — including the purpose, recipient, and desired tone — and click Generate. The AI will produce a well-structured, ready-to-use email draft in seconds.",
  },
  {
    question: "What types of emails can I write with this tool?",
    answer:
      "The tool handles virtually every email type: business proposals, follow-ups, cold outreach, customer service replies, marketing emails, internal memos, networking messages, apology emails, and more. You can specify the tone — professional, friendly, or formal.",
  },
  {
    question: "Can I use this for cold emails and sales outreach?",
    answer:
      "Absolutely. The AI Email Writer is excellent for cold outreach and sales emails. Provide your prospect's context, your offer, and your goal, and the AI crafts a personalized, persuasive message designed to get replies.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account or sign-up is required. Open the tool and start writing emails immediately.",
  },
  {
    question: "Is my email content kept private?",
    answer:
      "Yes. We do not store or retain the content you enter. Your inputs are processed to generate the email and are not saved on our servers.",
  },
  {
    question: "Can I edit the generated email?",
    answer:
      "Of course. The AI-generated email is a starting point. You can edit, refine, and personalize it as much as you like before sending.",
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

export default function AIEmailWriterPage() {
  return (
    <>
      <AIEmailWriterClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free AI Email Writer</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free AI Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/cold-email-generator" style={{..._s.link}}>Cold Email Generator</a>
            <a href="https://www.swiftoolai.com/tools/cover-letter-generator" style={{..._s.link}}>Cover Letter Generator</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/ai-summarizer" style={{..._s.link}}>AI Summarizer</a>
            <a href="https://www.swiftoolai.com/tools/rewriter" style={{..._s.link}}>AI Text Rewriter</a>
            <a href="https://www.swiftoolai.com/tools/linkedin-post-generator" style={{..._s.link}}>LinkedIn Post Generator</a>
            <a href="https://www.swiftoolai.com/tools/instagram-caption-generator" style={{..._s.link}}>Instagram Caption Generator</a>
            <a href="https://www.swiftoolai.com/tools/bio-generator" style={{..._s.link}}>AI Bio Generator</a>
            <a href="https://www.swiftoolai.com/tools/job-description-writer" style={{..._s.link}}>Job Description Writer</a>
            <a href="https://www.swiftoolai.com/tools/resume-bullet-writer" style={{..._s.link}}>Resume Bullet Writer</a>
            <a href="https://www.swiftoolai.com/tools/word-counter" style={{..._s.link}}>Word Counter</a>
          </div>
        </section>

      </div>
    </>
  );
}
