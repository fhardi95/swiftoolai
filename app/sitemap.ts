import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "./_data/blog-data";

const BASE_URL = "https://www.swiftoolai.com";

/**
 * Automatically discovers every tool by reading app/tools/ at build time.
 * No manual updates needed — just add a new folder and it appears in the sitemap.
 */
function getToolSlugs(): string[] {
  try {
    const toolsDir = path.join(process.cwd(), "app", "tools");
    const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
    return entries
      .filter(
        (entry) =>
          entry.isDirectory() &&
          // Exclude dynamic catch-all or private folders
          !entry.name.startsWith("_") &&
          !entry.name.startsWith("(") &&
          !entry.name.startsWith("[")
      )
      .map((entry) => entry.name);
  } catch {
    // If the directory can't be read at build time, fall back to an empty array
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/cookie-preferences`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  // ─── Tool pages (auto-discovered) ──────────────────────────────────────────
  const toolSlugs = getToolSlugs();
  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ─── Blog posts (auto-discovered from BLOG_POSTS — new posts appear on the
  //     next build with no manual sitemap edits needed, including posts added
  //     by the daily auto-publish agent) ───────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.dateISO ? new Date(post.dateISO) : now,
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.7 : 0.6,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
