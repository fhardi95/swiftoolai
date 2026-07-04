"use client";
import Link from "next/link";

const toolCategories = [
  {
    label: "AI Image Tools",
    color: "#2563eb",
    tools: [
      { href: "/tools/ai-face-rater", icon: "🤳", name: "AI Face Rater", desc: "Upload a photo and get an AI attractiveness score out of 10 with symmetry analysis and tips.", badge: "New" },
      { href: "/tools/image-compressor", icon: "🖼️", name: "Image Compressor", desc: "Compress JPG, PNG & WebP in your browser. Private, no upload to server.", badge: null },
      { href: "/tools/webp-to-jpg", icon: "🔄", name: "WebP to JPG", desc: "Convert WebP images to JPG instantly. Batch convert multiple files.", badge: null },
      { href: "/tools/svg-to-png", icon: "📐", name: "SVG to PNG", desc: "Convert SVG to PNG with custom size and background options.", badge: null },
      { href: "/tools/png-to-pdf", icon: "📃", name: "PNG to PDF", desc: "Combine multiple images into a single PDF. Fully in-browser.", badge: null },
      { href: "/tools/cdr-to-jpg", icon: "🖌️", name: "CDR to JPG", desc: "Convert CorelDRAW CDR files to high-quality JPG images.", badge: null },
    ],
  },
  {
    label: "AI Writing Tools",
    color: "#7c3aed",
    tools: [
      { href: "/tools/cover-letter-generator", icon: "📄", name: "Cover Letter Generator", desc: "Generate a tailored, professional cover letter in seconds.", badge: "Popular" },
      { href: "/tools/ai-email-writer", icon: "✉️", name: "AI Email Writer", desc: "Write professional emails in seconds. Just describe what you need.", badge: null },
      { href: "/tools/linkedin-post-generator", icon: "💼", name: "LinkedIn Post Generator", desc: "Generate engaging LinkedIn posts with the perfect hook and tone.", badge: null },
      { href: "/tools/cold-email-generator", icon: "📬", name: "Cold Email Generator", desc: "Write cold emails that get replies — subject + body, ready to send.", badge: null },
      { href: "/tools/instagram-caption-generator", icon: "📸", name: "Instagram Caption Generator", desc: "Get 3 caption options with hashtags for any photo or niche.", badge: null },
      { href: "/tools/job-description-writer", icon: "📋", name: "Job Description Writer", desc: "Generate inclusive, professional job descriptions in seconds.", badge: null },
    ],
  },
  {
    label: "AI Career Tools",
    color: "#ef4444",
    tools: [
      { href: "/tools/resume-bullet-writer", icon: "🎯", name: "Resume Bullet Writer", desc: "Turn job duties into powerful, ATS-optimised resume bullet points.", badge: null },
      { href: "/tools/bio-generator", icon: "◈", name: "AI Bio Generator", desc: "Generate a perfect bio for LinkedIn, Instagram, Twitter, or your website.", badge: null },
      { href: "/tools/grammar-checker", icon: "◉", name: "Grammar Checker", desc: "Fix grammar, spelling, and style errors instantly with AI.", badge: null },
      { href: "/tools/rewriter", icon: "✦", name: "AI Text Rewriter", desc: "Rewrite any text in 9 different tones — professional, casual, and more.", badge: null },
      { href: "/tools/ai-summarizer", icon: "📝", name: "AI Summarizer", desc: "Summarise any text, article, or document in seconds.", badge: null },
      { href: "/tools/paraphrasing-tool", icon: "🔁", name: "Paraphrasing Tool", desc: "Rephrase your writing while keeping the original meaning.", badge: null },
    ],
  },
  {
    label: "Relationships & Growth",
    color: "#db2777",
    tools: [
      { href: "/tools/personality-os", icon: "🧠", name: "AI Personality OS", desc: "A 40-question assessment that builds an AI who knows you — ask it about your career, business ideas, or relationships.", badge: "New" },
      { href: "/tools/situationship-analyser", icon: "💔", name: "Situationship Analyser", desc: "Describe your romantic situation and get an honest AI read — red flags, green flags, advice.", badge: "New" },
      { href: "/tools/attachment-style-quiz", icon: "🔗", name: "Attachment Style Quiz", desc: "Discover your attachment style and how it shapes your relationships.", badge: "New" },
      { href: "/tools/aura-colour-generator", icon: "🔮", name: "Aura Colour Generator", desc: "Find your aura colour and what it says about your energy.", badge: "New" },
    ],
  },
  {
    label: "Text & Utility Tools",
    color: "#16a34a",
    tools: [
      { href: "/tools/word-counter", icon: "🔢", name: "Word Counter", desc: "Count words, characters, sentences, and reading time instantly.", badge: null },
      { href: "/tools/word-unscrambler", icon: "🔤", name: "Word Unscrambler", desc: "Unscramble letters into valid words. Great for Scrabble & Wordle.", badge: null },
      { href: "/tools/case-converter", icon: "Aa", name: "Case Converter", desc: "Convert text to UPPERCASE, lowercase, Title Case, and more.", badge: null },
      { href: "/tools/password-generator", icon: "🔐", name: "Password Generator", desc: "Generate strong, random passwords. 100% private, in-browser.", badge: null },
      { href: "/tools/qr-code-generator", icon: "⬛", name: "QR Code Generator", desc: "Create QR codes for URLs, Wi-Fi, email, phone. Free, no watermark.", badge: null },
      { href: "/tools/color-picker", icon: "🎨", name: "Color Picker", desc: "Pick any colour and get HEX, RGB, and HSL values instantly.", badge: null },
    ],
  },
];

