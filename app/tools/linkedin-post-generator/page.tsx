import type { Metadata } from "next";
import LinkedInPostGeneratorClient from "./LinkedInPostGeneratorClient";

export const metadata: Metadata = {
  title: "AI LinkedIn Post Generator Free — Grow Your Personal Brand | SwiftoolAI",
  description:
    "Generate engaging, professional LinkedIn posts in seconds. Free AI LinkedIn post generator — choose your tone, topic and goal. No sign-up, no limits. The fastest free LinkedIn content creator online.",
  keywords: [
    "AI LinkedIn post generator free",
    "linkedin post generator",
    "linkedin post generator ai",
    "ai linkedin post",
    "free linkedin post generator",
    "linkedin post writer",
    "linkedin content generator",
    "linkedin post ideas generator",
    "linkedin post creator free",
    "linkedin post generator no sign up",
    "best linkedin post generator",
    "ai linkedin content creator",
    "professional linkedin post generator",
    "linkedin post generator 2026",
    "linkedin post writing tool",
    "thought leadership linkedin post ai",
    "linkedin personal brand generator",
    "linkedin marketing post generator",
    "engaging linkedin post ai",
    "linkedin post ideas free",
  ],
  openGraph: {
    title: "Free AI LinkedIn Post Generator — Grow Your Personal Brand | SwiftoolAI",
    description:
      "Enter your topic and tone — get a polished, engaging LinkedIn post in seconds. Free, no sign-up required.",
    url: "https://www.swiftoolai.com/tools/linkedin-post-generator",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI LinkedIn Post Generator — Instant LinkedIn Content",
    description:
      "Create professional LinkedIn posts in seconds. Free, no account needed. Try SwiftoolAI now.",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/linkedin-post-generator" },
};

const schemaApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI LinkedIn Post Generator — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/linkedin-post-generator",
  description: "Free AI LinkedIn post generator. Enter your topic, tone, and goal — get a professional, ready-to-publish LinkedIn post in seconds.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is the LinkedIn post generator free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no sign-up, no credits, and no usage limits." } },
    { "@type": "Question", name: "How does the AI LinkedIn post generator work?", acceptedAnswer: { "@type": "Answer", text: "Enter your topic, choose your tone and post goal, then click Generate. The AI creates a polished, ready-to-publish LinkedIn post tailored for the platform's algorithm and your audience in seconds." } },
    { "@type": "Question", name: "What types of LinkedIn posts can I create?", acceptedAnswer: { "@type": "Answer", text: "Thought leadership, industry insights, personal stories, product announcements, job updates, achievement celebrations, tips and how-tos, and engagement-driving questions." } },
  ],
};

const POST_TYPES = [
  { icon: "💡", title: "Thought Leadership", desc: "Share your expert perspective on industry trends, challenges, and future directions. Positions you as a credible voice in your field." },
  { icon: "📖", title: "Personal Story", desc: "Share a professional journey, lesson learned, or career milestone. These posts generate the highest engagement on LinkedIn." },
  { icon: "🏆", title: "Achievement & Milestone", desc: "Announce promotions, completions, awards, or company wins in a way that feels genuine rather than boastful." },
  { icon: "📊", title: "Industry Insight", desc: "Break down data, trends, or news relevant to your industry with your unique take. Great for thought leadership and visibility." },
  { icon: "💼", title: "Product or Service Promo", desc: "Promote your offering in a value-first way that feels helpful rather than salesy — the most effective approach on LinkedIn." },
  { icon: "❓", title: "Engagement Question", desc: "Ask your network a question that sparks discussion. Comment activity dramatically boosts post reach on LinkedIn's algorithm." },
  { icon: "🎯", title: "Tips & How-To", desc: "Share actionable advice in a numbered list format. These posts are highly shareable and perform consistently well." },
  { icon: "📣", title: "Job Announcement", desc: "Share new roles, openings, or team changes with a post that attracts the right candidates to your network." },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Enter Your Topic or Idea", desc: "Type a brief description of what you want to post about — a recent achievement, an industry insight, a tip you want to share, or anything else relevant to your professional audience." },
  { step: "2", title: "Choose Your Tone and Goal", desc: "Select from tones like professional, inspirational, conversational, or direct — and define your post goal (grow engagement, promote a service, share a story, etc.)." },
  { step: "3", title: "Generate Your Post", desc: "Click Generate. The AI produces a structured, algorithm-optimised LinkedIn post with a strong hook, clear body, and a call to action — all formatted for LinkedIn's layout." },
  { step: "4", title: "Edit and Publish", desc: "Personalise the draft with your own voice, specific details, and any hashtags you want to add. Copy it directly to LinkedIn and post — done." },
];

