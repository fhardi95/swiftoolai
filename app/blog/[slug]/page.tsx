import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string; desc: string; cat: string; date: string; readTime: string; content: string;
}> = {
  "best-ai-tools-for-students": {
    title: "Best AI Tools for Students in 2025",
    desc: "From essay writing to note-taking, the best free and paid AI tools every student should know about.",
    cat: "Guide", date: "2025-01-15", readTime: "8 min",
    content: `## Why AI Tools Are a Game-Changer for Students

Whether you're writing essays, revising for exams, or trying to understand complex topics, AI tools can save you hours every week. Here are the best ones in 2025.

## 1. Claude (Free)

Claude is one of the best AI assistants for students. It excels at explaining complex topics, summarising long texts, helping with essay structure, and answering nuanced questions. The free tier is generous.

**Best for:** Essay help, research summaries, understanding complex topics.

## 2. ChatGPT (Free & Pro)

The most well-known AI tool. ChatGPT is excellent for brainstorming, first drafts, and coding help. The free version (GPT-4o mini) is powerful enough for most student tasks.

**Best for:** Brainstorming, coding, general Q&A.

## 3. SwiftToolAI Text Rewriter (Free)

Our free AI text rewriter is perfect for paraphrasing sources, rewriting your own notes in a clearer style, or converting casual notes into professional essay language.

**Best for:** Paraphrasing, tone adjustment, writing polish.

## 4. Notion AI (Paid)

If you already use Notion for note-taking, Notion AI integrates directly. It can summarise your notes, generate action items, and help you draft content.

**Best for:** Note-taking, organisation, summaries.

## 5. Grammarly (Free & Pro)

The industry standard for grammar and spell-checking. The free version catches most errors. Pro adds tone suggestions and plagiarism detection.

**Best for:** Grammar checking, essay polishing.

## Tips for Using AI as a Student

- Always verify facts — AI can hallucinate (make up information)
- Use AI to understand concepts, not just copy answers
- Check your institution's AI policy before submitting AI-assisted work
- Use AI for drafts and editing, not final submissions without review

## Conclusion

The best AI tools for students in 2025 are Claude and ChatGPT for general assistance, SwiftToolAI for writing and rewriting, and Grammarly for polishing. Start with the free tiers — they're more than enough for most student needs.`,
  },
  "chatgpt-vs-claude": {
    title: "ChatGPT vs Claude: Which AI is Better in 2025?",
    desc: "An honest, side-by-side comparison of ChatGPT and Claude across writing, coding, reasoning, and more.",
    cat: "Comparison", date: "2025-01-12", readTime: "10 min",
    content: `## ChatGPT vs Claude: The Honest Comparison

Both ChatGPT (by OpenAI) and Claude (by Anthropic) are world-class AI assistants. But they have distinct strengths. Here's an honest breakdown.

## Writing Quality

**Claude wins.** Claude produces more nuanced, natural-sounding prose. It's better at matching tone, following complex instructions, and writing long-form content without losing coherence.

**ChatGPT** is strong but can feel more formulaic, especially on longer pieces.

## Coding

**ChatGPT wins (slightly).** GPT-4o has a slight edge on complex coding tasks and debugging. Both are excellent, but ChatGPT's code interpreter feature adds real utility.

## Reasoning & Analysis

**Claude wins.** Claude is exceptional at breaking down complex arguments, identifying logical flaws, and producing balanced, well-reasoned analysis. It tends to be more careful and precise.

## Creativity

**Tie.** Both are excellent at creative writing, brainstorming, and ideation. Claude tends to be more literary; ChatGPT is often more playful.

## Safety & Honesty

**Claude wins.** Anthropic has built Claude with a strong focus on honesty and refusing to make things up. Claude is more likely to say "I don't know" rather than hallucinate.

## Free Tier

**ChatGPT wins.** ChatGPT's free tier gives access to GPT-4o mini which is fast and capable. Claude's free tier is also good but has more usage limits.

## Verdict

| Task | Winner |
|------|--------|
| Writing & editing | Claude |
| Coding | ChatGPT |
| Research & analysis | Claude |
| Creative writing | Tie |
| Honesty | Claude |
| Free tier | ChatGPT |

**Overall:** If writing and analysis are your priority, choose Claude. If you need a versatile all-rounder with strong coding, ChatGPT is excellent. Most power users use both.`,
  },
  "how-to-write-blogs-with-ai": {
    title: "How to Write Blogs with AI: Complete Guide",
    desc: "A step-by-step guide to using AI tools to write blog posts that rank on Google and actually get read.",
    cat: "Tutorial", date: "2025-01-10", readTime: "12 min",
    content: `## How to Write Blogs with AI (That Actually Rank)

AI can dramatically speed up your blog writing process — but only if you use it correctly. Here's the complete workflow.

## Step 1: Keyword Research First

Before writing anything, find what people are actually searching for. Use free tools like Google Search Console, Ahrefs Free, or just Google's autocomplete.

Look for keywords with:
- Clear search intent
- Reasonable volume (500–10,000/month)
- Low competition (especially for new sites)

## Step 2: Brief the AI Properly

Don't just ask AI to "write a blog post about X." Give it a proper brief:

- Target keyword
- Word count
- Target audience
- Key points to cover
- Tone (professional, casual, etc.)

Example prompt: *"Write a 1,200-word blog post targeting the keyword 'best AI tools for students'. Audience: UK university students. Tone: helpful and direct. Cover: top 5 tools, pros/cons, student tips. Include FAQ section."*

## Step 3: Use AI for the Draft, Not the Final

Treat AI output as a first draft, not a finished article. Always:
- Add your own experience and examples
- Verify all facts and statistics
- Inject your voice and personality
- Add internal links to your other pages

## Step 4: SEO Optimisation

After writing, use AI to help with SEO:
- Generate a compelling meta description
- Suggest internal linking opportunities
- Create FAQ sections (great for featured snippets)
- Generate alt text for images

Use SwiftToolAI's text rewriter to adjust the tone of specific sections.

## Step 5: Publish and Promote

- Submit your sitemap to Google Search Console
- Share on Reddit, Quora, and relevant communities
- Build backlinks by guest posting or being quoted as an expert

## The Golden Rule

**AI writes the structure; you provide the substance.** The blogs that rank in 2025 have real expertise, genuine opinions, and original insights — not just AI-generated text with no added value.

## Tools You Need

1. **Claude or ChatGPT** — for drafting
2. **SwiftToolAI** — for rewriting and tone adjustment
3. **Grammarly** — for final polish
4. **Ahrefs or Semrush** — for keyword research`,
  },
  "best-free-ai-tools": {
    title: "50 Best Free AI Tools in 2025",
    desc: "The ultimate list of free AI tools for writing, image generation, video, coding, and productivity.",
    cat: "Guide", date: "2025-01-08", readTime: "15 min",
    content: `## The 50 Best Free AI Tools in 2025

This is the definitive list. We've tested hundreds of AI tools and filtered down to the best free options across every category.

## Writing & Text AI Tools

1. **SwiftToolAI Text Rewriter** — Rewrite text in any tone, free
2. **SwiftToolAI Bio Generator** — Generate bios for any platform
3. **SwiftToolAI Grammar Checker** — Fix grammar and style errors
4. **Claude (Anthropic)** — Best AI assistant for writing
5. **ChatGPT** — Versatile AI assistant
6. **Grammarly Free** — Grammar and spell check
7. **Hemingway Editor** — Readability improvement
8. **Quillbot** — Paraphrasing tool

## Image AI Tools

9. **Canva AI** — Design with AI assistance
10. **Adobe Firefly Free** — AI image generation
11. **Microsoft Designer** — Free AI image creator
12. **Remove.bg** — Background removal (free tier)
13. **Upscayl** — Free image upscaling

## Video AI Tools

14. **CapCut** — AI video editing, free
15. **Runway Free** — AI video generation
16. **Pika Labs** — AI video creation

## Coding AI Tools

17. **GitHub Copilot Free** — AI code completion
18. **Codeium** — Free AI coding assistant
19. **Replit AI** — AI-powered coding environment

## Productivity AI Tools

20. **Notion AI Free** — AI note-taking (limited)
21. **Mem.ai** — AI memory for notes
22. **Otter.ai Free** — AI meeting transcription

## Conclusion

The best free AI tools in 2025 cover every use case. Start with the writing tools (SwiftToolAI, Claude, Grammarly) and expand from there based on your needs. The free tiers of most tools are genuinely useful — you don't need to pay to get value from AI.`,
  },
  "best-ai-tools-for-youtube": {
    title: "Best AI Tools for YouTube Creators",
    desc: "Script writing, thumbnail generation, SEO optimization — the top AI tools for YouTubers in 2025.",
    cat: "Guide", date: "2025-01-05", readTime: "9 min",
    content: `## Best AI Tools for YouTube Creators in 2025

Creating YouTube content is time-consuming. AI tools can cut your production time in half. Here's what actually works.

## Script Writing

**Claude or ChatGPT** are the best for YouTube scripts. Give them your topic, target audience, video length, and style — they'll produce a solid first draft in seconds.

Pro tip: Use SwiftToolAI's text rewriter to adjust the tone of your script from formal to conversational, or to make it more punchy and engaging.

## Thumbnail Creation

**Canva AI** — Free, drag-and-drop with AI assistance. Best for beginners.
**Adobe Firefly** — Generate custom thumbnail backgrounds with AI.
**Microsoft Designer** — Free AI-powered design tool.

## Video Editing

**CapCut** — Free, powerful AI editing. Auto-captions, background removal, transitions.
**Descript** — Edit video by editing the transcript. Game-changer for talking-head content.

## SEO & Titles

**VidIQ or TubeBuddy** — Both have free tiers with AI title and tag suggestions.
**ChatGPT** — Ask it to generate 10 YouTube title variations for A/B testing.

## Voiceover

**ElevenLabs Free** — Realistic AI voiceover, 10,000 characters/month free.
**Murf.ai** — Professional AI voices.

## Workflow for a YouTube Video

1. Research topic with ChatGPT
2. Write script with Claude
3. Polish script tone with SwiftToolAI
4. Record or use AI voiceover
5. Edit with CapCut
6. Design thumbnail with Canva AI
7. Optimise title/tags with VidIQ

This workflow can take a 4-hour process down to 90 minutes.`,
  },
  "how-to-make-money-with-ai-tools": {
    title: "How to Make Money with AI Tools in 2025",
    desc: "Real, practical ways to earn income using AI tools — from freelancing to building your own AI product.",
    cat: "Tutorial", date: "2025-01-03", readTime: "11 min",
    content: `## How to Make Money with AI Tools in 2025

AI tools have created entirely new income opportunities. Here are the most realistic ways to earn money using them.

## 1. AI-Assisted Freelancing

Use AI to dramatically speed up freelance work:
- **Copywriting** — Use Claude to draft, you refine. Charge full rates, deliver in half the time.
- **Blog writing** — Many businesses pay £50–200 per article. AI drafts in minutes.
- **Social media management** — Use AI to generate content calendars and captions.

**Realistic income:** £500–3,000/month starting out.

## 2. Build an AI Tool Website

This is exactly what SwiftToolAI is. Build a site with free AI tools, monetise with AdSense and affiliate links.

**Income streams:**
- Google AdSense: £2–10 per 1,000 visitors
- Affiliate commissions: £20–100 per referral (Jasper, Canva Pro, etc.)
- Freemium subscriptions: £5–15/month

**Realistic income:** £200–2,000/month after 6 months of SEO growth.

## 3. AI Content Channels

Create YouTube videos or TikToks about AI tools. Monetise with:
- YouTube AdSense
- Affiliate links in description
- Sponsored content from AI companies

**Realistic income:** £300–5,000/month at scale.

## 4. Sell AI-Generated Digital Products

- Prompt packs for Midjourney or ChatGPT
- AI-written ebook templates
- Notion templates built with AI assistance

Sell on Etsy, Gumroad, or your own site.

## 5. AI Automation Services

Businesses pay well for AI automation:
- Set up AI chatbots for customer service
- Build automated content pipelines
- Create AI-powered email sequences

Charge £500–5,000 per project.

## The Honest Truth

Making money with AI takes real work. The tools are powerful but they don't remove the need for skill, consistency, and marketing. The people earning the most with AI are using it to amplify their existing skills — not replace them.

Start with freelancing (fastest income) while building a long-term asset like a content site or YouTube channel.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.desc,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const catColors: Record<string, string> = {
    Guide: "var(--accent)",
    Comparison: "#ff6384",
    Tutorial: "var(--success)",
  };

  // Parse markdown-like content to HTML
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", margin: "2rem 0 0.75rem" }}>{line.slice(3)}</h2>;
      if (line.startsWith("**") && line.endsWith("**")) return <strong key={i} style={{ display: "block", color: "var(--text)", marginBottom: 4 }}>{line.slice(2, -2)}</strong>;
      if (line.startsWith("- ")) return <li key={i} style={{ color: "var(--muted)", lineHeight: 1.7, marginLeft: "1.25rem" }}>{line.slice(2)}</li>;
      if (line.startsWith("|")) return <div key={i} style={{ fontSize: 13, color: "var(--muted)", borderBottom: "1px solid var(--border)", padding: "6px 0" }}>{line}</div>;
      if (line.trim() === "") return <div key={i} style={{ height: "0.75rem" }} />;
      return <p key={i} style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 16 }}>{line}</p>;
    });
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.25rem" }}>
      <Link href="/blog" style={{ fontSize: 13, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "2rem" }}>
        ← Back to blog
      </Link>

      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
        textTransform: "uppercase", color: catColors[post.cat],
        marginBottom: "0.75rem",
      }}>{post.cat}</div>

      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
        letterSpacing: "-0.03em", lineHeight: 1.2,
        marginBottom: "1rem",
      }}>{post.title}</h1>

      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: "2.5rem" }}>
        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readTime} read
      </div>

      <article>{renderContent(post.content)}</article>

      <div style={{
        marginTop: "3rem", padding: "1.5rem",
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
      }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>
          Try our free AI writing tools
        </div>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: "1rem" }}>
          Rewrite text, generate bios, fix grammar — all free, no sign-up.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/tools/rewriter" style={{ fontSize: 13, background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: "var(--radius-sm)" }}>Text Rewriter →</Link>
          <Link href="/tools/bio-generator" style={{ fontSize: 13, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", padding: "8px 16px", borderRadius: "var(--radius-sm)" }}>Bio Generator →</Link>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }));
}
