import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | SwiftoolAI",
  description:
    "Get in touch with the SwiftoolAI team. Report a bug, suggest a new AI tool, ask a question, or give feedback.",
  alternates: { canonical: "https://www.swiftoolai.com/contact" },
  openGraph: {
    title: "Contact SwiftoolAI",
    description: "Reach out to the SwiftoolAI team — bug reports, tool suggestions, feedback, and general questions welcome.",
    url: "https://www.swiftoolai.com/contact",
    siteName: "SwiftoolAI",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
