import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SwiftToolAI – Free AI Tools Online",
  description: "Free AI-powered tools for writing, productivity, and content creation. No sign-up needed. Try our text rewriter, bio generator, and grammar checker now.",
};

const tools = [
  {
    href: "/tools/rewriter",
    icon: "✦",
    name: "AI Text Rewriter",
    desc: "Rewrite any text in 9 different tones — professional, casual, Gen Z, luxury and more.",
    badge: "Most popular",
    color: "#6c63ff",
  },
  {
    href: "/tools/bio-generator",
    icon: "◈",
    name: "AI Bio Generator",
    desc: "Generate a perfect bio for LinkedIn, Instagram, Twitter, or your website in seconds.",
    badge: null,
    color: "#ff6384",
  },
  {
    href: "/tools/grammar-checker",
    icon: "◉",
    name: "Grammar Checker",
    desc: "Fix grammar, spelling, and style errors instantly with AI-powered suggestions.",
    badge: "New",
    color: "#4ade80",
  },
];

const stats = [
  { value: "10K+", label: "Monthly users" },
  { value: "3", label: "Free AI tools" },
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
    <div>
      {/* Hero */}
      <section style={{
        padding: "5rem 1.25rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "10%", left: "50%",
          transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 100, padding: "5px 14px",
          fontSize: 12, color: "var(--muted)",
          marginBottom: "1.5rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
          Free AI tools — no account required
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
          letterSpacing: "-0.04em", lineHeight: 1.1,
          marginBottom: "1.25rem", maxWidth: 720, margin: "0 auto 1.25rem",
        }}>
          Every AI tool you need,<br />
          <span style={{ color: "var(--accent)" }}>swift and free.</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "var(--muted)", lineHeight: 1.65,
          maxWidth: 520, margin: "0 auto 2.5rem",
        }}>
          Rewrite text, generate bios, fix grammar — powered by AI. No sign-up, no credit card, no limits on free tools.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/tools/rewriter" style={{
            background: "var(--accent)", color: "#fff",
            padding: "13px 28px", borderRadius: "var(--radius-sm)",
            fontWeight: 500, fontSize: 15,
            transition: "opacity 0.15s",
          }}>Try for free →</Link>
          <Link href="/blog" style={{
            background: "var(--surface)", color: "var(--text)",
            border: "1px solid var(--border)",
            padding: "13px 28px", borderRadius: "var(--radius-sm)",
            fontWeight: 500, fontSize: 15,
          }}>Read the blog</Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 1.25rem 4rem" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1px", background: "var(--border)",
          border: "1px solid var(--border)", borderRadius: "var(--radius)",
          overflow: "hidden",
        }}>
          {stats.map(s => (
            <div key={s.value} style={{
              background: "var(--surface)", padding: "1.75rem 1.5rem",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: "2rem",
                color: "var(--accent)", letterSpacing: "-0.03em",
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section style={{ padding: "0 1.25rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem",
            }}>Free tools</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.03em",
            }}>Start using AI tools now</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}>
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.75rem",
                display: "block",
                transition: "border-color 0.2s, transform 0.2s",
                position: "relative",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {tool.badge && (
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: tool.badge === "New" ? "rgba(74,222,128,0.15)" : "rgba(108,99,255,0.15)",
                    color: tool.badge === "New" ? "var(--success)" : "var(--accent)",
                    border: `1px solid ${tool.badge === "New" ? "rgba(74,222,128,0.3)" : "rgba(108,99,255,0.3)"}`,
                    borderRadius: 100, padding: "2px 10px",
                  }}>{tool.badge}</div>
                )}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${tool.color}18`,
                  border: `1px solid ${tool.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: tool.color,
                  marginBottom: "1rem",
                }}>{tool.icon}</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: "1.05rem",
                  marginBottom: "0.5rem", letterSpacing: "-0.02em",
                }}>{tool.name}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{tool.desc}</p>
                <div style={{
                  marginTop: "1.25rem", fontSize: 13,
                  color: tool.color, fontWeight: 500,
                }}>Try free →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / SEO section */}
      <section style={{ padding: "0 1.25rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem",
              }}>From the blog</div>
              <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                letterSpacing: "-0.03em",
              }}>AI tools guides & comparisons</h2>
            </div>
            <Link href="/blog" style={{
              fontSize: 13, color: "var(--muted)",
              border: "1px solid var(--border)",
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
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                display: "block",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
              >
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "var(--accent)",
                  marginBottom: "0.75rem",
                }}>{post.cat}</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600, fontSize: "0.95rem",
                  lineHeight: 1.45, letterSpacing: "-0.01em",
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
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "3rem 2rem",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 400, height: 200,
            background: "radial-gradient(ellipse, rgba(108,99,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            letterSpacing: "-0.03em", marginBottom: "0.75rem",
          }}>Ready to work smarter with AI?</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: "2rem" }}>
            Free tools, no account needed. Start in 10 seconds.
          </p>
          <Link href="/tools/rewriter" style={{
            background: "var(--accent)", color: "#fff",
            padding: "13px 32px", borderRadius: "var(--radius-sm)",
            fontWeight: 500, fontSize: 15, display: "inline-block",
          }}>Get started free →</Link>
        </div>
      </section>
    </div>
  );
}
