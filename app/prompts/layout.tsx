import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Prompt Library — ChatGPT & Claude Prompts | SwiftoolAI",
  description:
    "Browse a free, searchable library of ready-to-use ChatGPT and Claude prompts for resumes, SEO, marketing, coding, and business. Copy and paste — no sign-up required.",
  alternates: { canonical: "https://www.swiftoolai.com/prompts" },
  openGraph: {
    title: "Free AI Prompt Library — ChatGPT & Claude Prompts",
    description:
      "A free, searchable library of ready-to-use ChatGPT and Claude prompts for resumes, SEO, marketing, coding, and business.",
    url: "https://www.swiftoolai.com/prompts",
    siteName: "SwiftoolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Prompt Library — ChatGPT & Claude Prompts",
    description:
      "A free, searchable library of ready-to-use ChatGPT and Claude prompts for resumes, SEO, marketing, coding, and business.",
  },
};

export default function PromptsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
