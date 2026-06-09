import type { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Free Password Generator — Strong & Secure Passwords | SwiftToolAI",
  description:
    "Generate strong, random passwords instantly. Choose length, symbols, numbers, and uppercase. 100% private — generated in your browser, never sent to a server.",
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator",
    "free password generator",
    "password maker",
    "generate strong password",
    "online password generator",
  ],
  openGraph: {
    title: "Free Password Generator — Strong & Secure | SwiftToolAI",
    description: "Generate strong random passwords instantly. Customise length and characters. 100% private.",
    url: "https://www.swiftoolai.com/tools/password-generator",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/password-generator" },
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
