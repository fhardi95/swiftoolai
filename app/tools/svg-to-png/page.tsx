import type { Metadata } from "next";
import SvgToPngClient from "./SvgToPngClient";

export const metadata: Metadata = {
  title: "Free SVG to PNG Converter Online | SwiftToolAI",
  description:
    "Convert SVG files to PNG instantly in your browser. Choose output size, transparent or white background. Free, no upload, no sign-up.",
  keywords: [
    "svg to png",
    "convert svg to png",
    "svg converter",
    "svg to png online free",
    "svg to png no upload",
    "svg to image",
    "svg png converter",
  ],
  openGraph: {
    title: "Free SVG to PNG Converter | SwiftToolAI",
    description: "Convert SVG to PNG in your browser. Choose size and background. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/svg-to-png",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/svg-to-png" },
};

export default function SvgToPngPage() {
  return <SvgToPngClient />;
}