const TIPS = [
  { title: "Start with a strong hook — the first line is everything", desc: "LinkedIn truncates posts after 2–3 lines with a 'See more' button. Your opening line must be compelling enough to make people click it. The AI is prompted to write strong hooks, but always review and sharpen yours before posting." },
  { title: "Be specific rather than generic", desc: "Vague inputs produce vague posts. Instead of 'write about productivity', try 'I just implemented a 4-day work week in my team and our output increased by 30% — share what I learned'. The more specific your input, the more compelling the output." },
  { title: "Add your own personal details after generating", desc: "The AI draft is a strong starting point. Make it yours by adding specific numbers, names, dates, and personal anecdotes that only you could know. Authenticity drives engagement on LinkedIn more than polish." },
  { title: "Post at peak times for maximum reach", desc: "LinkedIn engagement peaks Tuesday–Thursday between 8–10am and 12–1pm in your audience's timezone. Scheduling your AI-generated posts at these times can increase impressions by 40–60% compared to off-peak posting." },
  { title: "End with a clear question or call to action", desc: "Posts that explicitly ask a question in the final line generate significantly more comments, which signals to LinkedIn's algorithm to distribute the post more widely. The AI includes a CTA — make sure it's specific to your context." },
  { title: "Use line breaks generously", desc: "LinkedIn's feed is narrow. Walls of text get scrolled past. Break your post into short paragraphs of 1–3 lines each. The AI formats posts this way by default — preserve the spacing when you copy to LinkedIn." },
];

const FAQS_MAIN = [
  { q: "What is SwiftoolAI's AI LinkedIn Post Generator?", a: "SwiftoolAI's AI LinkedIn Post Generator is a free online tool that uses advanced AI to create engaging, professional LinkedIn posts based on your topic, tone, and goal — ready to publish in seconds, with no account required." },
  { q: "How does the LinkedIn post generator work?", a: "Enter your topic or idea, select your desired tone (professional, inspirational, conversational, etc.) and post goal, then click Generate. The AI produces a well-structured LinkedIn post with a hook, body, and call to action — formatted for LinkedIn's layout and algorithm." },
  { q: "Is it completely free?", a: "Yes — 100% free with no subscriptions, credits, usage limits, or sign-up requirements. Generate as many LinkedIn posts as you need." },
  { q: "What types of LinkedIn posts can I generate?", a: "Thought leadership posts, industry insights, personal story posts, product or service promotions, job announcements, achievement celebrations, tips and how-to posts, team updates, and engagement-driving questions." },
  { q: "Can I customise the generated post?", a: "Yes. The AI generates a strong draft — you should then personalise it with your specific details, numbers, names, and voice before publishing. Personal details make posts significantly more engaging." },
  { q: "Who benefits most from this tool?", a: "Professionals building a personal brand, entrepreneurs promoting their business, marketers creating content calendars, recruiters attracting candidates, job seekers increasing visibility, consultants sharing expertise, and anyone wanting to post more consistently on LinkedIn." },
  { q: "How do I make my LinkedIn posts get more engagement?", a: "Start with a strong first line that creates curiosity or makes a bold claim. Be specific and personal. End with a clear question. Post on Tuesday–Thursday mornings. Use short paragraphs with line breaks. Respond to every early comment — early engagement signals LinkedIn's algorithm to push the post further." },
  { q: "Is my content kept private?", a: "Yes. Content you enter is processed to generate the post and is never stored on our servers. We do not retain or share any input." },
  { q: "Do I need to create an account?", a: "No account, no sign-up, and no email required. Open the tool and generate your LinkedIn post immediately." },
  { q: "How is this different from writing LinkedIn posts manually?", a: "The AI handles structure, tone calibration, hook writing, and CTA creation — the most time-consuming parts. What typically takes 20–30 minutes of staring at a blank page takes under 60 seconds with the generator. You then spend 2–3 minutes personalising the draft." },
];

