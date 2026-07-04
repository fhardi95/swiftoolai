"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const toolGroups = [
  {
    label: "AI Chat", icon: "💬",
    tools: [
      { href: "/tools/free-ai-chat", label: "Free AI Chat", badge: "New" },
      { href: "/models/claude-sonnet-4-6", label: "Claude Sonnet 4.6" },
    ],
  },
  {
    label: "AI Image", icon: "🤳",
    tools: [
      { href: "/tools/background-remover", label: "Background Remover", badge: "New" },
      { href: "/tools/ai-face-rater", label: "AI Face Rater" },
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/webp-to-jpg", label: "WebP to JPG" },
      { href: "/tools/svg-to-png", label: "SVG to PNG" },
      { href: "/tools/png-to-pdf", label: "PNG to PDF" },
    ],
  },
  {
    label: "AI Writing", icon: "✍️",
    tools: [
      { href: "/tools/ai-detector", label: "AI Detector", badge: "New" },
      { href: "/tools/cover-letter-generator", label: "Cover Letter Generator" },
      { href: "/tools/ai-email-writer", label: "AI Email Writer" },
      { href: "/tools/linkedin-post-generator", label: "LinkedIn Post Generator" },
      { href: "/tools/cold-email-generator", label: "Cold Email Generator" },
      { href: "/tools/instagram-caption-generator", label: "Instagram Caption Generator" },
    ],
  },
  {
    label: "Career", icon: "💼",
    tools: [
      { href: "/tools/resume-bullet-writer", label: "Resume Bullet Writer" },
      { href: "/tools/bio-generator", label: "Bio Generator" },
      { href: "/tools/rewriter", label: "Text Rewriter" },
      { href: "/tools/grammar-checker", label: "Grammar Checker" },
      { href: "/tools/ai-summarizer", label: "AI Summarizer" },
      { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
    ],
  },
  {
    label: "Relationships", icon: "💞",
    tools: [
      { href: "/tools/personality-os", label: "AI Personality OS", badge: "New" },
      { href: "/tools/situationship-analyser", label: "Situationship Analyser", badge: "New" },
      { href: "/tools/attachment-style-quiz", label: "Attachment Style Quiz", badge: "New" },
      { href: "/tools/aura-colour-generator", label: "Aura Colour Generator", badge: "New" },
    ],
  },
  {
    label: "Utilities", icon: "🛠️",
    tools: [
      { href: "/tools/word-counter", label: "Word Counter" },
      { href: "/tools/word-unscrambler", label: "Word Unscrambler" },
      { href: "/tools/case-converter", label: "Case Converter" },
      { href: "/tools/password-generator", label: "Password Generator" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
      { href: "/tools/color-picker", label: "Color Picker" },
    ],
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = session?.user;

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        padding: "0 1.25rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>

          {/* Logo */}
          <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.03em", textDecoration: "none", color: "#111827", flexShrink: 0 }}>
            Swift<span style={{ color: "#2563eb" }}>Tool</span>
            <span style={{ color: "#9ca3af", fontWeight: 400 }}>AI</span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {/* Tools mega-menu */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setToolsOpen(p => !p)} style={{ fontSize: 14, padding: "6px 12px", borderRadius: "var(--radius-sm)", background: toolsOpen ? "#f3f4f6" : "transparent", color: toolsOpen ? "#111827" : "#6b7280", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontWeight: 500 }}>
                Tools <span style={{ fontSize: 9, opacity: 0.7 }}>{toolsOpen ? "▴" : "▾"}</span>
              </button>

              {toolsOpen && (
                <>
                  <div onClick={() => setToolsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 150 }} />
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "-12px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "1.25rem", zIndex: 200, boxShadow: "0 12px 40px rgba(0,0,0,0.12)", display: "grid", gridTemplateColumns: "repeat(5, 175px)", gap: "0.25rem 1.5rem", minWidth: 940 }}>
                    {toolGroups.map(group => (
                      <div key={group.label}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "0.5rem", padding: "0 8px", display: "flex", alignItems: "center", gap: 5 }}>
                          <span>{group.icon}</span>{group.label}
                        </div>
                        {group.tools.map(t => (
                          <Link key={t.href} href={t.href} onClick={() => setToolsOpen(false)} className="nav-dropdown-link">
                            {t.label}
                            {"badge" in t && t.badge && (
                              <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, background: "#2563eb", color: "#fff", borderRadius: 4, padding: "1px 5px", letterSpacing: "0.04em", textTransform: "uppercase", verticalAlign: "middle" }}>{t.badge}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <div style={{ gridColumn: "1 / -1", borderTop: "1px solid #f3f4f6", marginTop: "0.75rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>27 free tools — sign in to access all</span>
                      <Link href="/" onClick={() => setToolsOpen(false)} style={{ fontSize: 12, color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>View all →</Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link href="/pricing" style={{ fontSize: 14, color: "#6b7280", padding: "6px 12px", borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 500 }}>Pricing</Link>
            <Link href="/blog" style={{ fontSize: 14, color: "#6b7280", padding: "6px 12px", borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
            <Link href="/about" style={{ fontSize: 14, color: "#6b7280", padding: "6px 12px", borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 500 }}>About</Link>
            <Link href="/contact" style={{ fontSize: 14, color: "#6b7280", padding: "6px 12px", borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 500 }}>Contact</Link>
          </div>

          {/* Right side — auth */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* New tool pill */}
            <Link href="/tools/ai-detector" className="new-pill" style={{ fontSize: 11, fontWeight: 700, background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: 999, padding: "4px 10px", textDecoration: "none", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
              🔍 AI Detector
            </Link>

            {/* Auth area */}
            {status === "loading" ? (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f3f4f6" }} />
            ) : session ? (
              /* User avatar + dropdown */
              <div style={{ position: "relative" }}>
                <button onClick={() => setUserMenuOpen(p => !p)} style={{ display: "flex", alignItems: "center", gap: 7, background: "#f9fafb", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, padding: "4px 10px 4px 4px", cursor: "pointer" }}>
                  {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt="" width={24} height={24} style={{ borderRadius: "50%" }} />
                  ) : (
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#374151", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user?.name?.split(" ")[0]}
                  </span>
                  <span style={{ fontSize: 9, color: "#9ca3af" }}>▾</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div onClick={() => setUserMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 150 }} />
                    <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "0.5rem", zIndex: 200, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", minWidth: 180 }}>
                      <div style={{ padding: "8px 12px 10px", borderBottom: "1px solid #f3f4f6", marginBottom: "0.25rem" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{user?.name}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{user?.email}</div>
                      </div>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} style={{ display: "block", padding: "8px 12px", fontSize: 13, color: "#374151", textDecoration: "none", borderRadius: 7, fontWeight: 500 }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#f3f4f6")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        📊 Dashboard
                      </Link>
                      <button onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: "/" }); }} style={{ width: "100%", display: "block", padding: "8px 12px", fontSize: 13, color: "#374151", background: "none", border: "none", textAlign: "left", cursor: "pointer", borderRadius: 7, fontWeight: 500 }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        ← Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Sign in button */
              <button onClick={() => signIn("google")} className="nav-cta">
                Sign in free →
              </button>
            )}

            {/* Mobile hamburger */}
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(p => !p)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#6b7280", fontSize: 20 }}>
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mobile-menu" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "0.75rem 0 1.5rem", maxHeight: "82vh", overflowY: "auto" }}>
            {/* Mobile auth */}
            <div style={{ padding: "0.5rem 1.25rem 1rem", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: "0.5rem" }}>
              {session ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt="" width={32} height={32} style={{ borderRadius: "50%" }} />
                    ) : (
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                        {user?.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{user?.name}</div>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ fontSize: 11, color: "#2563eb", textDecoration: "none" }}>View dashboard →</Link>
                    </div>
                  </div>
                  <button onClick={() => signOut({ callbackUrl: "/" })} style={{ fontSize: 12, color: "#6b7280", background: "#f3f4f6", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer" }}>Sign out</button>
                </div>
              ) : (
                <button onClick={() => signIn("google")} style={{ width: "100%", padding: "11px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  Sign in free with Google →
                </button>
              )}
            </div>

            {/* New tool featured */}
            <Link href="/tools/ai-detector" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, margin: "0.5rem 1.25rem 1rem", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", textDecoration: "none" }}>
              <span style={{ fontSize: 18 }}>🔍</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>AI Detector <span style={{ fontSize: 9, background: "#2563eb", color: "#fff", borderRadius: 4, padding: "1px 5px", marginLeft: 4 }}>NEW</span></div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>Detect ChatGPT, GPT-5 &amp; Gemini content</div>
              </div>
            </Link>

            <div style={{ padding: "0 1.25rem 0.5rem", display: "flex", flexDirection: "column" }}>
              <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{ padding: "9px 0", fontSize: 14, fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>Pricing</Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} style={{ padding: "9px 0", fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none" }}>Blog</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} style={{ padding: "9px 0", fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none" }}>About</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ padding: "9px 0", fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none" }}>Contact</Link>
            </div>

            {toolGroups.map(group => (
              <div key={group.label} style={{ marginBottom: "0.25rem" }}>
                <button onClick={() => setMobileGroupOpen(p => p === group.label ? null : group.label)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 1.25rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", display: "flex", alignItems: "center", gap: 6 }}>
                    {group.icon} {group.label}
                  </span>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>{mobileGroupOpen === group.label ? "▴" : "▾"}</span>
                </button>
                {mobileGroupOpen === group.label && (
                  <div style={{ paddingBottom: "0.5rem" }}>
                    {group.tools.map(t => (
                      <Link key={t.href} href={t.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "9px 1.25rem 9px 2rem", fontSize: 14, color: "#374151", textDecoration: "none" }}>
                        {t.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        .nav-dropdown-link { display:block; font-size:13px; color:#6b7280; padding:7px 8px; border-radius:7px; text-decoration:none; transition:all 0.12s; white-space:nowrap; }
        .nav-dropdown-link:hover { color:#111827; background:#f3f4f6; }
        .nav-cta { font-size:13px; font-weight:600; background:#2563eb; color:#fff !important; padding:8px 18px; border-radius:var(--radius-sm); border:none; cursor:pointer; text-decoration:none; transition:opacity 0.15s; white-space:nowrap; }
        .nav-cta:hover { opacity:0.88; }
        .new-pill:hover { background:#dbeafe !important; }
        @media (max-width:900px) { .new-pill { display:none !important; } }
        @media (max-width:768px) { .desktop-nav { display:none !important; } .mobile-menu-btn { display:block !important; } }
        @media (min-width:769px) { .mobile-menu { display:none !important; } }
      `}</style>
    </>
  );
}
