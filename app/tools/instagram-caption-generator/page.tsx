import type { Metadata } from "next";
import InstagramCaptionGeneratorClient from "./InstagramCaptionGeneratorClient";

export const metadata: Metadata = {
  title: "Free AI Instagram Caption Generator | SwiftToolAI",
  description:
    "Generate engaging Instagram captions with AI in seconds. Enter your photo description, niche, and tone — get captions with hashtags ready to post. Free, no sign-up.",
  keywords: [
    "instagram caption generator",
    "AI instagram caption generator",
    "instagram caption writer",
    "instagram captions",
    "caption generator",
    "hashtag generator",
    "instagram post caption",
    "free caption generator",
    "social media caption generator",
    "instagram caption ideas",
  ],
  openGraph: {
    title: "Free AI Instagram Caption Generator | SwiftToolAI",
    description: "Generate engaging Instagram captions with hashtags in seconds. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/instagram-caption-generator",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/instagram-caption-generator" },
};

export default function InstagramCaptionGeneratorPage() {
  return <InstagramCaptionGeneratorClient />;
}
