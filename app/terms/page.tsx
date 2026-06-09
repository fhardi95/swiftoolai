import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – SwiftToolAI",
  description: "Terms of Service for SwiftToolAI. Read our terms before using the platform.",
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to home
      </Link>

      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
        letterSpacing: "-0.03em", marginBottom: "0.5rem",
      }}>Terms of Service</h1>

      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: "3rem" }}>
        Last updated: May 2025
      </p>

      {[
        {
          title: "1. Acceptance of Terms",
          body: "By accessing or using SwiftToolAI at swiftoolai.com (\"the Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.",
        },
        {
          title: "2. Description of Service",
          body: "SwiftToolAI provides free AI-powered writing tools including a text rewriter, bio generator, and grammar checker. These tools are powered by the Google Gemini API. We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice.",
        },
        {
          title: "3. Free and Pro Plans",
          body: "SwiftToolAI offers a free tier with limited monthly usage and a Pro plan with expanded features. Free tier limits are subject to change. Pro plan pricing and features are as described on the website at the time of purchase. We reserve the right to change pricing with reasonable notice.",
        },
        {
          title: "4. Acceptable Use",
          body: "You agree not to use SwiftToolAI to generate content that is illegal, harmful, defamatory, obscene, or infringes on the rights of others. You must not attempt to reverse engineer, scrape, or otherwise abuse the Service. You must not use the Service to generate spam, misinformation, or content intended to deceive.",
        },
        {
          title: "5. Intellectual Property",
          body: "The content you input into SwiftToolAI remains your property. The AI-generated output is provided to you for your use. SwiftToolAI does not claim ownership of content generated through the tools. The SwiftToolAI brand, design, and code are owned by us and may not be copied or reproduced without permission.",
        },
        {
          title: "6. Disclaimer of Warranties",
          body: "SwiftToolAI is provided \"as is\" without any warranties of any kind, express or implied. We do not guarantee that the AI-generated content will be accurate, complete, or suitable for any particular purpose. You use the Service at your own risk. Always review and verify AI-generated content before using it professionally.",
        },
        {
          title: "7. Limitation of Liability",
          body: "To the maximum extent permitted by law, SwiftToolAI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability to you shall not exceed the amount you paid us in the 12 months prior to the claim.",
        },
        {
          title: "8. Third-Party Services",
          body: "SwiftToolAI uses third-party services including Google Gemini API, Google Analytics, and Google AdSense. Your use of these services is subject to their respective terms and privacy policies. We are not responsible for the availability, accuracy, or conduct of third-party services.",
        },
        {
          title: "9. Affiliate Disclosure",
          body: "SwiftToolAI participates in affiliate marketing programmes. Some links on our website may earn us a commission if you make a purchase. This does not affect our editorial independence or the price you pay.",
        },
        {
          title: "10. Governing Law",
          body: "These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of SwiftToolAI shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
        },
        {
          title: "11. Changes to Terms",
          body: "We may update these Terms of Service from time to time. Updated terms will be posted on this page. Your continued use of SwiftToolAI after changes constitutes acceptance of the new terms.",
        },
        {
          title: "12. Contact",
          body: "If you have any questions about these Terms, please contact us at: legal@swiftoolai.com",
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
