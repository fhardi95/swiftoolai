import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

async function getFile(token: string, repo: string, branch: string, filePath: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub: could not read ${filePath} (${res.status})`);
  const data = await res.json();
  return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

async function updateFile(token: string, repo: string, branch: string, filePath: string, newContent: string, sha: string, message: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
    body: JSON.stringify({ message, content: Buffer.from(newContent).toString("base64"), sha, branch }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub update failed: ${err.message}`);
  }
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json({ error: "GITHUB_TOKEN or GITHUB_REPO not set" }, { status: 500 });
  }

  try {
    const { post } = await req.json();

    if (!post?.slug || !post?.title || !post?.content) {
      return NextResponse.json({ error: "Invalid post — slug, title, and content are required." }, { status: 400 });
    }

    const { content: blogData, sha: blogDataSha } = await getFile(token, repo, branch, "app/_data/blog-data.ts");

    // Auto-dedupe: if the slug exists, append -2, -3, etc. until it's unique
    let finalSlug = post.slug;
    let finalTitle = post.title;
    let suffix = 1;
    while (blogData.includes(`slug: "${finalSlug}"`)) {
      suffix += 1;
      finalSlug = `${post.slug}-${suffix}`;
      finalTitle = `${post.title} (${suffix})`;
    }
    const finalPost = { ...post, slug: finalSlug, title: finalTitle };

    const serialised = JSON.stringify(finalPost, null, 2);
    const insertMarker = "export const BLOG_POSTS: BlogPost[] = [";
    if (!blogData.includes(insertMarker)) {
      return NextResponse.json({ error: "Could not find BLOG_POSTS array in blog-data.ts" }, { status: 500 });
    }

    const updatedBlogData = blogData.replace(insertMarker + "\n", `${insertMarker}\n  ${serialised},\n`);
    await updateFile(token, repo, branch, "app/_data/blog-data.ts", updatedBlogData, blogDataSha, `feat: add article "${finalPost.title}" [AI Agent]`);

    let deployTriggered = false;
    const deployHook = process.env.VERCEL_DEPLOY_HOOK;
    if (deployHook) {
      try {
        const deployRes = await fetch(deployHook, { method: "POST" });
        deployTriggered = deployRes.ok;
      } catch { /* silent */ }
    }

    return NextResponse.json({
      success: true,
      slug: finalPost.slug,
      renamedFromDuplicate: finalSlug !== post.slug,
      deployTriggered,
      liveUrl: `https://www.swiftoolai.com/blog/${finalPost.slug}`,
    });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) return NextResponse.json({ count: 0, slugs: [] });

  try {
    const { content } = await getFile(token, repo, branch, "app/_data/blog-data.ts");
    const slugs = [...content.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]).filter(s => s !== "string");
    return NextResponse.json({ count: slugs.length, slugs });
  } catch {
    return NextResponse.json({ count: 0, slugs: [] });
  }
}
