import type { Metadata } from "next";
import SituationshipAnalyserClient from "./SituationshipAnalyserClient";

export const metadata: Metadata = {
  title: "Situationship Analyser — What Is My Situation? Free AI | SwiftoolAI",
  description: "Describe your romantic situation and get an instant AI analysis — red flags, green flags, what they want, and honest advice. Free, private, no sign-up needed.",
  keywords: ["situationship analyser","what is my situationship","situationship or relationship","am I in a situationship","situationship signs","situationship quiz","AI relationship analyser","situationship advice","undefined relationship","talking stage analyser"],
  openGraph: { title: "Situationship Analyser — Free AI Relationship Read | SwiftoolAI", description: "Describe what's going on and get an honest AI read: red flags, green flags, what they really want, and what to do. Free, private, no account needed.", url: "https://www.swiftoolai.com/tools/situationship-analyser", siteName: "SwiftoolAI", type: "website" },
  twitter: { card: "summary_large_image", title: "Situationship Analyser — AI Relationship Read", description: "Get an honest AI analysis of your romantic situation. Red flags, green flags, and real advice — free." },
  alternates: { canonical: "https://www.swiftoolai.com/tools/situationship-analyser" },
};

const s = {
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#9d174d", background: "#fdf2f8", border: "1px solid #fbcfe8", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
};

const FAQS = [
  { q: "What is a situationship?", a: "A situationship is a romantic connection without a clear label or mutual commitment. It sits somewhere between a friendship and a relationship — often involving physical or emotional intimacy, regular contact, and relationship-like behaviour, but with no official status, future plans, or acknowledged exclusivity. They are extremely common in modern dating and can be deeply confusing to navigate." },
  { q: "How does the AI situationship analyser work?", a: "You describe your situation in your own words — as much or as little detail as you like. Our AI reads your description and analyses the emotional dynamics, communication patterns, and behavioural signals to give you a clear verdict, red and green flags, an honest assessment of what the other person likely wants, and actionable advice on what to do." },
  { q: "What makes this different from googling 'am I in a situationship?'", a: "Generic articles give generic advice. This tool analyses your specific situation — the unique details, patterns, and behaviours you describe — and gives you a personalised read tailored to your circumstances. Think of it as an honest friend who has heard the full story and tells you what they really think." },
  { q: "Is my description kept private?", a: "Yes. Your description is sent securely over HTTPS solely to generate the analysis. It is never stored on our servers, never read by humans, and never used for any purpose after your results are returned." },
  { q: "What is the 'chance of becoming a real relationship' percentage?", a: "This is the AI's assessment — based on the signals in your description — of how likely this situation is to develop into a committed relationship. It is a prompt for reflection, not a prediction. Many factors outside any AI's knowledge affect relationship outcomes." },
  { q: "What if I'm in a toxic situationship?", a: "If our AI identifies toxic dynamics — such as manipulation, inconsistency designed to keep you hooked, or deliberate emotional unavailability — it will name them clearly. You deserve honesty. If the situation is harming your mental health, please reach out to someone you trust or a professional." },
  { q: "Can I analyse a friendship or situationship between other people?", a: "Yes. You can describe any situation — yours, a friend's, or even something you've observed. The tool analyses the dynamics described and is not limited to first-person romantic situations." },
  { q: "How detailed should my description be?", a: "The more detail you include, the more accurate and useful the analysis will be. Include how long you've known the person, how you communicate, what happens in person versus over text, any mixed signals you've noticed, and what you want from the situation. More context = better advice." },
];

const SIGNS = [
  { title: "No Label Despite Months of Talking", desc: "One or both people avoid defining the relationship even after extended time, dates, or intimacy." },
  { title: "Inconsistent Communication", desc: "Hot and cold texting patterns — intense contact followed by unexplained pullbacks — are a hallmark sign." },
  { title: "Future Plans Are Vague or Absent", desc: "There are no conversations about where this is going. Any mention of the future gets deflected or joked away." },
  { title: "Exclusive Behaviour Without Exclusivity", desc: "You act like a couple but haven't agreed to be one. There's jealousy without commitment." },
  { title: "Emotional Intimacy Without Commitment", desc: "Deep conversations, vulnerability, maybe physical intimacy — but no formal agreement to be together." },
  { title: "One Person Wants More", desc: "Often one person is more invested and hoping for a relationship, while the other is comfortable with ambiguity." },
];

