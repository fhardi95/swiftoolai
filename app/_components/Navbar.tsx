"use client";
import Link from "next/link";
import { useState } from "react";

const tools = [
  { href: "/tools/rewriter", label: "Text Rewriter" },
  { href: "/tools/bio-generator", label: "Bio Generator" },
  { href: "/tools/grammar-checker", label: "Grammar Checker" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,7,13,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 1.25rem",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 60,
        }}>
          <Link href="/" style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: "1.2rem",
            letterSpacing: "-0.03em",
          }}>
            Swift<span style={{ color: "var(--accent)" }}>Tool</span><span style={{ color: "var(--muted)", fontWeight: 400 }}>AI</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
            {tools.map(t => (
              <Link key={t.href} href={t.href} style={{
                fontSize: 14, color: "var(--muted)",
                padding: "6px 12px", borderRadius: "var(--radius-sm)",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text)"; (e.target as HTMLElement).style.background = "var(--surface)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--muted)"; (e.target as HTMLElement).style.background = "transparent"; }}
              >{t.label}</Link>
            ))}
            <Link href="/blog" style={{
              fontSize: 14, color: "var(--muted)",
              padding: "6px 12px", borderRadius: "var(--radius-sm)",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text)"; (e.target as HTMLElement).style.background = "var(--surface)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--muted)"; (e.target as HTMLElement).style.background = "transparent"; }}
            >Blog</Link>
          </div>

          <Link href="/tools/rewriter" style={{
            fontSize: 13, fontWeight: 500,
            background: "var(--accent)", color: "#fff",
            padding: "8px 18px", borderRadius: "var(--radius-sm)",
            border: "none", transition: "opacity 0.15s",
          }}>Try Free →</Link>
        </div>
      </nav>

      <style>{`
        @media (max-width: 640px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
