import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

const BASE_TOPICS = [
  // High priority — highest search volume
  "Best free AI writing tools in 2025 — complete guide",
  "ChatGPT vs Claude vs Gemini — which AI is best",
  "How to use AI to write blog posts that rank on Google",
  "Best AI tools for content creators — complete guide",
  "How to rewrite text with AI — tone and style guide",
  "Best AI grammar checkers — free and paid compared",
  "How to write a professional bio with AI",
  "Best AI tools for small businesses in 2025",
  "Free AI tools vs paid AI tools — is it worth upgrading",
  "How to use AI to improve your writing style",
  // Medium priority
  "Best AI tools for social media content creation",
  "How to use AI for email writing — complete guide",
  "AI text rewriter tools compared — which is best",
  "How to write LinkedIn bios with AI",
  "Best AI tools for students in 2025",
  "How to use AI for SEO content writing",
  "AI tools for freelance writers — what actually works",
  "How to make your writing sound more professional with AI",
  "Best free grammar checkers powered by AI",
  "How to use AI to write product descriptions",
  "AI writing tools for non-native English speakers",
  "How to use AI to improve your CV and resume",
  "Best AI tools for bloggers in 2025",
  "How to write sales copy with AI",
  "AI tools for marketing teams — guide and comparison",
  "How to generate content ideas with AI",
  "Best AI paraphrasing tools — free and paid",
  "How to use AI for academic writing",
  "AI writing assistants — complete beginner guide",
  "How to write viral social media posts with AI",
];

const ARTICLE_SYSTEM_PROMPT = `You are the AI content manager for swiftoolai.com — a free AI writing tools website targeting high Google traffic and AdSense/affiliate revenue.

SITE: swiftoolai.com | Tools: /tools/rewriter, /tools/bio-generator, /tools/grammar-checker | Blog: /blog
NICHE: AI writing tools, content creation, productivity — targeting UK/US audiences
OWNER: Based in Newcastle, UK — use UK-friendly English

STRICT CONTENT RULES:
- Article must be 1000 to 1200 words (count carefully — not less, not more)
- Include a FAQ section at the end with 5 questions and answers (schema-ready for Google featured snippets)
- Use LSI keywords naturally throughout (related terms Google associates with the main topic)
- Include the primary keyword in: H1, first paragraph, one H2, meta description
- Secondary keywords must appear naturally in body paragraphs
- Every article must target ONE primary keyword with high search volume

BLOGPOST JSON FORMAT — output ONLY this JSON, no markdown fences, no explanation:
{
  "slug": "article-slug-here",
  "title": "Article Title Here",
  "excerpt": "155 char max SEO meta description — include primary keyword naturally.",
  "date": "USE_CURRENT_DATE",
  "dateISO": "USE_CURRENT_DATE_ISO",
  "category": "Category Name",
  "categoryColor": "#6c63ff",
  "readTime": "5 min",
  "icon": "✍️",
  "author": "SwiftToolAI Team",
  "featured": false,
  "primaryKeyword": "main keyword here",
  "secondaryKeywords": ["keyword 2", "keyword 3", "keyword 4"],
  "content": [
    { "type": "paragraph", "text": "Opening paragraph — include primary keyword in first 100 words. Hook the reader immediately." },
    { "type": "heading", "text": "H2 — includes primary or secondary keyword" },
    { "type": "paragraph", "text": "..." },
    { "type": "subheading", "text": "H3 subheading" },
    { "type": "tip", "text": "Actionable tip — boosts engagement and dwell time" },
    { "type": "list", "items": ["Point 1", "Point 2", "Point 3"] },
    { "type": "table", "headers": ["Col1", "Col2"], "rows": [["r1c1", "r1c2"]] },
    { "type": "warning", "text": "..." },
    { "type": "info", "text": "..." },
    { "type": "heading", "text": "Frequently Asked Questions" },
    { "type": "faq", "items": [
      { "question": "Question 1?", "answer": "Detailed answer 1." },
      { "question": "Question 2?", "answer": "Detailed answer 2." },
      { "question": "Question 3?", "answer": "Detailed answer 3." },
      { "question": "Question 4?", "answer": "Detailed answer 4." },
      { "question": "Question 5?", "answer": "Detailed answer 5." }
    ]},
    { "type": "divider" },
    { "type": "paragraph", "text": "Conclusion — summarise key points and include CTA to swiftoolai.com tools." }
  ]
}

SEO RULES:
- Title under 60 characters — include primary keyword
- Excerpt/meta description 150-155 chars — include primary keyword
- Primary keyword in first 100 words of content
- Use these LSI keyword patterns naturally: 'best [topic] tools', 'how to [action]', 'free [topic]', '[topic] for beginners'
- FAQ questions must mirror real Google 'People Also Ask' queries
- Internal links: mention /tools/rewriter, /tools/bio-generator, or /tools/grammar-checker where relevant
- Output ONLY raw JSON starting with { and ending with }`;

