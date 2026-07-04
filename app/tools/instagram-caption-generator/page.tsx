import type { Metadata } from "next";
import InstagramCaptionGeneratorClient from "./InstagramCaptionGeneratorClient";

export const metadata: Metadata = {
  title: "AI Instagram Caption Generator Free – Captions + Hashtags | SwiftoolAI",
  description:
    "Generate engaging Instagram captions with relevant hashtags in seconds with SwiftoolAI's free AI Instagram Caption Generator. Describe your photo, choose your niche and tone, and get ready-to-post captions instantly. No sign-up needed. Boost your reach and engagement.",
  keywords: [
    "AI Instagram caption generator free",
    "Instagram caption generator with hashtags",
    "free Instagram caption tool",
    "Instagram caption writer AI",
    "auto generate Instagram captions",
    "Instagram post caption ideas",
    "best Instagram caption generator",
    "social media caption AI",
    "hashtag generator for Instagram",
    "Instagram engagement captions",
    "Instagram content creator tool",
    "caption generator no sign up",
    "Instagram marketing caption AI",
    "creative Instagram captions free",
  ],
  openGraph: {
    title: "Free AI Instagram Caption Generator — Captions + Hashtags | SwiftoolAI",
    description:
      "Describe your photo, choose a tone, and get ready-to-post Instagram captions with hashtags in seconds. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/instagram-caption-generator",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/instagram-caption-generator" },
};

const SEOPARAGRAPH = `Creating engaging Instagram captions consistently is one of the biggest challenges for creators, influencers, and brands. SwiftoolAI's **AI Instagram Caption Generator** takes the hard work out of content creation, producing compelling captions complete with relevant hashtags in seconds. Simply describe your photo or post, select your niche and preferred tone, and our free AI tool delivers ready-to-publish captions tailored to your audience and goals. Whether you need motivational captions, product promotion text, travel stories, or lifestyle content, our generator helps you maintain a consistent, high-quality Instagram presence that drives engagement, grows followers, and maximizes reach — all without registration or cost.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's AI Instagram Caption Generator?",
    answer:
      "It is a free online tool that uses AI to generate engaging, ready-to-post Instagram captions complete with relevant hashtags, based on your photo description, niche, and chosen tone.",
  },
  {
    question: "How does the caption generator work?",
    answer:
      "Describe what your photo or post is about, select your niche (e.g., travel, fitness, fashion), and choose a tone (e.g., funny, inspirational, professional). The AI generates a tailored caption with hashtags in seconds.",
  },
  {
    question: "Does it include hashtags?",
    answer:
      "Yes. The generated captions come complete with relevant, niche-specific hashtags to maximize your post's reach and discoverability on Instagram.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "What types of Instagram posts can I generate captions for?",
    answer:
      "The tool works for travel photos, fitness posts, food content, product promotions, lifestyle images, motivational quotes, business posts, event announcements, and any other Instagram content type.",
  },
  {
    question: "Can I generate captions for different tones?",
    answer:
      "Yes. You can select tones such as funny, inspirational, professional, casual, or promotional to match your brand voice and audience.",
  },
  {
    question: "Is my content private?",
    answer:
      "Yes. Your input descriptions are processed to generate captions and are not stored on our servers.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "No account or sign-up is needed. The tool is available for immediate use.",
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

export default function InstagramCaptionGeneratorPage() {
  return (
    <>
      <InstagramCaptionGeneratorClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free AI Instagram Caption Generator</h2>
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
          <h2 style={{..._s.h2}}>Explore More Free AI Social Media Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/linkedin-post-generator" style={{..._s.link}}>LinkedIn Post Generator</a>
            <a href="https://www.swiftoolai.com/tools/bio-generator" style={{..._s.link}}>AI Bio Generator</a>
            <a href="https://www.swiftoolai.com/tools/ai-email-writer" style={{..._s.link}}>AI Email Writer</a>
            <a href="https://www.swiftoolai.com/tools/cold-email-generator" style={{..._s.link}}>Cold Email Generator</a>
            <a href="https://www.swiftoolai.com/tools/grammar-checker" style={{..._s.link}}>Grammar Checker</a>
            <a href="https://www.swiftoolai.com/tools/rewriter" style={{..._s.link}}>AI Text Rewriter</a>
            <a href="https://www.swiftoolai.com/tools/paraphrasing-tool" style={{..._s.link}}>Paraphrasing Tool</a>
            <a href="https://www.swiftoolai.com/tools/qr-code-generator" style={{..._s.link}}>QR Code Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
