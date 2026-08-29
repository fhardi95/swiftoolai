import type { Metadata } from "next";
import AiMediaGeneratorClient from "./AiMediaGeneratorClient";

export const metadata: Metadata = {
  title: "AI Image & Video Generator - Free Text to Image/Video AI",
  description:
    "Generate images and videos from text prompts using 7 top AI models — Qwen, GPT Image, Kling, Veo, Minimax, LTX & more. Free to try, no watermark.",
  alternates: { canonical: "https://www.swiftoolai.com/tools/ai-media-generator" },
  openGraph: {
    title: "AI Image & Video Generator - Free Text to Image/Video AI",
    description:
      "Turn any text prompt into an image or video. Choose from 7 leading AI models including GPT Image 2, Kling 3.0, and Veo 3.1.",
    url: "https://www.swiftoolai.com/tools/ai-media-generator",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image & Video Generator | SwiftoolAI",
    description:
      "Generate images and videos from text prompts using 7 top AI models. Free, fast, no watermark.",
  },
  keywords: [
    "ai image generator",
    "ai video generator",
    "text to image ai",
    "text to video ai",
    "free ai image generator",
    "free ai video generator",
    "qwen image generator",
    "kling ai video",
    "veo video generator",
    "gpt image generator",
  ],
};

// ─── Shared styles ───────────────────────────────────────────────────────────
const _s = {
  wrap: { maxWidth: 860, margin: "0 auto", padding: "0 1.25rem 5rem" } as React.CSSProperties,
  section: {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 16,
    padding: "1.75rem",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  } as React.CSSProperties,
  h2: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "1.3rem",
    color: "#111827",
    letterSpacing: "-0.02em",
    marginBottom: "1rem",
  } as React.CSSProperties,
  h3: { fontWeight: 700, fontSize: "0.95rem", color: "#111827", marginBottom: "0.4rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.8, marginBottom: "1rem" } as React.CSSProperties,
  tag: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    color: "#2563eb",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 100,
    padding: "3px 10px",
    marginBottom: "0.75rem",
  },
  faqItem: (last: boolean) =>
    ({ borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.06)", paddingBottom: 16, marginBottom: 16 } as React.CSSProperties),
  faqQ: { fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 } as React.CSSProperties,
  link: { color: "#2563eb", fontSize: 13, textDecoration: "none" } as React.CSSProperties,
};

const MODEL_ROWS: [string, string, string][] = [
  ["Qwen Image 3", "Image", "Photoreal, editorial-style stills"],
  ["Nano Banana 2 Lite", "Image", "Fast drafts and thumbnails"],
  ["GPT Image 2", "Image", "General-purpose image generation"],
  ["Minimax H3", "Video", "Cinematic motion from a prompt"],
  ["LTX 2.5 Pro", "Video", "High-fidelity, handheld realism"],
  ["Kling 3.0", "Video", "Smooth, coherent motion"],
  ["Veo 3.1 Fast", "Video", "Quick-turnaround video"],
];

