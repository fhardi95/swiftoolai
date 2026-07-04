"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const ALL_TOOLS = [
  { href: "/tools/ai-face-rater",               icon: "🤳", name: "AI Face Rater",               cat: "AI Image",  badge: "New" },
  { href: "/tools/image-compressor",             icon: "🖼️", name: "Image Compressor",             cat: "AI Image" },
  { href: "/tools/webp-to-jpg",                  icon: "🔄", name: "WebP to JPG",                  cat: "AI Image" },
  { href: "/tools/svg-to-png",                   icon: "📐", name: "SVG to PNG",                   cat: "AI Image" },
  { href: "/tools/png-to-pdf",                   icon: "📃", name: "PNG to PDF",                   cat: "AI Image" },
  { href: "/tools/cdr-to-jpg",                   icon: "🖌️", name: "CDR to JPG",                  cat: "AI Image" },
  { href: "/tools/cover-letter-generator",       icon: "📄", name: "Cover Letter Generator",       cat: "AI Writing", badge: "Popular" },
  { href: "/tools/ai-email-writer",              icon: "✉️", name: "AI Email Writer",              cat: "AI Writing" },
  { href: "/tools/linkedin-post-generator",      icon: "💼", name: "LinkedIn Post Generator",      cat: "AI Writing" },
  { href: "/tools/cold-email-generator",         icon: "📬", name: "Cold Email Generator",         cat: "AI Writing" },
  { href: "/tools/instagram-caption-generator",  icon: "📸", name: "Instagram Caption Generator",  cat: "AI Writing" },
  { href: "/tools/job-description-writer",       icon: "📋", name: "Job Description Writer",       cat: "AI Writing" },
  { href: "/tools/resume-bullet-writer",         icon: "🎯", name: "Resume Bullet Writer",         cat: "Career" },
  { href: "/tools/bio-generator",                icon: "◈",  name: "AI Bio Generator",             cat: "Career" },
  { href: "/tools/grammar-checker",              icon: "◉",  name: "Grammar Checker",              cat: "Career" },
  { href: "/tools/rewriter",                     icon: "✦",  name: "AI Text Rewriter",             cat: "Career" },
  { href: "/tools/ai-summarizer",                icon: "📝", name: "AI Summarizer",                cat: "Career" },
  { href: "/tools/paraphrasing-tool",            icon: "🔁", name: "Paraphrasing Tool",            cat: "Career" },
  { href: "/tools/word-counter",                 icon: "🔢", name: "Word Counter",                 cat: "Utilities" },
  { href: "/tools/word-unscrambler",             icon: "🔤", name: "Word Unscrambler",             cat: "Utilities" },
  { href: "/tools/case-converter",               icon: "Aa", name: "Case Converter",               cat: "Utilities" },
  { href: "/tools/password-generator",           icon: "🔐", name: "Password Generator",           cat: "Utilities" },
  { href: "/tools/qr-code-generator",            icon: "⬛", name: "QR Code Generator",            cat: "Utilities" },
  { href: "/tools/color-picker",                 icon: "🎨", name: "Color Picker",                 cat: "Utilities" },
];

const CATEGORIES = ["All", "AI Image", "AI Writing", "Career", "Utilities"];

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "AI Image":   { bg: "rgba(37,99,235,0.08)",  text: "#2563eb", border: "rgba(37,99,235,0.2)"  },
  "AI Writing": { bg: "rgba(124,58,237,0.08)", text: "#7c3aed", border: "rgba(124,58,237,0.2)" },
  "Career":     { bg: "rgba(239,68,68,0.08)",  text: "#ef4444", border: "rgba(239,68,68,0.2)"  },
  "Utilities":  { bg: "rgba(22,163,74,0.08)",  text: "#16a34a", border: "rgba(22,163,74,0.2)"  },
};