export default function SituationshipAnalyserPage() {
  return (
    <>
      <SituationshipAnalyserClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        <section style={s.section}>
          <div style={s.tag}>About</div>
          <h2 style={s.h2}>What Is the AI Situationship Analyser?</h2>
          <p style={s.p}>SwiftoolAI&apos;s free Situationship Analyser uses advanced AI to help you make sense of confusing romantic dynamics. Whether you&apos;ve been in the talking stage for months, stuck in something undefined, or wondering why someone blows hot and cold — our AI reads your specific situation and delivers a clear, honest, and compassionate breakdown. It identifies red and green flags, assesses what the other person likely wants, gives you a realistic sense of whether this could become a real relationship, and offers actionable advice on what to do next. No sign-up, no account, and your description is never stored.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginTop: "1.25rem" }}>
            {[
              { icon: "🔍", title: "Honest Read", desc: "No sugarcoating" },
              { icon: "🚩", title: "Red & Green Flags", desc: "Clear signal breakdown" },
              { icon: "💬", title: "What They Want", desc: "AI reads the subtext" },
              { icon: "💡", title: "Real Advice", desc: "Actionable next steps" },
              { icon: "📊", title: "Relationship Meter", desc: "Chance of going official" },
              { icon: "🔒", title: "100% Private", desc: "Nothing stored" },
            ].map(f => (
              <div key={f.title} style={{ background: "#f9fafb", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <div style={s.tag}>Signs</div>
          <h2 style={s.h2}>6 Classic Signs You&apos;re in a Situationship</h2>
          <p style={{ ...s.p, marginBottom: "1.25rem" }}>Not sure if what you have counts as a situationship? These are the most common patterns our AI identifies.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SIGNS.map((s2, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fdf2f8", color: "#9d174d", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 3 }}>{s2.title}</div>
                  <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s2.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <div style={s.tag}>How It Works</div>
          <h2 style={s.h2}>How to Use the Situationship Analyser</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: "1", title: "Describe Your Situation Honestly", desc: "Write what is actually happening — the timeline, the communication patterns, what happens in person, any mixed signals, and what you want. The more honest and detailed you are, the better the analysis." },
              { step: "2", title: "Click Analyse My Situation", desc: "Our AI reads your description and analyses the emotional dynamics, behavioural signals, and communication patterns within seconds." },
              { step: "3", title: "Read Your Full Analysis", desc: "Get a clear verdict label, overall summary, red and green flags, an honest read of what the other person wants, a relationship chance percentage, and specific advice on what to do." },
              { step: "4", title: "Take Action", desc: "Use the insights as a prompt to have the conversation you have been avoiding, set boundaries, or make peace with walking away." },
            ].map(item => (
              <div key={item.step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#9d174d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0, boxShadow: "0 2px 8px rgba(157,23,77,0.3)" }}>{item.step}</div>
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
          <h2 style={s.h2}>Frequently Asked Questions — Situationship Analyser</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.q}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "linear-gradient(135deg, #9d174d, #831843)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", color: "#fff" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", marginBottom: "1.5rem" }}>Why Use SwiftoolAI&apos;s Situationship Analyser?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))", gap: 16, textAlign: "center" }}>
            {[{ stat: "Free", label: "Always, no account needed" }, { stat: "Private", label: "Nothing stored after analysis" }, { stat: "Honest", label: "No sugarcoating" }, { stat: "< 10s", label: "Instant results" }].map(st => (
              <div key={st.label}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{st.stat}</div>
                <div style={{ fontSize: 11, color: "#fbcfe8", marginTop: 4, lineHeight: 1.4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...s.section, background: "#fffbeb", border: "1px solid #fde68a" }}>
          <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6, fontSize: 14 }}>⚠️ Important Note</div>
          <p style={{ color: "#92400e", fontSize: 13, lineHeight: 1.7, margin: 0 }}>This tool is for self-reflection and entertainment purposes only. Relationship dynamics are complex and no AI can fully capture every nuance of human connection. If your situation is causing significant emotional distress, please speak to a trusted friend, therapist, or counsellor. This tool does not store your responses. Do not share identifying details about yourself or others.</p>
        </section>

        <section style={s.section}>
          <div style={s.tag}>More Tools</div>
          <h2 style={s.h2}>Explore More Free AI Tools on SwiftoolAI</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              { label: "AI Face Rater", href: "/tools/ai-face-rater" },
              { label: "Attachment Style Quiz", href: "/tools/attachment-style-quiz" },
              { label: "Aura Colour Generator", href: "/tools/aura-colour-generator" },
              { label: "AI Bio Generator", href: "/tools/bio-generator" },
              { label: "Grammar Checker", href: "/tools/grammar-checker" },
              { label: "Instagram Caption Generator", href: "/tools/instagram-caption-generator" },
            ].map(t => (
              <a key={t.label} href={`https://www.swiftoolai.com${t.href}`} style={{ color: "#9d174d", fontSize: 13, textDecoration: "none", padding: "4px 0", borderBottom: "1px solid transparent" }}>{t.label}</a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
