import type { Metadata } from "next";
import JobDescriptionWriterClient from "./JobDescriptionWriterClient";

export const metadata: Metadata = {
  title: "Free AI Job Description Writer | SwiftToolAI",
  description:
    "Generate professional job descriptions with AI in seconds. Enter the job title, company, and requirements — get a ready-to-post JD. Free, no sign-up.",
  keywords: [
    "job description writer",
    "AI job description generator",
    "job description template",
    "write job description",
    "job posting generator",
    "job description maker",
    "free job description writer",
    "AI job posting writer",
    "job ad generator",
    "job description tool",
  ],
  openGraph: {
    title: "Free AI Job Description Writer | SwiftToolAI",
    description: "Generate professional job descriptions instantly with AI. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/job-description-writer",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/job-description-writer" },
};

export default function JobDescriptionWriterPage() {
  return <JobDescriptionWriterClient />;
}
