import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SwiftoolAI",
  description:
    "SwiftoolAI Privacy Policy — learn how we collect, use, and protect your data when you use our free AI tools.",
  alternates: { canonical: "https://www.swiftoolai.com/privacy" },
};

const LAST_UPDATED = "June 2025";

const _s = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "3rem 1.25rem 5rem" } as React.CSSProperties,
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#111827" } as React.CSSProperties,
  date: { color: "#9ca3af", fontSize: 13, marginBottom: "2.5rem", display: "block" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 8 } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.8, marginBottom: "0.75rem" } as React.CSSProperties,
  ul: { color: "#6b7280", fontSize: 14, lineHeight: 1.8, paddingLeft: "1.25rem", marginBottom: "0.75rem" } as React.CSSProperties,
  a: { color: "#2563eb", textDecoration: "none" } as React.CSSProperties,
  back: { fontSize: 13, color: "#6b7280", display: "inline-block", marginBottom: "2rem", textDecoration: "none" } as React.CSSProperties,
};

const SECTIONS = [
  {
    icon: "👋",
    title: "1. Who We Are",
    content: (
      <>
        <p style={_s.p}>SwiftoolAI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website at <strong>swiftoolai.com</strong> and provides a collection of free AI-powered tools. This Privacy Policy describes how we handle personal data when you visit our site or use our tools.</p>
        <p style={_s.p}>If you have any questions about this policy, please contact us at <a href="mailto:privacy@swiftoolai.com" style={_s.a}>privacy@swiftoolai.com</a>.</p>
      </>
    ),
  },
  {
    icon: "📋",
    title: "2. What Information We Collect",
    content: (
      <>
        <p style={_s.p}><strong>Account data:</strong> When you sign in with Google (via NextAuth), we receive your name, email address, and profile picture from Google. We store this to identify your account and personalise your experience.</p>
        <p style={_s.p}><strong>Usage data:</strong> We collect anonymised data about which tools you use, how often, and general interaction patterns. This data does not identify you personally and is used to improve the platform.</p>
        <p style={_s.p}><strong>Tool inputs:</strong> Text you paste into tools such as the AI Detector, Grammar Checker, or Paraphrasing Tool is sent to our AI API to generate a result. We do not store this text after the request is completed. Image inputs for the Background Remover are processed entirely in your browser and are never sent to our servers.</p>
        <p style={_s.p}><strong>Cookies &amp; local storage:</strong> We use cookies to maintain your session and local storage to track your usage count across visits. See our <Link href="/cookie-policy" style={_s.a}>Cookie Policy</Link> for details.</p>
        <p style={_s.p}><strong>Log data:</strong> Our servers automatically log standard web server data including your IP address, browser type, pages visited, and timestamps. This data is retained for up to 30 days for security and debugging purposes.</p>
      </>
    ),
  },
  {
    icon: "🎯",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p style={_s.p}>We use the information we collect to:</p>
        <ul style={_s.ul}>
          <li>Authenticate you and maintain your account</li>
          <li>Deliver the results of AI tools you use</li>
          <li>Track your free usage allowance and prevent abuse</li>
          <li>Improve tool quality, fix bugs, and develop new features</li>
          <li>Detect and prevent fraud, spam, or misuse of the platform</li>
          <li>Send optional email updates about new tools (only if you opt in)</li>
        </ul>
        <p style={_s.p}>We do not sell your personal data to third parties. We do not use your data to train AI models.</p>
      </>
    ),
  },
  {
    icon: "🤝",
    title: "4. How We Share Your Information",
    content: (
      <>
        <p style={_s.p}>We share data only with the following trusted service providers who help us operate the platform:</p>
        <ul style={_s.ul}>
          <li><strong>Anthropic</strong> — processes text inputs for AI tool responses. Anthropic's usage policies apply.</li>
          <li><strong>Google OAuth</strong> — provides authentication. Google's privacy policy applies.</li>
          <li><strong>Vercel</strong> — hosts the application and processes web requests.</li>
          <li><strong>Supabase</strong> — stores account and usage data in a secure database.</li>
        </ul>
        <p style={_s.p}>We do not share your data with advertisers, data brokers, or any other parties beyond those listed above. We may disclose data if required to do so by law or in response to a valid legal request.</p>
      </>
    ),
  },
  {
    icon: "🔒",
    title: "5. Data Security",
    content: (
      <>
        <p style={_s.p}>We implement industry-standard security measures including HTTPS encryption, secure database access controls, and regular security reviews. Your account is protected by Google&apos;s OAuth system, which means we never see or store your Google password.</p>
        <p style={_s.p}>Despite these measures, no internet transmission is 100% secure. We cannot guarantee absolute security of data transmitted to or from the platform.</p>
      </>
    ),
  },
  {
    icon: "⏱️",
    title: "6. Data Retention",
    content: (
      <>
        <p style={_s.p}>We retain your account data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are required by law to retain it for a longer period.</p>
        <p style={_s.p}>Tool input text (text entered into AI tools) is not stored after the API response is returned. Server logs are retained for up to 30 days.</p>
      </>
    ),
  },
  {
    icon: "⚖️",
    title: "7. Your Rights",
    content: (
      <>
        <p style={_s.p}>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul style={_s.ul}>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request that we correct inaccurate data.</li>
          <li><strong>Deletion:</strong> Request that we delete your account and associated data.</li>
          <li><strong>Portability:</strong> Request your data in a machine-readable format.</li>
          <li><strong>Objection:</strong> Object to processing of your data for certain purposes.</li>
        </ul>
        <p style={_s.p}>To exercise any of these rights, please contact us at <a href="mailto:privacy@swiftoolai.com" style={_s.a}>privacy@swiftoolai.com</a>. We will respond within 30 days.</p>
      </>
    ),
  },
  {
    icon: "🧒",
    title: "8. Children's Privacy",
    content: (
      <p style={_s.p}>SwiftoolAI is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13. If you believe a child under 13 has provided us with personal data, please contact us and we will delete it promptly.</p>
    ),
  },
  {
    icon: "🔗",
    title: "9. Third-Party Links",
    content: (
      <p style={_s.p}>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to read the privacy policies of any external sites you visit.</p>
    ),
  },
  {
    icon: "📝",
    title: "10. Changes to This Policy",
    content: (
      <p style={_s.p}>We may update this Privacy Policy from time to time. When we make significant changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of SwiftoolAI after changes are posted constitutes your acceptance of the updated policy.</p>
    ),
  },
  {
    icon: "📬",
    title: "11. Contact Us",
    content: (
      <>
        <p style={_s.p}>If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
        <ul style={_s.ul}>
          <li>Email: <a href="mailto:privacy@swiftoolai.com" style={_s.a}>privacy@swiftoolai.com</a></li>
          <li>Contact form: <Link href="/contact" style={_s.a}>swiftoolai.com/contact</Link></li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div style={_s.wrap}>
      <Link href="/" style={_s.back}>← Back to home</Link>
      <h1 style={_s.h1}>Privacy Policy</h1>
      <span style={_s.date}>Last updated: {LAST_UPDATED}</span>

      {/* Quick nav */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "1.25rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8", marginBottom: "0.5rem" }}>Quick Summary</p>
        <ul style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, paddingLeft: "1.1rem" }}>
          <li>We collect only what we need to run the platform (account info, usage counts, server logs).</li>
          <li>Your text inputs are processed in real time and <strong>not stored</strong> after your request is complete.</li>
          <li>Background Remover images are processed <strong>in your browser</strong> — never uploaded to us.</li>
          <li>We do <strong>not sell</strong> your data or use it to train AI models.</li>
          <li>You can request deletion of your account data at any time.</li>
        </ul>
      </div>

      {SECTIONS.map(({ icon, title, content }) => (
        <section key={title} style={_s.section}>
          <h2 style={_s.h2}><span>{icon}</span>{title}</h2>
          {content}
        </section>
      ))}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <Link href="/terms" style={{ fontSize: 13, color: "#2563eb" }}>Terms of Service →</Link>
        <Link href="/cookie-policy" style={{ fontSize: 13, color: "#2563eb" }}>Cookie Policy →</Link>
        <Link href="/contact" style={{ fontSize: 13, color: "#2563eb" }}>Contact Us →</Link>
      </div>
    </div>
  );
}
