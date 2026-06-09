"use client";
import Link from "next/link";
import { useState } from "react";

const tools = [
  { href: "/tools/cover-letter-generator", label: "Cover Letter Generator" },
  { href: "/tools/rewriter", label: "Text Rewriter" },
  { href: "/tools/bio-generator", label: "Bio Generator" },
  { href: "/tools/grammar-checker", label: "Grammar Checker" },
  { href: "/tools/word-counter", label: "Word Counter" },
  { href: "/tools/word-unscrambler", label: "Word Unscrambler" },
  { href: "/tools/ai-summarizer", label: "AI Summarizer" },
  { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
  { href: "/tools/ai-email-writer", label: "AI Email Writer" },
  { href: "/tools/case-converter", label: "Case Converter" },
  { href: "/tools/cdr-to-jpg", label: "CDR to JPG" },
];

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
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
            letterSpacing: "-0.03em", textDecoration: "none", color: "#111827",
          }}>
            Swift<span style={{ color: "#2563eb" }}>Tool</span><span style={{ color: "#9ca3af", fontWeight: 400 }}>AI</span>
          </Link>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setToolsOpen(prev => !prev)}
                className="nav-btn"
                style={{
                  fontSize: 14, padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                  background: toolsOpen ? "#f3f4f6" : "transparent",
                  color: toolsOpen ? "#111827" : "#6b7280",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                }}
              >
                Tools <span style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>{toolsOpen ? "▴" : "▾"}</span>
              </button>

              {toolsOpen && (
                <>
                  <div onClick={() => setToolsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 150 }} />
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", left: 0,
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 10, padding: "0.4rem",
                    minWidth: 230, zIndex: 200,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  }}>
                    {tools.map(t => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsOpen(false)}
                        className="nav-dropdown-link"
                      >{t.label}</Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/blog" className="nav-btn" style={{
              fontSize: 14, color: "#6b7280",
              padding: "6px 12px", borderRadius: "var(--radius-sm)",
              textDecoration: "none",
            }}>Blog</Link>
          </div>

          <Link href="/tools/cover-letter-generator" className="nav-cta">
            Try Free →
          </Link>
        </div>
      </nav>

      <style>{`
        .nav-btn:hover { background: #f3f4f6 !important; color: #111827 !important; }
        .nav-dropdown-link {
          display: block; font-size: 13px; color: #6b7280;
          padding: 8px 12px; border-radius: 7px;
          text-decoration: none; transition: all 0.12s;
        }
        .nav-dropdown-link:hover { color: #111827; background: #f3f4f6; }
        .nav-cta {
          font-size: 13px; font-weight: 600;
          background: #2563eb; color: #fff !important;
          padding: 8px 18px; border-radius: var(--radius-sm);
          text-decoration: none; transition: opacity 0.15s;
        }
        .nav-cta:hover { opacity: 0.88; }
        @media (max-width: 640px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
