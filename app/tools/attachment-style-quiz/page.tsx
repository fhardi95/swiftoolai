import type { Metadata } from "next";
import AttachmentStyleQuizClient from "./AttachmentStyleQuizClient";

export const metadata: Metadata = {
  title: "Attachment Style Quiz — Am I Secure, Anxious or Avoidant? Free AI | SwiftoolAI",
  description: "Free AI attachment style quiz. Answer 8 open questions and discover if you're secure, anxious, avoidant, or disorganised — with strengths, challenges, and healing tips.",
  keywords: ["attachment style quiz","what is my attachment style","secure anxious avoidant disorganised","attachment theory test","attachment style test free","anxious attachment quiz","avoidant attachment quiz","AI attachment style","relationship attachment quiz","attachment style meaning"],
  openGraph: { title: "Attachment Style Quiz — Free AI | SwiftoolAI", description: "Discover your attachment style in 8 questions. Free AI-powered quiz reveals if you're secure, anxious, avoidant, or disorganised — with a full personalised breakdown.", url: "https://www.swiftoolai.com/tools/attachment-style-quiz", siteName: "SwiftoolAI", type: "website" },
  twitter: { card: "summary_large_image", title: "Attachment Style Quiz — Free AI", description: "Free AI quiz reveals your attachment style — secure, anxious, avoidant, or disorganised. Full breakdown, strengths, and healing tips." },
  alternates: { canonical: "https://www.swiftoolai.com/tools/attachment-style-quiz" },
};

const s = {
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#1e40af", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
};

