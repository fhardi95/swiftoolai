import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog – AI Tools Guides, Comparisons & Tutorials",
  description: "Guides, comparisons, and tutorials on the best AI tools. ChatGPT vs Claude, best free AI tools, how to use AI for writing — all covered.",
};

const posts = [
  {
    slug: "best-ai-tools-for-students",
    title: "Best AI Tools for Students in 2025",
    desc: "From essay writing to note-taking, the best free and paid AI tools every student should know about.",
    cat: "Guide", date: "2025-01-15", readTime: "8 min",
  },
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude: Which AI is Better in 2025?",
    desc: "An honest, side-by-side comparison of ChatGPT and Claude across writing, coding, reasoning, and more.",
    cat: "Comparison", date: "2025-01-12", readTime: "10 min",
  },
  {
    slug: "how-to-write-blogs-with-ai",
    title: "How to Write Blogs with AI: Complete Guide",
    desc: "A step-by-step guide to using AI tools to write blog posts that rank on Google and actually get read.",
    cat: "Tutorial", date: "2025-01-10", readTime: "12 min",
  },
  {
    slug: "best-free-ai-tools",
    title: "50 Best Free AI Tools in 2025",
    desc: "The ultimate list of free AI tools for writing, image generation, video, coding, and productivity.",
    cat: "Guide", date: "2025-01-08", readTime: "15 min",
  },
  {
    slug: "best-ai-tools-for-youtube",
    title: "Best AI Tools for YouTube Creators",
    desc: "Script writing, thumbnail generation, SEO optimization — the top AI tools for YouTubers in 2025.",
    cat: "Guide", date: "2025-01-05", readTime: "9 min",
  },
  {
    slug: "how-to-make-money-with-ai-tools",
    title: "How to Make Money with AI Tools in 2025",
    desc: "Real, practical ways to earn income using AI tools — from freelancing to building your own AI product.",
    cat: "Tutorial", date: "2025-01-03", readTime: "11 min",
  },
];

const catColors: Record<string, string> = {
  Guide: "var(--accent)",
  Comparison: "#ff6384",
  Tutorial: "var(--success)",
};

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)",
          letterSpacing: "-0.03em", marginBottom: "0.75rem",
        }}>AI Tools Blog</h1>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          Guides, comparisons, and tutorials — everything you need to work smarter with AI.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "1.5rem",
            display: "block", transition: "border-color 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: catColors[post.cat] || "var(--accent)",
              }}>{post.cat}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{post.readTime} read</span>
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: "1rem",
              lineHeight: 1.4, letterSpacing: "-0.02em", marginBottom: "0.5rem",
            }}>{post.title}</h2>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{post.desc}</p>
            <div style={{ marginTop: "1rem", fontSize: 12, color: "var(--muted)" }}>
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
