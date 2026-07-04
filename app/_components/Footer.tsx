import Link from "next/link";

const FOOTER_COLS = [
  {
    heading: "AI Writing",
    links: [
      { href: "/tools/ai-detector", label: "AI Detector", badge: "New" },
      { href: "/tools/cover-letter-generator", label: "Cover Letter Generator" },
      { href: "/tools/ai-email-writer", label: "AI Email Writer" },
      { href: "/tools/linkedin-post-generator", label: "LinkedIn Post Generator" },
      { href: "/tools/cold-email-generator", label: "Cold Email Generator" },
      { href: "/tools/instagram-caption-generator", label: "Instagram Captions" },
    ],
  },
  {
    heading: "Career Tools",
    links: [
      { href: "/tools/resume-bullet-writer", label: "Resume Bullet Writer" },
      { href: "/tools/bio-generator", label: "Bio Generator" },
      { href: "/tools/rewriter", label: "Text Rewriter" },
      { href: "/tools/grammar-checker", label: "Grammar Checker" },
      { href: "/tools/ai-summarizer", label: "AI Summarizer" },
      { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
    ],
  },
  {
    heading: "AI Image",
    links: [
      { href: "/tools/background-remover", label: "Background Remover", badge: "New" },
      { href: "/tools/ai-face-rater", label: "AI Face Rater" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/webp-to-jpg", label: "WebP to JPG" },
      { href: "/tools/svg-to-png", label: "SVG to PNG" },
      { href: "/tools/png-to-pdf", label: "PNG to PDF" },
    ],
  },
  {
    heading: "Relationships & Wellness",
    links: [
      { href: "/tools/situationship-analyser", label: "Situationship Analyser" },
      { href: "/tools/attachment-style-quiz", label: "Attachment Style Quiz" },
      { href: "/tools/aura-colour-generator", label: "Aura Colour Generator" },
    ],
  },
  {
    heading: "Utilities",
    links: [
      { href: "/tools/word-counter", label: "Word Counter" },
      { href: "/tools/word-unscrambler", label: "Word Unscrambler" },
      { href: "/tools/case-converter", label: "Case Converter" },
      { href: "/tools/password-generator", label: "Password Generator" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
      { href: "/tools/color-picker", label: "Color Picker" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#94a3b8",
        marginTop: "auto",
        paddingTop: "3.5rem",
        paddingBottom: "2rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>
            Swift<span style={{ color: "#3b82f6" }}>tool</span>AI
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "2rem",
          }}
        >
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p style={{ color: "#e2e8f0", fontSize: 12, marginBottom: 10 }}>
                {col.heading}
              </p>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: "#94a3b8", fontSize: 13 }}>
                      {link.label}
                      {"badge" in link && link.badge && (
                        <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, background: "#2563eb", color: "#fff", borderRadius: 4, padding: "1px 5px", letterSpacing: "0.04em", textTransform: "uppercase", verticalAlign: "middle" }}>{link.badge}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
            © {year} SwiftoolAI. All rights reserved.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
            {[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/cookie-policy", label: "Cookie Policy" },
              { href: "/cookie-preferences", label: "Cookie Preferences" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="footer-legal-link" style={{ fontSize: 12, color: "#64748b", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}