import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | SwiftoolAI",
  description: "SwiftoolAI Cookie Policy — learn how we use cookies and local storage on our free AI tools platform.",
  alternates: { canonical: "https://www.swiftoolai.com/cookie-policy" },
};

const LAST_UPDATED = "June 2025";

const _s = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "3rem 1.25rem 5rem" } as React.CSSProperties,
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#111827" } as React.CSSProperties,
  date: { color: "#9ca3af", fontSize: 13, marginBottom: "2.5rem", display: "block" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827", marginBottom: "0.75rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.8, marginBottom: "0.75rem" } as React.CSSProperties,
  a: { color: "#2563eb", textDecoration: "none" } as React.CSSProperties,
  back: { fontSize: 13, color: "#6b7280", display: "inline-block", marginBottom: "2rem", textDecoration: "none" } as React.CSSProperties,
  th: { padding: "10px 14px", textAlign: "left" as const, fontWeight: 700, color: "#374151", background: "#f9fafb", borderBottom: "2px solid rgba(0,0,0,0.08)", fontSize: 13 },
  td: { padding: "10px 14px", color: "#6b7280", fontSize: 13, borderBottom: "1px solid rgba(0,0,0,0.05)", verticalAlign: "top" as const },
};

const COOKIE_TABLE = [
  { name: "next-auth.session-token", type: "Strictly Necessary", purpose: "Keeps you signed in across page loads. Set by NextAuth.js.", duration: "Session / 30 days", provider: "SwiftoolAI" },
  { name: "next-auth.csrf-token", type: "Strictly Necessary", purpose: "Prevents cross-site request forgery attacks during authentication.", duration: "Session", provider: "SwiftoolAI" },
  { name: "sta_usage (localStorage)", type: "Functional", purpose: "Stores your local usage count so we can enforce the free usage limit client-side.", duration: "Until cleared", provider: "SwiftoolAI" },
  { name: "sta_recent (localStorage)", type: "Functional", purpose: "Stores your recently used tools for display in the dashboard.", duration: "Until cleared", provider: "SwiftoolAI" },
  { name: "_ga, _gid", type: "Analytics (optional)", purpose: "Google Analytics cookies for anonymised traffic analysis — only set if you accept analytics cookies.", duration: "2 years / 24 hrs", provider: "Google" },
];

export default function CookiePolicyPage() {
  return (
    <div style={_s.wrap}>
      <Link href="/" style={_s.back}>← Back to home</Link>
      <h1 style={_s.h1}>Cookie Policy</h1>
      <span style={_s.date}>Last updated: {LAST_UPDATED}</span>

      <section style={_s.section}>
        <h2 style={_s.h2}>What Are Cookies?</h2>
        <p style={_s.p}>Cookies are small text files stored on your device by your browser when you visit a website. They allow websites to recognise your device across page loads and sessions, remember your preferences, and provide core functionality like keeping you signed in.</p>
        <p style={_s.p}>We also use <strong>browser local storage</strong> (not technically a cookie, but similar in function) to store your usage count and recently used tools without sending that data to our servers on every request.</p>
      </section>

      <section style={_s.section}>
        <h2 style={_s.h2}>How We Use Cookies</h2>
        <p style={_s.p}>SwiftoolAI uses a minimal set of cookies. We do not serve third-party advertising cookies. We do not use cookies to track you across other websites.</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
            <thead>
              <tr>
                {["Name", "Type", "Purpose", "Duration", "Provider"].map(h => (
                  <th key={h} style={_s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COOKIE_TABLE.map(row => (
                <tr key={row.name}>
                  <td style={{ ..._s.td, fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{row.name}</td>
                  <td style={_s.td}>{row.type}</td>
                  <td style={_s.td}>{row.purpose}</td>
                  <td style={{ ..._s.td, whiteSpace: "nowrap" }}>{row.duration}</td>
                  <td style={_s.td}>{row.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={_s.section}>
        <h2 style={_s.h2}>Strictly Necessary Cookies</h2>
        <p style={_s.p}>These cookies are essential for the platform to function. Without them, you cannot sign in or use authenticated tools. They are set automatically when you sign in and cannot be disabled without also disabling core functionality.</p>
      </section>

      <section style={_s.section}>
        <h2 style={_s.h2}>Functional Cookies & Local Storage</h2>
        <p style={_s.p}>We use browser local storage (not sent to our server) to store your usage count and tool history locally on your device. This is used to display your free usage progress and recent tools. You can clear this data at any time by clearing your browser&apos;s local storage or by visiting <Link href="/cookie-preferences" style={_s.a}>Cookie Preferences</Link>.</p>
      </section>

      <section style={_s.section}>
        <h2 style={_s.h2}>Analytics Cookies (Optional)</h2>
        <p style={_s.p}>We may use Google Analytics to collect anonymised data about how visitors use the site (pages visited, time spent, traffic sources). These cookies are only set if you choose to accept analytics cookies via our cookie banner. No personally identifiable information is included in analytics data.</p>
        <p style={{ ..._s.p, marginBottom: 0 }}>You can manage your analytics cookie preferences at any time via <Link href="/cookie-preferences" style={_s.a}>Cookie Preferences</Link>.</p>
      </section>

      <section style={_s.section}>
        <h2 style={_s.h2}>Managing & Disabling Cookies</h2>
        <p style={_s.p}>You can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or receive a warning before a cookie is stored. Note that disabling strictly necessary cookies will prevent you from signing in.</p>
        <p style={{ ..._s.p, marginBottom: 0 }}>For detailed instructions, see your browser&apos;s help documentation, or visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" style={_s.a}>allaboutcookies.org</a>. You can also manage your preferences directly via our <Link href="/cookie-preferences" style={_s.a}>Cookie Preferences</Link> page.</p>
      </section>

      <section style={_s.section}>
        <h2 style={_s.h2}>Changes to This Policy</h2>
        <p style={{ ..._s.p, marginBottom: 0 }}>We may update this Cookie Policy when we change how we use cookies. Changes will be reflected by updating the &ldquo;Last updated&rdquo; date. For questions, contact us at <a href="mailto:privacy@swiftoolai.com" style={_s.a}>privacy@swiftoolai.com</a>.</p>
      </section>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <Link href="/privacy" style={{ fontSize: 13, color: "#2563eb" }}>Privacy Policy →</Link>
        <Link href="/terms" style={{ fontSize: 13, color: "#2563eb" }}>Terms of Service →</Link>
        <Link href="/cookie-preferences" style={{ fontSize: 13, color: "#2563eb" }}>Manage Cookie Preferences →</Link>
      </div>
    </div>
  );
}
