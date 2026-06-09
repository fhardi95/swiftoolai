import { MetadataRoute } from "next";
import { BLOG_POSTS } from "./_data/blog-data";

// ─── Add new tools here — sitemap auto-updates on next deploy ─────────────────
const TOOLS = [
  // Original tools
  "cover-letter-generator",
  "rewriter",
  "bio-generator",
  "grammar-checker",
  "word-counter",
  "word-unscrambler",
  "ai-summarizer",
  "paraphrasing-tool",
  "ai-email-writer",
  "case-converter",
  // File tools
  "cdr-to-jpg",
  "image-compressor",
  "webp-to-jpg",
  "svg-to-png",
  "png-to-pdf",
  // Utility tools
  "qr-code-generator",
  "password-generator",
  "color-picker",
  // AI tools
  "linkedin-post-generator",
  "job-description-writer",
  "cold-email-generator",
  "instagram-caption-generator",
  "resume-bullet-writer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.swiftoolai.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,              lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`,    lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`,   lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map(slug => ({
    url: `${base}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.dateISO ? new Date(post.dateISO) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
