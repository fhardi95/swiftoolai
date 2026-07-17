export interface PromptFAQ {
  question: string;
  answer: string;
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string; // category slug
  model: string; // display model e.g. "ChatGPT", "Claude", "Any AI Model"
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  promptText: string;
  exampleInput?: string;
  exampleOutput?: string;
  tips: string[];
  faqs: PromptFAQ[];
  relatedTools?: string[]; // slugs under /tools/
  featured?: boolean;
  dateISO: string;
}

export interface PromptCategory {
  slug: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  { slug: "chatgpt", label: "ChatGPT", icon: "💬", color: "#10a37f", description: "Ready-to-use ChatGPT prompts for writing, research, and everyday tasks." },
  { slug: "claude", label: "Claude", icon: "🧠", color: "#d97757", description: "Prompts tuned for Claude's reasoning and long-form writing strengths." },
  { slug: "resume", label: "Resume & Career", icon: "💼", color: "#2563eb", description: "AI prompts for resumes, cover letters, LinkedIn, and job interviews." },
  { slug: "seo", label: "SEO", icon: "📈", color: "#16a34a", description: "Prompts for keyword research, content briefs, and on-page SEO." },
  { slug: "marketing", label: "Marketing", icon: "📣", color: "#ff6384", description: "Prompts for ad copy, email campaigns, and marketing strategy." },
  { slug: "coding", label: "Coding", icon: "💻", color: "#6c63ff", description: "Prompts for debugging, code review, and writing cleaner code faster." },
  { slug: "business", label: "Business", icon: "🏢", color: "#d97706", description: "Prompts for business plans, pitch decks, and strategy documents." },
  { slug: "social-media", label: "Social Media", icon: "📱", color: "#e1306c", description: "Prompts for Instagram, LinkedIn, and TikTok captions and content." },
];

function todayISO(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().split("T")[0];
}

