import type { Metadata } from "next";
import ResumeBulletWriterClient from "./ResumeBulletWriterClient";

export const metadata: Metadata = {
  title: "Free AI Resume Bullet Point Writer | SwiftToolAI",
  description:
    "Turn your job duties into powerful, achievement-focused resume bullet points with AI. Free, no sign-up. ATS-optimised, action-verb led.",
  keywords: [
    "resume bullet point writer",
    "AI resume bullet points",
    "resume bullet generator",
    "resume point generator",
    "CV bullet points",
    "resume achievement bullet points",
    "ATS resume bullet points",
    "resume writing tool",
    "resume bullet writer free",
    "improve resume bullet points",
  ],
  openGraph: {
    title: "Free AI Resume Bullet Point Writer | SwiftToolAI",
    description: "Turn job duties into powerful achievement-focused resume bullets. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/resume-bullet-writer",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/resume-bullet-writer" },
};

export default function ResumeBulletWriterPage() {
  return <ResumeBulletWriterClient />;
}