const STYLES = [
  { key: "secure", emoji: "🌿", label: "Secure", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", desc: "Comfortable with closeness and independence. Communicates needs clearly. Doesn't fear abandonment and gives partners space without anxiety." },
  { key: "anxious", emoji: "🌊", label: "Anxious-Preoccupied", color: "#d97706", bg: "#fffbeb", border: "#fde68a", desc: "Craves closeness but fears abandonment. May over-communicate, seek reassurance, or interpret neutral signals as rejection." },
  { key: "avoidant", emoji: "🏔️", label: "Dismissive-Avoidant", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", desc: "Values independence highly. May withdraw from emotional intimacy, suppress feelings, and feel smothered by closeness." },
  { key: "disorganised", emoji: "🌀", label: "Fearful-Avoidant", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", desc: "Desires closeness but fears it at the same time. Often linked to early relational trauma. Can feel confused about relationships." },
];

const FAQS = [
  { q: "What are the 4 attachment styles?", a: "The four attachment styles, developed from John Bowlby and Mary Ainsworth's attachment theory, are: Secure (comfortable with intimacy and autonomy), Anxious-Preoccupied (craves closeness, fears abandonment), Dismissive-Avoidant (values independence, withdraws from intimacy), and Fearful-Avoidant or Disorganised (wants connection but fears it, often due to early relational trauma)." },
  { q: "What is the most common attachment style?", a: "Research suggests approximately 50–55% of adults have a secure attachment style. Anxious attachment accounts for around 20%, avoidant for 25%, and disorganised for around 5%. These are population-level estimates and vary across cultures and studies." },
  { q: "Can your attachment style change?", a: "Yes. Attachment styles are not fixed. Therapy — particularly approaches like EMDR, psychodynamic therapy, and schema therapy — can help people develop more secure attachment patterns. Healthy, consistent relationships can also gradually shift attachment styles over time." },
  { q: "How is this quiz different from a standard multiple-choice attachment quiz?", a: "Most attachment quizzes give you fixed options like 'strongly agree' or 'strongly disagree'. Our quiz uses AI to analyse your answers in your own words, picking up on nuance, context, and emotional tone that binary scoring cannot capture. The result is a more personalised and accurate read of your attachment patterns." },
  { q: "What is anxious attachment?", a: "Anxious attachment is a pattern where someone craves closeness and reassurance in relationships but lives with an underlying fear that their partner will leave or lose interest. Common signs include checking your phone for messages, overthinking a partner's tone or mood, difficulty self-soothing during conflict, and a tendency to prioritise the relationship above personal needs." },
  { q: "What is avoidant attachment?", a: "Avoidant attachment — also called Dismissive-Avoidant — involves a high value on independence and self-sufficiency, often at the expense of emotional closeness. Avoidant individuals may shut down during conflict, feel smothered by a partner's emotional needs, struggle to express vulnerability, and maintain emotional distance even in committed relationships." },
  { q: "What is disorganised attachment?", a: "Disorganised or Fearful-Avoidant attachment involves conflicting impulses: the desire for closeness alongside a fear of it. It often develops from early experiences where caregivers were simultaneously a source of comfort and fear. People with disorganised attachment may oscillate between seeking connection and pushing partners away." },
  { q: "Is my quiz data kept private?", a: "Yes. Your answers are sent securely to generate your result and are never stored on our servers, read by staff, or used for any purpose after your analysis is returned. We do not store your attachment style result or any personal information." },
];

export default function AttachmentStyleQuizPage() {
  return (
    <>
      <AttachmentStyleQuizClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        <section style={s.section}>
          <div style={s.tag}>About</div>
          <h2 style={s.h2}>About the Free AI Attachment Style Quiz</h2>
          <p style={s.p}>Attachment theory, developed by psychologist John Bowlby and expanded by Mary Ainsworth, describes how the bonds formed with our earliest caregivers shape the way we connect with romantic partners in adult life. Understanding your attachment style is one of the most powerful tools for improving your relationships — it explains patterns of communication, conflict, emotional distance, and fear of abandonment that can otherwise feel mysterious or out of your control. SwiftoolAI&apos;s free Attachment Style Quiz uses AI to analyse your answers in your own words, providing a more nuanced and personalised result than standard multiple-choice quizzes. The full breakdown includes your primary attachment style, a score across all four styles, your relationship strengths and growth areas, how you typically show up in romantic relationships, a healing tip, and which attachment styles you tend to be most compatible with.</p>
        </section>

        <section style={s.section}>
          <div style={s.tag}>The 4 Styles</div>
          <h2 style={s.h2}>The 4 Attachment Styles Explained</h2>
          <p style={{ ...s.p, marginBottom: "1.25rem" }}>Most people have a dominant attachment style, though blends are common. None is permanently fixed — all can shift with awareness and the right support.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STYLES.map(st => (
              <div key={st.key} style={{ background: st.bg, border: `1px solid ${st.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{st.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: st.color, marginBottom: 5 }}>{st.label}</div>
                  <p style={{ color: st.color, fontSize: 13, lineHeight: 1.65, margin: 0, opacity: 0.9 }}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <div style={s.tag}>FAQ</div>
          <h2 style={s.h2}>Frequently Asked Questions — Attachment Style Quiz</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.q}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "linear-gradient(135deg, #1d4ed8, #1e40af)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", color: "#fff" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", marginBottom: "1.5rem" }}>What You Get from This Quiz</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))", gap: 16, textAlign: "center" }}>
            {[{ stat: "4", label: "Attachment styles scored" }, { stat: "AI", label: "Open-answer analysis" }, { stat: "Free", label: "No account required" }, { stat: "Private", label: "Answers never stored" }].map(st => (
              <div key={st.label}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{st.stat}</div>
                <div style={{ fontSize: 11, color: "#bfdbfe", marginTop: 4, lineHeight: 1.4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...s.section, background: "#fffbeb", border: "1px solid #fde68a" }}>
          <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6, fontSize: 14 }}>⚠️ Important Note</div>
          <p style={{ color: "#92400e", fontSize: 13, lineHeight: 1.7, margin: 0 }}>This quiz is for self-reflection and educational purposes only. It is not a clinical diagnostic tool. For a formal attachment assessment or support with relationship patterns, please consult a qualified therapist or psychologist trained in attachment theory. Your answers are never stored or shared.</p>
        </section>

        <section style={s.section}>
          <div style={s.tag}>More Tools</div>
          <h2 style={s.h2}>More Free AI Tools on SwiftoolAI</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              { label: "Situationship Analyser", href: "/tools/situationship-analyser" },
              { label: "Aura Colour Generator", href: "/tools/aura-colour-generator" },
              { label: "AI Face Rater", href: "/tools/ai-face-rater" },
              { label: "AI Bio Generator", href: "/tools/bio-generator" },
              { label: "Grammar Checker", href: "/tools/grammar-checker" },
              { label: "Instagram Caption Generator", href: "/tools/instagram-caption-generator" },
            ].map(t => (
              <a key={t.label} href={`https://www.swiftoolai.com${t.href}`} style={{ color: "#1d4ed8", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>{t.label}</a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
