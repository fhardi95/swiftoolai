import type { Metadata } from "next";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata: Metadata = {
  title: "Free Image Compressor Online — Compress JPG, PNG & WebP | SwiftToolAI",
  description:
    "Compress images online for free. Reduce JPG, PNG, and WebP file size without losing quality. No upload limits, no sign-up, 100% private — processed in your browser.",
  keywords: [
    "image compressor",
    "compress image online",
    "reduce image size",
    "compress jpg online",
    "compress png online",
    "image size reducer",
    "compress image without losing quality",
    "free image compressor",
    "online image optimizer",
    "reduce photo size",
    "compress webp",
    "image compression tool",
  ],
  openGraph: {
    title: "Free Image Compressor — Compress JPG, PNG & WebP Online",
    description:
      "Reduce image file size instantly in your browser. Free, private, no sign-up required.",
    url: "https://www.swiftoolai.com/tools/image-compressor",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: {
    canonical: "https://www.swiftoolai.com/tools/image-compressor",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
