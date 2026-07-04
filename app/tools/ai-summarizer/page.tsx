import type { Metadata } from "next";
import AISummarizerClient from "./AISummarizerClient";

export const metadata: Metadata = {
  title: "AI Text Summarizer Free Online — Summarize Any Text Instantly | SwiftoolAI",
  description:
    "Summarize any article, essay, document, or research paper in seconds. Free AI text summarizer — choose bullet points or paragraph format. No sign-up, no limits, 100% private. The fastest free AI summary tool online.",
  keywords: [
    "AI summarizer free",
    "text summarizer online",
    "article summarizer AI",
    "summarize text instantly",
    "AI summary generator",
    "free AI text summarizer",
    "summarize ai",
    "ai summary tool",
    "summarize tool",
    "ai summarizer online",
    "ai summarizing tool",
    "summarization tool",
    "free ai text summarizer no limit",
    "ai summary generator free",
    "document summarizer free",
    "paragraph summarizer online",
    "bullet point summarizer AI",
    "summarize essays online",
    "research paper summarizer",
    "summarize articles no sign up",
    "quick text summary tool",
    "best ai summarizer 2026",
    "long text summarizer free",
    "news article summarizer AI",
    "book chapter summarizer",
    "summarize PDF online free",
  ],
  openGraph: {
    title: "Free AI Text Summarizer — Summarize Any Text Instantly | SwiftoolAI",
    description:
      "Turn long articles, essays, and documents into clear summaries in seconds. Choose bullets or paragraphs. Free, no sign-up, no limits.",
    url: "https://www.swiftoolai.com/tools/ai-summarizer",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Text Summarizer — Instant Summaries Online",
    description:
      "Paste any text and get an instant AI summary. Free, no account needed. Try SwiftoolAI's AI Summarizer now.",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/ai-summarizer" },
};

// ─── Schema.org JSON-LD ───────────────────────────────────────────────────────
const schemaApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Text Summarizer — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/ai-summarizer",
  description:
    "Free online AI text summarizer. Paste any article, essay, or document and get an instant AI-generated summary in bullet points or paragraph format.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the AI summarizer free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no sign-up, no credits, and no usage limits." },
    },
    {
      "@type": "Question",
      name: "How does the AI text summarizer work?",
      acceptedAnswer: { "@type": "Answer", text: "Paste your text, choose bullet points or paragraph format, and click Summarize. The AI identifies the most important information and condenses it into a clear, accurate summary in seconds." },
    },
    {
      "@type": "Question",
      name: "Is my text kept private?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Your text is processed to generate the summary and is never stored on our servers." },
    },
  ],
};

// ─── Content blocks ───────────────────────────────────────────────────────────
const USE_CASES = [
  { icon: "🎓", title: "Students & Researchers", desc: "Condense dense academic papers, textbooks, and research articles into key points for faster studying and better comprehension." },
  { icon: "💼", title: "Professionals & Executives", desc: "Quickly extract the key decisions and action points from long reports, meeting notes, and business documents without reading every word." },
  { icon: "📰", title: "News & Content Readers", desc: "Get the essential facts from lengthy news articles, opinion pieces, and blog posts in a fraction of the reading time." },
  { icon: "✍️", title: "Writers & Bloggers", desc: "Summarize source material quickly to gather research insights and identify the core arguments before writing your own content." },
  { icon: "⚖️", title: "Legal & Compliance", desc: "Extract the key clauses and obligations from lengthy contracts, legal documents, and compliance materials for faster review." },
  { icon: "🔬", title: "Science & Medicine", desc: "Summarize complex scientific studies, clinical trials, and medical research papers into accessible, digestible overviews." },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Paste Your Text", desc: "Copy and paste any text — article, essay, report, email, legal document, book chapter, or any English content. There is no strict length limit." },
  { step: "2", title: "Choose Your Format", desc: "Select bullet points for a quick list of key facts, or paragraph format for a flowing, narrative-style summary that preserves context and flow." },
  { step: "3", title: "Click Summarize", desc: "Hit the Summarize button. The AI reads the full text, identifies the most important information, and generates your summary in under 10 seconds." },
  { step: "4", title: "Copy & Use", desc: "Copy your summary with one click and use it wherever you need — notes, emails, reports, or research documents." },
];

