import type { Metadata } from "next";
import ResumeBulletWriterClient from "./ResumeBulletWriterClient";

export const metadata: Metadata = {
  title: "AI Resume Bullet Writer Free – Achievement-Focused Bullets | SwiftoolAI",
  description:
    "Transform job duties into powerful, achievement-focused resume bullet points with SwiftoolAI's free AI Resume Bullet Writer. Uses strong action verbs and quantifiable results. ATS-optimized. No sign-up needed. Stand out to recruiters and land more interviews.",
  keywords: [
    "AI resume bullet point writer free",
    "resume bullet generator",
    "achievement focused resume bullets",
    "ATS optimized resume bullets",
    "resume bullet points AI",
    "action verb resume writer",
    "resume writing tool free",
    "job seeker resume AI",
    "improve resume bullets online",
    "LinkedIn profile bullet points",
    "quantifiable resume achievements",
    "professional resume enhancer",
    "resume bullet writer no sign up",
    "best resume bullet generator",
  ],
  openGraph: {
    title: "Free AI Resume Bullet Writer — Achievement-Focused & ATS-Ready | SwiftoolAI",
    description:
      "Turn job duties into powerful achievement bullets with strong action verbs. ATS-friendly, free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/resume-bullet-writer",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/resume-bullet-writer" },
};

const SEOPARAGRAPH = `Most resumes list job duties — top resumes showcase achievements. SwiftoolAI's **AI Resume Bullet Writer** transforms ordinary job descriptions into powerful, achievement-focused resume bullet points that catch recruiters' attention and pass Applicant Tracking Systems (ATS). Our free tool uses strong action verbs and encourages quantifiable results to reframe your experience in the most compelling way possible. Whether you're refreshing an old resume, building a new one, or updating your LinkedIn profile, our AI produces professional, impactful bullet points in seconds — helping you stand out from the competition and land more interviews, all without any sign-up required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's AI Resume Bullet Writer?",
    answer:
      "It is a free online tool that uses AI to transform ordinary job duty descriptions into powerful, achievement-focused resume bullet points with strong action verbs and quantifiable results.",
  },
  {
    question: "How does it work?",
    answer:
      "Enter your job title, a description of your responsibilities or duties, and any key achievements or metrics. The AI rewrites them as compelling, professional resume bullet points in seconds.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Are the bullets ATS-friendly?",
    answer:
      "Yes. The AI generates bullet points optimized to pass Applicant Tracking Systems by using clear, keyword-rich language and standard formatting.",
  },
  {
    question: "What makes a good resume bullet point?",
    answer:
      "Strong resume bullets start with a powerful action verb, focus on achievements rather than duties, and include quantifiable results where possible (e.g., \"Increased sales by 30%\" rather than \"Responsible for sales\").",
  },
  {
    question: "Can I use this for LinkedIn profile optimization?",
    answer:
      "Absolutely. The tool is equally effective for writing strong LinkedIn profile experience bullets that attract recruiters and showcase your professional impact.",
  },
  {
    question: "Who benefits most from this tool?",
    answer:
      "Job seekers at all levels, career changers, recent graduates, and professionals updating their resumes or LinkedIn profiles to better reflect their achievements.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "No account or sign-up needed. Use the Resume Bullet Writer immediately.",
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

export default function ResumeBulletWriterPage() {
  return (
    <>
      <ResumeBulletWriterClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free AI Resume Bullet Writer</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free AI Career Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/cover-letter-generator" style={{..._s.link}}>Cover Letter Generator</a>
            <a href="https://www.swiftoolai.com/tools/bio-generator" style={{..._s.link}}>AI Bio Generator</a>
            <a href="https://www.swiftoolai.com/tools/linkedin-post-generator" style={{..._s.link}}>LinkedIn Post Generator</a>
            <a href="https://www.swiftoolai.com/tools/ai-email-writer" style={{..._s.link}}>AI Email Writer</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/job-description-writer" style={{..._s.link}}>Job Description Writer</a>
            <a href="https://www.swiftoolai.com/tools/cold-email-generator" style={{..._s.link}}>Cold Email Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
