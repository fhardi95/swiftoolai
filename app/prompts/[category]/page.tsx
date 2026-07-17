import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  PROMPT_CATEGORIES,
  getCategoryBySlug,
  getPromptsByCategory,
} from "../../_data/prompts-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category not found" };
  const title = `${cat.label} Prompts — Free AI Prompt Library | SwiftoolAI`;
  const description = `${cat.description} Free, copy-paste ready ${cat.label} prompts — no sign-up required.`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.swiftoolai.com/prompts/${cat.slug}` },
    openGraph: { title, description, url: `https://www.swiftoolai.com/prompts/${cat.slug}`, type: "website" },
  };
}

export function generateStaticParams() {
  return PROMPT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const prompts = getPromptsByCategory(category);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.swiftoolai.com" },
              { "@type": "ListItem", position: 2, name: "Prompts", item: "https://www.swiftoolai.com/prompts" },
              { "@type": "ListItem", position: 3, name: cat.label, item: `https://www.swiftoolai.com/prompts/${cat.slug}` },
            ],
          }),
        }}
      />

      <nav style={{ fontSize: 13, color: "var(--muted)", marginBottom: "1.5rem" }}>
        <Link href="/prompts">Prompts</Link> <span style={{ margin: "0 6px" }}>/</span> {cat.label}
      </nav>

      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{cat.icon}</div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
            color: cat.color,
          }}
        >
          {cat.label} Prompts
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 640 }}>{cat.description}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {prompts.map((p) => (
          <Link
            key={p.id}
            href={`/prompts/${p.category}/${p.slug}`}
            className="blog-card"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1.25rem",
              display: "block",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>
                {p.model}
              </span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.difficulty}</span>
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, lineHeight: 1.4, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
              {p.title}
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{p.description}</p>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PROMPT_CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
          <Link
            key={c.slug}
            href={`/prompts/${c.slug}`}
            style={{
              fontSize: 13,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              padding: "7px 14px",
              borderRadius: "var(--radius-sm)",
              color: "var(--text)",
            }}
          >
            {c.icon} {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
