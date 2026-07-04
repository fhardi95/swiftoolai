import type { Metadata } from "next";
import CoverLetterClient from "./CoverLetterClient";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator Free – Create Professional Letters | SwiftoolAI",
  description:
    "Generate professional, ATS-friendly cover letters in seconds with SwiftoolAI's free AI Cover Letter Generator. Enter the job title, company, and your skills — get a tailored, standout cover letter instantly. No sign-up required. Perfect for job seekers and career changers.",
  keywords: [
    "AI cover letter generator free",
    "cover letter generator online",
    "professional cover letter maker",
    "ATS friendly cover letter",
    "cover letter writer AI",
    "free cover letter builder",
    "instant cover letter generator",
    "job application cover letter AI",
    "tailored cover letter generator",
    "cover letter no sign up",
    "career change cover letter",
    "cover letter for any job",
    "AI cover letter writer",
    "best cover letter generator free",
  ],
  openGraph: {
    title: "Free AI Cover Letter Generator — Professional & ATS-Friendly | SwiftoolAI",
    description:
      "Enter job details and your skills — get a tailored, professional cover letter in seconds. Free, ATS-friendly, no sign-up.",
    url: "https://www.swiftoolai.com/tools/cover-letter-generator",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Cover Letter Generator | SwiftoolAI",
    description:
      "Generate a professional, ATS-friendly cover letter in seconds. No sign-up required.",
  },
  alternates: {
    canonical: "https://www.swiftoolai.com/tools/cover-letter-generator",
  },
};

const SEOPARAGRAPH = `In today's competitive job market, a compelling cover letter can be the difference between getting an interview and being overlooked. SwiftoolAI's **AI Cover Letter Generator** empowers job seekers to create professional, personalized, and ATS-friendly cover letters that showcase their qualifications and enthusiasm instantly. Our free online tool analyzes your job target, skills, and experience to generate a tailored cover letter that highlights your unique value. Whether you're applying for your first job, making a career change, or seeking a senior role, our AI produces a document that captures attention, demonstrates fit, and increases your chances of landing that interview — completely free, no registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's AI Cover Letter Generator?",
    answer:
      "It is a free online tool that uses AI to create professional, personalized, ATS-friendly cover letters for job applications based on the job title, company, and your skills and experience.",
  },
  {
    question: "How does it work?",
    answer:
      "Enter the job title and company you are applying to, add your relevant skills and experience, and click Generate. The AI creates a tailored cover letter in seconds.",
  },
  {
    question: "Is the cover letter ATS-friendly?",
    answer:
      "Yes. The AI generates cover letters formatted to pass Applicant Tracking Systems (ATS), ensuring your application reaches human recruiters.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account or sign-up needed. Use the cover letter generator instantly.",
  },
  {
    question: "Can I edit the generated cover letter?",
    answer:
      "Absolutely. The AI generates a strong, tailored draft, which you can then edit and personalize before downloading or submitting.",
  },
  {
    question: "What job types does it support?",
    answer:
      "The tool works for virtually any industry — tech, healthcare, finance, education, marketing, and more — and for all levels from entry-level to executive roles.",
  },
  {
    question: "How long does it take to generate a cover letter?",
    answer:
      "Just a few seconds. Enter your details, click Generate, and your cover letter is ready almost instantly.",
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

export default function CoverLetterPage() {
  return (
    <>
      <CoverLetterClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free AI Cover Letter Generator</h2>
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
            <a href="https://www.swiftoolai.com/tools/resume-bullet-writer" style={{..._s.link}}>Resume Bullet Writer</a>
            <a href="https://www.swiftoolai.com/tools/bio-generator" style={{..._s.link}}>AI Bio Generator</a>
            <a href="https://www.swiftoolai.com/tools/ai-email-writer" style={{..._s.link}}>AI Email Writer</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/linkedin-post-generator" style={{..._s.link}}>LinkedIn Post Generator</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/cold-email-generator" style={{..._s.link}}>Cold Email Generator</a>
            <a href="https://www.swiftoolai.com/tools/job-description-writer" style={{..._s.link}}>Job Description Writer</a>
          </div>
        </section>

      </div>
    </>
  );
}
