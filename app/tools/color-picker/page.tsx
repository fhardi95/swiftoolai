import type { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Color Picker Free Online – HEX, RGB, HSL Converter | SwiftoolAI",
  description:
    "Pick any color and instantly get its HEX, RGB, and HSL values with SwiftoolAI's free online Color Picker. Copy CSS color codes in one click, explore complementary colors, and build color palettes. No sign-up needed. Perfect for designers and developers.",
  keywords: [
    "color picker online free",
    "HEX RGB HSL converter",
    "CSS color picker",
    "web color picker tool",
    "hex to rgb converter",
    "rgb to hex converter",
    "color palette generator",
    "complementary colors tool",
    "html color code picker",
    "color scheme generator free",
    "online color tool",
    "color converter for designers",
    "pick color get hex code",
    "color code finder free",
  ],
  openGraph: {
    title: "Free Color Picker — HEX, RGB & HSL Online | SwiftoolAI",
    description:
      "Pick any color and get its HEX, RGB, and HSL values instantly. Copy CSS code with one click. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/color-picker",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/color-picker" },
};

const SEOPARAGRAPH = `Color is the cornerstone of visual design, influencing aesthetics, mood, and brand identity. SwiftoolAI's **Color Picker** offers a comprehensive and free online solution for designers, developers, and digital artists to explore, select, and convert colors with unparalleled ease. Pick any color from the visual selector and instantly retrieve its HEX, RGB, and HSL values with full precision. Copy CSS color codes directly for web projects, discover complementary colors to build harmonious palettes, and explore curated color schemes to inspire your creative work. This powerful online color tool streamlines your design workflow, eliminates guesswork, and makes complex color management simple and accessible — no registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's Color Picker?",
    answer:
      "SwiftoolAI's Color Picker is a free online tool that lets you select any color and instantly see its HEX, RGB, and HSL values, along with CSS code you can copy directly into your projects.",
  },
  {
    question: "How do I use the Color Picker?",
    answer:
      "Use the color wheel or sliders to pick your desired color. The HEX, RGB, and HSL values update in real-time. Click any value to copy it to your clipboard.",
  },
  {
    question: "Is the Color Picker free?",
    answer:
      "Yes — completely free with no charges, subscriptions, or sign-up requirements.",
  },
  {
    question: "What is the difference between HEX, RGB, and HSL?",
    answer:
      "HEX is a 6-digit code used in HTML and CSS (e.g., #FFFFFF). RGB defines colors by red, green, and blue intensities (e.g., rgb(255, 255, 255)). HSL describes hue, saturation, and lightness (e.g., hsl(0, 0%, 100%)) — often more intuitive for designers. All three are standard formats for digital color.",
  },
  {
    question: "Can I get CSS code directly from the Color Picker?",
    answer:
      "Yes. The tool generates CSS-ready color values in HEX, RGB, and HSL formats, which you can copy with a single click and paste directly into your stylesheet.",
  },
  {
    question: "Does it suggest complementary colors?",
    answer:
      "Yes. The Color Picker helps you discover complementary colors — colors opposite on the color wheel that create strong contrast — and browse color palettes to inspire your designs.",
  },
  {
    question: "Does it require any software installation?",
    answer:
      "No installation required. The Color Picker is fully web-based and works in any browser on any device.",
  },
  {
    question: "Is my color history saved?",
    answer:
      "For privacy, we do not store your color selection history on our servers. The tool is a real-time, session-based color picker.",
  },
];

const _s = {
  wrap: { maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
  faqItem: (last: boolean) => ({ borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.06)", paddingBottom: 16, marginBottom: 16 } as React.CSSProperties),
  faqQ: { fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 } as React.CSSProperties,
  link: { color: "#2563eb", fontSize: 13, textDecoration: "none" }  as React.CSSProperties,
};

export default function ColorPickerPage() {
  return (
    <>
      <ColorPickerClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free Online Color Picker</h2>
          <p style={{..._s.p}}>{SEOPARAGRAPH}</p>
        </section>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>FAQ</div>
          <h2 style={{..._s.h2}}>Frequently Asked Questions</h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{..._s.faqItem(i === FAQS.length - 1)}}>
                <div style={{..._s.faqQ}}>{faq.question}</div>
                <p style={{..._s.p, marginBottom: 0}}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>More Tools</div>
          <h2 style={{..._s.h2}}>Explore More Free Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/svg-to-png" style={{..._s.link}}>SVG to PNG Converter</a>
            <a href="https://www.swiftoolai.com/tools/png-to-pdf" style={{..._s.link}}>PNG to PDF Converter</a>
            <a href="https://www.swiftoolai.com/tools/image-compressor" style={{..._s.link}}>Image Compressor</a>
            <a href="https://www.swiftoolai.com/tools/qr-code-generator" style={{..._s.link}}>QR Code Generator</a>
            <a href="https://www.swiftoolai.com/tools/case-converter" style={{..._s.link}}>Case Converter</a>
            <a href="https://www.swiftoolai.com/tools/password-generator" style={{..._s.link}}>Password Generator</a>
          </div>
        </section>

      </div>
    </>
  );
}