const FAQS = [
  {
    question: "How does the AI image & video generator work?",
    answer:
      "Write a text prompt describing what you want to see, choose one of seven AI models, and click generate. Your prompt is sent to the selected model, which renders an image or short video in seconds to a couple of minutes depending on the model.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes — create a free SwiftoolAI account (Google sign-in) and start generating. Free accounts get a daily allowance of AI generations; Pro accounts get effectively unlimited use.",
  },
  {
    question: "Which model should I pick for images?",
    answer:
      "GPT Image 2 is a solid general-purpose choice. Qwen Image 3 is great for photoreal, editorial-style shots, and Nano Banana 2 Lite is the fastest option for quick drafts and thumbnails.",
  },
  {
    question: "Which model should I pick for video?",
    answer:
      "Veo 3.1 Fast and Kling 3.0 are quick and reliable for general scenes. LTX 2.5 Pro leans toward high-fidelity, handheld realism, while Minimax H3 tends to produce more cinematic motion.",
  },
  {
    question: "How long does video generation take?",
    answer:
      "Image generation typically finishes in seconds. Video generation is queued and processed asynchronously, and can take anywhere from around 30 seconds up to a few minutes depending on the model and current load.",
  },
  {
    question: "Will my content be watermarked?",
    answer:
      "No. Generated images and videos are returned as clean files ready to download and use.",
  },
  {
    question: "What happens if my prompt is flagged?",
    answer:
      "If a prompt is flagged by the underlying model's content moderation, generation stops and you'll be asked to reword your prompt. Try removing anything that could be read as explicit, violent, or otherwise unsafe.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Image & Video Generator - Free Text to Image/Video AI",
  description:
    "Generate images and videos from text prompts using 7 top AI models. Free to try, no watermark.",
  url: "https://www.swiftoolai.com/tools/ai-media-generator",
  isPartOf: { "@type": "WebSite", name: "SwiftoolAI", url: "https://www.swiftoolai.com" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Image & Video Generator",
  description:
    "A free AI image and video generator supporting seven models including Qwen Image 3, GPT Image 2, Kling 3.0, and Veo 3.1 Fast.",
  url: "https://www.swiftoolai.com/tools/ai-media-generator",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Text to image generation",
    "Text to video generation",
    "7 selectable AI models",
    "No watermark",
    "Fast asynchronous job processing",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Generate an Image or Video with AI",
  description: "Generate an image or video from a text prompt in 3 simple steps.",
  step: [
    { "@type": "HowToStep", name: "Choose a model", text: "Pick one of seven AI image or video models based on the style and speed you want." },
    { "@type": "HowToStep", name: "Write a prompt", text: "Describe the image or video you want to see in as much detail as helps." },
    { "@type": "HowToStep", name: "Generate & download", text: "Click generate, wait for the job to complete, then download your image or video." },
  ],
};

export default function AiMediaGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Interactive tool */}
      <AiMediaGeneratorClient />

      {/* SEO content below the fold */}
      <div style={_s.wrap}>
        {/* Trust badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "🎨", label: "7 AI models", sub: "Image & video in one tool" },
            { icon: "⚡", label: "Fast rendering", sub: "Seconds to a few minutes" },
            { icon: "🚫", label: "No watermark", sub: "Clean, ready-to-use output" },
            { icon: "🔒", label: "Account-gated", sub: "Fair use, no abuse" },
          ].map(({ icon, label, sub }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "14px 16px", textAlign: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <section style={_s.section}>
          <div style={_s.tag}>About</div>
          <h2 style={_s.h2}>About Our AI Image &amp; Video Generator</h2>
          <p style={_s.p}>
            SwiftoolAI&apos;s <strong>AI image and video generator</strong> turns a text prompt into a finished image or short video using seven leading AI models — from fast draft generators to high-fidelity cinematic video models. Pick the model that matches your style and speed needs, describe what you want, and generate.
          </p>
          <p style={_s.p}>
            Every generation runs as an asynchronous job: your prompt is sent to the selected model, queued, rendered, and the finished file is streamed back to you automatically — no manual refreshing required.
          </p>
        </section>

        {/* Models table */}
        <section style={_s.section}>
          <div style={_s.tag}>Models</div>
          <h2 style={_s.h2}>Available AI Models</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {["Model", "Type", "Best for"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "2px solid rgba(0,0,0,0.08)", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODEL_ROWS.map(([name, type, best]) => (
                  <tr key={name} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <td style={{ padding: "10px 14px", color: "#111827", fontWeight: 600 }}>{name}</td>
                    <td style={{ padding: "10px 14px", color: type === "Video" ? "#2563eb" : "#16a34a" }}>{type}</td>
                    <td style={{ padding: "10px 14px", color: "#6b7280" }}>{best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How it works */}
        <section style={_s.section}>
          <div style={_s.tag}>How It Works</div>
          <h2 style={_s.h2}>How to Generate an Image or Video</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🧭", step: "1", title: "Choose a model", body: "Pick from three image models and four video models depending on style and speed." },
              { icon: "✍️", step: "2", title: "Write a prompt", body: "Describe the scene, subject, lighting, or style you want. More detail generally gives better results." },
              { icon: "⬇️", step: "3", title: "Generate & download", body: "Click generate, watch the live progress, then download your finished image or video." },
            ].map(({ icon, step, title, body }) => (
              <div key={step} style={{ padding: "1.25rem", background: "#f9fafb", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#2563eb", flexShrink: 0 }}>{step}</div>
                  <div style={{ fontSize: 20 }}>{icon}</div>
                </div>
                <h3 style={_s.h3}>{title}</h3>
                <p style={{ ..._s.p, marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={_s.section}>
          <div style={_s.tag}>FAQ</div>
          <h2 style={_s.h2}>Frequently Asked Questions</h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={_s.faqItem(i === FAQS.length - 1)}>
                <div style={_s.faqQ}>{faq.question}</div>
                <p style={{ ..._s.p, marginBottom: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* More tools */}
        <section style={_s.section}>
          <div style={_s.tag}>More Tools</div>
          <h2 style={_s.h2}>More Free AI Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              ["Background Remover", "/tools/background-remover"],
              ["AI Face Rater", "/tools/ai-face-rater"],
              ["Image Compressor", "/tools/image-compressor"],
              ["AI Detector", "/tools/ai-detector"],
              ["Free AI Chat", "/tools/free-ai-chat"],
              ["AI Summarizer", "/tools/ai-summarizer"],
            ].map(([label, href]) => (
              <a key={label} href={`https://www.swiftoolai.com${href}`} style={_s.link}>
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
