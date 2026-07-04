import type { Metadata } from "next";
import ColdEmailGeneratorClient from "./ColdEmailGeneratorClient";

export const metadata: Metadata = {
  title: "AI Cold Email Generator Free — Write Cold Emails That Get Replies | SwiftoolAI",
  description:
    "Generate personalised, high-converting cold emails in seconds. Free AI cold email writer — subject line + full email body. No sign-up, no limits. The fastest free cold email tool online.",
  keywords: [
    "cold email generator free",
    "AI cold email writer",
    "cold email generator",
    "cold email writer AI",
    "free cold email generator",
    "cold email template generator",
    "cold outreach email generator",
    "cold email subject line generator",
    "sales email generator free",
    "AI email outreach tool",
    "cold email creator free",
    "b2b cold email generator",
    "cold email generator no sign up",
    "best cold email generator",
    "cold email generator 2026",
    "cold email writing tool",
    "automated cold email writer",
    "personalized cold email generator",
    "cold email generator for sales",
    "cold email opener generator",
    "how to write a cold email AI",
    "AI sales outreach email",
    "free cold email template ai",
    "cold email generator linkedin",
    "cold email generator for freelancers",
  ],
  openGraph: {
    title: "Free AI Cold Email Generator — Write Cold Emails That Get Replies | SwiftoolAI",
    description:
      "Enter your offer, recipient, and goal — get a personalised cold email with subject line in seconds. Free, no sign-up required.",
    url: "https://www.swiftoolai.com/tools/cold-email-generator",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Cold Email Generator — Cold Emails That Get Replies",
    description:
      "Generate personalised cold emails with subject lines in seconds. Free, no account needed. Try SwiftoolAI now.",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/cold-email-generator" },
};

const schemaApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Cold Email Generator — SwiftoolAI",
  url: "https://www.swiftoolai.com/tools/cold-email-generator",
  description:
    "Free AI cold email generator. Enter your offer, target recipient, and goal — get a personalised cold email with a compelling subject line in seconds.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is the cold email generator free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no sign-up, no credits, and no usage limits." } },
    { "@type": "Question", name: "How does the AI cold email generator work?", acceptedAnswer: { "@type": "Answer", text: "Enter your product or service, describe your target recipient, set your email goal, and click Generate. The AI produces a personalised cold email with subject line, a strong opener, clear value proposition, and a call to action." } },
    { "@type": "Question", name: "What makes a cold email effective?", acceptedAnswer: { "@type": "Answer", text: "Effective cold emails are short (under 150 words), personalised to the recipient, lead with value rather than a sales pitch, have one clear call to action, and use a subject line that creates curiosity without feeling spammy." } },
  ],
};

const EMAIL_TYPES = [
  { icon: "💼", title: "B2B Sales Outreach", desc: "Reach decision-makers and buyers at target companies with personalised, value-first emails that open conversations rather than push for immediate sales." },
  { icon: "🤝", title: "Partnership & Collaboration", desc: "Propose joint ventures, content collaborations, affiliate arrangements, and strategic partnerships to companies that complement your offer." },
  { icon: "💡", title: "Freelancer Prospecting", desc: "Win new clients as a freelancer or consultant with concise, confident cold emails that demonstrate your expertise and specific value." },
  { icon: "🎙️", title: "Podcast / Media Pitching", desc: "Pitch yourself as a guest to podcasts, publications, and media outlets with compelling, well-targeted outreach emails." },
  { icon: "🔗", title: "Link Building & PR", desc: "Reach out to bloggers, journalists, and site owners for backlinks, press coverage, and content collaboration opportunities." },
  { icon: "📋", title: "Job & Internship Outreach", desc: "Contact hiring managers and founders directly before roles are advertised — the most effective route into competitive organisations." },
  { icon: "🏷️", title: "Influencer & Brand Outreach", desc: "Pitch sponsored content, ambassador deals, and product reviews to creators and influencers relevant to your niche." },
  { icon: "📈", title: "Investor Outreach", desc: "Reach angel investors and VCs with a concise, compelling cold email that communicates your traction and why your startup deserves their attention." },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Describe Your Offer and Recipient", desc: "Tell the AI what you're offering (product, service, proposal, or request) and who you're emailing (their role, company, industry, and any relevant context you know about them)." },
  { step: "2", title: "Set Your Email Goal", desc: "Define the single action you want the recipient to take — a 15-minute call, a reply, visiting a page, or downloading a resource. Cold emails with one clear goal significantly outperform those asking for multiple actions." },
  { step: "3", title: "Generate Your Cold Email", desc: "Click Generate. The AI produces a complete cold email: a compelling subject line, a personalised opener, a concise value proposition, social proof signal, and a low-friction call to action — all under 150 words." },
  { step: "4", title: "Personalise and Send", desc: "Add the recipient's name, specific company details, and any personalisation that makes the email feel individually crafted. Then send — or A/B test two versions using the generator." },
];

