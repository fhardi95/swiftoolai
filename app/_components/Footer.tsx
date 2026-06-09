"use client";
import Link from "next/link";

const footerLinkStyle: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(255,255,255,0.5)",
  transition: "color 0.15s",
  display: "block",
  marginBottom: "0.4rem",
};

export default function Footer() {
  return (
    <>
      <footer style={{ background: "#111827", marginTop: "5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>

            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#ffffff" }}>
                Swift<span style={{ color: "#60a5fa" }}>Tool</span><span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>AI</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Free AI-powered tools for everyone. No sign-up required.</p>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>AI Tools</div>
              {[
                { href: "/tools/cover-letter-generator", label: "Cover Letter Generator" },
                { href: "/tools/rewriter", label: "Text Rewriter" },
                { href: "/tools/bio-generator", label: "Bio Generator" },
                { href: "/tools/grammar-checker", label: "Grammar Checker" },
                { href: "/tools/ai-summarizer", label: "AI Summarizer" },
                { href: "/tools/ai-email-writer", label: "AI Email Writer" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Text Tools</div>
              {[
                { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
                { href: "/tools/word-counter", label: "Word Counter" },
                { href: "/tools/word-unscrambler", label: "Word Unscrambler" },
                { href: "/tools/case-converter", label: "Case Converter" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Resources</div>
              {[
                { href: "/blog", label: "Blog" },
                { href: "/blog/best-ai-tools-for-students", label: "Best AI Tools for Students" },
                { href: "/blog/chatgpt-vs-claude", label: "ChatGPT vs Claude" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>Company</div>
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2026 SwiftToolAI. All rights reserved.</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Free AI tools, no account needed.</span>
          </div>
        </div>
      </footer>
      <style>{`
        .footer-link {
          display: block;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.4rem;
          transition: color 0.15s;
          text-decoration: none;
        }
        .footer-link:hover { color: #ffffff; }
      `}</style>
    </>
  );
}
