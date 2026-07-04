import type { Metadata } from "next";
import BackgroundRemoverClient from "./BackgroundRemoverClient";

export const metadata: Metadata = {
  title: "Remove Background AI from Image for Free",
  description:
    "Remove image backgrounds instantly with our free AI background remover. No sign-up, no watermarks. Works on portraits, product photos, logos & more.",
  alternates: { canonical: "https://www.swiftoolai.com/tools/background-remover" },
  openGraph: {
    title: "Background Remover - Free AI Background Eraser Online",
    description:
      "Remove backgrounds from images in seconds using AI. Free, no watermark, no uploads to servers. Works on portraits, products, logos, and more.",
    url: "https://www.swiftoolai.com/tools/background-remover",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Remover - Free AI Background Eraser Online | SwiftoolAI",
    description:
      "Free AI background remover. Remove image backgrounds instantly, no watermark, no uploads — 100% private.",
  },
  keywords: [
    "background remover",
    "remove background from image",
    "background eraser",
    "AI background remover",
    "remove image background",
    "background removal tool",
    "free background remover",
    "transparent background maker",
    "remove background online",
    "portrait background remover",
    "product photo background remover",
    "no watermark background remover",
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

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: "What is a background remover?",
    answer:
      "A background remover is an AI-powered tool that automatically detects the subject of an image — a person, product, logo, or object — and removes the background, leaving a transparent PNG. Our free AI background remover processes your image entirely in your browser, so your photos are never uploaded to any server.",
  },
  {
    question: "Is this background remover really free?",
    answer:
      "Yes — completely free. Create a free SwiftoolAI account (just a Google sign-in) and you can remove backgrounds from as many images as you like. There are no watermarks, no hidden fees, and no subscription required.",
  },
  {
    question: "What image formats does the background eraser support?",
    answer:
      "Our AI background eraser supports JPG, JPEG, PNG, and WebP images up to 20 MB. The result is always exported as a transparent PNG so you can use it on any background colour or design.",
  },
  {
    question: "Is my image uploaded to a server?",
    answer:
      "No. Our background remover runs the AI model entirely in your browser using WebAssembly. Your image is never sent to our servers or any third-party service. This makes it one of the most privacy-preserving background removal tools available.",
  },
  {
    question: "How does AI background removal work?",
    answer:
      "The tool uses a deep-learning segmentation model that identifies the foreground subject and produces a high-quality alpha mask. It then applies that mask to produce a transparent PNG. The model is downloaded once to your device and runs locally — no internet connection is needed after the initial model load.",
  },
  {
    question: "Can I remove backgrounds from product photos?",
    answer:
      "Absolutely. Our AI background remover works great on product photography, e-commerce images, apparel photos, furniture, and packshots. Upload your product image and get a clean transparent PNG ready for use on Amazon, Shopify, Etsy, or any marketplace.",
  },
  {
    question: "Can I use this background eraser for portraits and profile pictures?",
    answer:
      "Yes. The AI model is trained on people, faces, and hair — including complex hair strands — so it handles portrait photos with high accuracy. It's ideal for LinkedIn profile pictures, headshots, team photos, and social media avatars.",
  },
  {
    question: "Does the background remover add watermarks?",
    answer:
      "Never. SwiftoolAI does not add watermarks to any output. Your downloaded transparent PNG is clean and ready for professional use.",
  },
];

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Background Remover - Free AI Background Eraser Online",
  description:
    "Remove image backgrounds instantly with our free AI background remover. No watermarks, processed in your browser, 100% private.",
  url: "https://www.swiftoolai.com/tools/background-remover",
  isPartOf: { "@type": "WebSite", name: "SwiftoolAI", url: "https://www.swiftoolai.com" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Background Remover",
  description:
    "A free AI background remover that removes image backgrounds instantly. Works on portraits, products, logos, and more. No watermarks, processed in your browser.",
  url: "https://www.swiftoolai.com/tools/background-remover",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Remove background from image",
    "Transparent PNG export",
    "No watermark",
    "Privacy-first — processed in browser",
    "Portrait and product photo support",
    "AI background eraser",
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
  name: "How to Remove a Background from an Image",
  description: "Remove the background from any image using our free AI background remover in 3 simple steps.",
  step: [
    { "@type": "HowToStep", name: "Upload your image", text: "Click 'Upload Image' or drag and drop your photo into the background remover tool." },
    { "@type": "HowToStep", name: "AI removes the background", text: "The AI background eraser automatically detects the subject and removes the background in seconds." },
    { "@type": "HowToStep", name: "Download your transparent PNG", text: "Click 'Download PNG' to save your image with a transparent background — no watermark, no sign-up required." },
  ],
};