const TIPS = [
  { title: "Keep it under 150 words", desc: "The single biggest improvement you can make to any cold email is making it shorter. Recipients scan, not read. Every sentence that doesn't serve the email's goal should be cut. Our AI generates emails in the optimal 100–150 word range." },
  { title: "Lead with them, not you", desc: "The most common cold email mistake: starting with 'I am [name] from [company]'. Nobody cares yet. Start with something relevant to the recipient — their work, a challenge they likely face, or a specific observation about their company." },
  { title: "One email, one ask", desc: "Every cold email should have exactly one call to action. Not 'reply OR book a call OR visit our site'. One clear, low-friction ask: 'Worth a 15-minute call this week?' is more effective than a paragraph of options." },
  { title: "Subject lines: curiosity over clickbait", desc: "The best cold email subject lines create genuine curiosity without feeling spammy. Short (4–6 words), specific, and slightly unusual outperform generic 'Quick question' or aggressive 'Double your revenue' lines every time." },
  { title: "Follow up 2–3 times", desc: "Most cold email replies come from follow-up emails, not the first send. Wait 3–4 business days and send a brief, polite follow-up that adds a new piece of value or angle. The AI can generate effective follow-up emails too." },
  { title: "Personalise the first line manually", desc: "The AI provides a strong personalised opener, but adding one genuinely specific detail you know about the recipient (a recent company announcement, a post they published, a mutual connection) dramatically increases reply rates. Spend 60 seconds per recipient on this." },
];

const FAQS_MAIN = [
  { q: "What is SwiftoolAI's AI Cold Email Generator?", a: "SwiftoolAI's AI Cold Email Generator is a free online tool that uses advanced AI to write personalised cold emails tailored to your offer, target recipient, and outreach goal. It generates both the subject line and full email body — ready to personalise and send." },
  { q: "How does the cold email generator work?", a: "Enter your product or service, describe who you're emailing, set your email goal (e.g. book a call, get a reply), and click Generate. The AI produces a complete cold email with subject line, personalised opener, value proposition, and call to action in seconds." },
  { q: "Is the cold email generator free?", a: "Yes — 100% free with no subscriptions, no credits, no usage limits, and no account required. Generate unlimited cold emails." },
  { q: "What information should I provide for the best results?", a: "The more specific you are, the better the email. Include: what you're offering, the recipient's role and company type, any pain point you're solving, your desired outcome, and any personalisation context you have (e.g. they recently raised funding, or they published a post you found interesting)." },
  { q: "Can I use this for sales outreach?", a: "Yes. The tool is specifically designed for B2B sales outreach, freelancer prospecting, partnership proposals, and any scenario where you need to reach someone you don't know with a compelling reason to respond." },
  { q: "Is cold emailing legal?", a: "Cold emailing is legal in most jurisdictions when done properly. In the UK and EU, GDPR applies to cold emails — you generally need a 'legitimate interest' basis for B2B outreach. In the US, CAN-SPAM sets the rules for commercial emails. Always include your identity, a physical address, and an unsubscribe option for bulk outreach. For individual, personalised cold emails to business contacts, the rules are more permissive. Consult legal advice for your specific situation." },
  { q: "What makes a cold email get replies?", a: "Short length (under 150 words), strong personalisation, leading with the recipient's perspective rather than your credentials, a single clear call to action, a curiosity-driven subject line, and sending at the right time (Tuesday–Thursday, 7–9am or 1–3pm in the recipient's timezone)." },
  { q: "Can I generate follow-up cold emails?", a: "Yes. In your topic field, specify 'follow-up to cold email about [topic], sent 4 days ago, no reply yet — add a new angle' and the AI will generate an effective follow-up that adds value rather than just chasing." },
  { q: "Is my content kept private?", a: "Yes. Content you enter is processed to generate the email and is never stored on our servers. We do not retain or share any input data." },
  { q: "How many cold emails should I send per day?", a: "For manual, personalised outreach: 10–20 per day is realistic with proper personalisation. For semi-automated outreach via tools like Lemlist or Apollo: 50–100 per day is common. Always prioritise quality over volume — a 20% reply rate on 20 daily emails beats a 1% reply rate on 200." },
];

const FAQS_STRATEGY = [
  { q: "What is the average reply rate for cold emails?", a: "Industry averages for well-written, personalised cold emails range from 5–15% reply rates. Top performers achieve 20–40% by combining strong personalisation, relevant offers, and well-timed follow-ups. Bulk, unpersonalised cold email sequences typically see 1–3% reply rates." },
  { q: "How long should a cold email be?", a: "Under 150 words is the gold standard for cold emails. Studies consistently show that shorter emails get higher reply rates — recipients are busy and brevity signals respect for their time. Every sentence should either establish credibility, communicate value, or drive toward the call to action." },
  { q: "What is the best time to send cold emails?", a: "Research across millions of cold emails shows Tuesday, Wednesday, and Thursday between 7–9am and 1–3pm in the recipient's timezone achieve the highest open and reply rates. Avoid Monday mornings (inbox catchup), Friday afternoons (wind-down), and weekends entirely." },
  { q: "Should I personalise every cold email?", a: "Yes, at minimum the first line should be genuinely personalised to the specific recipient. 'I noticed you recently [specific action]' or 'Your post about [specific topic] resonated because...' immediately differentiates your email from mass outreach. The AI generates personalisation placeholders — always fill these in before sending." },
  { q: "What is the difference between cold email and spam?", a: "The key differences are: (1) Relevance — cold emails are targeted to recipients who could genuinely benefit from your offer; spam is mass-sent regardless of fit. (2) Personalisation — cold emails address the specific recipient; spam is copy-pasted. (3) Value — cold emails offer something of value; spam prioritises the sender's interest. (4) Opt-out — legitimate cold emails include an easy way to opt out of further contact." },
];