interface UsageData {
  plan: "free" | "pro";
  used: number;
  limit: number;
  remaining: number;
  isPro: boolean;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"tools" | "account">("tools");
  const [filter, setFilter] = useState("All");
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradedBanner, setUpgradedBanner] = useState(false);

  // Load usage from API (Supabase-backed)
  const fetchUsage = useCallback(async () => {
    try {
      const res = await fetch("/api/usage");
      if (res.ok) {
        const data = await res.json();
        setUsage(data);
      }
    } catch { /* ignore */ }
    finally { setUsageLoading(false); }
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchUsage();
      // Check for post-upgrade redirect
      const params = new URLSearchParams(window.location.search);
      if (params.get("upgraded") === "true") {
        setUpgradedBanner(true);
        // Clean URL
        window.history.replaceState({}, "", "/dashboard");
        // Re-fetch usage after a short delay (webhook may take a moment)
        setTimeout(fetchUsage, 2000);
      }
    }
    // Load recent tools from localStorage
    try {
      const recent = JSON.parse(localStorage.getItem("sta_recent") || "[]");
      setRecentTools(recent);
    } catch { /* ignore */ }
  }, [session, fetchUsage]);

  const handleUpgrade = () => {
    setUpgradeLoading(true);
    window.location.href = "/pricing";
  };

  if (status === "loading") {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={spinnerStyle} />
      </div>
    );
  }

  const user = session?.user;
  const usagePct = usage ? Math.min((usage.used / usage.limit) * 100, 100) : 0;
  const isHighUsage = usagePct >= 80;
  const filtered = filter === "All" ? ALL_TOOLS : ALL_TOOLS.filter(t => t.cat === filter);
  const recentToolObjects = recentTools
    .map(href => ALL_TOOLS.find(t => t.href === href))
    .filter(Boolean)
    .slice(0, 6) as typeof ALL_TOOLS;

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>

      {/* ── Top header bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name || "User"} width={32} height={32}
                  style={{ borderRadius: "50%", border: "2px solid #bfdbfe" }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{user?.name ?? "User"}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{user?.email}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {usage && !usage.isPro && (
                <button onClick={handleUpgrade} disabled={upgradeLoading} style={upgradeBtn}>
                  {upgradeLoading ? "…" : "✨ Upgrade to Pro"}
                </button>
              )}
              <Link href="/" style={ghostBtn}>← Home</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} style={ghostBtn}>Sign out</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>

        {/* ── Upgraded success banner ── */}
        {upgradedBanner && (
          <div style={{
            background: "#f0fdf4", border: "1px solid #86efac",
            borderRadius: 10, padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <span style={{ fontWeight: 700, color: "#16a34a" }}>🎉 Welcome to Pro!</span>
              <span style={{ fontSize: 13, color: "#15803d", marginLeft: 8 }}>
                You now have unlimited AI runs. Enjoy!
              </span>
            </div>
            <button onClick={() => setUpgradedBanner(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 18 }}>×</button>
          </div>
        )}

        {/* ── Welcome heading ── */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", letterSpacing: "-0.03em", color: "#111827", marginBottom: "0.3rem" }}>
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14 }}>Your SwiftToolAI dashboard — all 24 tools in one place.</p>
        </div>

        {/* ── Stats cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: "2rem" }}>

          {/* Usage card */}
          <div style={statCard}>
            <div style={statLabel}>Daily Usage</div>
            {usageLoading ? (
              <div style={{ height: 40, display: "flex", alignItems: "center" }}>
                <div style={{ ...spinnerStyle, width: 20, height: 20, borderWidth: 2 }} />
              </div>
            ) : usage ? (
              <>
                <div style={{ fontSize: 28, fontWeight: 800, color: isHighUsage ? "#ef4444" : "#111827", letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {usage.used}<span style={{ fontSize: 14, fontWeight: 400, color: "#6b7280" }}> / {usage.isPro ? "∞" : usage.limit}</span>
                </div>
                {!usage.isPro && (
                  <>
                    <div style={{ height: 6, background: "#f3f4f6", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${usagePct}%`, background: isHighUsage ? "#ef4444" : "#2563eb", borderRadius: 100, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                      {usage.remaining} runs remaining today
                    </div>
                  </>
                )}
                {usage.isPro && (
                  <div style={{ fontSize: 12, color: "#16a34a", marginTop: 4, fontWeight: 600 }}>
                    ✓ Unlimited — Pro plan
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Plan card */}
          <div style={{
            ...statCard,
            background: usage?.isPro
              ? "linear-gradient(135deg, #14532d, #16a34a)"
              : "linear-gradient(135deg, #1e3a8a, #2563eb)",
            border: "none",
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
              Current Plan
            </div>
            {usageLoading ? (
              <div style={{ height: 40 }} />
            ) : (
              <>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                  {usage?.isPro ? "⚡ Pro" : "Free"}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 12 }}>
                  {usage?.isPro
                    ? "Unlimited AI runs · All 24 tools · Priority processing"
                    : `${usage?.limit ?? 10} runs/day · All 24 tools · Google sign-in`}
                </div>
                {!usage?.isPro && (
                  <button onClick={handleUpgrade} disabled={upgradeLoading} style={{
                    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                    color: "#fff", borderRadius: 8, padding: "8px 14px",
                    fontSize: 12, fontWeight: 700, cursor: upgradeLoading ? "not-allowed" : "pointer",
                    backdropFilter: "blur(4px)",
                  }}>
                    {upgradeLoading ? "…" : "✨ Upgrade to Pro — $9/mo"}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Account card */}
          <div style={statCard}>
            <div style={statLabel}>Account</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <GoogleIcon />
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Google account</span>
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", wordBreak: "break-all" }}>{user?.email}</div>
          </div>

          {/* Tools count */}
          <div style={statCard}>
            <div style={statLabel}>Available Tools</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em", marginBottom: 4 }}>24</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              {["AI Image", "Writing", "Career", "Utilities"].map(c => (
                <span key={c} style={{ fontSize: 10, fontWeight: 600, background: "#f3f4f6", color: "#6b7280", borderRadius: 4, padding: "2px 6px" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Upgrade CTA banner (only for free users near limit) ── */}
        {usage && !usage.isPro && usagePct >= 60 && (
          <div style={{
            background: isHighUsage ? "#fef2f2" : "#fffbeb",
            border: `1px solid ${isHighUsage ? "#fecaca" : "#fde68a"}`,
            borderRadius: 12, padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
          }}>
            <div>
              <span style={{ fontWeight: 700, color: isHighUsage ? "#dc2626" : "#d97706", fontSize: 14 }}>
                {isHighUsage ? "⚠️ Almost at your daily limit" : "💡 Using SwiftToolAI a lot?"}
              </span>
              <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 8 }}>
                Upgrade to Pro for unlimited runs — just $9/month.
              </span>
            </div>
            <button onClick={handleUpgrade} disabled={upgradeLoading} style={upgradeBtn}>
              {upgradeLoading ? "…" : "✨ Upgrade — $9/mo"}
            </button>
          </div>
        )}

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 4, marginBottom: "1.5rem", background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {(["tools", "account"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "7px 18px", borderRadius: 7, border: "none",
              fontWeight: 600, fontSize: 13, cursor: "pointer",
              background: activeTab === tab ? "#2563eb" : "transparent",
              color: activeTab === tab ? "#fff" : "#6b7280",
              transition: "all 0.15s",
            }}>
              {tab === "tools" ? "🛠️ All Tools" : "👤 Account"}
            </button>
          ))}
        </div>

        {/* ══ TOOLS TAB ══ */}
        {activeTab === "tools" && (
          <div>
            {recentToolObjects.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={sectionH2}>Recently used</h2>
                <div style={toolGrid}>
                  {recentToolObjects.map(tool => <ToolCard key={tool.href} tool={tool} />)}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  padding: "6px 14px", borderRadius: 100, border: "1px solid",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  borderColor: filter === cat ? "#2563eb" : "rgba(0,0,0,0.1)",
                  background: filter === cat ? "#2563eb" : "#fff",
                  color: filter === cat ? "#fff" : "#6b7280",
                  transition: "all 0.15s",
                }}>
                  {cat}
                </button>
              ))}
            </div>

            <div style={toolGrid}>
              {filtered.map(tool => <ToolCard key={tool.href} tool={tool} />)}
            </div>
          </div>
        )}

        {/* ══ ACCOUNT TAB ══ */}
        {activeTab === "account" && (
          <div style={{ maxWidth: 560 }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, overflow: "hidden" }}>

              {/* Profile */}
              <div style={{ padding: "1.75rem", borderBottom: "1px solid #f3f4f6" }}>
                <h2 style={{ ...sectionH2, marginBottom: "1.25rem" }}>Profile</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt={user.name || "User"} width={64} height={64}
                      style={{ borderRadius: "50%", border: "3px solid #bfdbfe" }} />
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 24 }}>
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>{user?.name}</div>
                    <div style={{ fontSize: 14, color: "#6b7280", marginTop: 2 }}>{user?.email}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                      <GoogleIcon />
                      <span style={{ fontSize: 12, color: "#6b7280" }}>Signed in with Google</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan */}
              <div style={{ padding: "1.75rem", borderBottom: "1px solid #f3f4f6" }}>
                <h2 style={{ ...sectionH2, marginBottom: "1rem" }}>Plan & Usage</h2>
                {usageLoading ? (
                  <div style={{ height: 60, display: "flex", alignItems: "center" }}>
                    <div style={{ ...spinnerStyle, width: 20, height: 20, borderWidth: 2 }} />
                  </div>
                ) : usage ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: "#374151" }}>AI tool runs today</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                        {usage.used} / {usage.isPro ? "∞" : usage.limit}
                      </span>
                    </div>
                    {!usage.isPro && (
                      <>
                        <div style={{ height: 8, background: "#f3f4f6", borderRadius: 100, overflow: "hidden", marginBottom: 6 }}>
                          <div style={{ height: "100%", width: `${usagePct}%`, background: isHighUsage ? "#ef4444" : "#2563eb", borderRadius: 100, transition: "width 0.5s" }} />
                        </div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: "1.25rem" }}>
                          {usage.remaining} runs remaining today · Resets at midnight
                        </div>
                        {/* Upgrade CTA */}
                        <div style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)", borderRadius: 12, padding: "1.25rem" }}>
                          <div style={{ fontWeight: 700, color: "#fff", marginBottom: 4, fontSize: 15 }}>✨ Upgrade to Pro</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: "1rem", lineHeight: 1.6 }}>
                            Unlimited AI runs daily · All 24 tools · No ads · Priority processing
                          </div>
                          <button onClick={handleUpgrade} disabled={upgradeLoading} style={{
                            background: "#fff", color: "#2563eb", border: "none",
                            borderRadius: 8, padding: "10px 20px",
                            fontWeight: 700, fontSize: 14, cursor: upgradeLoading ? "not-allowed" : "pointer",
                            opacity: upgradeLoading ? 0.7 : 1,
                          }}>
                            {upgradeLoading ? "Redirecting…" : "Get Pro — $9/month"}
                          </button>
                        </div>
                      </>
                    )}
                    {usage.isPro && (
                      <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "1rem" }}>
                        <div style={{ fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>⚡ Pro Plan Active</div>
                        <div style={{ fontSize: 13, color: "#15803d" }}>
                          You have unlimited AI runs. Enjoy all 24 tools with no restrictions.
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              {/* Sign out */}
              <div style={{ padding: "1.75rem" }}>
                <h2 style={{ ...sectionH2, color: "#dc2626", marginBottom: "0.75rem" }}>Sign out</h2>
                <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1rem", lineHeight: 1.6 }}>
                  You'll be redirected to the homepage.
                </p>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{ padding: "10px 20px", border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .dash-tool-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}

function ToolCard({ tool }: { tool: typeof ALL_TOOLS[0] }) {
  const palette = CAT_COLORS[tool.cat] ?? CAT_COLORS["Utilities"];
  const handleClick = () => {
    try {
      const recent: string[] = JSON.parse(localStorage.getItem("sta_recent") || "[]");
      const updated = [tool.href, ...recent.filter(h => h !== tool.href)].slice(0, 10);
      localStorage.setItem("sta_recent", JSON.stringify(updated));
    } catch { /* ignore */ }
  };
  return (
    <Link href={tool.href} onClick={handleClick} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "1.1rem", display: "block", textDecoration: "none", position: "relative", transition: "box-shadow 0.15s, transform 0.15s" }} className="dash-tool-card">
      {tool.badge && (
        <span style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: tool.badge === "New" ? "#eff6ff" : "#fef3c7", color: tool.badge === "New" ? "#2563eb" : "#d97706", border: `1px solid ${tool.badge === "New" ? "#bfdbfe" : "#fde68a"}`, borderRadius: 4, padding: "2px 6px" }}>{tool.badge}</span>
      )}
      <div style={{ width: 36, height: 36, borderRadius: 8, background: palette.bg, border: `1px solid ${palette.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: "0.7rem" }}>{tool.icon}</div>
      <div style={{ fontWeight: 600, fontSize: 13, color: "#111827", marginBottom: 2, letterSpacing: "-0.01em" }}>{tool.name}</div>
      <div style={{ fontSize: 11, fontWeight: 500, color: palette.text }}>{tool.cat}</div>
    </Link>
  );
}

function GoogleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

const statCard: React.CSSProperties = { background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "1.25rem" };
const statLabel: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 };
const ghostBtn: React.CSSProperties = { padding: "6px 12px", borderRadius: 7, border: "1px solid rgba(0,0,0,0.1)", background: "#fff", color: "#6b7280", fontSize: 13, fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-block" };
const upgradeBtn: React.CSSProperties = { background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 };
const sectionH2: React.CSSProperties = { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" };
const toolGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 };
const spinnerStyle: React.CSSProperties = { width: 28, height: 28, border: "3px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" };
