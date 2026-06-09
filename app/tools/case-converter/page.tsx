import type { Metadata } from "next";
import CaseConverterClient from "./CaseConverterClient";

export const metadata: Metadata = {
  title: "Case Converter Online — Free Text Case Changer Tool",
  description:
    "Free online case converter. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase and more. Instant, no sign-up required.",
  keywords: [
    "case converter",
    "text case converter online",
    "uppercase to lowercase converter",
    "title case converter",
    "sentence case converter",
    "camelcase converter",
    "change text case online free",
    "capitalize text online",
    "lowercase converter",
    "text case changer",
  ],
  openGraph: {
    title: "Free Case Converter — Change Text Case Instantly Online",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, Sentence case & more. Free, instant, no sign-up.",
    url: "https://swiftoolai.com/tools/case-converter",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://swiftoolai.com/tools/case-converter" },
};

export default function CaseConverterPage() {
  return <CaseConverterClient />;
}