async function getGithubFile(token: string, repo: string, branch: string, filePath: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub: could not read ${filePath} (${res.status})`);
  const data = await res.json();
  return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

async function updateGithubFile(token: string, repo: string, branch: string, filePath: string, newContent: string, sha: string, message: string) {
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

async function generateArticle(apiKey: string, topic: string, monthYear: string): Promise<Record<string, unknown> | null> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      max_completion_tokens: 6000,
      messages: [{
        role: "system",
        content: ARTICLE_SYSTEM_PROMPT,
      }, {
        role: "user",
        content: `Write a complete SEO-optimised article for swiftoolai.com about: ${topic}. Today's date is ${monthYear}. Output ONLY raw JSON starting with { and ending with }.`,
      }],
    }),
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";

  const stripped = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const match = stripped.match(/\{[\s\S]*"slug"[\s\S]*"content"[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

async function publishArticle(token: string, repo: string, branch: string, post: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  try {
    const { content: blogData, sha: blogDataSha } = await getGithubFile(token, repo, branch, "app/_data/blog-data.ts");

    if (blogData.includes(`slug: "${post.slug}"`)) {
      return { success: false, error: `Slug "${post.slug}" already exists` };
    }

    const serialised = JSON.stringify(post, null, 2);
    const insertMarker = "export const BLOG_POSTS: BlogPost[] = [";
    if (!blogData.includes(insertMarker)) {
      return { success: false, error: "Could not find BLOG_POSTS array" };
    }

    const updatedBlogData = blogData.replace(insertMarker + "\n", `${insertMarker}\n  ${serialised},\n`);
    await updateGithubFile(token, repo, branch, "app/_data/blog-data.ts", updatedBlogData, blogDataSha, `feat: add "${post.title}" [Daily Agent]`);

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!apiKey || !token || !repo) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

  const now = new Date();
  const year = now.getFullYear();
  const monthYear = now.toLocaleString("en-GB", { month: "long", year: "numeric" });
  const todayDisplay = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const todayISO = now.toISOString().split("T")[0];
  const AUTO_TOPICS = BASE_TOPICS.map(t => `${t} ${year}`);

  const topic = AUTO_TOPICS[Math.floor(Math.random() * AUTO_TOPICS.length)];
  const results: { topic: string; slug?: string; success: boolean; error?: string }[] = [];

  try {
    const post = await generateArticle(apiKey, topic, monthYear);
    if (!post) {
      results.push({ topic, success: false, error: "Failed to generate article" });
    } else {
      // Always override whatever date the model produced — giving it only
      // "July 2026" and letting it invent a day + calculate the ISO date
      // itself is unreliable (it tends to default to the 15th). Compute
      // the real date in code instead.
      post.date = todayDisplay;
      post.dateISO = todayISO;
      const publishResult = await publishArticle(token, repo, branch, post);
      results.push({ topic, slug: post.slug as string, ...publishResult });
    }
  } catch (err) {
    results.push({ topic, success: false, error: err instanceof Error ? err.message : "Unknown error" });
  }

  let deployTriggered = false;
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook && results.some(r => r.success)) {
    try {
      const deployRes = await fetch(deployHook, { method: "POST" });
      deployTriggered = deployRes.ok;
    } catch { /* silent */ }
  }

  return NextResponse.json({ results, deployTriggered });
}
