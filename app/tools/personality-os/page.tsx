import type { Metadata } from "next";
import PersonalityOSClient from "./PersonalityOSClient";

export const metadata: Metadata = {
  title: "AI Personality OS — The Personality Test That Never Stops Learning You | SwiftoolAI",
  description: "Take a 40-question adaptive assessment and get an AI that actually knows you — ask it about your career, business ideas, relationships, procrastination, and more. Free to start.",
  keywords: [
    "AI personality test", "personality assessment AI", "AI personality profile",
    "career personality test", "AI life coach", "personality AI chat",
    "what business should I start quiz", "why do I procrastinate test",
    "AI relationship personality test", "personalized AI coach",
  ],
  openGraph: {
    title: "AI Personality OS — An AI That Actually Knows You | SwiftoolAI",
    description: "Answer 40 questions once. Get an AI that uses what it learned about you for career advice, business ideas, relationship insight, and daily coaching.",
    url: "https://www.swiftoolai.com/tools/personality-os",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Personality OS — An AI That Actually Knows You",
    description: "A personality test that doesn't end at the results page. Free to start.",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/personality-os" },
};

const s = {
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
};

const FAQS = [
  { q: "How is this different from a normal personality test?", a: "Most personality tests end at a results page you read once and forget. AI Personality OS keeps your profile active — once it's built, you can ask it anything, and every answer is shaped by what it learned about you specifically, not generic advice." },
  { q: "How long does the assessment take?", a: "Around 8-10 minutes for 40 questions. You'll see live insight callouts as you go, and your full report — traits, career fit, business ideas, relationship style, and a growth plan — generates in seconds once you finish." },
  { q: "What can I actually ask the AI afterward?", a: "Anything personal: what career or business fits you, why you procrastinate, how you learn best, patterns in your relationships, how to communicate more effectively, or a productivity system tailored to how you actually work." },
  { q: "Is my data private?", a: "Your answers and profile are stored securely and tied to your account only. They're used solely to power your personalized report and chat — never shared or sold." },
  { q: "Can I retake the assessment?", a: "Yes, anytime from your report page. Retaking replaces your previous profile with a fresh one." },
  { q: "Is this free?", a: "Yes — the assessment and a set number of AI chat messages are free daily. Upgrade to Pro for unlimited AI conversations with your personalized profile." },
];

export default function PersonalityOSPage() {
  return (
    <>
      <PersonalityOSClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.25rem 4rem" }}>
        <section style={s.section}>
          <div style={s.tag}>About</div>
          <h2 style={s.h2}>An AI That Learns Who You Are — Then Uses It</h2>
          <p style={s.p}>
            AI Personality OS is built on a simple idea: your personality profile shouldn&apos;t be a dead-end
            results page. After a 40-question adaptive assessment covering how you plan, decide, communicate,
            learn, love, handle stress, and take risks, our AI builds a profile of you — then keeps using it.
            Every follow-up question you ask, from career moves to relationship patterns, gets an answer shaped
            specifically around your traits, not a generic template.
          </p>
        </section>

        <section style={s.section}>
          <div style={s.tag}>How It Works</div>
          <h2 style={s.h2}>From Quiz to Personal AI in 10 Minutes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: "1", title: "Take the Assessment", desc: "40 quick questions across 8 personality dimensions — work style, decision-making, drive, communication, learning, relationships, emotional regulation, and risk tolerance." },
              { step: "2", title: "Get Your Full Report", desc: "An archetype, trait breakdown, strengths, growth areas, career and business suggestions, a relationship insight, and a 1-week growth plan — generated instantly." },
              { step: "3", title: "Ask It Anything", desc: "Chat with an AI that already knows your profile. Ask about career decisions, business ideas, why you procrastinate, or how to communicate better — every answer is personalized to you." },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0, boxShadow: "0 2px 8px rgba(37,99,235,0.3)" }}>{item.step}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 4 }}>{item.title}</div>
                  <p style={{ ...s.p, marginBottom: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <div style={s.tag}>FAQ</div>
          <h2 style={s.h2}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.q}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...s.section, background: "#fffbeb", border: "1px solid #fde68a" }}>
          <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6, fontSize: 14 }}>⚠️ Important Note</div>
          <p style={{ color: "#92400e", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            This tool is for self-reflection and personal growth purposes. It is not a clinical psychological
            assessment and should not be used to diagnose any mental health condition. If you&apos;re struggling
            with your mental health, please speak to a licensed professional.
          </p>
        </section>

        <section style={s.section}>
          <div style={s.tag}>More Tools</div>
          <h2 style={s.h2}>Explore More Free AI Tools on SwiftoolAI</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              { label: "Situationship Analyser", href: "/tools/situationship-analyser" },
              { label: "Attachment Style Quiz", href: "/tools/attachment-style-quiz" },
              { label: "Aura Colour Generator", href: "/tools/aura-colour-generator" },
              { label: "Cover Letter Generator", href: "/tools/cover-letter-generator" },
              { label: "AI Bio Generator", href: "/tools/bio-generator" },
              { label: "Resume Bullet Writer", href: "/tools/resume-bullet-writer" },
            ].map((t) => (
              <a key={t.label} href={`https://www.swiftoolai.com${t.href}`} style={{ color: "#2563eb", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>{t.label}</a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
