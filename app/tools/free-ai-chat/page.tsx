import type { Metadata } from "next";
import FreeAIChatWidget from "./FreeAIChatWidget";

export const metadata: Metadata = {
  title: "Free AI Chat Online — No Sign-Up Required | SwiftoolAI",
  description: "Chat with a powerful AI for free, right in your browser. No account, no login, no message limits to get started. Ask anything — writing, coding, homework, and more.",
  keywords: [
    "free ai chat", "ai chat no login", "chat with ai online free",
    "free chatbot no signup", "ai assistant free", "chatgpt alternative free",
    "free ai chat unlimited", "online ai chat no account",
  ],
  openGraph: {
    title: "Free AI Chat Online — No Sign-Up Required | SwiftoolAI",
    description: "Chat with a powerful AI for free, right in your browser. No account needed to start.",
    url: "https://www.swiftoolai.com/tools/free-ai-chat",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Chat Online — No Sign-Up Required",
    description: "Chat with a powerful AI for free, right in your browser. No account needed.",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/free-ai-chat" },
};

const s = {
  section: { maxWidth: 860, margin: "0 auto", padding: "0 1.25rem" } as React.CSSProperties,
  card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem", textAlign: "center" as const },
  sub: { color: "#6b7280", fontSize: 14, textAlign: "center" as const, marginBottom: "1.75rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 },
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
};

const FEATURES = [
  { icon: "⚡", title: "No Registration Required", desc: "Start chatting immediately — no account, no email, no phone number needed." },
  { icon: "🆓", title: "Free to Start", desc: "No paywall to send your first messages. No ads interrupting your conversation." },
  { icon: "🔒", title: "Private by Design", desc: "Your conversation isn't used to train models or shared with third parties." },
];

const STEPS = [
  { step: "1", title: "Type your question", desc: "Scroll up to the chat box and type anything — a question, a task, a problem to solve." },
  { step: "2", title: "Get an instant answer", desc: "The AI responds in seconds. Ask follow-ups, request rewrites, or change direction anytime." },
  { step: "3", title: "Go deeper when you need to", desc: "Want unlimited daily use across all of SwiftoolAI's 30 tools? Upgrade to Pro whenever you're ready." },
];

const USE_CASES = [
  { icon: "💼", title: "Writing & Content", desc: "Draft emails, articles, social posts, and any content you need." },
  { icon: "📄", title: "Study & Research", desc: "Understand complex topics, summarize articles, and prep for exams." },
  { icon: "💻", title: "Coding Help", desc: "Debug code, learn concepts, and get explanations in plain English." },
  { icon: "🎨", title: "Brainstorming", desc: "Generate ideas for projects, business plans, or personal goals." },
  { icon: "🌍", title: "Language Practice", desc: "Practice conversations, get translations, improve your writing." },
  { icon: "🏠", title: "Daily Tasks", desc: "Plan your day, draft messages, or get a quick answer to anything." },
];

const FAQS = [
  { q: "Is this AI chat really free?", a: "Yes. You can start chatting immediately with no account and no payment. If you want unlimited daily use across all of SwiftoolAI's AI tools, a Pro plan is available, but it's not required to use the free chat." },
  { q: "Do I need to sign up or log in?", a: "No. You can start typing and get answers right away. Signing in with Google is only needed if you want your conversation history saved or want to use SwiftoolAI's other AI-powered tools." },
  { q: "What can I ask it?", a: "Anything — writing help, coding questions, homework, research summaries, brainstorming, translations, and general knowledge questions. It's a general-purpose AI assistant." },
  { q: "Is my conversation private?", a: "Your messages are sent securely to generate a response and aren't shared with third parties or used to build a public profile of you." },
  { q: "How is this different from other free AI chat tools?", a: "Most free AI chatbots either cap your daily messages hard, or bury the free tier behind a required sign-up. This one lets you start typing immediately, with the option to create a free account later if you want saved history and access to SwiftoolAI's other 29 AI tools." },
  { q: "What happens if I want more from it?", a: "If you find yourself using AI chat and tools daily, SwiftoolAI Pro gives you unlimited access across all 30 tools — including this chat, resume and cover letter writers, AI detectors, and more — for a flat monthly or yearly price." },
];

export default function FreeAIChatPage() {
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "#fff", padding: "3.5rem 1.25rem 2.5rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "5px 14px", fontSize: 12, color: "#2563eb", fontWeight: 600, marginBottom: "1.25rem" }}>
            🆓 No sign-up needed to start
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 5vw, 2.7rem)", letterSpacing: "-0.03em", color: "#111827", marginBottom: "0.9rem" }}>
            Free AI Chat, No Login Required
          </h1>
          <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.7, marginBottom: "2rem" }}>
            Ask anything — writing, coding, homework, research, or just a quick question. Start typing below and get an instant answer.
          </p>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <FreeAIChatWidget />
        </div>
      </section>

      <div style={{ padding: "3rem 0 4rem" }}>
        {/* Features */}
        <section style={s.section}>
          <h2 style={s.h2}>Why Use SwiftoolAI&apos;s Free AI Chat?</h2>
          <p style={s.sub}>A fast, no-friction way to chat with AI — without an account wall in your way.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={s.card}>
                <div style={{ fontSize: 26, marginBottom: "0.6rem" }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 6 }}>{f.title}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={s.section}>
          <div style={s.card}>
            <h2 style={s.h2}>How to Use Free AI Chat</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {STEPS.map((item) => (
                <div key={item.step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{item.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 4 }}>{item.title}</div>
                    <p style={{ ...s.p, marginBottom: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#widget" style={{ display: "block", textAlign: "center", marginTop: "1.5rem", padding: "12px", background: "#2563eb", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Start Chatting ↑
            </a>
          </div>
        </section>

        {/* Use cases */}
        <section style={s.section}>
          <h2 style={s.h2}>What People Use Free AI Chat For</h2>
          <p style={s.sub}>A general-purpose assistant for whatever you&apos;re working on.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {USE_CASES.map((u) => (
              <div key={u.title} style={s.card}>
                <div style={{ fontSize: 22, marginBottom: "0.5rem" }}>{u.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 4 }}>{u.title}</div>
                <p style={{ ...s.p, marginBottom: 0, fontSize: 13 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section style={s.section}>
          <div style={s.card}>
            <h2 style={s.h2}>Free Chat vs. Paid Chatbot Subscriptions</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(0,0,0,0.08)" }}>
                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#9ca3af", fontWeight: 600 }}></th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#2563eb", fontWeight: 700 }}>SwiftoolAI Free Chat</th>
                    <th style={{ textAlign: "center", padding: "10px 8px", color: "#6b7280", fontWeight: 700 }}>Typical Paid Plans</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Account required to start", "No", "Usually yes"],
                    ["Cost to try", "$0", "Free tier often capped, then ~$20/mo"],
                    ["Access to other AI tools", "29 tools on SwiftoolAI Pro", "Separate subscriptions each"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <td style={{ padding: "10px 8px", color: "#374151", fontWeight: 600 }}>{row[0]}</td>
                      <td style={{ padding: "10px 8px", textAlign: "center", color: "#111827" }}>{row[1]}</td>
                      <td style={{ padding: "10px 8px", textAlign: "center", color: "#6b7280" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={s.section}>
          <div style={s.card}>
            <h2 style={s.h2}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.q}</div>
                  <p style={{ ...s.p, marginBottom: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related tools */}
        <section style={s.section}>
          <div style={s.card}>
            <h2 style={s.h2}>Explore More Free AI Tools</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
              {[
                { label: "AI Personality OS", href: "/tools/personality-os" },
                { label: "AI Bio Generator", href: "/tools/bio-generator" },
                { label: "Cover Letter Generator", href: "/tools/cover-letter-generator" },
                { label: "Grammar Checker", href: "/tools/grammar-checker" },
                { label: "AI Detector", href: "/tools/ai-detector" },
                { label: "AI Summarizer", href: "/tools/ai-summarizer" },
              ].map((t) => (
                <a key={t.label} href={t.href} style={{ color: "#2563eb", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>{t.label}</a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
