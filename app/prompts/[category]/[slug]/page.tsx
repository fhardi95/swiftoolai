import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  PROMPTS,
  getCategoryBySlug,
  getRelatedPrompts,
} from "../../../_data/prompts-data";
import CopyPromptButton from "../../../_components/CopyPromptButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const prompt = PROMPTS.find((p) => p.category === category && p.slug === slug);
  if (!prompt) return { title: "Prompt not found" };
  const url = `https://www.swiftoolai.com/prompts/${prompt.category}/${prompt.slug}`;
  return {
    title: `${prompt.title} | SwiftoolAI`,
    description: prompt.description,
    alternates: { canonical: url },
    keywords: prompt.tags,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
    },
  };
}

export function generateStaticParams() {
  return PROMPTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const prompt = PROMPTS.find((p) => p.category === category && p.slug === slug);
  if (!prompt) notFound();
  const cat = getCategoryBySlug(category);
  const related = getRelatedPrompts(prompt, 3);
  const url = `https://www.swiftoolai.com/prompts/${prompt.category}/${prompt.slug}`;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 1.25rem" }}>
      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.swiftoolai.com" },
              { "@type": "ListItem", position: 2, name: "Prompts", item: "https://www.swiftoolai.com/prompts" },
              { "@type": "ListItem", position: 3, name: cat?.label ?? prompt.category, item: `https://www.swiftoolai.com/prompts/${prompt.category}` },
              { "@type": "ListItem", position: 4, name: prompt.title, item: url },
            ],
          }),
        }}
      />
      {/* FAQ schema */}
      {prompt.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: prompt.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}
      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: prompt.title,
            description: prompt.description,
            datePublished: prompt.dateISO,
            dateModified: prompt.dateISO,
            author: { "@type": "Organization", name: "SwiftoolAI" },
            publisher: { "@type": "Organization", name: "SwiftoolAI" },
            mainEntityOfPage: url,
          }),
        }}
      />

      <nav style={{ fontSize: 13, color: "var(--muted)", marginBottom: "1.5rem" }}>
        <Link href="/prompts">Prompts</Link> <span style={{ margin: "0 6px" }}>/</span>{" "}
        <Link href={`/prompts/${prompt.category}`}>{cat?.label ?? prompt.category}</Link>
      </nav>

      <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#fff",
            background: cat?.color ?? "var(--accent)",
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          {prompt.model}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--muted)",
            background: "var(--surface2)",
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          {prompt.difficulty}
        </span>
      </div>

      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginBottom: "1rem",
        }}
      >
        {prompt.title}
      </h1>
      <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
        {prompt.description}
      </p>

      {/* Prompt box */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)" }}>
            The Prompt
          </h2>
          <CopyPromptButton text={prompt.promptText} />
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text)", whiteSpace: "pre-wrap" }}>
          {prompt.promptText}
        </p>
      </div>

      {/* Example */}
      {(prompt.exampleInput || prompt.exampleOutput) && (
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>
            Example
          </h2>
          {prompt.exampleInput && (
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Example Input
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", background: "var(--surface2)", padding: "0.9rem 1rem", borderRadius: "var(--radius-sm)" }}>
                {prompt.exampleInput}
              </p>
            </div>
          )}
          {prompt.exampleOutput && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Example Output
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", background: "var(--surface2)", padding: "0.9rem 1rem", borderRadius: "var(--radius-sm)" }}>
                {prompt.exampleOutput}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {prompt.tips.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>
            Tips for Better Results
          </h2>
          <ul style={{ paddingLeft: "1.25rem" }}>
            {prompt.tips.map((tip, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", marginBottom: "0.5rem" }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQs */}
      {prompt.faqs.length > 0 && (
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>
            FAQ
          </h2>
          {prompt.faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: "1rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem", color: "var(--accent)" }}>
                {faq.question}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Related AI tools */}
      {prompt.relatedTools && prompt.relatedTools.length > 0 && (
        <div style={{ marginBottom: "2.5rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>
            Try these free AI tools
          </div>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>
            Pair this prompt with a free SwiftoolAI tool to go from idea to finished result faster.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {prompt.relatedTools.map((tool) => (
              <Link
                key={tool}
                href={`/tools/${tool}`}
                style={{ fontSize: 13, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: "var(--radius-sm)" }}
              >
                {tool.replace(/-/g, " ")} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related prompts */}
      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "1rem" }}>
            Related Prompts
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/prompts/${r.category}/${r.slug}`}
                className="blog-card"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "1rem", display: "block" }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>
                  {r.model}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
