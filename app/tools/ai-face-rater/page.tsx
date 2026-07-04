import type { Metadata } from "next";
import AIFaceRaterClient from "./AIFaceRaterClient";

export const metadata: Metadata = {
  title: "AI Face Rater — Rate My Face Online Free | SwiftoolAI",
  description: "Upload a photo and get an instant AI-powered attractiveness score out of 10. Our free AI Face Rater analyses facial symmetry, features, and aesthetics — no sign-up, no storage, 100% private.",
  keywords: ["AI face rater","rate my face online","face rating AI","attractiveness score AI","rate my face free","facial attractiveness test","face score online","AI face analysis","face beauty rater","rate my appearance AI"],
  openGraph: { title: "AI Face Rater — Rate My Face Online Free | SwiftoolAI", description: "Get an instant AI attractiveness score out of 10. Upload your photo and receive detailed facial analysis, symmetry feedback, and personalised tips — free and private.", url: "https://www.swiftoolai.com/tools/ai-face-rater", siteName: "SwiftoolAI", type: "website" },
  twitter: { card: "summary_large_image", title: "AI Face Rater — Rate My Face Online Free", description: "Upload a photo and get your AI attractiveness score out of 10. Free, private, no sign-up needed." },
  alternates: { canonical: "https://www.swiftoolai.com/tools/ai-face-rater" },
};

const SEO_INTRO = `Have you ever wondered how AI perceives facial attractiveness? SwiftoolAI's AI Face Rater is a free, instant, and private online tool that gives you an AI-powered attractiveness score out of 10 — along with a detailed breakdown of your facial strengths, symmetry analysis, aesthetic vibe, and friendly improvement tips. Powered by advanced multimodal AI, our face rating tool evaluates key aesthetic markers including facial symmetry, feature proportions, skin clarity, and overall harmony. Unlike generic "hot or not" apps, our AI Face Rater goes beyond a number — it delivers constructive, personalised feedback designed to help you understand your unique look and how to enhance your natural features. It is 100% free to use, requires no account or sign-up, and never stores or shares your photo.`;
const SEO_SCIENCE = `Modern AI face analysis is grounded in decades of scientific research into facial aesthetics, evolutionary biology, and perceptual psychology. Facial symmetry is one of the most studied: people tend to find more symmetrical faces more attractive, partly because symmetry is associated with developmental stability and genetic health. Alongside symmetry, researchers study facial proportions — including the neoclassical "golden ratio" (phi ≈ 1.618) — as well as skin quality indicators like even tone and clarity, and sexual dimorphism. SwiftoolAI's AI Face Rater draws on these scientific principles, using a large language model trained on vast visual data to holistically assess these factors in your uploaded photo.`;
const SEO_HOWAIWORKS = `SwiftoolAI's AI Face Rater uses Claude Sonnet, Anthropic's state-of-the-art multimodal AI model, to analyse uploaded face images. When you submit your photo, it is securely converted to a base64-encoded image and sent directly to the AI model, which processes it through its vision capabilities. The model evaluates dozens of contextual and structural elements simultaneously — including overall facial structure, balance between facial thirds, positioning and shape of key features, skin appearance, hair framing, and the overall aesthetic impression. The result is a score from 1 to 10, a descriptive verdict, a written summary, a list of your standout strengths, your aesthetic vibe, a symmetry observation, and two constructive improvement tips.`;

const SEO_TIPS = [
  { heading: "Use Natural Light", body: "Harsh overhead or artificial lighting creates shadows that can obscure facial features. For the most accurate result, photograph yourself near a window in soft, natural daylight." },
  { heading: "Choose a Neutral Background", body: "A cluttered or brightly coloured background can draw attention away from your face. Use a plain white or grey wall so the AI can focus entirely on your facial features." },
  { heading: "Face the Camera Directly", body: "A straight-on, frontal angle gives the AI the most data to work with — particularly for symmetry analysis, which requires both sides of the face to be equally visible." },
  { heading: "Skip Heavy Filters and Editing", body: "Beauty filters and heavy retouching change your underlying facial geometry and can produce artificially inflated scores. For an honest, useful rating, upload a natural, unedited photo." },
  { heading: "Ensure Your Whole Face Is Visible", body: "Avoid photos where your hair covers large parts of your face or you are wearing sunglasses. The AI needs to see your complete facial structure for the most accurate results." },
  { heading: "Use a High-Resolution Photo", body: "Blurry or low-resolution images limit the AI's ability to distinguish fine details. A recent, clear photo taken on a modern smartphone will give you the best results." },
];