export const PROMPTS: Prompt[] = [
  // ── ChatGPT ─────────────────────────────────────────────────────────────
  {
    id: "p001",
    slug: "chatgpt-resume-prompt",
    title: "ChatGPT Prompt to Write a Resume From Scratch",
    description: "A copy-paste ChatGPT prompt that turns your work history into a polished, ATS-friendly resume in one pass.",
    category: "chatgpt",
    model: "ChatGPT",
    tags: ["resume", "career", "job search"],
    difficulty: "Beginner",
    promptText: "Act as a professional resume writer with 15 years of experience in [INDUSTRY]. Using the work history and skills I provide below, write a one-page, ATS-friendly resume. Use strong action verbs, quantify achievements with numbers where possible, and keep bullet points under 20 words. Work history: [PASTE YOUR WORK HISTORY, JOB TITLES, DATES, AND KEY TASKS]. Target job title: [JOB TITLE]. Format the output with clear section headers: Summary, Experience, Skills, Education.",
    exampleInput: "Industry: digital marketing. Work history: Marketing Assistant at Bright Media (2022-2025), ran email campaigns, managed Instagram account, grew followers from 2k to 15k. Target job title: Social Media Manager.",
    exampleOutput: "A three-line professional summary followed by an Experience section with bullets like \"Grew Instagram following 650% (2K→15K) through a consistent content calendar and data-driven posting schedule,\" plus Skills and Education sections formatted for ATS parsing.",
    tips: [
      "Paste your raw, messy notes — ChatGPT does the polishing, you don't need to write full sentences first.",
      "Always ask for a second pass: \"Now rewrite the bullet points to be more concise.\"",
      "Run the output through an ATS checker before submitting to a real application.",
    ],
    faqs: [
      { question: "Will this resume pass ATS software?", answer: "The prompt is written to avoid tables, columns, and graphics that confuse ATS parsers, but you should still paste the final résumé into an ATS scanner to confirm formatting survives the specific platform you're applying through." },
      { question: "Can I use this for a career change?", answer: "Yes — add a line to the prompt such as \"I am transitioning from [OLD FIELD] to [NEW FIELD], emphasize transferable skills\" and ChatGPT will reframe your experience accordingly." },
    ],
    relatedTools: ["resume-bullet-writer", "cover-letter-generator"],
    featured: true,
    dateISO: todayISO(2),
  },
  {
    id: "p002",
    slug: "chatgpt-seo-blog-outline-prompt",
    title: "ChatGPT Prompt for SEO Blog Post Outlines",
    description: "Generate a complete, search-optimized blog outline with headers, keyword placement, and FAQ section in seconds.",
    category: "chatgpt",
    model: "ChatGPT",
    tags: ["seo", "blogging", "content"],
    difficulty: "Beginner",
    promptText: "Act as an SEO content strategist. Create a detailed blog post outline for the target keyword \"[KEYWORD]\". Include: a compelling H1 title under 60 characters, a meta description under 155 characters, 5-7 H2 sections with 2-3 H3 subpoints each, a suggested word count for each section, 3 related long-tail keywords to weave in naturally, and a 4-question FAQ section based on what people actually search for around this topic.",
    exampleInput: "Keyword: best AI tools for students",
    exampleOutput: "A structured outline with an H1 like \"12 Best AI Tools for Students in 2026 (Free & Paid)\", a meta description, H2 sections such as \"Best Free AI Tools\", \"AI Tools for Research\", \"AI Tools for Writing Essays\", each with word count targets, and an FAQ block addressing questions like \"Is ChatGPT free for students?\"",
    tips: [
      "Feed it your actual competitor's outline (paste headers only) and ask it to identify content gaps.",
      "Ask for the outline in a numbered list first, then request full paragraphs — don't skip straight to a finished article.",
      "Request schema markup suggestions (FAQPage, HowTo) as a final step for extra SEO value.",
    ],
    faqs: [
      { question: "Should I publish what ChatGPT writes directly?", answer: "Treat this as a strong first draft. Add your own examples, data, and voice before publishing — search engines increasingly reward genuinely original content over generic AI output." },
      { question: "How long should the target word count be?", answer: "For competitive keywords, aim for outlines that total 1,500-2,500 words; for long-tail, low-competition terms, 800-1,200 words is often sufficient." },
    ],
    relatedTools: ["ai-summarizer", "rewriter"],
    featured: true,
    dateISO: todayISO(3),
  },
  {
    id: "p003",
    slug: "chatgpt-cold-email-prompt",
    title: "ChatGPT Prompt for High-Converting Cold Emails",
    description: "A prompt that writes short, personalized cold outreach emails designed to get replies, not deletions.",
    category: "chatgpt",
    model: "ChatGPT",
    tags: ["email", "sales", "outreach"],
    difficulty: "Beginner",
    promptText: "Write a cold outreach email under 120 words. Sender role: [YOUR ROLE]. Recipient: [RECIPIENT ROLE/COMPANY]. Goal: [WHAT YOU WANT — e.g. book a 15-minute call]. Use this structure: 1) One specific, researched line showing you know their business, 2) One sentence stating the problem you solve, 3) One line of social proof or credibility, 4) A low-friction call to action (not \"let me know if interested\"). Avoid buzzwords like \"synergy\", \"circle back\", or \"reach out\". Tone: direct and human, not salesy.",
    exampleInput: "Sender role: freelance web developer. Recipient: owner of a local bakery with an outdated website. Goal: book a call to discuss a redesign.",
    exampleOutput: "A short email opening with a specific observation about the bakery's current site, one line connecting slow load times to lost online orders, a one-line credibility statement, and a low-friction close like \"Worth a 10-minute call this week?\"",
    tips: [
      "Give ChatGPT a real detail about the recipient (something from their website or LinkedIn) — generic openers get ignored.",
      "Ask for 3 subject line variations separately; test them rather than guessing.",
      "Request a shorter, 2-line follow-up version for email #2 in the sequence.",
    ],
    faqs: [
      { question: "How long should a cold email actually be?", answer: "Under 120 words performs best for first-touch outreach — busy recipients decide whether to reply within the first two sentences." },
      { question: "Can this prompt write a full sequence?", answer: "Yes, add \"write this as email 1 of a 3-email sequence, with emails 2 and 3 following up without repeating the same pitch\" to the end of the prompt." },
    ],
    relatedTools: ["cold-email-generator", "ai-email-writer"],
    dateISO: todayISO(5),
  },
  {
    id: "p004",
    slug: "chatgpt-explain-like-im-5-prompt",
    title: "ChatGPT Prompt to Explain Any Topic Simply",
    description: "Turn dense, technical, or academic material into a clear explanation anyone can understand.",
    category: "chatgpt",
    model: "ChatGPT",
    tags: ["learning", "study", "explanation"],
    difficulty: "Beginner",
    promptText: "Explain [TOPIC] in three levels of increasing complexity: Level 1 - explain it as if I'm completely new to the subject, using a simple analogy. Level 2 - explain it with the actual technical terms and mechanics, assuming I understood Level 1. Level 3 - explain the nuances, edge cases, or debates experts have about this topic. Keep each level under 120 words.",
    exampleInput: "Topic: how neural networks learn",
    exampleOutput: "Level 1 compares it to a child learning to recognize dogs by being shown thousands of photos and corrected when wrong. Level 2 introduces weights, backpropagation, and gradient descent. Level 3 touches on overfitting, vanishing gradients, and ongoing debates about interpretability.",
    tips: [
      "Use this before a job interview to quickly refresh on unfamiliar technical topics.",
      "Ask it to add a real-world example after each level for topics that feel abstract.",
      "For exam prep, follow up with \"now quiz me on Level 2\" to test retention.",
    ],
    faqs: [
      { question: "Does this work for any subject?", answer: "Yes — it works equally well for scientific concepts, legal terms, financial topics, or historical events; the three-tier structure adapts to whatever complexity the topic actually has." },
      { question: "Is the information always accurate?", answer: "ChatGPT can make mistakes on niche or fast-changing topics, so verify anything critical (medical, legal, financial) against a primary source before relying on it." },
    ],
    dateISO: todayISO(7),
  },

  // ── Claude ───────────────────────────────────────────────────────────────
  {
    id: "p005",
    slug: "claude-code-review-prompt",
    title: "Claude Prompt for Thorough Code Review",
    description: "Get a structured, senior-engineer-style code review from Claude, complete with severity ratings.",
    category: "claude",
    model: "Claude",
    tags: ["coding", "code review", "development"],
    difficulty: "Intermediate",
    promptText: "Review the following code as a senior engineer doing a pull request review. For each issue found, state: 1) the line or section, 2) the problem, 3) severity (Blocker / Should Fix / Nitpick), 4) a suggested fix. Also flag any security concerns, performance issues, and missing edge-case handling separately at the end. Do not rewrite the whole file — only show the specific fixes. Code: [PASTE CODE]",
    exampleInput: "A 40-line Node.js Express route handler that reads user input directly into a SQL query string.",
    exampleOutput: "A structured list flagging the raw string SQL query as a Blocker (SQL injection risk) with a parameterized query fix, a Should Fix note about missing input validation, and a Nitpick about inconsistent variable naming, followed by a separate Security Concerns section.",
    tips: [
      "Paste the surrounding function signatures too — Claude gives better feedback with context on how the code is called.",
      "Ask a follow-up: \"now show me only the Blocker-level fixes as a diff.\"",
      "For legacy code, add \"assume this cannot be fully rewritten, suggest minimal-risk patches only.\"",
    ],
    faqs: [
      { question: "What languages does this work for?", answer: "The prompt is language-agnostic and works well across JavaScript, TypeScript, Python, Go, and most mainstream languages — just paste the code and Claude adapts its review to the language's conventions." },
      { question: "Can Claude review an entire repository at once?", answer: "For very large codebases you'll get better results reviewing file-by-file or module-by-module rather than pasting everything at once, since more focused context produces more specific feedback." },
    ],
    relatedTools: ["ai-summarizer"],
    featured: true,
    dateISO: todayISO(1),
  },
  {
    id: "p006",
    slug: "claude-long-document-summary-prompt",
    title: "Claude Prompt to Summarize Long Documents Accurately",
    description: "A prompt designed for Claude's large context window to summarize long reports, contracts, or research papers without losing key details.",
    category: "claude",
    model: "Claude",
    tags: ["summarizing", "research", "documents"],
    difficulty: "Beginner",
    promptText: "Summarize the following document in three parts: 1) a 3-sentence executive summary, 2) a bulleted list of the 5-8 most important facts, figures, or decisions, organized by section, 3) a short list of anything ambiguous, missing, or that requires a human decision. Do not add information that isn't in the document. Document: [PASTE OR ATTACH DOCUMENT]",
    exampleInput: "A 12-page vendor contract with pricing tiers and termination clauses.",
    exampleOutput: "A three-sentence summary of the contract's purpose and term length, a bulleted breakdown of pricing tiers and the termination notice period, and a flagged note that the auto-renewal clause lacks a specified cap on price increases.",
    tips: [
      "Explicitly say \"do not add information that isn't in the document\" — this reduces the chance of Claude filling gaps with assumptions.",
      "For contracts, add \"flag any clause that is unusually one-sided or non-standard.\"",
      "Ask for page or section references next to each bullet so you can verify quickly.",
    ],
    faqs: [
      { question: "How long a document can Claude handle?", answer: "Claude supports very large context windows, so it can process long reports and multi-chapter documents in a single pass — for extremely long files, splitting into logical sections still tends to produce more precise summaries." },
      { question: "Is this safe for confidential documents?", answer: "Avoid pasting sensitive personal, financial, or legal data into any AI tool unless you've confirmed the platform's data handling policy meets your requirements." },
    ],
    dateISO: todayISO(4),
  },
  {
    id: "p007",
    slug: "claude-business-plan-prompt",
    title: "Claude Prompt to Draft a One-Page Business Plan",
    description: "Turn a rough business idea into a structured, investor-readable one-page plan.",
    category: "claude",
    model: "Claude",
    tags: ["business", "startup", "planning"],
    difficulty: "Intermediate",
    promptText: "Act as a startup advisor. Based on the idea below, draft a one-page business plan with these sections: Problem, Solution, Target Customer, Business Model (how it makes money), Competition (2-3 named alternatives and how this differs), Go-to-Market (first 3 concrete steps), and Key Risks (2-3 honest risks, not generic ones). Keep the entire plan under 500 words. Idea: [DESCRIBE YOUR IDEA IN 2-3 SENTENCES]",
    exampleInput: "Idea: a subscription box that sends woodworking beginners a new project kit with pre-cut wood and instructions each month.",
    exampleOutput: "A structured plan naming the Problem as beginners lacking tools/confidence to start, a Solution section describing the kit, a Target Customer of hobbyist adults 25-55, a Business Model of $35-45/month subscriptions, named competitors, and honest risks like shipping cost volatility and churn after the novelty wears off.",
    tips: [
      "Push back on generic output: ask \"make the Key Risks section brutally honest, not generic startup risks.\"",
      "Follow up with \"now write 3 investor pitch questions I should prepare for based on this plan.\"",
      "Use this as a thinking tool before committing money, not as a finished investor document.",
    ],
    faqs: [
      { question: "Can this replace a real business plan for investors?", answer: "This is best used as a fast first draft to clarify your own thinking; investors will expect financial projections and market sizing backed by real research beyond what an AI prompt can generate." },
      { question: "Does it work for service businesses, not just products?", answer: "Yes, the same structure works for agencies, consultancies, and SaaS ideas — just adjust the Business Model section to describe pricing (hourly, retainer, subscription, etc.)." },
    ],
    dateISO: todayISO(6),
  },
  {
    id: "p008",
    slug: "claude-difficult-conversation-prompt",
    title: "Claude Prompt to Prepare for a Difficult Work Conversation",
    description: "Rehearse a hard conversation — a raise negotiation, a conflict with a coworker, or delivering bad news — before you have it.",
    category: "claude",
    model: "Claude",
    tags: ["work", "communication", "management"],
    difficulty: "Beginner",
    promptText: "I need to have a difficult conversation. Context: [DESCRIBE THE SITUATION AND THE OTHER PERSON'S LIKELY PERSPECTIVE]. My goal: [WHAT OUTCOME YOU WANT]. Help me prepare by: 1) writing a calm opening line that states the issue without blame, 2) listing 2-3 likely pushbacks or reactions and how I could respond to each, 3) suggesting one thing I should NOT say, and why. Keep tone professional, not scripted or robotic.",
    exampleInput: "Context: asking my manager for a raise after taking on a teammate's workload for three months without a title change. My goal: a 10-15% salary increase or a clear path to promotion.",
    exampleOutput: "An opening line acknowledging appreciation for the opportunity while stating the expanded scope factually, two likely pushbacks (budget freeze, \"let's revisit next cycle\") with suggested responses, and a note not to compare salary to a specific coworker by name.",
    tips: [
      "Be honest about the other person's likely perspective in your input — vague context produces vague, unusable advice.",
      "Ask Claude to role-play the other person's response so you can practice your reply in the same conversation.",
      "Use this for personal conversations too, not just work — just adjust the tone request.",
    ],
    faqs: [
      { question: "Will this make me sound scripted?", answer: "Use the output as a mental framework rather than a script to read word-for-word — internalize the key points and let your own delivery stay natural." },
      { question: "Can I use this for conflict with a coworker instead of a manager?", answer: "Yes, the same three-part structure works for peer conflicts, client pushback, or even personal disagreements — just describe the relationship and context accurately." },
    ],
    dateISO: todayISO(8),
  },

  // ── Resume & Career ─────────────────────────────────────────────────────
  {
    id: "p009",
    slug: "ai-cover-letter-prompt",
    title: "AI Prompt to Write a Tailored Cover Letter",
    description: "Generate a cover letter that actually references the specific job posting instead of sounding generic.",
    category: "resume",
    model: "Any AI Model",
    tags: ["cover letter", "job search", "career"],
    difficulty: "Beginner",
    promptText: "Write a 250-word cover letter for the job posting below. Reference 2-3 specific requirements from the posting and connect them directly to my background. Avoid generic openers like \"I am excited to apply\". Start with a specific hook related to the company or role. End with a confident, non-desperate closing line. Job posting: [PASTE JOB DESCRIPTION]. My background: [PASTE YOUR RELEVANT EXPERIENCE/SKILLS]",
    exampleInput: "Job posting: Junior Data Analyst role requiring SQL, Excel, and Tableau experience at a healthcare startup. Background: completed a data analytics bootcamp, built 2 Tableau dashboards for a nonprofit as a volunteer project.",
    exampleOutput: "An opening hook referencing the company's healthcare mission, a middle paragraph connecting the volunteer Tableau dashboard project directly to the listed Tableau requirement, and a confident closing line requesting an interview rather than \"hope to hear from you.\"",
    tips: [
      "Paste the actual job posting, not a summary — specific requirement language helps the AI mirror keywords ATS systems look for.",
      "If you lack direct experience, ask it to \"emphasize transferable skills from [X] instead of direct experience.\"",
      "Always personalize the greeting — ask for the hiring manager's name if listed in the posting.",
    ],
    faqs: [
      { question: "Should every cover letter be different?", answer: "Yes — reusing one generic letter is the fastest way to get filtered out; this prompt is built specifically to pull unique details from each job posting so every letter is different." },
      { question: "How long should a cover letter be?", answer: "Around 200-300 words is the sweet spot; hiring managers typically spend under a minute reading it, so shorter and more specific beats longer and generic." },
    ],
    relatedTools: ["cover-letter-generator", "resume-bullet-writer"],
    featured: true,
    dateISO: todayISO(1),
  },
  {
    id: "p010",
    slug: "linkedin-headline-prompt",
    title: "AI Prompt to Write a LinkedIn Headline That Gets Views",
    description: "Turn your job title into a keyword-rich LinkedIn headline recruiters actually find in search.",
    category: "resume",
    model: "Any AI Model",
    tags: ["linkedin", "personal branding", "job search"],
    difficulty: "Beginner",
    promptText: "Write 5 LinkedIn headline options (under 220 characters each) for someone with this background: [JOB TITLE, KEY SKILLS, INDUSTRY, AND WHAT YOU'RE OPEN TO — e.g. 'open to new roles' or 'not looking']. Each headline should include: role/title, 2-3 relevant keywords a recruiter would search for, and a specific value or result. Avoid generic phrases like 'passionate about' or 'results-driven'.",
    exampleInput: "Job title: Social Media Manager. Skills: paid ads, content strategy, Instagram growth. Industry: e-commerce. Status: open to new roles.",
    exampleOutput: "Five headline variations such as \"Social Media Manager | Paid Ads & Organic Growth for E-Commerce Brands | Grew IG from 2K→15K | Open to New Roles\", each swapping emphasis between growth results, platform expertise, and industry focus.",
    tips: [
      "Include actual numbers from your resume — headlines with specific results outperform vague ones in recruiter search relevance.",
      "Test 2-3 versions over a few weeks and check your LinkedIn 'who viewed your profile' stats to see which performs best.",
      "Update the headline every time you gain a new measurable result.",
    ],
    faqs: [
      { question: "Does the LinkedIn headline actually affect search ranking?", answer: "Yes, LinkedIn's search algorithm weighs headline keywords heavily, so including terms recruiters actually search for (like specific tools or job titles) meaningfully affects how often you appear in results." },
      { question: "Should I mention that I'm job hunting?", answer: "That's a personal choice — some people add 'Open to Work' via LinkedIn's built-in feature instead of the headline itself, which signals to recruiters without necessarily being visible to your current employer, depending on your settings." },
    ],
    relatedTools: ["instagram-caption-generator", "bio-generator"],
    dateISO: todayISO(3),
  },
  {
    id: "p011",
    slug: "interview-prep-prompt",
    title: "AI Prompt to Practice Behavioral Interview Questions",
    description: "Turn ChatGPT or Claude into a mock interviewer that asks follow-ups and gives feedback using the STAR method.",
    category: "resume",
    model: "Any AI Model",
    tags: ["interview", "job search", "career"],
    difficulty: "Intermediate",
    promptText: "Act as a hiring manager interviewing me for a [JOB TITLE] role at a [COMPANY TYPE, e.g. mid-size SaaS company]. Ask me one behavioral interview question at a time. After I answer, give brief feedback using the STAR method (Situation, Task, Action, Result) — tell me what was missing or weak, then ask a natural follow-up question based on my answer, the way a real interviewer would. Start with the first question now.",
    exampleInput: "Job title: Project Manager. Company type: mid-size construction firm.",
    exampleOutput: "An opening question like \"Tell me about a time a project fell behind schedule — what did you do?\" followed, after the user's answer, by STAR-method feedback noting a missing quantified Result, then a natural follow-up such as \"What would you do differently next time?\"",
    tips: [
      "Answer as if you're actually in the interview — don't over-explain or add meta commentary, since that changes the quality of feedback you get.",
      "After 3-4 questions, ask \"summarize my weakest pattern across these answers\" to spot a recurring gap.",
      "Practice out loud, not just by typing, if you can — it changes how prepared you feel on the actual day.",
    ],
    faqs: [
      { question: "What is the STAR method?", answer: "STAR stands for Situation, Task, Action, Result — a structure for answering behavioral interview questions that ensures you give concrete context and a measurable outcome rather than a vague description." },
      { question: "Can this prepare me for technical interviews too?", answer: "This particular prompt is built for behavioral questions; for technical rounds, adjust it to ask for coding problems, system design questions, or role-specific technical scenarios instead." },
    ],
    relatedTools: ["resume-bullet-writer"],
    dateISO: todayISO(5),
  },
  {
    id: "p012",
    slug: "linkedin-post-career-update-prompt",
    title: "AI Prompt to Announce a New Job on LinkedIn",
    description: "Write a LinkedIn post announcing a new role that reads as genuine, not corporate-templated.",
    category: "resume",
    model: "Any AI Model",
    tags: ["linkedin", "networking", "career"],
    difficulty: "Beginner",
    promptText: "Write a LinkedIn post (120-180 words) announcing that I'm starting a new role. Details: [NEW TITLE, COMPANY, WHAT EXCITES YOU ABOUT IT, AND ONE PERSON/GROUP TO THANK]. Tone: genuinely excited but not over-the-top corporate. Avoid clichés like 'humbled and grateful' or 'excited to announce'. End with an open, low-pressure line inviting connection, not a hard call-to-action.",
    exampleInput: "New title: Product Marketing Manager at a mid-size fintech startup. Excited about: first PMM hire, building the function from scratch. Thank: former manager who championed my move into marketing.",
    exampleOutput: "A post opening with a specific, non-clichéd line about what building a function from zero actually means day-to-day, a genuine thank-you to the named mentor, and a closing line like \"If you're working on anything similar, I'd love to compare notes.\"",
    tips: [
      "Give it one real, specific detail (a person's name, a funny story from the interview process) — that's what makes posts feel human instead of templated.",
      "Ask for two length options: a short version and a longer story-format version.",
      "Post it yourself in your own words after using this as a starting draft — don't copy-paste verbatim.",
    ],
    faqs: [
      { question: "Do LinkedIn job announcement posts actually help your career?", answer: "They can meaningfully expand your network and visibility, since LinkedIn's algorithm tends to boost career-update posts and they often prompt useful reconnections with past colleagues and clients." },
      { question: "Should I thank my recruiter or hiring manager by name?", answer: "It's a nice touch if the relationship is genuine, but always ask the person first if they're comfortable being named publicly." },
    ],
    relatedTools: ["linkedin-post-generator"],
    dateISO: todayISO(9),
  },

  // ── SEO ──────────────────────────────────────────────────────────────────
  {
    id: "p013",
    slug: "keyword-clustering-prompt",
    title: "AI Prompt for Keyword Clustering by Search Intent",
    description: "Group a messy list of keywords into content clusters organized by what searchers actually want.",
    category: "seo",
    model: "Any AI Model",
    tags: ["seo", "keyword research", "content strategy"],
    difficulty: "Intermediate",
    promptText: "Group the following keywords into clusters based on search intent (informational, commercial, transactional, navigational). For each cluster, suggest: 1) one recommended page/URL to target it, 2) the primary keyword to optimize for, 3) which secondary keywords in the cluster can be covered as subheadings on the same page rather than needing separate pages. Keywords: [PASTE YOUR KEYWORD LIST]",
    exampleInput: "Keywords: best ai tools, ai tools free, ai tools for students, chatgpt vs claude, ai tools pricing, buy chatgpt plus",
    exampleOutput: "An Informational cluster (\"best ai tools\", \"ai tools for students\") mapped to a single pillar page, a Commercial cluster (\"chatgpt vs claude\", \"ai tools pricing\") mapped to a comparison page, and a Transactional cluster (\"buy chatgpt plus\") flagged as needing a dedicated landing page.",
    tips: [
      "Run this on your Google Search Console 'queries' export to find clusters you're already ranking for but haven't built dedicated pages around.",
      "Ask for a follow-up: \"which of these clusters has the highest commercial intent and should be prioritized first?\"",
      "Re-run this quarterly — search intent and keyword volume shift over time.",
    ],
    faqs: [
      { question: "Why does search intent matter more than keyword volume?", answer: "A high-volume keyword with the wrong intent (e.g. targeting a commercial page at an informational query) tends to rank poorly and convert poorly even if it gets clicks, so matching content type to intent is usually more valuable than volume alone." },
      { question: "How many keywords can I paste in at once?", answer: "Most AI models handle a few hundred keywords well in one pass; for very large lists (thousands of terms), split into batches by rough topic first for more accurate clustering." },
    ],
    featured: true,
    dateISO: todayISO(2),
  },
  {
    id: "p014",
    slug: "meta-description-prompt",
    title: "AI Prompt to Write High-CTR Meta Descriptions",
    description: "Generate meta descriptions under 155 characters designed to earn clicks, not just describe the page.",
    category: "seo",
    model: "Any AI Model",
    tags: ["seo", "meta description", "ctr"],
    difficulty: "Beginner",
    promptText: "Write 5 meta description options for a page targeting the keyword \"[KEYWORD]\". Each must be under 155 characters, include the target keyword naturally near the start, and include one clear reason to click (a number, a benefit, or urgency) without using clickbait or making false claims. Page topic: [1-2 SENTENCES ABOUT WHAT THE PAGE ACTUALLY COVERS]",
    exampleInput: "Keyword: free ai resume builder. Page topic: a free tool that generates resume bullet points from a job description.",
    exampleOutput: "Five variations such as \"Free AI resume builder: turn your job history into ATS-friendly bullet points in seconds. No sign-up required.\" — each testing a different lead-in (benefit-first, number-first, and urgency-based).",
    tips: [
      "Never let the AI invent claims your page doesn't actually deliver — false urgency or fake stats hurt trust and can trigger Google quality issues.",
      "Test different versions in Google Search Console over a few weeks and compare CTR before settling on one.",
      "Keep the target keyword within the first 120 characters — Google sometimes truncates on mobile.",
    ],
    faqs: [
      { question: "Does the meta description directly affect Google rankings?", answer: "It's not a direct ranking factor, but it strongly affects click-through rate from the search results page, and CTR is one of several signals that can indirectly influence performance over time." },
      { question: "What if Google rewrites my meta description anyway?", answer: "Google does sometimes generate its own snippet if it thinks a query-specific one serves users better — writing a strong, relevant description still improves the odds yours gets used." },
    ],
    dateISO: todayISO(4),
  },
  {
    id: "p015",
    slug: "content-gap-analysis-prompt",
    title: "AI Prompt for Competitor Content Gap Analysis",
    description: "Compare your page headers against a competitor's to find missing subtopics you should cover.",
    category: "seo",
    model: "Any AI Model",
    tags: ["seo", "competitor analysis", "content strategy"],
    difficulty: "Intermediate",
    promptText: "I'm going to give you the H2/H3 headers from my page and a competitor's page that both target the same keyword. Compare them and tell me: 1) which subtopics the competitor covers that I don't, 2) which subtopics I cover that they don't (my unique angle), 3) a recommended list of 3-5 new sections I should add, ranked by likely search value. My page headers: [PASTE]. Competitor headers: [PASTE]",
    exampleInput: "My headers: What is X, How X works, Pricing. Competitor headers: What is X, How X works, X vs alternatives, Pros and cons, FAQs, Pricing.",
    exampleOutput: "A gap list identifying \"X vs alternatives\", \"Pros and cons\", and \"FAQs\" as missing sections, ranked with \"X vs alternatives\" as highest priority since comparison queries tend to have strong commercial intent.",
    tips: [
      "Only paste the headers (H2s/H3s), not the full article text — this keeps the analysis focused on structure and coverage, not writing style.",
      "Do this for your top 3 competitors, not just one, to spot patterns that appear across multiple ranking pages.",
      "Don't copy a competitor's structure exactly — use the gaps as ideas, then write sections in your own voice with your own examples.",
    ],
    faqs: [
      { question: "Is copying a competitor's headers considered plagiarism?", answer: "Headers and topic structure aren't copyrightable in the way full sentences are, but the actual content you write under each header should always be original — this analysis identifies gaps in topic coverage, not text to copy." },
      { question: "How do I find a competitor's headers quickly?", answer: "You can view a page's source code (Ctrl+U or Cmd+Option+U) and search for H2 and H3 tags, or use any SEO browser extension that extracts a page's heading structure." },
    ],
    dateISO: todayISO(6),
  },
  {
    id: "p016",
    slug: "faq-schema-prompt",
    title: "AI Prompt to Generate FAQ Content for Schema Markup",
    description: "Generate genuinely useful FAQ pairs based on real search questions, formatted to drop straight into FAQPage schema.",
    category: "seo",
    model: "Any AI Model",
    tags: ["seo", "schema markup", "faq"],
    difficulty: "Beginner",
    promptText: "Generate 5 FAQ question-and-answer pairs for a page about \"[TOPIC]\". Base the questions on what people would realistically search on Google (use natural phrasing, not keyword-stuffed phrasing). Each answer should be 2-3 sentences, directly answer the question in the first sentence, and avoid restating the question. Do not invent statistics or claims that aren't generally known facts.",
    exampleInput: "Topic: using AI tools to write a resume",
    exampleOutput: "Pairs such as Q: \"Can I use ChatGPT to write my whole resume?\" A: \"Yes, but treat the output as a first draft — always verify factual details and add specific numbers only you know, since AI tools can't invent your actual achievements.\"",
    tips: [
      "Answer the question in the very first sentence — this is what gets pulled into Google's featured snippets and voice search results.",
      "Avoid yes/no-only answers; always add one supporting sentence for context.",
      "Wrap the output in FAQPage JSON-LD schema on your page, not just as visible text — both together maximize SEO value.",
    ],
    faqs: [
      { question: "Does FAQ schema still show in Google search results?", answer: "Google has scaled back how often FAQ rich results appear for most sites, generally reserving them for authoritative government and health sites, but the schema still helps search engines understand your content and can support other rich result types." },
      { question: "How many FAQs should one page have?", answer: "3-6 well-answered questions tend to work better than a long list of 15+ thin questions — depth and genuine usefulness matter more than quantity." },
    ],
    dateISO: todayISO(10),
  },

  // ── Marketing ────────────────────────────────────────────────────────────
  {
    id: "p017",
    slug: "facebook-ad-copy-prompt",
    title: "AI Prompt for Facebook Ad Copy That Converts",
    description: "Generate multiple ad copy variations built around a proven hook-problem-solution structure.",
    category: "marketing",
    model: "Any AI Model",
    tags: ["ads", "facebook ads", "copywriting"],
    difficulty: "Beginner",
    promptText: "Write 3 Facebook ad copy variations for [PRODUCT/SERVICE]. Target audience: [DESCRIBE AUDIENCE]. Each ad must include: a scroll-stopping first line (a question, bold claim, or specific pain point), 2-3 sentences connecting the problem to the solution, one line of social proof or specificity (numbers, timeframe, guarantee), and a clear call-to-action. Keep each ad under 90 words. Vary the angle across the 3 (e.g. pain-point-led, curiosity-led, result-led).",
    exampleInput: "Product: a $19/month subscription box of woodworking project kits. Audience: beginner hobbyists aged 30-55 who want a creative hands-on hobby but don't own tools.",
    exampleOutput: "Ad 1 opens with a pain-point hook (\"Bought a Pinterest-worthy toolbox and never used it?\"), Ad 2 opens with curiosity (\"The $19 box that turns Sunday afternoons into finished projects\"), Ad 3 leads with a result (\"3,000+ beginners built their first project in one weekend\") — each ending with a clear CTA like \"Get your first box →\".",
    tips: [
      "Give the AI real customer language if you have it — actual reviews or support messages produce far more authentic hooks than generic descriptions.",
      "Test the 3 angles against each other with a small ad budget before scaling spend on any one.",
      "Ask for a 4th variation specifically for retargeting an audience that already visited your site but didn't buy.",
    ],
    faqs: [
      { question: "How long should Facebook ad copy be?", answer: "Shorter, scannable copy (under 90-125 words) generally performs better in feed placements, since most people are scrolling quickly and decide whether to engage within the first line or two." },
      { question: "Should every ad have a discount or offer?", answer: "Not necessarily — social proof, urgency, or a strong guarantee can be just as effective as a discount, and relying only on discounts can train an audience to wait for sales before buying." },
    ],
    dateISO: todayISO(1),
  },
  {
    id: "p018",
    slug: "email-newsletter-prompt",
    title: "AI Prompt to Write an Engaging Email Newsletter",
    description: "Write a newsletter that reads like a note from a person, not a corporate broadcast.",
    category: "marketing",
    model: "Any AI Model",
    tags: ["email marketing", "newsletter", "copywriting"],
    difficulty: "Beginner",
    promptText: "Write an email newsletter (250-350 words) for [BUSINESS/NICHE]. This week's topic: [TOPIC]. Structure: 1) a personal, conversational opening line (not \"Hi everyone\"), 2) the main content delivering genuine value on the topic, 3) one soft product/content mention woven naturally into the value (not a hard sales pitch), 4) a single clear next step. Write in first person, casual but credible tone. Subject line: give 3 options under 50 characters.",
    exampleInput: "Business: a woodworking tips newsletter. Topic: how to choose the right wood for a first project.",
    exampleOutput: "An opening line like \"I ruined my first project by picking the wrong wood — here's what I wish someone had told me,\" followed by genuinely useful wood-selection advice, a soft mention of a linked beginner project kit, and a single CTA to read the full guide.",
    tips: [
      "Give it a real personal detail or mistake to open with — vulnerability and specificity consistently outperform generic greetings in open rates.",
      "Keep the sales mention to one sentence maximum in a value-first newsletter — readers unsubscribe fast from newsletters that feel like ads.",
      "Ask for a P.S. line separately — P.S. lines are read almost as often as the subject line and are great for a secondary CTA.",
    ],
    faqs: [
      { question: "How often should a newsletter be sent?", answer: "Consistency matters more than frequency — weekly or biweekly tends to work well for most niches, but the right cadence depends on how much genuinely valuable content you can sustain without padding." },
      { question: "What subject line length gets the best open rates?", answer: "Under 50 characters is a safe target since it displays fully on both desktop and mobile inboxes, though curiosity and relevance to the reader matter more than length alone." },
    ],
    relatedTools: ["ai-email-writer"],
    dateISO: todayISO(3),
  },
  {
    id: "p019",
    slug: "product-description-prompt",
    title: "AI Prompt for E-Commerce Product Descriptions",
    description: "Write product descriptions that sell benefits, not just list specs.",
    category: "marketing",
    model: "Any AI Model",
    tags: ["ecommerce", "copywriting", "product listing"],
    difficulty: "Beginner",
    promptText: "Write a product description (100-150 words) for [PRODUCT NAME]. Specs/features: [LIST RAW SPECS]. Structure: 1) one sentence hook focused on the main benefit, not the product category, 2) 3-4 bullet points translating each spec into a customer benefit (\"X so that Y\"), 3) one line addressing a likely hesitation or objection, 4) a short closing line. Tone: [e.g. premium/minimal, playful, technical] to match the brand.",
    exampleInput: "Product: Ice roller facial tool. Specs: stainless steel roller ball, ergonomic handle, reusable, fits in fridge. Tone: clean, minimal, skincare-brand voice.",
    exampleOutput: "A hook like \"Five minutes with this roller and your morning puffiness has nowhere to hide,\" bullets translating \"stainless steel\" into \"holds cold longer for a deeper de-puffing effect,\" an objection-handling line about ease of cleaning, and a short closing line.",
    tips: [
      "Always translate specs into benefits — \"stainless steel\" alone means nothing to a shopper; \"holds cold 3x longer\" does.",
      "Address the #1 hesitation directly (shipping time, durability, sizing) rather than ignoring it — this often reduces returns and support questions.",
      "Keep brand tone consistent by pasting 1-2 examples of your existing copy into the prompt for the AI to match style against.",
    ],
    faqs: [
      { question: "Should product descriptions include SEO keywords?", answer: "Yes, naturally — include the primary search term a customer would use for the product once or twice, but prioritize readability and persuasion over keyword density, since a description that reads like a stuffed keyword list converts worse." },
      { question: "How long should a product description be?", answer: "100-150 words works well for most e-commerce listings — enough to cover benefits and handle objections without overwhelming a shopper who's scanning on mobile." },
    ],
    dateISO: todayISO(7),
  },

  // ── Coding ───────────────────────────────────────────────────────────────
  {
    id: "p020",
    slug: "debug-error-message-prompt",
    title: "AI Prompt to Debug an Error Message Fast",
    description: "Stop pasting errors with no context — this prompt gets you a root-cause diagnosis, not just a generic fix.",
    category: "coding",
    model: "Any AI Model",
    tags: ["debugging", "coding", "development"],
    difficulty: "Beginner",
    promptText: "I'm getting this error: [PASTE FULL ERROR MESSAGE AND STACK TRACE]. Here's the relevant code: [PASTE CODE]. Context: I'm using [LANGUAGE/FRAMEWORK/VERSION], and this started happening after [WHAT CHANGED, if known]. Explain: 1) the most likely root cause in plain English, 2) the specific fix, 3) one thing I could check if this fix doesn't resolve it. Don't rewrite unrelated code.",
    exampleInput: "Error: TypeError: Cannot read properties of undefined (reading 'map'). Code: a React component mapping over a props.items array. Context: Next.js 14, started after adding a loading state.",
    exampleOutput: "A root-cause explanation that props.items is likely undefined during the initial render before data loads, a fix adding a default empty array or a loading guard before the .map() call, and a suggestion to check whether the parent component's fetch is actually resolving before render.",
    tips: [
      "Always include the full stack trace, not just the top error line — the file and line number it points to is often the fastest path to the real cause.",
      "Mention what changed recently — \"this started after I added X\" narrows the diagnosis dramatically compared to no context.",
      "If the first fix doesn't work, paste the new error back rather than starting a new conversation — context carries over and speeds up debugging.",
    ],
    faqs: [
      { question: "Why does context about recent changes matter so much?", answer: "Most bugs are introduced by a specific recent change rather than being random, so telling the AI what changed narrows the search space dramatically compared to analyzing the error in isolation." },
      { question: "Should I paste my entire codebase for context?", answer: "No — paste only the relevant function, component, or file plus its immediate dependencies; too much irrelevant code can dilute the AI's focus on the actual bug." },
    ],
    dateISO: todayISO(2),
  },
  {
    id: "p021",
    slug: "refactor-code-prompt",
    title: "AI Prompt to Refactor Messy Code Without Breaking It",
    description: "Clean up working-but-messy code while preserving exact behavior — with an explanation of every change.",
    category: "coding",
    model: "Any AI Model",
    tags: ["refactoring", "clean code", "coding"],
    difficulty: "Intermediate",
    promptText: "Refactor the following code for readability and maintainability without changing its external behavior. Requirements: 1) keep function signatures the same unless I say otherwise, 2) list every change you made and why, in bullet points, above the code, 3) flag anything you're unsure preserves the original behavior exactly, rather than silently guessing. Code: [PASTE CODE]",
    exampleInput: "A 60-line function with deeply nested if/else blocks, repeated logic, and unclear variable names like 'x' and 'temp'.",
    exampleOutput: "A bulleted change list (\"Extracted repeated validation logic into a helper function\", \"Renamed 'x' to 'userInputValid' for clarity\", \"Flattened nested if/else into early returns\") followed by the refactored code, with one flagged note about an edge case in the original that wasn't fully clear.",
    tips: [
      "Always ask it to list changes before the code — this makes it much faster to spot-check that nothing behavioral actually changed.",
      "Run your existing tests (or write quick ones first) before and after refactoring to confirm behavior is identical.",
      "For large files, refactor one function or module at a time rather than the whole file at once.",
    ],
    faqs: [
      { question: "Can AI refactoring introduce new bugs?", answer: "Yes, which is why the prompt explicitly asks the AI to flag anything it's unsure about — always run tests or manually verify behavior after any AI-assisted refactor before deploying." },
      { question: "Is refactoring different from rewriting?", answer: "Refactoring means changing the internal structure of code while keeping its external behavior identical, whereas rewriting can change what the code actually does — this prompt is specifically scoped to refactoring only." },
    ],
    dateISO: todayISO(5),
  },
  {
    id: "p022",
    slug: "unit-test-generator-prompt",
    title: "AI Prompt to Generate Unit Tests for a Function",
    description: "Generate a solid set of unit tests covering normal cases, edge cases, and failure cases.",
    category: "coding",
    model: "Any AI Model",
    tags: ["testing", "unit tests", "coding"],
    difficulty: "Intermediate",
    promptText: "Write unit tests for the following function using [TESTING FRAMEWORK, e.g. Jest, pytest]. Cover: 1) the normal/expected use case, 2) at least 2 edge cases (empty input, boundary values, unusual but valid input), 3) at least 1 failure case (invalid input, error handling). For each test, add a one-line comment explaining what it verifies. Function: [PASTE FUNCTION AND ITS SIGNATURE/TYPES]",
    exampleInput: "A TypeScript function calculateDiscount(price: number, percent: number): number using Jest.",
    exampleOutput: "A test suite with a normal case (20% off $100 = $80), edge cases (0% discount, 100% discount, price of 0), and a failure case testing that a negative percent throws or returns a defined error, each with an explanatory comment.",
    tips: [
      "Include the function's type signatures if using TypeScript — this helps the AI generate tests that actually match your expected input/output types.",
      "Explicitly ask for edge cases — without prompting, AI models often default to only the happy path.",
      "Run the generated tests immediately; treat any that fail unexpectedly as a signal to review the function's actual behavior, not just the test.",
    ],
    faqs: [
      { question: "Do AI-generated tests replace manual QA?", answer: "No — they're a strong starting point for coverage, especially for edge cases developers often skip, but manual and integration testing are still important for catching issues unit tests can't reach." },
      { question: "Which testing frameworks does this work with?", answer: "This prompt works with any framework — Jest, Vitest, pytest, JUnit, RSpec, and others — just specify the framework and the AI will match its syntax and conventions." },
    ],
    dateISO: todayISO(8),
  },

  // ── Business ─────────────────────────────────────────────────────────────
  {
    id: "p023",
    slug: "swot-analysis-prompt",
    title: "AI Prompt to Generate a SWOT Analysis",
    description: "Get a genuinely specific SWOT analysis instead of generic, one-size-fits-all business advice.",
    category: "business",
    model: "Any AI Model",
    tags: ["strategy", "swot", "planning"],
    difficulty: "Beginner",
    promptText: "Create a SWOT analysis for this business: [DESCRIBE THE BUSINESS, ITS MARKET, AND CURRENT SITUATION IN 3-4 SENTENCES]. For each of the 4 quadrants (Strengths, Weaknesses, Opportunities, Threats), give 3-4 specific points — not generic business advice. Each point should be something that is actually true or plausible for THIS business, not a template answer that could apply to any company. After the SWOT, give one specific recommended action based on the analysis.",
    exampleInput: "Business: a solo-run print-on-demand Etsy shop selling woodworking-themed merch, competing against larger multi-niche POD sellers, currently getting traffic mostly from Pinterest.",
    exampleOutput: "Strengths noting niche focus and authentic community credibility; Weaknesses noting single-founder bandwidth and reliance on one traffic source; Opportunities noting untapped Instagram/TikTok audiences; Threats noting Etsy fee changes and larger sellers undercutting on price — followed by one recommendation to diversify traffic beyond Pinterest first.",
    tips: [
      "Give real, specific details about your situation — the more specific your input, the less generic the output will be.",
      "Push back if any point feels generic: \"that Weakness applies to every small business, give me something specific to my situation.\"",
      "Use the single recommended action as a starting point, not a full strategy — ask a follow-up to expand on it if it's useful.",
    ],
    faqs: [
      { question: "What's the difference between Weaknesses and Threats?", answer: "Weaknesses are internal factors within your control (e.g. limited budget, skill gaps), while Threats are external factors outside your control (e.g. new competitors, platform policy changes) — this distinction matters for deciding what you can actually act on directly." },
      { question: "How often should a SWOT analysis be redone?", answer: "Revisiting it every 6-12 months, or after a major market or business change, keeps it useful — a SWOT done once and never revisited tends to go stale quickly." },
    ],
    dateISO: todayISO(4),
  },
  {
    id: "p024",
    slug: "pricing-strategy-prompt",
    title: "AI Prompt to Think Through a Pricing Strategy",
    description: "Work through pricing options and trade-offs for a product or service before committing to a number.",
    category: "business",
    model: "Any AI Model",
    tags: ["pricing", "strategy", "business"],
    difficulty: "Intermediate",
    promptText: "Act as a pricing strategy advisor. My product/service: [DESCRIBE IT]. My costs: [ROUGH COST TO DELIVER, IF KNOWN]. My competitors charge: [COMPETITOR PRICE RANGE, IF KNOWN]. Walk me through: 1) 2-3 plausible pricing models for this specific offer (e.g. flat fee, tiered, usage-based) and which fits best given what I've described, 2) the trade-offs of pricing above vs. below the competitor range, 3) one specific number or range to consider as a starting point, with the reasoning behind it. Be direct, not vague.",
    exampleInput: "Product: an AI SaaS tool with 29 tools, freemium model. Costs: mostly API costs per usage, low fixed cost. Competitors charge: $9-29/month for similar tool bundles.",
    exampleOutput: "A recommendation for a tiered model (free tier with usage caps + paid tier) given the variable API cost structure, trade-off analysis noting that pricing below $9 undercuts perceived value without meaningfully increasing conversion, and a suggested starting range of $12-19/month with reasoning tied to API cost margins.",
    tips: [
      "Give real cost and competitor numbers if you have them — vague inputs produce vague, unusable pricing advice.",
      "Ask a follow-up: \"what would make customers willing to pay 20% more than this?\" to explore value-based pricing angles.",
      "Treat the output as a hypothesis to test, not a final answer — actual customer willingness to pay is best validated with real data.",
    ],
    faqs: [
      { question: "Should I always price below competitors to win customers?", answer: "Not necessarily — pricing significantly below competitors can signal lower quality and attract price-sensitive customers who churn easily; competing on differentiated value often works better than competing purely on price." },
      { question: "What's the difference between cost-based and value-based pricing?", answer: "Cost-based pricing starts from what it costs you to deliver plus a margin, while value-based pricing starts from what the outcome is worth to the customer — value-based pricing often allows for higher margins if the value is clearly communicated." },
    ],
    dateISO: todayISO(9),
  },

  // ── Social Media ─────────────────────────────────────────────────────────
  {
    id: "p025",
    slug: "instagram-caption-prompt",
    title: "AI Prompt for Instagram Captions That Get Engagement",
    description: "Generate captions built around a hook and a question, designed to earn comments, not just likes.",
    category: "social-media",
    model: "Any AI Model",
    tags: ["instagram", "captions", "social media"],
    difficulty: "Beginner",
    promptText: "Write 3 Instagram caption options for this post: [DESCRIBE THE PHOTO/VIDEO CONTENT]. Each caption should: 1) open with a hook line that works even if the rest is cut off in the feed, 2) be 2-4 sentences of genuine value, story, or personality (not just describing the photo), 3) end with a specific question to drive comments, not a generic \"thoughts?\". Also suggest 8-10 relevant, non-spammy hashtags separately. Tone: [YOUR BRAND VOICE — e.g. casual, funny, motivational]",
    exampleInput: "Content: a photo of a finished beginner woodworking project (a small shelf). Tone: encouraging, casual.",
    exampleOutput: "A caption opening with \"My first-ever woodworking project also took me 3 tries and one very crooked shelf,\" a short story about the learning process, and a closing question like \"What's the first thing you ever built (or attempted)?\" — plus a separate hashtag list mixing niche and broader terms.",
    tips: [
      "Describe the actual content specifically — vague descriptions produce generic captions that could apply to any photo.",
      "Always end with a specific question, not \"thoughts?\" or \"let me know!\" — specificity is what actually drives comments.",
      "Save hashtags separately from the caption and rotate sets to avoid looking spammy or repetitive to the algorithm.",
    ],
    faqs: [
      { question: "How many hashtags should an Instagram post use?", answer: "8-15 relevant, specific hashtags tends to work better than the maximum 30 — quality and relevance to your actual niche matters more than quantity, and overly broad hashtags rarely help visibility." },
      { question: "Does asking a question in captions actually increase engagement?", answer: "Yes, specific, easy-to-answer questions consistently generate more comments than generic prompts, and Instagram's algorithm tends to favor posts with higher comment engagement in distribution." },
    ],
    relatedTools: ["instagram-caption-generator"],
    featured: true,
    dateISO: todayISO(1),
  },
  {
    id: "p026",
    slug: "linkedin-thought-leadership-prompt",
    title: "AI Prompt for LinkedIn Thought Leadership Posts",
    description: "Turn a work lesson or opinion into a LinkedIn post that reads as genuine expertise, not generic advice.",
    category: "social-media",
    model: "Any AI Model",
    tags: ["linkedin", "thought leadership", "personal branding"],
    difficulty: "Intermediate",
    promptText: "Write a LinkedIn post (150-250 words) based on this idea: [YOUR OPINION, LESSON LEARNED, OR OBSERVATION FROM WORK]. Structure: 1) a specific, concrete opening line — a moment, mistake, or observation, not a general statement, 2) the actual insight or lesson, explained clearly, 3) why it matters or what to do differently. Avoid generic LinkedIn clichés (\"here's the thing\", \"unpopular opinion\", excessive line breaks for dramatic effect). Write like a real person sharing something they actually learned.",
    exampleInput: "Opinion: most freelancers undercharge because they price based on time, not the value/outcome delivered to the client.",
    exampleOutput: "A post opening with a specific memory (\"I once spent 3 hours on a logo a client said was worth $50 to them — and I believed them\"), an explanation of value-based vs. time-based pricing, and a closing point about how reframing the conversation around outcomes changed actual rates charged.",
    tips: [
      "Give it a real, specific memory or example — the more concrete the opening, the less it reads like generic AI-generated advice.",
      "Explicitly ask it to avoid current LinkedIn clichés — these formulas get overused and readers increasingly recognize and skip them.",
      "Edit the final output in your own voice — thought leadership posts perform best when they sound authentically like the person posting them.",
    ],
    faqs: [
      { question: "Why do generic LinkedIn posts tend to underperform?", answer: "As certain formulas (short punchy lines, 'unpopular opinion' openers) became widely used, audiences grew fatigued with them, so posts with a genuinely specific, concrete story tend to stand out more than ones following a recognizable template." },
      { question: "How long should a LinkedIn thought leadership post be?", answer: "150-250 words tends to perform well — long enough to deliver a real insight, short enough that it doesn't require a 'see more' click to get the value." },
    ],
    relatedTools: ["linkedin-post-generator"],
    dateISO: todayISO(6),
  },
  {
    id: "p027",
    slug: "tiktok-video-script-prompt",
    title: "AI Prompt to Script a Short-Form Video",
    description: "Structure a TikTok, Reel, or Short around a proven hook-value-CTA framework in under 60 seconds.",
    category: "social-media",
    model: "Any AI Model",
    tags: ["tiktok", "video script", "short form video"],
    difficulty: "Beginner",
    promptText: "Write a 45-60 second video script for [PLATFORM] about [TOPIC]. Structure: 1) a hook for the first 2 seconds that stops the scroll (a question, bold claim, or visual promise — write exactly what to say), 2) 3-4 short beats delivering the actual value, each a single sentence, written to be spoken not read, 3) a natural closing line with a soft call-to-action. Include suggested on-screen text for each beat in brackets. Keep sentences short — this is spoken, not written, content.",
    exampleInput: "Platform: TikTok. Topic: 3 free AI tools people don't know about for writing.",
    exampleOutput: "A hook line like \"You're paying for ChatGPT Plus and don't even know these 3 tools are free\" with on-screen text [FREE AI TOOLS], followed by three quick beats each naming a tool and its use case, closing with \"Follow for more free AI tools no one talks about.\"",
    tips: [
      "The first 2 seconds matter more than the rest of the script combined — spend the most iteration effort on the hook line specifically.",
      "Read the script out loud before filming — written sentences often sound stiff or unnatural when spoken.",
      "Ask for 3 different hook options for the same script so you can test which stops the scroll best.",
    ],
    faqs: [
      { question: "How important is the first few seconds of a short-form video?", answer: "Extremely — most platforms show completion rate and early drop-off as major ranking signals, so a weak first 2-3 seconds can tank a video's reach regardless of how good the rest of the content is." },
      { question: "Should every video end with a call-to-action?", answer: "A soft CTA (follow, comment, save) tends to work better than a hard sell in short-form content — the primary goal of most short-form videos is watch time and shares, with conversion happening over a longer relationship." },
    ],
    dateISO: todayISO(10),
  },
];

export function getPromptsByCategory(categorySlug: string): Prompt[] {
  return PROMPTS.filter((p) => p.category === categorySlug);
}

export function getFeaturedPrompts(): Prompt[] {
  return PROMPTS.filter((p) => p.featured);
}

export function getRelatedPrompts(prompt: Prompt, limit = 3): Prompt[] {
  const sameCategory = PROMPTS.filter(
    (p) => p.id !== prompt.id && p.category === prompt.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const sharedTag = PROMPTS.filter(
    (p) =>
      p.id !== prompt.id &&
      p.category !== prompt.category &&
      p.tags.some((t) => prompt.tags.includes(t))
  );
  return [...sameCategory, ...sharedTag].slice(0, limit);
}

export function getCategoryBySlug(slug: string): PromptCategory | undefined {
  return PROMPT_CATEGORIES.find((c) => c.slug === slug);
}
