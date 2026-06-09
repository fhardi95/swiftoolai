import type { Metadata } from "next";
import AIEmailWriterClient from "./AIEmailWriterClient";

export const metadata: Metadata = {
  title: "Free AI Email Writer — Write Professional Emails Instantly",
  description:
    "Free AI email writer. Generate professional, friendly or formal emails in seconds. Just describe what you need. No sign-up required.",
  keywords: [
    "AI email writer",
    "email writer online free",
    "write professional email AI",
    "free email generator",
    "AI email generator",
    "professional email writer",
    "write email for me free",
    "email writing tool online",
    "AI write email no sign up",
    "automatic email writer free",
  ],
  openGraph: {
    title: "Free AI Email Writer — Professional Emails in Seconds",
    description:
      "Describe what you need and get a ready-to-send email instantly. Free, no sign-up.",
    url: "https://swiftoolai.com/tools/ai-email-writer",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://swiftoolai.com/tools/ai-email-writer" },
};

export default function AIEmailWriterPage() {
  return <AIEmailWriterClient />;
}
