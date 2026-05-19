import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "3rem 1.25rem 2rem",
      marginTop: "5rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}>
          <div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: "1.1rem",
              letterSpacing: "-0.03em", marginBottom: "0.5rem",
            }}>
              Swift<span style={{ color: "var(--accent)" }}>Tool</span>AI
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              Free AI-powered tools for everyone. No sign-up required.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Tools</div>
            {[
              { href: "/tools/rewriter", label: "Text Rewriter" },
              { href: "/tools/bio-generator", label: "Bio Generator" },
              { href: "/tools/grammar-checker", label: "Grammar Checker" },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: "0.4rem" }}>
                <Link href={l.href} style={{ fontSize: 13, color: "var(--muted)" }}>{l.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Resources</div>
            {[
              { href: "/blog", label: "Blog" },
              { href: "/blog/best-ai-tools-for-students", label: "Best AI Tools for Students" },
              { href: "/blog/chatgpt-vs-claude", label: "ChatGPT vs Claude" },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: "0.4rem" }}>
                <Link href={l.href} style={{ fontSize: 13, color: "var(--muted)" }}>{l.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Company</div>
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: "0.4rem" }}>
                <Link href={l.href} style={{ fontSize: 13, color: "var(--muted)" }}>{l.label}</Link>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "0.5rem",
        }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>© 2025 SwiftToolAI. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Free AI tools, no account needed.</span>
        </div>
      </div>
    </footer>
  );
}
