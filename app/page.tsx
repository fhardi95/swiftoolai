"use client";
import Link from "next/link";

const tools = [
  {
    href: "/tools/cover-letter-generator",
    icon: "📄",
    name: "AI Cover Letter Generator",
    desc: "Generate a tailored, professional cover letter in seconds. Perfect for any job application.",
    badge: "Most popular",
    color: "#2563eb",
  },
  {
    href: "/tools/rewriter",
    icon: "✦",
    name: "AI Text Rewriter",
    desc: "Rewrite any text in 9 different tones — professional, casual, Gen Z, luxury and more.",
    badge: null,
    color: "#2563eb",
  },
  {
    href: "/tools/bio-generator",
    icon: "◈",
    name: "AI Bio Generator",
    desc: "Generate a perfect bio for LinkedIn, Instagram, Twitter, or your website in seconds.",
    badge: null,
    color: "#ef4444",
  },
  {
    href: "/tools/grammar-checker",
    icon: "◉",
    name: "Grammar Checker",
    desc: "Fix grammar, spelling, and style errors instantly with AI-powered suggestions.",
    badge: "New",
    color: "#16a34a",
  },
  {
    href: "/tools/word-unscrambler",
    icon: "🔤",
    name: "Word Unscrambler",
    desc: "Unscramble letters into valid words instantly. Great for Scrabble, Wordle & more.",
    badge: null,
    color: "#2563eb",
  },
  {
    href: "/tools/ai-email-writer",
    icon: "✉️",
    name: "AI Email Writer",
    desc: "Write professional emails in seconds. Just describe what you need and let AI do the rest.",
    badge: null,
    color: "#ef4444",
  },
];

const stats = [
  { value: "10K+", label: "Monthly users" },
  { value: "10+", label: "Free AI tools" },
  { value: "0", label: "Sign-ups needed" },
  { value: "100%", label: "Free forever" },
];

const blogPosts = [
  { href: "/blog/best-ai-tools-for-students", title: "Best AI Tools for Students in 2025", cat: "Guide" },
  { href: "/blog/chatgpt-vs-claude", title: "ChatGPT vs Claude: Which is Better?", cat: "Comparison" },
  { href: "/blog/how-to-write-blogs-with-ai", title: "How to Write Blogs with AI (Complete Guide)", cat: "Tutorial" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#f9fafb" }}>

      {/* Hero */}
      <section style={{
        padding: "5.5rem 1.25rem 4.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        {/* Blue glow */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 700, height: 280,
          background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#eff6ff", border: "1px solid #bfdbfe",
          borderRadius: 100, padding: "5px 14px",
          fontSize: 12, color: "#2563eb", fontWeight: 500,
          marginBottom: "1.5rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
          Free AI tools — no account required
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
          letterSpacing: "-0.04em", lineHeight: 1.1,
          marginBottom: "1.25rem", maxWidth: 720, margin: "0 auto 1.25rem",
          color: "#111827",
        }}>
          Every AI tool you need,<br />
          <span style={{ color: "#2563eb" }}>swift</span> and <span style={{ color: "#ef4444" }}>free.</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "#6b7280", lineHeight: 1.65,
          maxWidth: 520, margin: "0 auto 2.5rem",
        }}>
          Rewrite text, generate cover letters, fix grammar — powered by AI. No sign-up, no credit card, no limits.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/tools/cover-letter-generator" style={{
            background: "#2563eb", color: "#fff",
            padding: "13px 28px", borderRadius: "var(--radius-sm)",
            fontWeight: 600, fontSize: 15,
            transition: "opacity 0.15s", boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
          }}>Try for free →</Link>
          <Link href="/blog" style={{
            background: "#ffffff", color: "#374151",
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "13px 28px", borderRadius: "var(--radius-sm)",
            fontWeight: 500, fontSize: 15,
          }}>Read the blog</Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 1.25rem", marginTop: "-1px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          background: "#2563eb",
        }}>
          {stats.map(s => (
            <div key={s.value} style={{
              padding: "1.75rem 1.5rem",
              textAlign: "center",
              borderRight: "1px solid rgba(255,255,255,0.12)",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: "2rem",
                color: "#ffffff", letterSpacing: "-0.03em",
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section style={{ padding: "4rem 1.25rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#2563eb", marginBottom: "0.5rem",
            }}>Free tools</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.03em", color: "#111827",
            }}>Start using AI tools now</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}>
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "var(--radius)",
                padding: "1.75rem",
                display: "block",
                position: "relative",
              }}
              className="tool-card"
              >
                {tool.badge && (
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: tool.badge === "New" ? "rgba(22,163,74,0.1)" : "rgba(37,99,235,0.1)",
                    color: tool.badge === "New" ? "#16a34a" : "#2563eb",
                    border: `1px solid ${tool.badge === "New" ? "rgba(22,163,74,0.25)" : "rgba(37,99,235,0.25)"}`,
                    borderRadius: 100, padding: "2px 10px",
                  }}>{tool.badge}</div>
                )}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${tool.color}10`,
                  border: `1px solid ${tool.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                  marginBottom: "1rem",
                }}>{tool.icon}</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: "1.05rem",
                  marginBottom: "0.5rem", letterSpacing: "-0.02em", color: "#111827",
                }}>{tool.name}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{tool.desc}</p>
                <div style={{
                  marginTop: "1.25rem", fontSize: 13,
                  color: "#2563eb", fontWeight: 600,
                }}>Try free →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: "0 1.25rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "#2563eb", marginBottom: "0.5rem",
              }}>From the blog</div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                letterSpacing: "-0.03em", color: "#111827",
              }}>AI tools guides & comparisons</h2>
            </div>
            <Link href="/blog" style={{
              fontSize: 13, color: "#6b7280",
              border: "1px solid rgba(0,0,0,0.1)", background: "#ffffff",
              padding: "8px 16px", borderRadius: "var(--radius-sm)",
            }}>All articles →</Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {blogPosts.map(post => (
              <Link key={post.href} href={post.href} style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                display: "block",
              }}
                className="blog-card"
              >
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "#ef4444",
                  marginBottom: "0.75rem",
                }}>{post.cat}</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600, fontSize: "0.95rem",
                  lineHeight: 1.45, letterSpacing: "-0.01em", color: "#111827",
                }}>{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 1.25rem 5rem" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          background: "#2563eb",
          borderRadius: "var(--radius)",
          padding: "3.5rem 2rem",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500, height: 250,
            background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#ffffff",
          }}>Ready to work smarter with AI?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, marginBottom: "2rem" }}>
            Free tools, no account needed. Start in 10 seconds.
          </p>
          <Link href="/tools/cover-letter-generator" style={{
            background: "#ffffff", color: "#2563eb",
            padding: "13px 32px", borderRadius: "var(--radius-sm)",
            fontWeight: 700, fontSize: 15, display: "inline-block",
          }}>Get started free →</Link>
        </div>
      </section>

    </div>
  );
}
