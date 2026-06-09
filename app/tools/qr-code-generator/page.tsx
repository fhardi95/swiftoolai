import type { Metadata } from "next";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";

export const metadata: Metadata = {
  title: "Free QR Code Generator — Create QR Codes Instantly | SwiftToolAI",
  description:
    "Generate QR codes for URLs, text, email, phone numbers, and Wi-Fi instantly. Download as PNG, free, no sign-up, no watermark.",
  keywords: [
    "qr code generator",
    "free qr code generator",
    "create qr code",
    "qr code maker",
    "qr code online",
    "generate qr code",
    "qr code for website",
    "qr code url",
    "wifi qr code",
    "qr code no sign up",
  ],
  openGraph: {
    title: "Free QR Code Generator — Instant, No Sign-Up | SwiftToolAI",
    description: "Create QR codes for URLs, text, Wi-Fi, email and more. Download as PNG instantly.",
    url: "https://www.swiftoolai.com/tools/qr-code-generator",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/qr-code-generator" },
};

export default function QrCodeGeneratorPage() {
  return <QrCodeGeneratorClient />;
}