const stats = [
  { value: "24+", label: "Free tools" },
  { value: "10K+", label: "Monthly users" },
  { value: "0", label: "Sign-ups needed" },
  { value: "100%", label: "Free forever" },
];

const blogPosts = [
  { href: "/blog/best-ai-tools-for-students", title: "Best AI Tools for Students in 2025", cat: "Guide" },
  { href: "/blog/chatgpt-vs-claude", title: "ChatGPT vs Claude: Which is Better?", cat: "Comparison" },
  { href: "/blog/how-to-write-blogs-with-ai", title: "How to Write Blogs with AI (Complete Guide)", cat: "Tutorial" },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  "#2563eb": { bg: "rgba(37,99,235,0.08)",  border: "rgba(37,99,235,0.2)",  text: "#2563eb" },
  "#7c3aed": { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#7c3aed" },
  "#ef4444": { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)",  text: "#ef4444" },
  "#16a34a": { bg: "rgba(22,163,74,0.08)",  border: "rgba(22,163,74,0.2)",  text: "#16a34a" },
  "#db2777": { bg: "rgba(219,39,119,0.08)", border: "rgba(219,39,119,0.2)", text: "#db2777" },
};

export default function HomePage() {
  return (
    <div style={{ background: "#f9fafb" }}>

      {/* ── Hero ── */}
      <section style={{
        padding: "5.5rem 1.25rem 4.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
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
          24 free AI tools — no account required
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
          Write, compress, convert, and create — 24 tools powered by AI. No sign-up, no credit card, no limits.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/tools/ai-face-rater" style={{
            background: "#2563eb", color: "#fff",
            padding: "13px 28px", borderRadius: "var(--radius-sm)",
            fontWeight: 600, fontSize: 15,
            boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
            textDecoration: "none",
          }}>✨ Try AI Face Rater →</Link>
          <Link href="/tools/cover-letter-generator" style={{
            background: "#ffffff", color: "#374151",
            border: "1px solid rgba(0,0,0,0.1)",
            padding: "13px 28px", borderRadius: "var(--radius-sm)",
            fontWeight: 500, fontSize: 15,
            textDecoration: "none",
          }}>Explore all tools</Link>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ padding: "0 1.25rem", marginTop: "-1px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          background: "#2563eb",
        }}>
          {stats.map(s => (
            <div key={s.value} style={{
              padding: "1.75rem 1.5rem", textAlign: "center",
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

      {/* ── Featured: AI Face Rater banner ── */}
      <section style={{ padding: "3.5rem 1.25rem 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Link href="/tools/ai-face-rater" style={{ textDecoration: "none", display: "block" }} className="featured-card">
            <div style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #3b82f6 100%)",
              borderRadius: "var(--radius)",
              padding: "2.5rem",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: "-40px", right: "120px",
                width: 300, height: 300,
                background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 100, padding: "4px 12px",
                  fontSize: 11, fontWeight: 700, color: "#fff",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  marginBottom: "1rem",
                }}>
                  ✨ New Tool
                </div>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  letterSpacing: "-0.03em", color: "#ffffff",
                  marginBottom: "0.6rem", lineHeight: 1.2,
                }}>
                  AI Face Rater
                </h2>
                <p style={{
                  color: "rgba(255,255,255,0.8)", fontSize: 15,
                  lineHeight: 1.6, maxWidth: 480, marginBottom: "1.5rem",
                }}>
                  Upload a photo and get an instant AI attractiveness score out of 10 — with
                  symmetry analysis, aesthetic vibe, facial strengths, and personalised tips.
                  Free, private, no sign-up.
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#ffffff", color: "#2563eb",
                  padding: "10px 22px", borderRadius: "var(--radius-sm)",
                  fontWeight: 700, fontSize: 14,
                }}>
                  Rate my face →
                </div>
              </div>
              <div style={{ fontSize: "clamp(4rem, 8vw, 7rem)", lineHeight: 1, flexShrink: 0, opacity: 0.9 }}>
                🤳
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Tools by category ── */}
      <section style={{ padding: "3.5rem 1.25rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "0.5rem" }}>
              Free tools
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.03em", color: "#111827",
            }}>
              Start using AI tools now
            </h2>
          </div>

          {toolCategories.map((cat) => {
            const palette = categoryColors[cat.color];
            return (
              <div key={cat.label} style={{ marginBottom: "3.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                  <div style={{ width: 3, height: 20, borderRadius: 2, background: cat.color }} />
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: "1rem", color: "#111827", letterSpacing: "-0.01em",
                  }}>{cat.label}</h3>
                  <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.06)" }} />
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "0.875rem",
                }}>
                  {cat.tools.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="tool-card"
                      style={{
                        background: "#ffffff",
                        border: "1px solid rgba(0,0,0,0.07)",
                        borderRadius: "var(--radius)",
                        padding: "1.5rem",
                        display: "block",
                        position: "relative",
                        textDecoration: "none",
                      }}
                    >
                      {tool.badge && (
                        <div style={{
                          position: "absolute", top: "1rem", right: "1rem",
                          fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          background: tool.badge === "New" ? "rgba(37,99,235,0.1)" : palette.bg,
                          color: tool.badge === "New" ? "#2563eb" : palette.text,
                          border: `1px solid ${tool.badge === "New" ? "rgba(37,99,235,0.25)" : palette.border}`,
                          borderRadius: 100, padding: "2px 10px",
                        }}>{tool.badge}</div>
                      )}
                      <div style={{
                        width: 40, height: 40, borderRadius: 9,
                        background: palette.bg,
                        border: `1px solid ${palette.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, marginBottom: "0.875rem",
                      }}>{tool.icon}</div>
                      <h4 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700, fontSize: "0.95rem",
                        marginBottom: "0.4rem", letterSpacing: "-0.02em", color: "#111827",
                      }}>{tool.name}</h4>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>{tool.desc}</p>
                      <div style={{ marginTop: "1rem", fontSize: 13, color: cat.color, fontWeight: 600 }}>
                        Use free →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Blog ── */}
      <section style={{ padding: "0 1.25rem 5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "0.5rem" }}>
                From the blog
              </div>
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
              textDecoration: "none",
            }}>All articles →</Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {blogPosts.map(post => (
              <Link key={post.href} href={post.href} className="blog-card" style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                display: "block",
                textDecoration: "none",
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "#ef4444", marginBottom: "0.75rem",
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

      {/* ── CTA ── */}
      <section style={{ padding: "0 1.25rem 5rem" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          background: "#111827",
          borderRadius: "var(--radius)",
          padding: "3.5rem 2rem",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500, height: 250,
            background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)",
            borderRadius: 100, padding: "5px 14px",
            fontSize: 12, color: "#93c5fd", fontWeight: 500,
            marginBottom: "1.25rem",
          }}>
            ✨ Just launched — AI Face Rater
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#ffffff",
          }}>Ready to work smarter with AI?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: "2rem" }}>
            24 free tools. No account needed. Start in 10 seconds.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tools/ai-face-rater" style={{
              background: "#2563eb", color: "#fff",
              padding: "13px 28px", borderRadius: "var(--radius-sm)",
              fontWeight: 700, fontSize: 15, display: "inline-block",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
            }}>✨ Try AI Face Rater →</Link>
            <Link href="/tools/cover-letter-generator" style={{
              background: "rgba(255,255,255,0.08)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "13px 28px", borderRadius: "var(--radius-sm)",
              fontWeight: 500, fontSize: 15, display: "inline-block",
              textDecoration: "none",
            }}>Cover Letter Generator</Link>
          </div>
        </div>
      </section>

      <style>{`
        .tool-card  { transition: box-shadow 0.18s, transform 0.18s; }
        .tool-card:hover  { box-shadow: 0 6px 24px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .blog-card  { transition: box-shadow 0.18s, transform 0.18s; }
        .blog-card:hover  { box-shadow: 0 6px 24px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .featured-card { transition: opacity 0.15s; }
        .featured-card:hover { opacity: 0.94; }
        @media (max-width: 600px) {
          .featured-card > div { grid-template-columns: 1fr !important; }
          .featured-card > div > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
}
