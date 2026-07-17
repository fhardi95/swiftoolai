"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PROMPTS, PROMPT_CATEGORIES } from "../_data/prompts-data";

export default function PromptsPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PROMPTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.model.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const featured = PROMPTS.filter((p) => p.featured).slice(0, 6);
  const latest = [...PROMPTS]
    .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
    .slice(0, 6);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.25rem" }}>
      {/* JSON-LD: CollectionPage + breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Prompt Library",
            description:
              "A free, searchable library of ready-to-use ChatGPT and Claude prompts for resumes, SEO, marketing, coding, and business.",
            url: "https://www.swiftoolai.com/prompts",
          }),
        }}
      />

      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            letterSpacing: "-0.03em",
            marginBottom: "0.75rem",
          }}
        >
          AI Prompt Library
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 640 }}>
          {PROMPTS.length}+ free, ready-to-use prompts for ChatGPT and Claude —
          resumes, SEO, marketing, coding, and more. Copy, paste, and go.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "2.5rem", maxWidth: 520 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search prompts — e.g. resume, SEO, cold email..."
          style={{
            width: "100%",
            padding: "13px 16px",
            fontSize: 15,
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
        {results.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/prompts/${p.category}/${p.slug}`}
                onClick={() => setQuery("")}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border)",
                  fontSize: 14,
                }}
              >
                <span style={{ fontWeight: 600 }}>{p.title}</span>
                <span style={{ color: "var(--muted)", marginLeft: 8, fontSize: 12 }}>
                  {p.model}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          Browse by Category
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {PROMPT_CATEGORIES.map((cat) => {
            const count = PROMPTS.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/prompts/${cat.slug}`}
                className="tool-card"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "1.25rem",
                  display: "block",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{cat.icon}</div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 4,
                    color: cat.color,
                  }}
                >
                  {cat.label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                  {cat.description}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                  {count} prompt{count === 1 ? "" : "s"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          🔥 Featured Prompts
        </h2>
        <PromptGrid prompts={featured} />
      </section>

      {/* Latest */}
      <section>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          🆕 Latest Prompts
        </h2>
        <PromptGrid prompts={latest} />
      </section>
    </div>
  );
}

function PromptGrid({ prompts }: { prompts: typeof PROMPTS }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem",
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
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {p.model}
            </span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.difficulty}</span>
          </div>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              marginBottom: "0.5rem",
            }}
          >
            {p.title}
          </h3>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{p.description}</p>
        </Link>
      ))}
    </div>
  );
}