const TIPS = [
  { title: "Include complete sentences", desc: "The AI understands context much better when you paste full, grammatically correct paragraphs. Avoid pasting raw bullet points or fragmented notes as input — the output quality will be lower." },
  { title: "Choose bullet points for facts-heavy content", desc: "For news articles, research papers, and listicles, bullet point format extracts the key facts most efficiently. Each bullet represents a distinct, important piece of information." },
  { title: "Choose paragraph format for narrative content", desc: "For essays, opinion pieces, and long-form articles where flow and argument structure matter, paragraph format preserves the logical progression of the original text better than bullets." },
  { title: "Summarize in sections for very long documents", desc: "For extremely long documents (thousands of words), consider pasting and summarizing section by section. This gives more granular, accurate summaries of each part than a single mega-summary." },
  { title: "Use summaries as starting points, not final answers", desc: "AI summaries are highly accurate but not infallible — especially for nuanced, technical, or domain-specific content. Always cross-reference key facts with the original source for critical decisions." },
];

const FAQS_MAIN = [
  { q: "What is SwiftoolAI's AI Text Summarizer?", a: "SwiftoolAI's AI Text Summarizer is a free online tool that uses advanced AI to condense any text — articles, essays, reports, research papers, and more — into a shorter, accurate summary in seconds. It supports both bullet point and paragraph output formats." },
  { q: "How does the AI summarizer work?", a: "Paste your text, choose your preferred format (bullet points or paragraph), and click Summarize. The AI reads the full content, identifies the most important information, discards repetition and filler, and produces a concise, coherent summary." },
  { q: "Is the AI text summarizer completely free?", a: "Yes, 100% free. No subscription, no credits, no sign-up, and no usage limits. Summarize as many texts as you need, whenever you need." },
  { q: "What types of content can I summarize?", a: "You can summarize news articles, blog posts, academic papers, research studies, books chapters, emails, meeting notes, legal documents, product descriptions, Wikipedia articles, and any other English-language text content." },
  { q: "What is the difference between bullet points and paragraph format?", a: "Bullet points extract the key individual facts, figures, and claims as a numbered or bulleted list — ideal for quick scanning and note-taking. Paragraph format produces a flowing prose summary that preserves the logical structure and narrative of the original — better for essays and opinion pieces." },
  { q: "Is there a word or character limit for input text?", a: "There is no strict hard limit. The tool handles typical article and document lengths well. For extremely long documents (10,000+ words), summarizing section by section will give more detailed and accurate results than a single pass." },
  { q: "How accurate are AI-generated summaries?", a: "Our AI produces highly accurate summaries focused on the most critical information. Accuracy is very high for well-structured, clearly written content. For highly technical, domain-specific, or ambiguous content, we recommend reviewing the summary alongside the original to verify key claims." },
  { q: "Is my text kept private and secure?", a: "Yes. Your text is transmitted securely and used solely to generate the summary. It is never stored on our servers after processing, and we do not share, sell, or retain any content submitted through this tool." },
  { q: "Can I summarize content in languages other than English?", a: "The tool is optimized for English-language content and will produce the best results with English text. It may handle some other languages with reasonable results, but accuracy and quality will vary." },
  { q: "Do I need to create an account to use the AI summarizer?", a: "No account, no sign-up, and no email required. Open the tool and start summarizing immediately." },
];

