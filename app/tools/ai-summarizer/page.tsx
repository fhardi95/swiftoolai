// SERVER COMPONENT — exports metadata (no "use client")
import type { Metadata } from "next";
import AISummarizerClient from "./AISummarizerClient";

export const metadata: Metadata = {
  title: "Free AI Summarizer — Summarize Text Online Instantly",
  description:
    "Free AI text summarizer. Paste any article, essay or document and get a clear summary in seconds. No sign-up. Bullet points or paragraph format.",
  keywords: [
    "AI summarizer",
    "text summarizer online free",
    "summarize text online",
    "article summarizer",
    "AI text summarizer free",
    "summarize paragraph online",
    "free AI summarizer no sign up",
    "text summarizer for students",
    "online summarizer tool",
    "summarize article free",
  ],
  openGraph: {
    title: "Free AI Text Summarizer — Summarize Any Text Instantly",
    description:
      "Turn long articles and documents into clear, concise summaries in seconds. Free, no sign-up.",
    url: "https://swiftoolai.com/tools/ai-summarizer",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: {
    canonical: "https://swiftoolai.com/tools/ai-summarizer",
  },
};

export default function AISummarizerPage() {
  return <AISummarizerClient />;
}
