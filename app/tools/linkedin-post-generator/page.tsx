import type { Metadata } from "next";
import LinkedInPostGeneratorClient from "./LinkedInPostGeneratorClient";

export const metadata: Metadata = {
  title: "Free AI LinkedIn Post Generator | SwiftToolAI",
  description:
    "Generate engaging LinkedIn posts with AI in seconds. Enter your topic, tone, and goal — get a ready-to-publish post. Free, no sign-up required.",
  keywords: [
    "linkedin post generator",
    "AI linkedin post generator",
    "linkedin post writer",
    "linkedin content generator",
    "generate linkedin post",
    "linkedin post ideas",
    "AI linkedin content",
    "free linkedin post generator",
    "linkedin post maker",
    "professional linkedin post",
  ],
  openGraph: {
    title: "Free AI LinkedIn Post Generator | SwiftToolAI",
    description: "Write engaging LinkedIn posts in seconds with AI. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/linkedin-post-generator",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/linkedin-post-generator" },
};

export default function LinkedInPostGeneratorPage() {
  return <LinkedInPostGeneratorClient />;
}