const SCORE_GUIDE = [
  { range: "9.0 – 10", label: "Exceptional", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", desc: "A truly exceptional score. The AI has identified near-perfect facial harmony, outstanding symmetry, and striking feature definition. Extremely rare — fewer than 1 in 100 ratings fall in this bracket." },
  { range: "7.5 – 8.9", label: "Very Attractive", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", desc: "A high score indicating strong facial harmony, good symmetry, and clearly defined, well-proportioned features. This range reflects faces most people would consider highly attractive." },
  { range: "6.0 – 7.4", label: "Above Average", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", desc: "Above the average range, indicating a well-balanced, pleasant face with several standout features." },
  { range: "4.5 – 5.9", label: "Average", color: "#d97706", bg: "#fffbeb", border: "#fde68a", desc: "The average range covers the majority of the population. A score here doesn't mean unattractive — average faces are widely considered pleasant and approachable." },
  { range: "3.0 – 4.4", label: "Below Average", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", desc: "A below-average score indicates the AI identified some asymmetries or proportional imbalances. Remember: attractiveness is highly contextual." },
  { range: "1.0 – 2.9", label: "Needs Improvement", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", desc: "Very low scores are rare and may result from photo quality issues rather than actual facial features. Try a cleaner, well-lit photo before drawing any conclusions." },
];

const FAQS_MAIN = [
  { question: "What is SwiftoolAI's AI Face Rater?", answer: "SwiftoolAI's AI Face Rater is a free online tool that uses Claude Sonnet — a state-of-the-art multimodal AI — to analyse an uploaded photo of a face and generate an attractiveness score out of 10, along with a detailed breakdown of facial strengths, symmetry, aesthetic vibe, and personalised improvement tips." },
  { question: "How does the AI face rating work?", answer: "Upload a clear photo of a face. The AI analyses key aesthetic factors — including facial symmetry, feature proportions, the balance of the facial thirds, skin clarity, and overall harmony — then produces a score from 1 to 10 and a full written analysis. Results appear in seconds." },
  { question: "Is the AI face rater free?", answer: "Yes, completely free. There is no subscription, no credits to buy, no premium tier, and no sign-up or account required. Simply upload your photo and get your results immediately." },
  { question: "Is my photo stored or shared after rating?", answer: "No. Your photo is transmitted securely over HTTPS, used solely to generate the AI rating, and is never stored on our servers after processing. We do not share, sell, license, or retain any images submitted through this tool." },
  { question: "What type of photo gives the best AI face rating results?", answer: "A clear, well-lit frontal face photo without heavy filters, sunglasses, extreme angles, or obstructions produces the most accurate analysis. Natural daylight, a plain background, and a high-resolution image are ideal." },
  { question: "How accurate is the AI face score?", answer: "The AI provides a thoughtful aesthetic analysis based on widely recognised principles of facial harmony and symmetry. It is far more nuanced than simple ratio-based tools, but should be understood as an AI perspective — not an objective truth. Beauty is inherently subjective." },
  { question: "Can the AI rater analyse any face?", answer: "Yes. The tool works across all skin tones, ethnicities, ages, and genders. Only upload photos of people who have given their explicit consent. Never upload images of minors." },
  { question: "What does a face rating include?", answer: "Each rating includes: (1) an attractiveness score out of 10, (2) a verdict label, (3) an overall impression summary, (4) three facial strengths, (5) an aesthetic vibe description, (6) a symmetry observation, and (7) two friendly, actionable improvement tips." },
];

const FAQS_TECHNICAL = [
  { question: "What AI model powers the face rater?", answer: "The face rater is powered by Claude Sonnet by Anthropic — one of the most capable multimodal AI models available, with advanced vision capabilities to evaluate complex visual information such as facial structure, proportions, and aesthetics." },
  { question: "What image formats are supported?", answer: "The tool accepts JPG/JPEG, PNG, and WEBP image formats. HEIC (Apple's default format) should be converted to JPG before uploading, which most modern browsers do automatically." },
  { question: "Is there a file size limit for uploaded photos?", answer: "For optimal performance, we recommend photos under 10MB. A standard smartphone JPEG at default settings is ideal." },
  { question: "Why did my rating come back as a very low score?", answer: "Very low scores often indicate a photo quality issue. Common causes include: extreme blur, very low resolution, heavy filters, a face that is too small or partially out of frame, or very poor lighting." },
  { question: "Can I use a group photo?", answer: "The tool is designed for single-face photos. With a group photo, the AI will attempt to analyse the most prominent face in the frame, but results will be less accurate." },
  { question: "Can I rate multiple photos to compare results?", answer: "Yes. After viewing your results, click 'Rate Another Photo' to reset the tool and upload a new image. Many users find it useful to compare results across different lighting conditions and angles." },
];

const s = {
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
};

export default function AIFaceRaterPage() {
  return (
    <>
      <AIFaceRaterClient />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>

        {/* 1. ABOUT */}
        <section style={s.section}>
          <div style={s.tag}>About</div>
          <h2 style={s.h2}>About Our Free AI Face Rater</h2>
          <p style={s.p}>{SEO_INTRO}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginTop: "1.25rem" }}>
            {[
              { icon: "⭐", title: "Score Out of 10", desc: "Instant AI attractiveness rating" },
              { icon: "🔬", title: "Symmetry Analysis", desc: "Left/right facial symmetry score" },
              { icon: "💪", title: "Strengths Found", desc: "AI highlights your best features" },
              { icon: "💡", title: "Actionable Tips", desc: "Personalised improvement advice" },
              { icon: "🔒", title: "100% Private", desc: "Photos never stored or shared" },
              { icon: "⚡", title: "Instant Results", desc: "Full analysis in under 10 seconds" },
              { icon: "🌍", title: "Inclusive AI", desc: "Works across all ethnicities & ages" },
              { icon: "✨", title: "Aesthetic Vibe", desc: "Unique style personality read" },
              { icon: "🆓", title: "Always Free", desc: "No account, no credits, no limits" },
            ].map(f => (
              <div key={f.title} style={{ background: "#f9fafb", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: "14px" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 3 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. HOW IT WORKS */}
        <section style={s.section}>
          <div style={s.tag}>Guide</div>
          <h2 style={s.h2}>How to Rate Your Face with AI — Step by Step</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: "1", title: "Upload a Clear Face Photo", desc: "Click the upload zone or drag and drop your photo. Supported formats: JPG, PNG, WEBP. For best results, use a well-lit, filter-free frontal photo where your full face is visible." },
              { step: "2", title: "Click 'Rate My Face'", desc: "Hit the rate button and our advanced AI (Claude Sonnet by Anthropic) will instantly begin a full multimodal analysis of your facial symmetry, feature proportions, and overall aesthetic harmony." },
              { step: "3", title: "Receive Your AI Score and Full Breakdown", desc: "Within seconds, you'll see your attractiveness score out of 10, a verdict label, a written overall impression, your top three facial strengths, your aesthetic vibe, a symmetry note, and two personalised improvement tips." },
              { step: "4", title: "Try Again with a Different Photo", desc: "Click 'Rate Another Photo' to reset and upload a new image. Compare different lighting setups, angles, or looks to see how presentation affects your AI score." },
            ].map(item => (
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

        {/* 3. HOW AI WORKS */}
        <section style={s.section}>
          <div style={s.tag}>Technology</div>
          <h2 style={s.h2}>How the AI Analyses Your Face</h2>
          <p style={s.p}>{SEO_HOWAIWORKS}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {[
              { title: "Facial Symmetry", desc: "Evaluates left-to-right balance across eyes, brows, cheeks, and lips." },
              { title: "Facial Thirds Balance", desc: "Analyses proportional harmony between the upper, middle, and lower thirds of the face." },
              { title: "Feature Definition", desc: "Assesses jawline sharpness, cheekbone prominence, lip fullness, and eye shape." },
              { title: "Overall Harmony", desc: "Assesses how all elements work together as a whole for overall aesthetic impact." },
              { title: "Skin Appearance", desc: "Interprets visible skin clarity, evenness, and texture as part of the aesthetic assessment." },
              { title: "Aesthetic Vibe", desc: "The model identifies the overall stylistic energy and personality the face projects." },
            ].map(item => (
              <div key={item.title} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 10, padding: "14px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SCORE GUIDE */}
        <section style={s.section}>
          <div style={s.tag}>Score Guide</div>
          <h2 style={s.h2}>AI Face Score Guide — What Your Rating Means</h2>
          <p style={{ ...s.p, marginBottom: "1.25rem" }}>Use this guide to understand what your AI attractiveness score reflects. Remember that scores are based on general aesthetic principles and one photo.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SCORE_GUIDE.map(sc => (
              <div key={sc.range} style={{ background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, minWidth: 80 }}>
                  <div style={{ color: sc.color, fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>{sc.range}</div>
                  <div style={{ color: sc.color, fontWeight: 700, fontSize: 11, marginTop: 2 }}>{sc.label}</div>
                </div>
                <p style={{ color: sc.color, fontSize: 13, lineHeight: 1.65, margin: 0, opacity: 0.9 }}>{sc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SCIENCE */}
        <section style={s.section}>
          <div style={s.tag}>Science</div>
          <h2 style={s.h2}>The Science Behind AI Facial Attractiveness Analysis</h2>
          <p style={s.p}>{SEO_SCIENCE}</p>
        </section>

        {/* 6. PHOTO TIPS */}
        <section style={s.section}>
          <div style={s.tag}>Tips</div>
          <h2 style={s.h2}>6 Tips for the Most Accurate AI Face Rating</h2>
          <p style={{ ...s.p, marginBottom: "1.25rem" }}>The quality of your photo significantly affects the accuracy of your rating.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SEO_TIPS.map((tip, i) => (
              <div key={tip.heading} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 3 }}>{tip.heading}</div>
                  <p style={{ ...s.p, marginBottom: 0 }}>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. MAIN FAQs */}
        <section style={s.section}>
          <div style={s.tag}>FAQ</div>
          <h2 style={s.h2}>Frequently Asked Questions — AI Face Rater</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS_MAIN.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS_MAIN.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.question}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. TECHNICAL FAQs */}
        <section style={s.section}>
          <div style={s.tag}>Technical</div>
          <h2 style={s.h2}>Technical Questions — AI Face Rating Tool</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS_TECHNICAL.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < FAQS_TECHNICAL.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{faq.question}</div>
                <p style={{ ...s.p, marginBottom: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. STATS BAR */}
        <section style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", color: "#fff" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", marginBottom: "1.5rem" }}>Why Thousands Use SwiftoolAI's Face Rater</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16, textAlign: "center" }}>
            {[
              { stat: "10", label: "Score scale — full detail breakdown" },
              { stat: "< 10s", label: "Average analysis time" },
              { stat: "0", label: "Photos stored after rating" },
              { stat: "Free", label: "Always — no account needed" },
            ].map(st => (
              <div key={st.label}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{st.stat}</div>
                <div style={{ fontSize: 11, color: "#bfdbfe", marginTop: 4, lineHeight: 1.4 }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. DISCLAIMER */}
        <section style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 16, padding: "1.25rem 1.75rem", marginBottom: "1.5rem" }}>
          <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6, fontSize: 14 }}>⚠️ Important Disclaimer</div>
          <p style={{ color: "#92400e", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            This tool is provided for entertainment, self-exploration, and educational purposes only. Beauty is deeply subjective, culturally relative, and cannot be objectively measured by any algorithm. AI ratings reflect one data point based on general aesthetic principles interpreted from a single photo. They should never be taken as a definitive measure of your worth, attractiveness, or value as a person. Only upload photos with the full consent of the person pictured. Never upload images of minors. If AI face scores affect your self-esteem, please speak to someone you trust or a mental health professional.
          </p>
        </section>

        {/* 11. RELATED TOOLS */}
        <section style={s.section}>
          <div style={s.tag}>More Tools</div>
          <h2 style={s.h2}>Explore More Free AI Tools on SwiftoolAI</h2>
          <p style={s.p}>SwiftoolAI offers a growing collection of free AI tools for writing, image editing, and productivity.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              { label: "AI Text Summarizer", href: "/tools/ai-summarizer" },
              { label: "Image Compressor", href: "/tools/image-compressor" },
              { label: "AI Bio Generator", href: "/tools/bio-generator" },
              { label: "AI Email Writer", href: "/tools/ai-email-writer" },
              { label: "Cover Letter Generator", href: "/tools/cover-letter-generator" },
              { label: "Grammar Checker", href: "/tools/grammar-checker" },
              { label: "Instagram Caption Generator", href: "/tools/instagram-caption-generator" },
              { label: "Color Picker", href: "/tools/color-picker" },
              { label: "Cold Email Generator", href: "/tools/cold-email-generator" },
              { label: "Case Converter", href: "/tools/case-converter" },
              { label: "CDR to JPG Converter", href: "/tools/cdr-to-jpg" },
              { label: "QR Code Generator", href: "/tools/qr-code-generator" },
            ].map(t => (
              <a key={t.label} href={`https://www.swiftoolai.com${t.href}`} style={{ color: "#2563eb", fontSize: 13, textDecoration: "none", padding: "4px 0", borderBottom: "1px solid transparent" }}
               
               
              >
                {t.label}
              </a>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