// ─── Page component ───────────────────────────────────────────────────────────
export default function BackgroundRemoverPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Interactive tool */}
      <BackgroundRemoverClient />

      {/* SEO content below the fold */}
      <div style={_s.wrap}>

        {/* Trust badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "✂️", label: "AI-powered removal", sub: "Deep learning segmentation" },
            { icon: "🔒", label: "100% private", sub: "Never leaves your browser" },
            { icon: "🚫", label: "No watermark", sub: "Clean transparent PNG" },
            { icon: "⚡", label: "Instant results", sub: "Seconds, not minutes" },
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
          <h2 style={_s.h2}>About Our Free AI Background Remover</h2>
          <p style={_s.p}>
            SwiftoolAI&apos;s <strong>background remover</strong> is a free, AI-powered tool that lets you <strong>remove the background from any image</strong> in seconds — no design skills required, no watermarks, no server uploads. Whether you need to <strong>remove a background from a product photo</strong>, clean up a portrait for LinkedIn, or create a transparent logo, our <strong>AI background eraser</strong> handles it all with a single click.
          </p>
          <p style={_s.p}>
            Unlike most <strong>background removal tools</strong> that send your images to third-party servers, our background remover runs the entire AI model in your browser using WebAssembly. Your photos never leave your device — making this one of the most private <strong>remove-background-online</strong> solutions available today.
          </p>
          <p style={_s.p}>
            The underlying model is a state-of-the-art deep learning segmentation network that accurately detects subjects — people, animals, products, vehicles, and objects — and produces a clean alpha mask. The result is a <strong>transparent background PNG</strong> ready to drop straight into Photoshop, Canva, Figma, Shopify, or any design tool.
          </p>
        </section>

        {/* How it works */}
        <section style={_s.section}>
          <div style={_s.tag}>How It Works</div>
          <h2 style={_s.h2}>How to Remove a Background from an Image</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "📤", step: "1", title: "Upload your image", body: "Drag and drop or click to upload any JPG, PNG, or WebP image up to 20 MB. Your image is loaded into the tool in seconds." },
              { icon: "🤖", step: "2", title: "AI removes the background", body: "Our AI background eraser analyses the image, detects the subject, and removes the background automatically — no manual selection needed." },
              { icon: "⬇️", step: "3", title: "Download transparent PNG", body: "Click Download PNG to save a clean, watermark-free transparent image. Ready for Canva, Figma, Shopify, or anywhere else." },
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

        {/* Use cases */}
        <section style={_s.section}>
          <div style={_s.tag}>Use Cases</div>
          <h2 style={_s.h2}>What Can You Use This Background Eraser For?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🛍️", title: "E-commerce product photos", body: "Remove image backgrounds from product shots for Amazon, Etsy, Shopify, or any online store. Clean white or transparent backgrounds boost conversions." },
              { icon: "👤", title: "Profile pictures & headshots", body: "Get a professional transparent background portrait for LinkedIn, CVs, team pages, and social media. Works perfectly on hair and complex edges." },
              { icon: "🎨", title: "Design & marketing assets", body: "Create transparent-background PNGs for use in Canva, Figma, Adobe Illustrator, or any design tool without manual clipping." },
              { icon: "🖼️", title: "Logos & brand assets", body: "Remove white or coloured backgrounds from logos, icons, and illustrations so they work on any colour or pattern." },
              { icon: "📸", title: "Photo composites", body: "Cut out subjects from one photo to place on a new background — for creative edits, thumbnails, or presentations." },
              { icon: "📋", title: "IDs, documents & forms", body: "Prepare passport-style or official document photos with a clean, compliant background quickly and for free." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ padding: "1.1rem", background: "#f9fafb", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <h3 style={_s.h3}>{title}</h3>
                <p style={{ ..._s.p, marginBottom: 0, fontSize: 13 }}>{body}</p>
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

        {/* Comparison table */}
        <section style={_s.section}>
          <div style={_s.tag}>Why SwiftoolAI</div>
          <h2 style={_s.h2}>SwiftoolAI vs Other Background Removers</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {["Feature", "SwiftoolAI", "Remove.bg", "Canva"].map((h, i) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "center", fontWeight: 700, color: i === 1 ? "#2563eb" : "#374151", borderBottom: "2px solid rgba(0,0,0,0.08)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Free to use", "✅", "Limited", "Limited"],
                  ["No watermark", "✅", "✅ (paid)", "✅ (paid)"],
                  ["Privacy — no server upload", "✅", "❌", "❌"],
                  ["Transparent PNG export", "✅", "✅", "✅"],
                  ["No account required", "❌ (free sign-in)", "✅", "Limited"],
                  ["Product photo support", "✅", "✅", "✅"],
                  ["Portrait & hair accuracy", "✅", "✅", "✅"],
                ].map(([feature, ...vals]) => (
                  <tr key={feature as string} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <td style={{ padding: "10px 14px", color: "#374151", fontWeight: 500 }}>{feature}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ padding: "10px 14px", textAlign: "center", color: v === "✅" ? "#16a34a" : v === "❌" ? "#dc2626" : "#9ca3af" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* More tools */}
        <section style={_s.section}>
          <div style={_s.tag}>More Tools</div>
          <h2 style={_s.h2}>More Free AI Image Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
            {[
              ["AI Face Rater", "/tools/ai-face-rater"],
              ["Image Compressor", "/tools/image-compressor"],
              ["WebP to JPG", "/tools/webp-to-jpg"],
              ["SVG to PNG", "/tools/svg-to-png"],
              ["PNG to PDF", "/tools/png-to-pdf"],
              ["AI Detector", "/tools/ai-detector"],
            ].map(([label, href]) => (
              <a key={label} href={`https://www.swiftoolai.com${href}`} style={_s.link}>{label}</a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
