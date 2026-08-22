# SwiftToolAI — Full Deployment Guide

## What's included

- **Homepage** — Hero, stats, tools grid, blog preview, CTA
- **3 AI Tools** — Text Rewriter (9 tones), Bio Generator (5 platforms), Grammar Checker
- **Blog** — 6 full SEO articles (students, ChatGPT vs Claude, YouTube, etc.)
- **API Route** — Server-side Claude API proxy (keeps your key secret)
- **SEO** — Sitemap, robots.txt, metadata on every page
- **Design** — Dark, premium, Syne + DM Sans fonts

## Deploy to Vercel (5 minutes)

### Step 1 — Push to GitHub
```bash
cd swiftoolai
git init
git add .
git commit -m "Initial SwiftToolAI commit"
git remote add origin https://github.com/YOUR_USERNAME/swiftoolai.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

### Step 3 — Add Environment Variables
In Vercel → Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-your-key-here   (used only by the Claude Sonnet 4.6 chat page)
OPENAI_API_KEY = sk-your-openai-key-here   (used by every other AI tool)
```

### Step 4 — Connect your domain
In Vercel → Settings → Domains:
Add `swiftoolai.com` and follow DNS instructions

## Monetisation setup

### Google AdSense
1. Apply at google.com/adsense
2. Add your site
3. Add the AdSense script to app/layout.tsx
4. Place ad units on tool pages

### Affiliate links to add
- Jasper AI: jasper.ai/affiliate
- Copy.ai affiliate program
- Canva Pro affiliate
- Grammarly affiliate

Add affiliate links in blog posts where tools are mentioned.

## Adding more tools
Duplicate any file in `app/tools/` and change:
- The page title/description
- The system prompt
- The extra controls (if needed)

## Adding more blog posts
In `app/blog/[slug]/page.tsx`, add to the `posts` object.
Then add to the sitemap in `app/sitemap.ts`.

## Tech stack
- Next.js 15 (App Router)
- TypeScript
- Claude Haiku (claude-haiku-4-5-20251001) for tools — cheapest, fastest
- No database needed
- Deployable on Vercel free tier
