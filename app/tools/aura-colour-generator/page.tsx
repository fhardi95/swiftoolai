import type { Metadata } from "next";
import AuraColourGeneratorClient from "./AuraColourGeneratorClient";

export const metadata: Metadata = {
  title: "Aura Colour Generator — What Is My Aura Colour? Free AI | SwiftoolAI",
  description: "Free AI aura colour generator. Answer 7 questions about your personality and energy — discover your aura colour, soul purpose, crystals, and personal affirmation instantly.",
  keywords: ["aura colour generator","what is my aura colour","aura colour test","aura colour quiz","aura reading online free","what colour is my aura","aura colour meaning","AI aura reading","aura colour quiz free","spiritual aura test"],
  openGraph: { title: "Aura Colour Generator — Free AI Spiritual Reading | SwiftoolAI", description: "Discover your unique aura colour in 7 questions. Free AI reading reveals your aura colour, meaning, soul purpose, crystals, and personal affirmation.", url: "https://www.swiftoolai.com/tools/aura-colour-generator", siteName: "SwiftoolAI", type: "website" },
  twitter: { card: "summary_large_image", title: "Aura Colour Generator — Free AI Reading", description: "Discover your aura colour in 7 questions. Free AI spiritual reading — meaning, soul purpose, crystals, and your personal affirmation." },
  alternates: { canonical: "https://www.swiftoolai.com/tools/aura-colour-generator" },
};

const s = {
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#6d28d9", background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
};

const AURA_COLOURS = [
  { colour: "Red", hex: "#dc2626", meaning: "Passion, drive, physical vitality, leadership, action. Red auras are powerful and grounded in the material world." },
  { colour: "Orange", hex: "#ea580c", meaning: "Creativity, confidence, joy, adventure, social energy. Orange auras radiate warmth and enthusiasm." },
  { colour: "Yellow", hex: "#ca8a04", meaning: "Intellect, optimism, curiosity, clarity, playfulness. Yellow auras illuminate every room they enter." },
  { colour: "Green", hex: "#16a34a", meaning: "Healing, growth, compassion, balance, nature connection. Green auras nurture everything around them." },
  { colour: "Blue", hex: "#2563eb", meaning: "Communication, truth, calm, trust, expression. Blue auras carry deep wisdom and authentic voice." },
  { colour: "Indigo", hex: "#4338ca", meaning: "Intuition, sensitivity, inner knowing, depth. Indigo auras are highly perceptive old souls." },
  { colour: "Violet", hex: "#7c3aed", meaning: "Spirituality, transformation, vision, magic. Violet auras are here to evolve and inspire others." },
  { colour: "White", hex: "#e5e7eb", meaning: "Purity, spiritual connection, transcendence. White auras are rare and deeply connected to higher realms." },
  { colour: "Pink", hex: "#db2777", meaning: "Love, tenderness, gentleness, romance. Pink auras are deeply loving and emotionally open." },
  { colour: "Gold", hex: "#b45309", meaning: "Wisdom, abundance, spiritual authority, generosity. Gold auras radiate divine light and inspiring presence." },
];

const FAQS = [
  { q: "What is an aura colour?", a: "In spiritual and metaphysical traditions, an aura is a luminous energy field that surrounds all living beings. The colour of your aura is said to reflect your current emotional state, personality, spiritual development, and life energy. Different traditions assign different meanings to each colour, but common associations include red for passion, blue for communication, green for healing, and violet for spiritual awareness." },
  { q: "How does the AI aura colour generator work?", a: "You answer 7 questions about your energy, emotions, personality, and purpose. Our AI analyses your answers holistically — looking for patterns across all responses — and determines your aura colour based on the dominant energetic qualities you express. The result includes your specific colour shade name, its meaning, your personality reading, soul purpose, compatible crystals, and a personal affirmation." },
  { q: "Can I have more than one aura colour?", a: "Yes. Most people have a primary aura colour with secondary colours in different parts of their energy field. Our generator identifies your dominant aura colour based on your current energy, personality, and life purpose. Different life stages or emotional states can shift which colour is most dominant." },
  { q: "What is the rarest aura colour?", a: "White and gold auras are considered among the rarest in aura reading traditions. White auras are associated with spiritual purity and a high-frequency connection to divine energy. Gold auras reflect deep wisdom, abundance consciousness, and spiritual mastery. Both are thought to appear in individuals on a strong spiritual path." },
  { q: "What do aura colours mean?", a: "Each aura colour carries specific energetic meanings: Red = passion, drive, survival instinct. Orange = creativity, joy, social confidence. Yellow = intellect, optimism, curiosity. Green = healing, compassion, growth. Blue = communication, truth, calmness. Indigo = intuition, depth, inner knowing. Violet = spirituality, transformation, vision. White = purity, spiritual connection. Pink = love, tenderness. Gold = wisdom, abundance, divine presence." },
  { q: "Is my aura colour permanent?", a: "Your core aura colour tends to be stable but can shift with major life events, emotional healing, spiritual growth, or changes in mindset and energy. Many spiritual practitioners believe you can consciously cultivate certain aura qualities through meditation, energy work, intention, and lifestyle. The colour revealed by our generator reflects your current dominant energy." },
  { q: "What crystals are good for aura cleansing?", a: "Different crystals resonate with different aura colours and energy centres. Clear quartz is a universal amplifier. Black tourmaline and obsidian are protective and grounding for lower chakra energies. Rose quartz supports love and heart-centred energy. Amethyst works with spiritual awareness and violet energy. Citrine is associated with optimism and solar plexus energy. Our generator recommends specific crystals based on your aura colour." },
  { q: "Is my aura reading kept private?", a: "Yes. Your answers are sent securely to generate your reading and are never stored on our servers, read by any person, or used for any other purpose. No personal information is collected or retained after your result is displayed." },
];

