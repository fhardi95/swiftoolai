import type { Metadata } from "next";
import PngToPdfClient from "./PngToPdfClient";

export const metadata: Metadata = {
  title: "Free PNG to PDF Converter Online | SwiftToolAI",
  description:
    "Convert PNG images to PDF instantly in your browser. Combine multiple PNGs into one PDF. Free, no upload, no sign-up, 100% private.",
  keywords: [
    "png to pdf",
    "convert png to pdf",
    "png to pdf online",
    "png to pdf free",
    "image to pdf",
    "multiple png to pdf",
    "jpg to pdf",
    "image to pdf converter",
  ],
  openGraph: {
    title: "Free PNG to PDF Converter | SwiftToolAI",
    description: "Convert PNG images to PDF instantly. Combine multiple images. Free, private, no sign-up.",
    url: "https://www.swiftoolai.com/tools/png-to-pdf",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/png-to-pdf" },
};

export default function PngToPdfPage() {
  return <PngToPdfClient />;
}
