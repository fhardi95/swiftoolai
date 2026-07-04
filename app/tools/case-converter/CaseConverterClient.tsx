"use client";
import { useState } from "react";
import Link from "next/link";

const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter Online — SwiftToolAI",
  url: "https://swiftoolai.com/tools/case-converter",
  description: "Free online case converter. Convert text to any case instantly.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a case converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A case converter is an online tool that changes the capitalisation of text instantly. You can convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and more without retyping anything.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Title Case and Sentence case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Title Case capitalises the first letter of every major word (e.g. 'The Quick Brown Fox'). Sentence case only capitalises the first word of each sentence (e.g. 'The quick brown fox'). Title Case is used for headings and article titles; Sentence case is used for normal writing.",
      },
    },
    {
      "@type": "Question",
      name: "What is camelCase used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "camelCase removes spaces and capitalises the first letter of each word after the first (e.g. 'myVariableName'). It is widely used in programming for variable names, function names, and identifiers in languages like JavaScript, Java, and TypeScript.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert text to uppercase online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste or type your text into SwiftToolAI's free case converter above, then click the UPPERCASE button. Your text is converted instantly with no sign-up or download required.",
      },
    },
    {
      "@type": "Question",
      name: "What is snake_case?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "snake_case replaces spaces with underscores and uses all lowercase letters (e.g. 'my_variable_name'). It is commonly used in Python, Ruby, and for database column names and file names.",
      },
    },
  ],
};

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "alternate" | "inverse";

const CASES: { value: CaseType; label: string; example: string }[] = [
  { value: "upper",     label: "UPPERCASE",     example: "HELLO WORLD" },
  { value: "lower",     label: "lowercase",     example: "hello world" },
  { value: "title",     label: "Title Case",    example: "Hello World" },
  { value: "sentence",  label: "Sentence case", example: "Hello world" },
  { value: "camel",     label: "camelCase",     example: "helloWorld" },
  { value: "pascal",    label: "PascalCase",    example: "HelloWorld" },
  { value: "snake",     label: "snake_case",    example: "hello_world" },
  { value: "kebab",     label: "kebab-case",    example: "hello-world" },
  { value: "alternate", label: "aLtErNaTe",     example: "hElLo WoRlD" },
  { value: "inverse",   label: "iNVERSE cASE",  example: "hELLO wORLD" },
];

// Conversion functions
function toTitleCase(str: string): string {
  const minorWords = new Set(["a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is","it"]);
  return str.toLowerCase().replace(/\S+/g, (word, idx) =>
    idx === 0 || !minorWords.has(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word
  );
}

function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function toSnakeCase(str: string): string {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function toKebabCase(str: string): string {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toAlternate(str: string): string {
  return str.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
}

function toInverse(str: string): string {
  return str.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
}

function convert(text: string, type: CaseType): string {
  switch (type) {
    case "upper":     return text.toUpperCase();
    case "lower":     return text.toLowerCase();
    case "title":     return toTitleCase(text);
    case "sentence":  return toSentenceCase(text);
    case "camel":     return toCamelCase(text);
    case "pascal":    return toPascalCase(text);
    case "snake":     return toSnakeCase(text);
    case "kebab":     return toKebabCase(text);
    case "alternate": return toAlternate(text);
    case "inverse":   return toInverse(text);
    default:          return text;
  }
}

export default function CaseConverterClient() {
  const [input, setInput] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType>("upper");
  const [copied, setCopied] = useState(false);

  const output = input ? convert(input, activeCase) : "";
  const wordCount = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
  const charCount = input.length;

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        <nav style={{ marginBottom: "1.5rem", fontSize: 13, color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>{" › "}
          <Link href="/tools" style={{ color: "var(--muted)" }}>Tools</Link>{" › "}
          <span style={{ color: "var(--text)" }}>Case Converter</span>
        </nav>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.6rem" }}>
          Case Converter Online
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem", lineHeight: 1.65 }}>
          Convert text to <strong style={{ color: "var(--text)" }}>UPPERCASE, lowercase, Title Case, camelCase, snake_case</strong> and more — instantly, no sign-up.
        </p>

        {/* Case buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {CASES.map(c => (
            <button
              key={c.value}
              onClick={() => setActiveCase(c.value)}
              style={{
                padding: "0.5rem 1rem", borderRadius: 8,
                border: activeCase === c.value ? "1px solid rgba(108,99,255,0.4)" : "1px solid var(--border)",
                background: activeCase === c.value ? "rgba(108,99,255,0.12)" : "var(--surface)",
                color: activeCase === c.value ? "var(--accent)" : "var(--muted)",
                fontSize: 13, fontWeight: activeCase === c.value ? 600 : 400,
                cursor: "pointer", transition: "all 0.12s",
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
              }}
            >
              <span>{c.label}</span>
              <span style={{ fontSize: 10, opacity: 0.5, fontFamily: "monospace" }}>{c.example}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>
            Your Text
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type or paste your text here — it converts instantly…"
            style={{
              width: "100%", minHeight: 180,
              background: "var(--surface)", border: "1px solid var(--border-active)",
              borderRadius: 12, padding: "1rem 1.25rem",
              color: "var(--text)", fontSize: 15, lineHeight: 1.7,
              resize: "vertical", outline: "none", fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{wordCount} words · {charCount} characters</span>
            {input && <button onClick={() => setInput("")} style={{ fontSize: 12, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Clear</button>}
          </div>
        </div>

        {/* Output */}
        {output && (
          <div style={{ marginTop: "1.25rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Converted — {CASES.find(c => c.value === activeCase)?.label}</span>
              <button onClick={handleCopy} style={{ fontSize: 12, color: copied ? "#4ade80" : "var(--accent)", background: "none", border: "none", cursor: "pointer" }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "1rem 1.25rem",
              fontSize: 15, lineHeight: 1.7, color: "var(--text)",
              whiteSpace: "pre-wrap", wordBreak: "break-all",
              minHeight: 80,
            }}>
              {output}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.95rem" }}>More free writing tools</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { href: "/tools/word-counter", label: "Word Counter" },
              { href: "/tools/grammar-checker", label: "Grammar Checker" },
              { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
              { href: "/tools/ai-summarizer", label: "AI Summarizer" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: 13, background: "var(--surface2, rgba(255,255,255,0.06))", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>

        {/* SEO content */}
        <section style={{ marginTop: "3.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Free Online Case Converter — 10 Text Cases
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            SwiftToolAI's <strong style={{ color: "var(--text)" }}>free case converter</strong> supports 10 text cases: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, aLtErNaTe, and iNVERSE. No sign-up, no download — just paste and convert.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            When to Use Each Text Case
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--text)" }}>Title Case</strong> is used for article headlines, book titles, and page headings. <strong style={{ color: "var(--text)" }}>Sentence case</strong> is standard for normal writing. <strong style={{ color: "var(--text)" }}>camelCase</strong> and <strong style={{ color: "var(--text)" }}>PascalCase</strong> are used in programming for variable and function names. <strong style={{ color: "var(--text)" }}>snake_case</strong> is common in Python and SQL. <strong style={{ color: "var(--text)" }}>kebab-case</strong> is used in URLs and CSS class names.
          </p>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginTop: "2.5rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
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
