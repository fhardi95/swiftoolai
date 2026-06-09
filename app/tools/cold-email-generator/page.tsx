import type { Metadata } from "next";
import ColdEmailGeneratorClient from "./ColdEmailGeneratorClient";

export const metadata: Metadata = {
  title: "Free AI Cold Email Generator — Write Cold Emails That Get Replies | SwiftToolAI",
  description:
    "Generate personalised cold emails with AI in seconds. Enter the prospect, offer, and goal — get a high-converting cold email. Free, no sign-up.",
  keywords: [
    "cold email generator",
    "AI cold email generator",
    "cold email writer",
    "cold outreach email",
    "sales email generator",
    "cold email template",
    "write cold email AI",
    "cold email tool",
    "B2B cold email generator",
    "prospecting email generator",
  ],
  openGraph: {
    title: "Free AI Cold Email Generator | SwiftToolAI",
    description: "Write cold emails that get replies. AI-powered, free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/cold-email-generator",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/cold-email-generator" },
};

export default function ColdEmailGeneratorPage() {
  return <ColdEmailGeneratorClient />;
}