const FAQS_TOOLS = [
  { q: "Can I generate cold emails for LinkedIn outreach as well?", a: "Yes. While the tool generates email-format cold outreach, the same principles apply to LinkedIn connection requests and InMail messages. Simply specify 'LinkedIn InMail message' in your topic field and the AI will generate a shorter, platform-appropriate version." },
  { q: "Can I use this tool to create cold email templates for my team?", a: "Absolutely. Generate a set of high-quality cold email templates for different use cases (initial outreach, follow-up, breakup email) and use them as the base for your team's outreach cadences. Personalise the placeholders per prospect before sending." },
  { q: "Does the generator create subject lines too?", a: "Yes. Every generated cold email includes a subject line. The AI writes subject lines that balance curiosity, relevance, and deliverability — avoiding spammy trigger words that increase the likelihood of landing in spam folders." },
];

export default function ColdEmailGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

      <ColdEmailGeneratorClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>

        <section style={sec}>
          <h2 style={h2}>About SwiftoolAI's Free AI Cold Email Generator</h2>
          <p style={prose}>
            Cold email remains one of the highest-ROI outreach channels available — when done right. The problem is that writing effective, personalised cold emails is genuinely hard: you need a compelling subject line, a personalised opener that doesn't feel generic, a concise value proposition, and a low-friction call to action — all in under 150 words. Most people stare at a blank page for 20 minutes and end up with something generic that gets ignored. SwiftoolAI's AI Cold Email Generator solves this instantly. Enter your offer, describe your recipient and their context, set your goal, and receive a complete, ready-to-personalise cold email in seconds. Whether you're a sales professional, a freelancer prospecting for clients, a startup founder reaching out to investors, or anyone needing to contact someone they don't know — our free cold email writer generates emails that open conversations and get replies.
          </p>
          <div style={grid3}>
            {[
              { icon: "⚡", t: "Under 60 seconds", d: "From brief to ready-to-send email" },
              { icon: "✉️", t: "Subject line included", d: "Full email + subject generated" },
              { icon: "🎯", t: "8 use case types", d: "Sales to investor outreach" },
              { icon: "🆓", t: "Always free", d: "No limits, no account" },
              { icon: "📏", t: "Under 150 words", d: "Optimised length by default" },
              { icon: "🔒", t: "100% private", d: "Content never stored" },
            ].map(f => <FeatureCard key={f.t} {...f} />)}
          </div>
        </section>

        <section style={sec}>
          <h2 style={h2}>8 Types of Cold Emails You Can Generate</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {EMAIL_TYPES.map(e => (
              <div key={e.title} style={card}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{e.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 4 }}>{e.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={sec}>
          <h2 style={h2}>How to Write a Cold Email with AI — 4 Steps</h2>
          <StepList items={HOW_IT_WORKS} />
        </section>

        <section style={sec}>
          <h2 style={h2}>6 Cold Email Tips That Actually Improve Reply Rates</h2>
          <TipList items={TIPS} />
        </section>

        <section style={sec}>
          <h2 style={h2}>Frequently Asked Questions — AI Cold Email Generator</h2>
          <FAQList items={FAQS_MAIN} />
        </section>

        <section style={sec}>
          <h2 style={h2}>Cold Email Strategy — FAQs</h2>
          <FAQList items={FAQS_STRATEGY} />
        </section>

        <section style={sec}>
          <h2 style={h2}>Tool & Template Questions — FAQs</h2>
          <FAQList items={FAQS_TOOLS} />
        </section>

        <section style={sec}>
          <h2 style={h2}>Explore More Free AI Writing Tools on SwiftoolAI</h2>
          <RelatedTools links={[
            ["/tools/ai-email-writer", "AI Email Writer"],
            ["/tools/cover-letter-generator", "Cover Letter Generator"],
            ["/tools/linkedin-post-generator", "LinkedIn Post Generator"],
            ["/tools/resume-bullet-writer", "Resume Bullet Writer"],
            ["/tools/bio-generator", "AI Bio Generator"],
            ["/tools/instagram-caption-generator", "Instagram Caption Generator"],
            ["/tools/job-description-writer", "Job Description Writer"],
            ["/tools/grammar-checker", "Grammar Checker"],
            ["/tools/rewriter", "AI Text Rewriter"],
            ["/tools/ai-summarizer", "AI Text Summarizer"],
          ]} />
        </section>

        <Disclaimer text="Cold email laws vary by jurisdiction. Always comply with applicable regulations (GDPR, CAN-SPAM, CASL) when conducting outreach campaigns. This tool generates drafts for individual review — not automated bulk sending." />
      </div>
    </>
  );
}

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
