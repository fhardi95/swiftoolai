"use client";
import Link from "next/link";
import { BLOG_POSTS } from "../_data/blog-data";

const catColors: Record<string, string> = {
  Guide: "#6c63ff",
  Comparison: "#ff6384",
  Tutorial: "#4ade80",
};

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>AI Tools Blog</h1>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>Guides, comparisons, and tutorials — everything you need to work smarter with AI.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {BLOG_POSTS.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem", display: "block", transition: "border-color 0.2s, transform 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: catColors[post.category] || "var(--accent)" }}>{post.category}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{post.readTime} read</span>
            </div>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{post.icon}</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", lineHeight: 1.4, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>{post.title}</h2>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{post.excerpt}</p>
            <div style={{ marginTop: "1rem", fontSize: 12, color: "var(--muted)" }}>{post.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
