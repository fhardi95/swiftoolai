import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SwiftoolAI",
  description: "SwiftoolAI Terms of Service — the rules and conditions that govern your use of our free AI tools platform.",
  alternates: { canonical: "https://www.swiftoolai.com/terms" },
};

const LAST_UPDATED = "June 2025";

const _s = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "3rem 1.25rem 5rem" } as React.CSSProperties,
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#111827" } as React.CSSProperties,
  date: { color: "#9ca3af", fontSize: 13, marginBottom: "2.5rem", display: "block" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#111827", marginBottom: "0.75rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.8, marginBottom: "0.75rem" } as React.CSSProperties,
  ul: { color: "#6b7280", fontSize: 14, lineHeight: 1.8, paddingLeft: "1.25rem", marginBottom: "0.75rem" } as React.CSSProperties,
  a: { color: "#2563eb", textDecoration: "none" } as React.CSSProperties,
  back: { fontSize: 13, color: "#6b7280", display: "inline-block", marginBottom: "2rem", textDecoration: "none" } as React.CSSProperties,
};

export default function TermsPage() {
  return (
    <div style={_s.wrap}>
      <Link href="/" style={_s.back}>← Back to home</Link>
      <h1 style={_s.h1}>Terms of Service</h1>
      <span style={_s.date}>Last updated: {LAST_UPDATED}</span>

      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "1.25rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: 13, color: "#92400e", lineHeight: 1.7 }}>By using SwiftoolAI, you agree to these Terms of Service. Please read them carefully before using our platform.</p>
      </div>

      {[
        {
          title: "1. Acceptance of Terms",
          body: (
            <p style={_s.p}>By accessing or using SwiftoolAI at <strong>swiftoolai.com</strong> (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, please do not use the Service. These Terms apply to all visitors, users, and anyone who accesses the Service.</p>
          ),
        },
        {
          title: "2. Description of Service",
          body: (
            <>
              <p style={_s.p}>SwiftoolAI provides a collection of free AI-powered tools including but not limited to: AI Detector, Background Remover, Grammar Checker, AI Email Writer, Paraphrasing Tool, and more. Tools are provided free of charge and powered by third-party AI APIs.</p>
              <p style={_s.p}>We reserve the right to add, modify, or discontinue any tool or feature at any time without notice.</p>
            </>
          ),
        },
        {
          title: "3. Accounts & Authentication",
          body: (
            <>
              <p style={_s.p}>Access to most tools requires signing in with a Google account via OAuth. You are responsible for maintaining the security of your account. You must provide accurate information and must not impersonate any person or entity.</p>
              <p style={_s.p}>We reserve the right to suspend or terminate accounts that violate these Terms or that engage in abusive behaviour toward the Service.</p>
            </>
          ),
        },
        {
          title: "4. Acceptable Use",
          body: (
            <>
              <p style={_s.p}>You agree not to use SwiftoolAI to:</p>
              <ul style={_s.ul}>
                <li>Generate or distribute illegal, harmful, abusive, defamatory, or obscene content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe the intellectual property rights of others</li>
                <li>Impersonate any person, organisation, or entity</li>
                <li>Spam, phish, or attempt to defraud others</li>
                <li>Attempt to reverse-engineer, scrape, or overload the Service</li>
                <li>Use the Service in a way that exceeds reasonable personal or professional use</li>
                <li>Circumvent or attempt to circumvent usage limits or authentication</li>
              </ul>
            </>
          ),
        },
        {
          title: "5. Intellectual Property",
          body: (
            <>
              <p style={_s.p}>The SwiftoolAI name, logo, design, and all content on the website (excluding user-submitted content) are owned by SwiftoolAI and protected by copyright and trademark law.</p>
              <p style={_s.p}>Content you submit to our tools (text, images) remains your property. You grant us a limited, non-exclusive licence to process your content solely for the purpose of delivering the tool&apos;s output to you.</p>
              <p style={_s.p}>Outputs generated by our AI tools are provided for your personal or commercial use. We do not claim ownership of AI-generated results.</p>
            </>
          ),
        },
        {
          title: "6. Free Usage Limits",
          body: (
            <p style={_s.p}>We provide a free usage allowance for all authenticated users. We reserve the right to enforce usage limits and to introduce paid plans in the future. We will provide reasonable notice before any currently free features become paid-only.</p>
          ),
        },
        {
          title: "7. Third-Party Services",
          body: (
            <p style={_s.p}>SwiftoolAI relies on third-party services including Anthropic (AI API), Google OAuth, Vercel (hosting), and Supabase (database). Your use of these third-party services may be subject to their own terms and privacy policies. We are not responsible for the actions or policies of these providers.</p>
          ),
        },
        {
          title: "8. Disclaimers",
          body: (
            <>
              <p style={_s.p}>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p style={_s.p}>AI-generated content may contain errors, inaccuracies, or outdated information. You are responsible for reviewing and verifying any output before relying on it for important decisions.</p>
            </>
          ),
        },
        {
          title: "9. Limitation of Liability",
          body: (
            <p style={_s.p}>To the fullest extent permitted by law, SwiftoolAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service. Our total liability to you for any claims arising from these Terms or your use of the Service shall not exceed £100 or the amount you paid to us in the preceding 12 months, whichever is greater.</p>
          ),
        },
        {
          title: "10. Governing Law",
          body: (
            <p style={_s.p}>These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          ),
        },
        {
          title: "11. Changes to Terms",
          body: (
            <p style={_s.p}>We may update these Terms from time to time. We will update the &ldquo;Last updated&rdquo; date when changes are made. Continued use of the Service after changes are posted constitutes acceptance of the updated Terms. For significant changes, we will attempt to provide notice via the platform.</p>
          ),
        },
        {
          title: "12. Contact",
          body: (
            <p style={_s.p}>Questions about these Terms? Contact us at <a href="mailto:legal@swiftoolai.com" style={_s.a}>legal@swiftoolai.com</a> or via our <Link href="/contact" style={_s.a}>contact page</Link>.</p>
          ),
        },
      ].map(({ title, body }) => (
        <section key={title} style={_s.section}>
          <h2 style={_s.h2}>{title}</h2>
          {body}
        </section>
      ))}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <Link href="/privacy" style={{ fontSize: 13, color: "#2563eb" }}>Privacy Policy →</Link>
        <Link href="/cookie-policy" style={{ fontSize: 13, color: "#2563eb" }}>Cookie Policy →</Link>
        <Link href="/contact" style={{ fontSize: 13, color: "#2563eb" }}>Contact Us →</Link>
      </div>
    </div>
  );
}
