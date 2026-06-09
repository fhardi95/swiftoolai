import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, ContentBlock } from "../../_data/blog-data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading": return <h2 key={i} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", margin: "2rem 0 0.75rem" }}>{block.text}</h2>;
    case "subheading": return <h3 key={i} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>{block.text}</h3>;
    case "paragraph": return <p key={i} style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 16, marginBottom: "0.75rem" }}>{block.text}</p>;
    case "tip": return <div key={i} style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.25)", borderRadius: 8, padding: "0.85rem 1rem", margin: "1rem 0", fontSize: 14, color: "var(--text)" }}>💡 {block.text}</div>;
    case "warning": return <div key={i} style={{ background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.25)", borderRadius: 8, padding: "0.85rem 1rem", margin: "1rem 0", fontSize: 14, color: "var(--text)" }}>⚠️ {block.text}</div>;
    case "info": return <div key={i} style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "0.85rem 1rem", margin: "1rem 0", fontSize: 14, color: "var(--text)" }}>ℹ️ {block.text}</div>;
    case "list": return <ul key={i} style={{ margin: "0.75rem 0", paddingLeft: "1.5rem" }}>{block.items.map((item, j) => <li key={j} style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "0.3rem", fontSize: 15 }}>{item}</li>)}</ul>;
    case "table": return (
      <div key={i} style={{ overflowX: "auto", margin: "1.5rem 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead><tr>{block.headers.map((h, j) => <th key={j} style={{ padding: "8px 12px", textAlign: "left", borderBottom: "1px solid var(--border)", color: "var(--text)", fontWeight: 600 }}>{h}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k} style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    case "divider": return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "2rem 0" }} />;
case "faq":
  return (
    <div key={i} style={{ margin: "2rem 0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": block.items.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
      {block.items.map((item, j) => (
        <div key={j} style={{ marginBottom: "1.25rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10 }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem", color: "var(--accent)" }}>
            {item.question}
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{item.answer}</p>
        </div>
      ))}
    </div>
  );      
    default: return null;
  }
}
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "2rem" }}>← Back to blog</Link>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: post.categoryColor, marginBottom: "0.75rem" }}>{post.category}</div>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1rem" }}>{post.title}</h1>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: "2.5rem" }}>{post.date} · {post.readTime} read</div>
      <article>{post.content.map((block, i) => renderBlock(block as ContentBlock, i))}</article>
      <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>Try our free AI writing tools</div>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>Rewrite text, generate bios, fix grammar — all free, no sign-up.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/tools/rewriter" style={{ fontSize: 13, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: "var(--radius-sm)" }}>Text Rewriter →</Link>
          <Link href="/tools/bio-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: "var(--radius-sm)" }}>Bio Generator →</Link>
        </div>
      </div>
    </div>
  );
}
