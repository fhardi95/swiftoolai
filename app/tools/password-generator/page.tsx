import type { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password Generator Free Online – Strong & Secure Passwords | SwiftoolAI",
  description:
    "Generate strong, secure, random passwords instantly with SwiftoolAI's free Password Generator. Customize length, include symbols, numbers, and uppercase letters. 100% private — passwords are generated locally in your browser and never sent to any server. No sign-up needed.",
  keywords: [
    "password generator free online",
    "strong password generator",
    "random password generator secure",
    "secure password creator",
    "free password maker online",
    "browser based password generator",
    "customizable password generator",
    "generate strong passwords",
    "password creator with symbols",
    "cybersecurity password tool",
    "account password generator",
    "safe password generator",
    "long random password generator",
    "password generator no sign up",
  ],
  openGraph: {
    title: "Free Password Generator — Strong & Secure | SwiftoolAI",
    description:
      "Generate strong random passwords instantly. Customize length and characters. 100% private — never sent to any server. Free, no sign-up.",
    url: "https://www.swiftoolai.com/tools/password-generator",
    siteName: "SwiftoolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/password-generator" },
};

const SEOPARAGRAPH = `Weak passwords are one of the leading causes of account breaches and data theft. SwiftoolAI's **Password Generator** creates strong, cryptographically random passwords instantly, tailored to your exact specifications. Choose your desired length, include or exclude symbols, numbers, uppercase, and lowercase letters to meet any password policy. Critically, all password generation happens locally in your browser — your passwords are never transmitted to any server, ensuring complete privacy and security. Whether you're securing a bank account, email, social media, or business system, our free online password generator helps you maintain strong, unique passwords for every account — no registration required.`;

const FAQS = [
  {
    question: "What is SwiftoolAI's Password Generator?",
    answer:
      "It is a free online tool that generates strong, random passwords locally in your browser, tailored to your preferred length and character types — symbols, numbers, uppercase, and lowercase.",
  },
  {
    question: "How does it work?",
    answer:
      "Set your desired password length and select the character types to include (uppercase, lowercase, numbers, symbols). Click Generate and your unique, strong password is created instantly in your browser.",
  },
  {
    question: "Are the generated passwords safe?",
    answer:
      "Yes. Passwords are generated using cryptographically secure randomness entirely within your browser. They are never sent to our servers or stored anywhere.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free with no subscriptions, credits, or sign-up requirements.",
  },
  {
    question: "Why should I use a random password generator?",
    answer:
      "Human-created passwords tend to follow predictable patterns that are easy to crack. A random password generator creates truly unpredictable, highly secure passwords that are much harder to break by brute force or dictionary attacks.",
  },
  {
    question: "How long should my password be?",
    answer:
      "Security experts recommend at least 12 characters for most accounts, and 16+ characters for sensitive accounts like banking or email. Longer passwords with a mix of character types are significantly more secure.",
  },
  {
    question: "Should I use a different password for each account?",
    answer:
      "Yes, absolutely. Using unique passwords for each account prevents a breach at one service from compromising your other accounts. Use a password manager to store them securely.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account or sign-up is needed. Generate passwords immediately.",
  },
];

const _s = {
  wrap: { maxWidth: 860, margin: "0 auto", padding: "2rem 1.25rem 4rem" } as React.CSSProperties,
  section: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1rem" } as React.CSSProperties,
  p: { color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: "1rem" } as React.CSSProperties,
  tag: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 100, padding: "3px 10px", marginBottom: "0.75rem" },
  faqItem: (last: boolean) => ({ borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.06)", paddingBottom: 16, marginBottom: 16 } as React.CSSProperties),
  faqQ: { fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 } as React.CSSProperties,
  link: { color: "#2563eb", fontSize: 13, textDecoration: "none" }  as React.CSSProperties,
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <PasswordGeneratorClient />
      <div style={{..._s.wrap}}>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>About</div>
          <h2 style={{..._s.h2}}>About Our Free Secure Password Generator</h2>
          <p style={{..._s.p}}>{SEOPARAGRAPH}</p>
        </section>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>FAQ</div>
          <h2 style={{..._s.h2}}>Frequently Asked Questions</h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{..._s.faqItem(i === FAQS.length - 1)}}>
                <div style={{..._s.faqQ}}>{faq.question}</div>
                <p style={{..._s.p, marginBottom: 0}}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{..._s.section}}>
          <div style={{..._s.tag}}>More Tools</div>
          <h2 style={{..._s.h2}}>Explore More Free Tools</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
            <a href="https://www.swiftoolai.com/tools/qr-code-generator" style={{..._s.link}}>QR Code Generator</a>
            <a href="https://www.swiftoolai.com/tools/color-picker" style={{..._s.link}}>Color Picker</a>
            <a href="https://www.swiftoolai.com/tools/word-counter" style={{..._s.link}}>Word Counter</a>
            <a href="https://www.swiftoolai.com/tools/case-converter" style={{..._s.link}}>Case Converter</a>
            <a href="https://www.swiftoolai.com/tools/word-unscrambler" style={{..._s.link}}>Word Unscrambler</a>
            <a href="https://www.swiftoolai.com/tools/image-compressor" style={{..._s.link}}>Image Compressor</a>
          </div>
        </section>

      </div>
    </>
  );
}
