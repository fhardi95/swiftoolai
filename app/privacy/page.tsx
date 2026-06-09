import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – SwiftToolAI",
  description: "Privacy Policy for SwiftToolAI. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to home
      </Link>

      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
        letterSpacing: "-0.03em", marginBottom: "0.5rem",
      }}>Privacy Policy</h1>

      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "3rem" }}>
        Last updated: May 2025
      </p>

      {[
        {
          title: "1. Overview",
          body: "SwiftToolAI (\"we\", \"us\", \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our website at swiftoolai.com. By using SwiftToolAI, you agree to the terms of this policy.",
        },
        {
          title: "2. Information We Collect",
          body: "We do not require you to create an account to use SwiftToolAI. We do not collect your name, email address, or any personally identifiable information unless you voluntarily provide it. When you use our AI tools, the text you enter is sent to the Google Gemini API to generate results. We do not store this text on our servers.",
        },
        {
          title: "3. Cookies and Local Storage",
          body: "We use browser local storage to track your usage count (number of free tool uses). This data stays on your device and is never sent to our servers. We may use cookies for analytics purposes (e.g. Google Analytics) to understand how visitors use our site. These cookies do not identify you personally.",
        },
        {
          title: "4. Third-Party Services",
          body: "SwiftToolAI uses the following third-party services: Google Gemini API (to power AI tools), Google Analytics (to understand site traffic), and Google AdSense (to display advertisements). Each of these services has its own privacy policy. We encourage you to review them. We are not responsible for the privacy practices of these third parties.",
        },
        {
          title: "5. Advertising",
          body: "We may display advertisements via Google AdSense. Google may use cookies to show you relevant ads based on your browsing history. You can opt out of personalised advertising by visiting Google's Ad Settings at adssettings.google.com.",
        },
        {
          title: "6. Affiliate Links",
          body: "Some links on SwiftToolAI may be affiliate links. If you click an affiliate link and make a purchase, we may earn a commission at no extra cost to you. We only recommend products and services we believe are genuinely useful.",
        },
        {
          title: "7. Data Security",
          body: "We take reasonable steps to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of any data.",
        },
        {
          title: "8. Children's Privacy",
          body: "SwiftToolAI is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.",
        },
        {
          title: "9. Your Rights (GDPR & UK GDPR)",
          body: "If you are located in the UK or European Union, you have the right to access, correct, or delete any personal data we hold about you. As we collect minimal data, most requests can be fulfilled by clearing your browser's local storage. For any other requests, please contact us.",
        },
        {
          title: "10. Changes to This Policy",
          body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Your continued use of SwiftToolAI after changes constitutes your acceptance of the new policy.",
        },
        {
          title: "11. Contact",
          body: "If you have any questions about this Privacy Policy, please contact us at: privacy@swiftoolai.com",
        },
      ].map((section) => (
        <div key={section.title} style={{ marginBottom: "2rem" }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: "1.1rem",
            letterSpacing: "-0.02em", marginBottom: "0.6rem",
          }}>{section.title}</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75 }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