const FAQS_LINKEDIN = [
  { q: "How long should a LinkedIn post be?", a: "LinkedIn posts up to around 1,300 characters (approximately 200–250 words) tend to perform best for engagement. Longer posts are truncated with a 'See more' button — which actually increases engagement if the opening line is compelling enough to get people to click. The AI generates posts in this optimal range." },
  { q: "Should I use hashtags on LinkedIn posts?", a: "Yes, but sparingly. 3–5 targeted, relevant hashtags outperform posts stuffed with 20+ hashtags. Choose specific hashtags (e.g. #productmanagement) over generic ones (e.g. #business). Add them at the end of the post rather than inline in the text." },
  { q: "What is the best time to post on LinkedIn?", a: "Research consistently shows Tuesday, Wednesday, and Thursday between 8–10am and 12–1pm in your audience's primary timezone generate the highest engagement. Avoid weekends and late evenings. Consistency matters more than perfect timing — posting 3–4 times per week outperforms one perfectly-timed post." },
  { q: "Does the LinkedIn algorithm favour certain types of posts?", a: "LinkedIn's algorithm currently favours: posts with high early engagement (comments especially), native content (no external links in the post body), personal stories and authentic sharing, posts that spark conversation, and consistent creators. The AI generates posts optimised for these factors." },
  { q: "Should I include a link to my website in LinkedIn posts?", a: "LinkedIn's algorithm actively suppresses posts with external links in the body, as it wants users to stay on the platform. Best practice: put any link in the first comment and reference it in the post body (e.g. 'Link in first comment ↓'). The AI can generate posts structured this way." },
];

const FAQS_BRAND = [
  { q: "How often should I post on LinkedIn to build a personal brand?", a: "Consistency beats frequency. Posting 3 times per week with quality, genuine content outperforms posting daily with mediocre content. Start with 2–3 posts per week, focus on quality, and increase frequency as you find your rhythm. The AI generator makes 3 posts per week very achievable." },
  { q: "What topics should I post about on LinkedIn?", a: "The most engaging LinkedIn topics are: lessons from personal professional experience, industry observations and takes, behind-the-scenes of your work, career milestones and what you learned, controversial-but-defensible opinions on industry topics, and practical tips your specific audience would value. All of these work well with the generator." },
  { q: "How do I grow my LinkedIn following with AI-generated posts?", a: "Focus on value first: every post should teach, inspire, entertain, or make someone think. Be consistent (3x/week minimum). Engage genuinely with comments on your posts and comment meaningfully on others' posts. Connect with people in your niche. Use the AI generator to maintain consistency even when inspiration is low." },
  { q: "Can I use the generated posts for a company LinkedIn page?", a: "Yes. The tool works equally well for personal profiles and company pages. For company pages, adjust the tone input to 'professional' or 'brand voice' and describe your company's offering in the topic field for best results." },
];