const FAQS_TECHNICAL = [
  { q: "What AI model powers the summarizer?", a: "The summarizer is powered by Claude Haiku by Anthropic — a fast, capable AI language model trained on vast amounts of text. It is specifically prompted to focus on extractive and abstractive summarization, producing accurate, coherent summaries." },
  { q: "Can I use the summarizer on a mobile device?", a: "Yes. SwiftoolAI's AI Summarizer is fully responsive and works on smartphones, tablets, and desktops. No app download needed." },
  { q: "Why is my summary shorter than expected?", a: "The AI targets the most important information and removes repetition, filler, and tangential content. A shorter summary often means the original contained significant padding. If you need more detail, try paragraph format, which typically produces a longer output." },
  { q: "Can I summarize a PDF with this tool?", a: "The tool currently accepts pasted text input. To summarize a PDF, copy the text from your PDF viewer (Ctrl+A, Ctrl+C) and paste it into the summarizer. Most PDF readers support text copying from digitally created PDFs." },
  { q: "Why does the quality vary between different texts?", a: "Summary quality is directly related to the quality of the input. Well-structured, clearly written content with logical paragraph breaks produces the best summaries. Poorly formatted, OCR-extracted, or badly punctuated text produces lower quality output." },
];

const FAQS_USES = [
  { q: "Is the AI summarizer good for students?", a: "Yes — it is one of the most popular use cases. Students use it to condense long academic papers, textbooks, and research articles into manageable key points for studying, note-taking, and essay preparation. It works particularly well for social science, humanities, and business literature." },
  { q: "Can professionals use this to summarize business reports?", a: "Absolutely. Business professionals, executives, and analysts regularly use AI summarizers to extract the key decisions, findings, and action points from lengthy business reports, board documents, and industry analyses. Bullet point format is particularly effective for this use case." },
  { q: "Is it useful for summarizing news articles?", a: "Yes. Paste any news article and get the essential facts in seconds — ideal for people who want to stay informed across multiple topics without reading every article in full. Bullet point format works best for news content." },
  { q: "Can writers use it as a research tool?", a: "Definitely. Writers and bloggers use the summarizer to quickly digest source material — extracting the key arguments, facts, and quotes from their research sources before writing their own original content." },
  { q: "Is it useful for legal document summarization?", a: "Yes, though with an important caveat: always verify AI summaries of legal documents with the original text and consult a qualified legal professional for any binding decisions. The summarizer is useful for getting a quick overview of a contract or document's structure and key clauses." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AISummarizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

      <AISummarizerClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>

        {/* ── About ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>About SwiftoolAI's Free AI Text Summarizer</h2>
          <p style={prose}>
            In an era of information overload, the ability to quickly extract key insights from lengthy texts is one of the most valuable skills you can have. SwiftoolAI's AI Text Summarizer is a free, instant, and private online tool that condenses articles, essays, reports, and any document into clear, accurate summaries — in bullet points or flowing paragraph format, depending on your preference. Powered by Claude Haiku, Anthropic's advanced language model, our summarizer goes beyond simple sentence extraction: it reads the full context, understands the document's structure and argument, and produces summaries that capture the real substance of the original. There is no sign-up, no usage limit, and no storage of your content — just fast, accurate AI summaries whenever you need them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: "1.5rem" }}>
            {[
              { icon: "⚡", t: "Under 10 seconds", d: "Average summarization time" },
              { icon: "📝", t: "Bullet or paragraph", d: "Two output formats" },
              { icon: "🔒", t: "100% private", d: "Text never stored" },
              { icon: "🆓", t: "Always free", d: "No limits, no account" },
              { icon: "📏", t: "Any length", d: "No hard input limit" },
              { icon: "🌍", t: "English optimized", d: "Best for English content" },
            ].map(f => (
              <div key={f.t} style={featureCard}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{f.t}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>How to Summarize Text with AI — 4 Simple Steps</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {HOW_IT_WORKS.map(s => (
              <li key={s.step} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{s.step}</span>
                <div>
                  <strong style={{ fontSize: 15, color: "#111827" }}>{s.title}</strong>
                  <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Use cases ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>Who Uses the AI Text Summarizer?</h2>
          <p style={{ ...prose, marginBottom: "1.25rem" }}>The AI summarizer is used by millions of people across industries and backgrounds. Here are the most common use cases:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {USE_CASES.map(u => (
              <div key={u.title} style={featureCard}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{u.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 4 }}>{u.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{u.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tips ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>5 Tips for the Best AI Summaries</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {TIPS.map((t, i) => (
              <li key={t.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: i < TIPS.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
                <div>
                  <strong style={{ fontSize: 14, color: "#111827" }}>{t.title}</strong>
                  <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4, lineHeight: 1.65 }}>{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Bullet vs Paragraph ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>Bullet Points vs Paragraph Format — Which Should You Choose?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ ...featureCard, borderTop: "3px solid #2563eb" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#2563eb", marginBottom: 8 }}>📋 Bullet Points</div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 10 }}>Best when you need to scan quickly or extract individual facts.</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {["News articles", "Research papers", "Reports with data", "Listicles and guides", "Meeting notes", "Study materials"].map(x => (
                  <li key={x} style={{ fontSize: 13, color: "#374151", padding: "3px 0", display: "flex", gap: 6 }}>
                    <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span>{x}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ ...featureCard, borderTop: "3px solid #7c3aed" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#7c3aed", marginBottom: 8 }}>📄 Paragraph Format</div>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 10 }}>Best when argument structure and logical flow matter.</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {["Essays & opinion pieces", "Long-form journalism", "Book chapters", "Policy documents", "Academic arguments", "Narrative reports"].map(x => (
                  <li key={x} style={{ fontSize: 13, color: "#374151", padding: "3px 0", display: "flex", gap: 6 }}>
                    <span style={{ color: "#7c3aed", fontWeight: 700 }}>✓</span>{x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Main FAQs ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>Frequently Asked Questions — AI Text Summarizer</h2>
          <FAQList items={FAQS_MAIN} />
        </section>

        {/* ── Technical FAQs ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>Technical Questions — AI Summarizer</h2>
          <FAQList items={FAQS_TECHNICAL} />
        </section>

        {/* ── Use case FAQs ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>Use Cases — Who Is the AI Summarizer For?</h2>
          <FAQList items={FAQS_USES} />
        </section>

        {/* ── Related tools ── */}
        <section style={sectionStyle}>
          <h2 style={h2}>Explore More Free AI Tools on SwiftoolAI</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
            {[
              ["/tools/paraphrasing-tool", "Paraphrasing Tool"],
              ["/tools/grammar-checker", "Grammar Checker"],
              ["/tools/rewriter", "AI Text Rewriter"],
              ["/tools/word-counter", "Word Counter"],
              ["/tools/ai-email-writer", "AI Email Writer"],
              ["/tools/cover-letter-generator", "Cover Letter Generator"],
              ["/tools/resume-bullet-writer", "Resume Bullet Writer"],
              ["/tools/linkedin-post-generator", "LinkedIn Post Generator"],
              ["/tools/cold-email-generator", "Cold Email Generator"],
              ["/tools/ai-face-rater", "AI Face Rater"],
            ].map(([href, label]) => (
              <a key={href} href={`https://www.swiftoolai.com${href}`} style={relatedLink}>{label}</a>
            ))}
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", lineHeight: 1.6 }}>
          AI summaries are generated automatically and may occasionally miss nuance in highly technical or ambiguous content. Always verify critical facts against the original source.
        </p>
      </div>
    </>
  );
}

// ─── Shared sub-components & styles ──────────────────────────────────────────
function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((f, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid #f3f4f6" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 6 }}>{f.q}</h3>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.a}</p>
        </div>
      ))}
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 14,
  padding: "1.75rem",
  marginBottom: "1.25rem",
};
const h2: React.CSSProperties = {
  fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "1rem",
  letterSpacing: "-0.02em",
};
const prose: React.CSSProperties = { fontSize: 15, color: "#374151", lineHeight: 1.75 };
const featureCard: React.CSSProperties = {
  background: "#f9fafb",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 10,
  padding: "1rem",
};
const relatedLink: React.CSSProperties = {
  display: "block",
  padding: "9px 12px",
  background: "#f9fafb",
  border: "1px solid rgba(0,0,0,0.07)",
  borderRadius: 8,
  fontSize: 13,
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 500,
  textAlign: "center",
};