export default function AuraColourGeneratorPage() {
  return (
    <>
      <AuraColourGeneratorClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        <section style={s.section}>
          <div style={s.tag}>About</div>
          <h2 style={s.h2}>What Is the AI Aura Colour Generator?</h2>
          <p style={s.p}>SwiftoolAI&apos;s free Aura Colour Generator uses AI to analyse your personality, energy patterns, and inner world and reveal your unique aura colour. Auras are described in spiritual traditions as the electromagnetic energy field surrounding all living beings — a luminous expression of your personality, emotional state, and spiritual energy. Your aura colour reflects who you are at a deep level: your natural gifts, life purpose, emotional tendencies, and spiritual evolution. Unlike generic colour quizzes, our AI reads your open-ended answers and generates a personalised aura reading — including your specific colour shade name, its meaning, a personality portrait, your soul purpose, compatible healing crystals, and a powerful personal affirmation written just for you.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginTop: "1.25rem" }}>
            {[
              { icon: "🌈", title: "12 Aura Colours", desc: "Rich colour spectrum" },
              { icon: "🔮", title: "Soul Purpose", desc: "What you&apos;re here to do" },
              { icon: "💎", title: "Crystal Match", desc: "Crystals for your energy" },
              { icon: "✨", title: "Affirmation", desc: "Personalised for you" },
              { icon: "🆓", title: "Always Free", desc: "No account needed" },
              { icon: "🔒", title: "100% Private", desc: "Nothing stored" },
            ].map(f => (
              <div key={f.title} style={{ background: "#f9fafb", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: f.desc }} />
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <div style={s.tag}>Colour Guide</div>
          <h2 style={s.h2}>What Do Aura Colours Mean?</h2>
          <p style={{ ...s.p, marginBottom: "1.25rem" }}>Each aura colour carries distinct energetic meanings. Here are the primary aura colours and what they represent.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
            {AURA_COLOURS.map(ac => (
              <div key={ac.colour} style={{ border: "1px solid rgba(0,0,0,0.07)", borderLeft: `4px solid ${ac.hex}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 4 }}>{ac.colour}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{ac.meaning}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <div style={s.tag}>FAQ</div>
          <h2 style={s.h2}>Frequently Asked Questions — Aura Colour Generator</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.q}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", color: "#fff" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", marginBottom: "1.5rem" }}>What Your Aura Reading Includes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 16, textAlign: "center" }}>
            {[{ stat: "12+", label: "Aura colour variations" }, { stat: "7", label: "Personalised questions" }, { stat: "Free", label: "Always, no limits" }, { stat: "< 10s", label: "Instant reading" }].map(st => (
              <div key={st.label}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{st.stat}</div>
                <div style={{ fontSize: 11, color: "#c4b5fd", marginTop: 4, lineHeight: 1.4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...s.section, background: "#f5f3ff", border: "1px solid #ddd6fe" }}>
          <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 6, fontSize: 14 }}>✨ A Note on Aura Readings</div>
          <p style={{ color: "#5b21b6", fontSize: 13, lineHeight: 1.7, margin: 0 }}>Aura colour readings are rooted in spiritual and metaphysical traditions rather than scientific research. Our generator is designed for self-exploration, creative reflection, and fun. Treat your result as one perspective on your energy and personality — not a definitive truth. Your answers are never stored or shared. Enjoy the experience with an open and playful spirit.</p>
        </section>

        <section style={s.section}>
          <div style={s.tag}>More Tools</div>
          <h2 style={s.h2}>More Free AI Tools on SwiftoolAI</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              { label: "Situationship Analyser", href: "/tools/situationship-analyser" },
              { label: "Attachment Style Quiz", href: "/tools/attachment-style-quiz" },
              { label: "AI Face Rater", href: "/tools/ai-face-rater" },
              { label: "AI Bio Generator", href: "/tools/bio-generator" },
              { label: "Instagram Caption Generator", href: "/tools/instagram-caption-generator" },
              { label: "Grammar Checker", href: "/tools/grammar-checker" },
            ].map(t => (
              <a key={t.label} href={`https://www.swiftoolai.com${t.href}`} style={{ color: "#6d28d9", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>{t.label}</a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
