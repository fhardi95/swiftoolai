"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Password Generator — SwiftToolAI",
  url: "https://www.swiftoolai.com/tools/password-generator",
  description: "Free strong password generator. Generated in your browser — never sent to a server.",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this password generator safe to use?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Passwords are generated entirely in your browser using the Web Crypto API (crypto.getRandomValues). Nothing is sent to a server, logged, or stored." },
    },
    {
      "@type": "Question",
      name: "How long should my password be?",
      acceptedAnswer: { "@type": "Answer", text: "Security experts recommend at least 16 characters for important accounts. A 20+ character password with mixed characters is extremely difficult to crack even with modern hardware." },
    },
    {
      "@type": "Question",
      name: "Should I use a password manager?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. A password manager lets you use a unique, strong password for every account without needing to remember them. Popular options include Bitwarden (free, open source), 1Password, and Dashlane." },
    },
  ],
};

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function getStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: "Weak", color: "#ef4444", width: "25%" };
  if (score <= 4) return { label: "Fair", color: "#f59e0b", width: "50%" };
  if (score <= 5) return { label: "Strong", color: "#3b82f6", width: "75%" };
  return { label: "Very Strong", color: "#16a34a", width: "100%" };
}

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [count, setCount] = useState(5);

  const generate = useCallback(() => {
    let charset = "";
    if (useUpper) charset += CHARS.upper;
    if (useLower) charset += CHARS.lower;
    if (useNumbers) charset += CHARS.numbers;
    if (useSymbols) charset += CHARS.symbols;
    if (!charset) return;

    const array = new Uint32Array(length * count);
    crypto.getRandomValues(array);
    const newPasswords: string[] = [];
    for (let p = 0; p < count; p++) {
      let pw = "";
      for (let i = 0; i < length; i++) {
        pw += charset[array[p * length + i] % charset.length];
      }
      newPasswords.push(pw);
    }
    setPasswords(newPasswords);
    setCopied(null);
  }, [length, useUpper, useLower, useNumbers, useSymbols, count]);

  const copy = (idx: number) => {
    navigator.clipboard.writeText(passwords[idx]);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleStyle = (active: boolean) => ({
    padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
    border: "1px solid var(--border)", cursor: "pointer",
    background: active ? "var(--accent)" : "var(--surface)",
    color: active ? "#fff" : "var(--text)",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.25rem" }}>← Back to tools</Link>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            Password Generator
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
            Generate strong, random passwords. 100% private — created in your browser, never sent anywhere.
          </p>
        </div>

        {/* Controls */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          {/* Length */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Length</label>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--accent)", fontSize: "1.1rem" }}>{length}</span>
            </div>
            <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
          </div>

          {/* Character sets */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 10 }}>Include</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={toggleStyle(useUpper)} onClick={() => setUseUpper(!useUpper)}>A–Z Uppercase</button>
              <button style={toggleStyle(useLower)} onClick={() => setUseLower(!useLower)}>a–z Lowercase</button>
              <button style={toggleStyle(useNumbers)} onClick={() => setUseNumbers(!useNumbers)}>0–9 Numbers</button>
              <button style={toggleStyle(useSymbols)} onClick={() => setUseSymbols(!useSymbols)}>!@# Symbols</button>
            </div>
          </div>

          {/* Count */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>Generate</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg)", fontSize: 14, color: "var(--text)" }}
            >
              {[1, 3, 5, 10].map((n) => <option key={n} value={n}>{n} password{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>

          <button
            onClick={generate}
            style={{ width: "100%", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 10, padding: "0.8rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}
          >
            Generate Passwords
          </button>
        </div>

        {/* Results */}
        {passwords.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {passwords.map((pw, i) => {
              const strength = getStrength(pw);
              return (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <code style={{ fontFamily: "monospace", fontSize: "clamp(12px,2vw,14px)", wordBreak: "break-all", flex: 1, color: "var(--text)" }}>{pw}</code>
                    <button
                      onClick={() => copy(i)}
                      style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "1px solid var(--border)", cursor: "pointer", background: copied === i ? "var(--success)" : "var(--surface2)", color: copied === i ? "#fff" : "var(--text)", transition: "all 0.2s" }}
                    >
                      {copied === i ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <div style={{ height: 4, background: "var(--surface2)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: strength.width, background: strength.color, transition: "width 0.3s", borderRadius: 2 }} />
                    </div>
                    <p style={{ fontSize: 11, color: strength.color, marginTop: 4, fontWeight: 700 }}>{strength.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SEO FAQ */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          {faqLD.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: "1rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", color: "var(--accent)", marginBottom: "0.4rem" }}>{item.name}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
