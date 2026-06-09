import type { Metadata } from "next";
import ParaphrasingToolClient from "./ParaphrasingToolClient";

export const metadata: Metadata = {
  title: "Free Paraphrasing Tool Online — AI Paraphraser",
  description:
    "Free AI paraphrasing tool. Reword any text instantly in multiple styles — Standard, Fluent, Creative or Formal. No sign-up. Better than Quillbot.",
  keywords: [
    "paraphrasing tool",
    "paraphraser online free",
    "rephrase text online",
    "paraphrase tool",
    "free paraphrasing tool",
    "AI paraphraser",
    "reword text online",
    "paraphrasing tool no sign up",
    "paraphrase sentence online free",
    "quillbot alternative free",
  ],
  openGraph: {
    title: "Free AI Paraphrasing Tool — Rephrase Text Instantly",
    description:
      "Reword any text in seconds with our free AI paraphraser. Multiple styles, no sign-up required.",
    url: "https://swiftoolai.com/tools/paraphrasing-tool",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://swiftoolai.com/tools/paraphrasing-tool" },
};

export default function ParaphrasingToolPage() {
  return <ParaphrasingToolClient />;
}