export default function LinkedInPostGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

      <LinkedInPostGeneratorClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>

        {/* About */}
        <section style={sec}>
          <h2 style={h2}>About SwiftoolAI's Free AI LinkedIn Post Generator</h2>
          <p style={prose}>Maintaining a consistent, high-quality LinkedIn presence is one of the most effective ways to build a personal brand, attract opportunities, and grow your professional network — but creating posts that genuinely engage your audience takes time and creative energy most professionals don't have to spare. SwiftoolAI's AI LinkedIn Post Generator solves this: enter your topic, choose your tone and goal, and receive a polished, algorithm-optimised LinkedIn post in seconds. Powered by advanced AI, the generator produces posts with strong hooks, clear structure, and effective calls to action — the three elements that separate high-performing LinkedIn posts from those that get ignored. 100% free, no account required, no limits.</p>
          <div style={grid3}>
            {[
              { icon: "⚡", t: "Under 60 seconds", d: "From topic to published post" },
              { icon: "🎯", t: "8 post types", d: "Thought leadership to promos" },
              { icon: "🔒", t: "100% private", d: "Content never stored" },
              { icon: "🆓", t: "Always free", d: "No limits, no account" },
              { icon: "✍️", t: "Editable drafts", d: "Personalise before posting" },
              { icon: "📈", t: "Algorithm-optimised", d: "Built for LinkedIn's feed" },
            ].map(f => <FeatureCard key={f.t} {...f} />)}
          </div>
        </section>

        {/* Post types */}
        <section style={sec}>
          <h2 style={h2}>8 Types of LinkedIn Posts You Can Generate</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {POST_TYPES.map(p => (
              <div key={p.title} style={card}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={sec}>
          <h2 style={h2}>How to Generate a LinkedIn Post with AI — 4 Steps</h2>
          <StepList items={HOW_IT_WORKS} />
        </section>

        {/* Tips */}
        <section style={sec}>
          <h2 style={h2}>6 Tips for High-Performing LinkedIn Posts</h2>
          <TipList items={TIPS} />
        </section>

        {/* Main FAQs */}
        <section style={sec}>
          <h2 style={h2}>Frequently Asked Questions — AI LinkedIn Post Generator</h2>
          <FAQList items={FAQS_MAIN} />
        </section>

        {/* LinkedIn strategy FAQs */}
        <section style={sec}>
          <h2 style={h2}>LinkedIn Strategy — FAQs</h2>
          <FAQList items={FAQS_LINKEDIN} />
        </section>

        {/* Personal brand FAQs */}
        <section style={sec}>
          <h2 style={h2}>Personal Branding on LinkedIn — FAQs</h2>
          <FAQList items={FAQS_BRAND} />
        </section>

        {/* Related tools */}
        <section style={sec}>
          <h2 style={h2}>Explore More Free AI Tools on SwiftoolAI</h2>
          <RelatedTools links={[
            ["/tools/instagram-caption-generator", "Instagram Caption Generator"],
            ["/tools/bio-generator", "AI Bio Generator"],
            ["/tools/ai-email-writer", "AI Email Writer"],
            ["/tools/cold-email-generator", "Cold Email Generator"],
            ["/tools/cover-letter-generator", "Cover Letter Generator"],
            ["/tools/resume-bullet-writer", "Resume Bullet Writer"],
            ["/tools/grammar-checker", "Grammar Checker"],
            ["/tools/rewriter", "AI Text Rewriter"],
            ["/tools/ai-summarizer", "AI Text Summarizer"],
            ["/tools/ai-face-rater", "AI Face Rater"],
          ]} />
        </section>

        <Disclaimer text="AI-generated LinkedIn posts are drafts intended as a starting point. Always personalise with your own voice, specific details, and experiences before publishing for best results." />
      </div>
    </>
  );
}

// ─── Shared helpers (duplicated across pages for standalone files) ─────────────
function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return <div>{items.map((f, i) => <div key={i} style={{ borderBottom: i < items.length - 1 ? "1px solid #f3f4f6" : "none", paddingBottom: "1rem", marginBottom: "1rem" }}><h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 6 }}>{f.q}</h3><p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.a}</p></div>)}</div>;
}
function StepList({ items }: { items: { step: string; title: string; desc: string }[] }) {
  return <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>{items.map(s => <li key={s.step} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: "1.25rem" }}><span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{s.step}</span><div><strong style={{ fontSize: 15, color: "#111827" }}>{s.title}</strong><p style={{ fontSize: 14, color: "#6b7280", marginTop: 4, lineHeight: 1.65 }}>{s.desc}</p></div></li>)}</ol>;
}
function TipList({ items }: { items: { title: string; desc: string }[] }) {
  return <div>{items.map((t, i) => <div key={t.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: i < items.length - 1 ? "1px solid #f3f4f6" : "none" }}><span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{i + 1}</span><div><strong style={{ fontSize: 14, color: "#111827" }}>{t.title}</strong><p style={{ fontSize: 13, color: "#6b7280", marginTop: 4, lineHeight: 1.65 }}>{t.desc}</p></div></div>)}</div>;
}
function FeatureCard({ icon, t, d }: { icon: string; t: string; d: string }) {
  return <div style={card}><div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div><div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{t}</div><div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{d}</div></div>;
}
function RelatedTools({ links }: { links: string[][] }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>{links.map(([href, label]) => <a key={href} href={`https://www.swiftoolai.com${href}`} style={relLink}>{label}</a>)}</div>;
}
function Disclaimer({ text }: { text: string }) {
  return <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", lineHeight: 1.6, marginTop: "0.5rem" }}>{text}</p>;
}

const sec: React.CSSProperties = { background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "1.75rem", marginBottom: "1.25rem" };
const h2: React.CSSProperties = { fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight: 700, color: "#111827", marginBottom: "1rem", letterSpacing: "-0.02em" };
const prose: React.CSSProperties = { fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: "1.25rem" };
const card: React.CSSProperties = { background: "#f9fafb", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: "1rem" };
const grid3: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: "1.25rem" };
const relLink: React.CSSProperties = { display: "block", padding: "9px 12px", background: "#f9fafb", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, fontSize: 13, color: "#2563eb", textDecoration: "none", fontWeight: 500, textAlign: "center" };
