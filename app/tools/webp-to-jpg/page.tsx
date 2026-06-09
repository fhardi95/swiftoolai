import type { Metadata } from "next";
import WebpToJpgClient from "./WebpToJpgClient";

export const metadata: Metadata = {
  title: "Free WebP to JPG Converter Online | SwiftToolAI",
  description:
    "Convert WebP images to JPG instantly in your browser. Free, no upload, no sign-up — 100% private. Batch convert multiple files at once.",
  keywords: [
    "webp to jpg",
    "webp to jpeg",
    "convert webp to jpg",
    "webp converter",
    "webp to jpg online",
    "free webp converter",
    "webp to jpg no upload",
  ],
  openGraph: {
    title: "Free WebP to JPG Converter | SwiftToolAI",
    description: "Convert WebP to JPG instantly in your browser. Free, private, no sign-up.",
    url: "https://www.swiftoolai.com/tools/webp-to-jpg",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/webp-to-jpg" },
};

export default function WebpToJpgPage() {
  return <WebpToJpgClient />;
}
