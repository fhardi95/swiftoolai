import type { Metadata } from "next";
import JobDescriptionWriterClient from "./JobDescriptionWriterClient";

export const metadata: Metadata = {
  title: "AI Job Description Writer Free – Create Professional JDs Instantly | SwiftoolAI",
  description:
    "Create professional, comprehensive job descriptions in seconds with SwiftoolAI's free AI Job Description Writer. Input the job title, responsibilities, and requirements — get a ready-to-post JD that attracts top candidates. No sign-up needed. Perfect for HR teams and hiring managers.",
  keywords: [
    "AI job description writer free",
    "job description generator online",
    "professional job description maker",
    "HR job description tool",
    "job posting generator AI",
    "free job description builder",
    "create job description instantly",
    "job ad writer AI",
    "job description template AI",
    "hiring manager job description tool",
    "recruiter job posting AI",
    "inclusive job description generator",
    "job description no sign up",
    "best job description writer online",
  ],
  openGraph: {
    title: "Free AI Job Description Writer — Professional JDs Instantly | SwiftoolAI",
    description:
      "Enter job title, responsibilities, and requirements — get a clear, professional job description in seconds. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/job-description-writer",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/job-description-writer" },
};

const SEOPARAGRAPH = `Writing effective job descriptions is critical to attracting the right talent — yet it can be time-consuming and challenging to get right. SwiftoolAI's **AI Job Description Writer** simplifies this process, generating professional, comprehensive, and inclusive job descriptions in seconds. Simply input the job title, key responsibilities, required qualifications, and any company details, and our AI produces a clear, well-structured job description ready to post on LinkedIn, Indeed, or your careers page. Designed for HR professionals, hiring managers, recruiters, and small business owners, this free tool saves hours of writing time, ensures clear and compelling job postings, and helps you attract the best candidates without any registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's AI Job Description Writer?",
    answer:
      "It is a free online tool that uses AI to generate professional, comprehensive job descriptions based on the job title, responsibilities, and requirements you provide — ready to post in seconds.",
  },
  {
    question: "How does it work?",
    answer:
      "Enter the job title, key responsibilities, required qualifications, and any other details you want to highlight. Click Generate and the AI produces a complete, well-structured job description instantly.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Who benefits most from this tool?",
    answer:
      "HR professionals, hiring managers, recruiters, and small business owners who need to create clear, compelling job postings quickly and consistently.",
  },
  {
    question: "Can I edit the generated job description?",
    answer:
      "Yes. The AI produces a strong, professional draft that you can then edit, refine, and customize to match your company culture and specific needs before publishing.",
  },
  {
    question: "Does it create inclusive job descriptions?",
    answer:
      "Yes. Our AI is trained to produce inclusive language that welcomes diverse candidates and avoids bias in job postings.",
  },
  {
    question: "What industries does it support?",
    answer:
      "The tool works across all industries — tech, healthcare, finance, retail, education, marketing, operations, and more — for roles at all levels.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "No account or sign-up is needed. Use the Job Description Writer immediately.",
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

export default function JobDescriptionWriterPage() {
  return (
    <>
      <JobDescriptionWriterClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free AI Job Description Writer</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free AI Business Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/cover-letter-generator" style={{..._s.link}}>Cover Letter Generator</a>
            <a href="https://www.swiftoolai.com/tools/resume-bullet-writer" style={{..._s.link}}>Resume Bullet Writer</a>
            <a href="https://www.swiftoolai.com/tools/ai-email-writer" style={{..._s.link}}>AI Email Writer</a>
            <a href="https://www.swiftoolai.com/tools/cold-email-generator" style={{..._s.link}}>Cold Email Generator</a>
            <a href="https://www.swiftoolai.com/tools/linkedin-post-generator" style={{..._s.link}}>LinkedIn Post Generator</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/bio-generator" style={{..._s.link}}>AI Bio Generator</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
          </div>
        </section>

      </div>
    </>
  );
}
