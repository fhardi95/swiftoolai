// SERVER COMPONENT — exports metadata (no "use client")
import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter Online — Free Word & Character Count Tool",
  description:
    "Free online word counter. Instantly count words, characters, sentences, paragraphs & reading time. No sign-up. Perfect for essays, blogs & social media.",
  keywords: [
    "word counter online",
    "character counter",
    "word count checker",
    "free word counter",
    "online word counter tool",
    "word counter for essays",
    "character count checker online",
    "word count tool free",
    "word counter for students",
    "count words online",
  ],
  openGraph: {
    title: "Free Word Counter Online — Words, Characters & Reading Time",
    description:
      "Count words, characters, sentences and reading time instantly. Free, no sign-up required.",
    url: "https://swiftoolai.com/tools/word-counter",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: {
    canonical: "https://swiftoolai.com/tools/word-counter",
  },
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}
