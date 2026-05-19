import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://swiftoolai.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools/rewriter`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/bio-generator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/grammar-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog/best-ai-tools-for-students`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/chatgpt-vs-claude`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-write-blogs-with-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-free-ai-tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-ai-tools-for-youtube`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-make-money-with-ai-tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
