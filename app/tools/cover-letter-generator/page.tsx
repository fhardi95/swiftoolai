import type { Metadata } from "next";
import CoverLetterClient from "./CoverLetterClient";

export const metadata: Metadata = {
  title: "Free AI Cover Letter Generator — Write a Cover Letter in Seconds",
  description:
    "Generate a professional, tailored cover letter instantly with AI. Enter your job title, company, and skills — get a ready-to-send cover letter in seconds. Free, no sign-up required.",
  keywords: [
    "cover letter generator",
    "AI cover letter generator",
    "free cover letter generator",
    "cover letter writer",
    "cover letter generator free",
    "AI cover letter writer",
    "automatic cover letter generator",
    "cover letter maker",
    "cover letter builder",
    "job application cover letter",
    "professional cover letter generator",
    "cover letter generator no sign up",
    "write cover letter AI",
    "cover letter for job application",
    "instant cover letter generator",
  ],
  openGraph: {
    title: "Free AI Cover Letter Generator — Instant, Professional, No Sign-Up",
    description:
      "Create a tailored cover letter in seconds with AI. Just enter the job details and your skills — done. Free, no account needed.",
    url: "https://swiftoolai.com/tools/cover-letter-generator",
    siteName: "SwiftToolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Cover Letter Generator",
    description:
      "Generate a professional cover letter in seconds. Free AI tool, no sign-up required.",
  },
  alternates: {
    canonical: "https://swiftoolai.com/tools/cover-letter-generator",
  },
};

export default function CoverLetterPage() {
  return <CoverLetterClient />;
}
