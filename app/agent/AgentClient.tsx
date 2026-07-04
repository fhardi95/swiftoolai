"use client";
import { useState, useRef, useEffect } from "react";

type TaskType = "auto_publish" | "write_article" | "keywords" | "seo_audit" | "content_calendar" | "meta_tags";
type PublishStatus = "idle" | "publishing" | "success" | "error";

interface ParsedPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  categoryColor: string;
  readTime: string;
  icon: string;
  author: string;
  featured: boolean;
  content: unknown[];
}

interface AgentMessage {
  role: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  task?: TaskType;
  parsedPost?: ParsedPost | null;
  codeBlock?: string;
}

interface Task {
  id: TaskType;
  label: string;
  icon: string;
  description: string;
  prompt: string;
  color: string;
}

const TASKS: Task[] = [
  {
    id: "write_article",
    label: "Write SEO Article",
    icon: "✍️",
    description: "Generate a full article ready to publish",
    color: "#6c63ff",
    prompt: "Write a new SEO-optimised article for swiftoolai.com. Choose the highest-traffic AI writing topic not yet covered. Output ONLY valid JSON matching the BlogPost format. Use today's date.",
  },
  {
    id: "keywords",
    label: "Keyword Research",
    icon: "🔍",
    description: "Find the best keywords to target",
    color: "#facc15",
    prompt: "Do keyword research for swiftoolai.com. Find 15 high-traffic, low-competition AI writing tool search queries. Group by intent and difficulty. Format as a markdown table.",
  },
  {
    id: "seo_audit",
    label: "SEO Audit",
    icon: "📊",
    description: "Get a prioritised SEO improvement plan",
    color: "#ff6384",
    prompt: "Perform a detailed SEO audit for swiftoolai.com. Pages: /, /blog, /tools/rewriter, /tools/bio-generator, /tools/grammar-checker. Give a prioritised action list: Quick Wins (this week), Medium Term (this month), Long Term (3+ months). Be specific.",
  },
  {
    id: "content_calendar",
    label: "Content Calendar",
    icon: "📅",
    description: "Generate a 30-day publishing schedule",
    color: "#a855f7",
    prompt: "Create a 30-day content calendar for swiftoolai.com targeting high Google traffic. For each article: title, target keyword, monthly search volume, competition level, publish date. Format as a markdown table.",
  },
  {
    id: "meta_tags",
    label: "Generate Meta Tags",
    icon: "🏷️",
    description: "Optimised title & description for all pages",
    color: "#4ade80",
    prompt: "Generate optimised SEO meta tags for all pages on swiftoolai.com: home, /blog, /tools/rewriter, /tools/bio-generator, /tools/grammar-checker. Title max 60 chars, meta description max 155 chars. Format as a markdown table.",
  },
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

function tryParsePost(text: string): ParsedPost | null {
  try {
    const stripped = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const match = stripped.match(/\{[\s\S]*"slug"[\s\S]*"content"[\s\S]*\}/);
    if (!match) return null;
    const obj = JSON.parse(match[0]);
    if (obj.slug && obj.title && Array.isArray(obj.content)) return obj as ParsedPost;
    return null;
  } catch { return null; }
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AgentClient() {
  const [messages, setMessages] = useState<AgentMessage[]>([{
    role: "system",
    content: "⚡ SwiftToolAI Content Agent is online.\n\nI can write SEO articles and publish them directly to your site. Pick a task or type a custom instruction.",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [publishStatus, setPublishStatus] = useState<Record<number, PublishStatus>>({});
  const [publishResult, setPublishResult] = useState<Record<number, string>>({});
  const [articleCount, setArticleCount] = useState(0);
  const [autoPublishing, setAutoPublishing] = useState(false);
  const [autoLog, setAutoLog] = useState<string[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const AGENT_SECRET = process.env.NEXT_PUBLIC_AGENT_SECRET || "";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, autoLog]);

  useEffect(() => {
    fetch("/api/publish", { headers: { "x-agent-secret": AGENT_SECRET } })
      .then(r => r.json())
      .then(d => { if (d.count) setArticleCount(d.count); })
      .catch(() => {});
  }, []);

  async function autoPublish() {
    if (autoPublishing || loading) return;
    setAutoPublishing(true);
    setAutoLog([]);

    const addLog = (msg: string) => setAutoLog(prev => [...prev, msg]);
    const now = new Date();
    const monthYear = now.toLocaleString("en-GB", { month: "long", year: "numeric" });

    const topics = [
      `Best free AI writing tools ${now.getFullYear()} — complete guide`,
      `How to use AI to write blog posts that rank on Google ${now.getFullYear()}`,
      `ChatGPT vs Claude vs Gemini — which AI is best ${now.getFullYear()}`,
    ];

    for (let i = 0; i < 3; i++) {
      addLog(`📝 Article ${i + 1}/3: Generating...`);
      try {
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 6000,
            system: ARTICLE_SYSTEM_PROMPT,
            messages: [{ role: "user", content: `Write a complete SEO article for swiftoolai.com about: ${topics[i]}. Date: ${monthYear}. Output ONLY raw JSON.` }],
          }),
        });

        const data = await res.json();
        const text = data.content?.filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n") ?? "";
        const post = tryParsePost(text);

        if (!post) { addLog(`⚠️ Article ${i + 1} — JSON parse failed.`); continue; }

        addLog(`✅ Generated: "${post.title}" — publishing...`);

        const pubRes = await fetch("/api/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-agent-secret": AGENT_SECRET },
          body: JSON.stringify({ post }),
        });

        const pubData = await pubRes.json();
        if (!pubRes.ok) {
          addLog(`⚠️ Publish failed: ${pubData.error}`);
        } else {
          addLog(`🚀 Published! → swiftoolai.com/blog/${post.slug}`);
          setArticleCount(c => c + 1);
        }
      } catch (err) {
        addLog(`❌ Error: ${String(err)}`);
      }

      if (i < 2) {
        addLog("⏳ Waiting 15 seconds...");
        await new Promise(r => setTimeout(r, 15000));
      }
    }
    addLog("🎉 Done! Vercel is deploying now (~2 min).");
    setAutoPublishing(false);
  }

  async function sendMessage(userText: string, task?: TaskType) {
    if (!userText.trim() || loading) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: userText, timestamp: new Date(), task }]);
    setInput("");

    const newHistory = [...history, { role: "user", content: userText }];

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 6000, system: ARTICLE_SYSTEM_PROMPT, messages: newHistory }),
      });

      const data = await res.json();
      const text = data.content?.filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n") ?? "No response.";
      const parsedPost = tryParsePost(text);

      setMessages(prev => [...prev, {
        role: "agent",
        content: parsedPost ? `✅ Article generated: **${parsedPost.title}**\n\nClick Publish Now to push it live.` : text,
        timestamp: new Date(),
        parsedPost,
        codeBlock: !parsedPost && text.includes("```") ? text : undefined,
      }]);
      setHistory([...newHistory, { role: "assistant", content: text }]);
    } catch {
      setMessages(prev => [...prev, { role: "agent", content: "⚠️ Error connecting to AI. Please check your API key.", timestamp: new Date() }]);
    }
    setLoading(false);
  }

  async function publishPost(msgIdx: number, post: ParsedPost) {
    setPublishStatus(prev => ({ ...prev, [msgIdx]: "publishing" }));
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-agent-secret": AGENT_SECRET },
        body: JSON.stringify({ post }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishStatus(prev => ({ ...prev, [msgIdx]: "error" }));
        setPublishResult(prev => ({ ...prev, [msgIdx]: data.error || "Unknown error" }));
        return;
      }
      setPublishStatus(prev => ({ ...prev, [msgIdx]: "success" }));
      setPublishResult(prev => ({ ...prev, [msgIdx]: `🚀 Published! Live at swiftoolai.com/blog/${data.slug}` }));
      setArticleCount(c => c + 1);
    } catch {
      setPublishStatus(prev => ({ ...prev, [msgIdx]: "error" }));
      setPublishResult(prev => ({ ...prev, [msgIdx]: "Network error" }));
    }
  }

  const S = {
    page: { minHeight: "100vh", background: "var(--bg)", fontFamily: "'DM Sans',sans-serif" } as React.CSSProperties,
    header: { borderBottom: "1px solid var(--border)", background: "rgba(7,7,13,0.97)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky" as const, top: 60, zIndex: 50 },
    dot: { width: 8, height: 8, borderRadius: "50%", background: "var(--success)", display: "inline-block", marginRight: 8 },
    sidebar: { width: 240, flexShrink: 0, borderRight: "1px solid var(--border)", background: "rgba(7,7,13,0.5)", overflowY: "auto" as const, padding: "1rem 0.75rem" },
    chatArea: { flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden" },
    messages: { flex: 1, overflowY: "auto" as const, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column" as const, gap: "1rem" },
    input: { borderTop: "1px solid var(--border)", padding: "0.85rem 1.25rem", background: "rgba(7,7,13,0.95)" },
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={S.dot} />
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--accent)" }}>SwiftToolAI Agent</span>
          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>— Content Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: "0.7rem", background: "rgba(74,222,128,0.12)", color: "var(--success)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 100, padding: "3px 10px" }}>
            {articleCount} articles
          </span>
          <button onClick={() => { setMessages([{ role: "system", content: "Chat cleared.", timestamp: new Date() }]); setHistory([]); }} style={{ fontSize: "12px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: 8, padding: "5px 12px", cursor: "pointer" }}>Clear</button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 120px)" }}>
        <div style={S.sidebar}>
          <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>Quick Tasks</p>

          <button onClick={autoPublish} disabled={autoPublishing || loading} style={{ width: "100%", marginBottom: "0.6rem", padding: "0.7rem 0.8rem", borderRadius: 10, border: "1px solid rgba(74,222,128,0.35)", background: "rgba(74,222,128,0.08)", color: "var(--success)", cursor: autoPublishing || loading ? "not-allowed" : "pointer", textAlign: "left", opacity: autoPublishing ? 0.7 : 1 }}>
            <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: "0.2rem" }}>
              🚀 {autoPublishing ? "Publishing..." : "Auto-Publish 3"}
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(74,222,128,0.7)", lineHeight: 1.4 }}>Generate & publish 3 articles</div>
          </button>

          {autoLog.length > 0 && (
            <div style={{ marginBottom: "0.6rem", padding: "0.6rem", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(74,222,128,0.15)", maxHeight: 150, overflowY: "auto" }}>
              {autoLog.map((line, i) => (
                <p key={i} style={{ fontSize: "0.62rem", color: line.startsWith("❌") ? "#f87171" : line.startsWith("⚠️") ? "#facc15" : line.startsWith("🎉") ? "#facc15" : "var(--success)", lineHeight: 1.5, marginBottom: "0.1rem" }}>{line}</p>
              ))}
            </div>
          )}

          <div style={{ height: 1, background: "var(--border)", margin: "0.6rem 0" }} />

          {TASKS.map(task => (
            <button key={task.id} onClick={() => { setActiveTask(task.id); sendMessage(task.prompt, task.id); }} disabled={loading || autoPublishing} style={{ width: "100%", marginBottom: "0.4rem", padding: "0.6rem 0.75rem", borderRadius: 10, border: `1px solid ${activeTask === task.id ? task.color + "44" : "var(--border)"}`, background: activeTask === task.id ? task.color + "0f" : "var(--surface)", cursor: "pointer", textAlign: "left", opacity: loading ? 0.55 : 1 }}>
              <div style={{ fontWeight: 600, fontSize: "0.8rem", color: activeTask === task.id ? task.color : "var(--text)", marginBottom: "0.15rem" }}>{task.icon} {task.label}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--muted)", lineHeight: 1.4 }}>{task.description}</div>
            </button>
          ))}

          <div style={{ marginTop: "1rem", padding: "0.85rem", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)" }}>
            <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem" }}>Goal Tracker</p>
            {[
              { label: "Articles", current: articleCount, target: 100, color: "var(--accent)" },
              { label: "Monthly views", current: 0, target: 50000, color: "#facc15" },
            ].map(g => (
              <div key={g.label} style={{ marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--muted)", marginBottom: "0.2rem" }}>
                  <span>{g.label}</span>
                  <span style={{ color: g.color }}>{g.current} / {g.target}</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "var(--surface2)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (g.current / g.target) * 100)}%`, background: g.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.chatArea}>
          <div style={S.messages}>
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === "system" && (
                  <div style={{ textAlign: "center", padding: "0.85rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{msg.content}</div>
                )}
                {msg.role === "user" && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ maxWidth: "70%", background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)", borderRadius: "14px 14px 4px 14px", padding: "0.7rem 1rem" }}>
                      <p style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{msg.content}</p>
                      <p style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.3rem", textAlign: "right" }}>{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                )}
                {msg.role === "agent" && (
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent-light)", border: "1px solid rgba(108,99,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>⚡</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px 14px 14px 14px", padding: "0.85rem 1rem" }}>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</p>
                      </div>

                      {msg.parsedPost && (
                        <div style={{ marginTop: "0.65rem", borderRadius: 10, border: "1px solid rgba(74,222,128,0.25)", background: "rgba(74,222,128,0.04)", overflow: "hidden" }}>
                          <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid rgba(74,222,128,0.12)" }}>
                            <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{msg.parsedPost.icon} {msg.parsedPost.title}</div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                              {[msg.parsedPost.category, msg.parsedPost.readTime + " read", `/${msg.parsedPost.slug}`].map(tag => (
                                <span key={tag} style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: 100, border: "1px solid var(--border)", color: "var(--muted)" }}>{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div style={{ padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                            {(!publishStatus[idx] || publishStatus[idx] === "idle") && (
                              <button onClick={() => publishPost(idx, msg.parsedPost!)} style={{ padding: "0.55rem 1.25rem", borderRadius: 8, border: "1px solid rgba(74,222,128,0.4)", background: "rgba(74,222,128,0.1)", color: "var(--success)", fontSize: "0.85rem", cursor: "pointer", fontWeight: 500 }}>
                                🚀 Publish Now
                              </button>
                            )}
                            {publishStatus[idx] === "publishing" && <span style={{ fontSize: "0.85rem", color: "var(--success)" }}>Publishing...</span>}
                            {publishStatus[idx] === "success" && <span style={{ fontSize: "0.85rem", color: "var(--success)" }}>{publishResult[idx]}</span>}
                            {publishStatus[idx] === "error" && (
                              <div>
                                <p style={{ fontSize: "0.85rem", color: "#f87171" }}>⚠️ {publishResult[idx]}</p>
                                <button onClick={() => publishPost(idx, msg.parsedPost!)} style={{ fontSize: "0.72rem", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Try again</button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <p style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.3rem" }}>{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent-light)", border: "1px solid rgba(108,99,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</div>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px 14px 14px 14px", padding: "0.85rem 1rem" }}>
                  <span style={{ color: "var(--muted)", fontSize: "0.88rem" }}>Generating...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={S.input}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); sendMessage(input); } }}
                placeholder="Type an instruction… (Enter to send)"
                disabled={loading || autoPublishing}
                style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border-active)", borderRadius: 10, padding: "0.65rem 1rem", color: "var(--text)", fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{ padding: "0.65rem 1.1rem", borderRadius: 10, border: "1px solid rgba(108,99,255,0.35)", background: "rgba(108,99,255,0.12)", color: "var(--accent)", cursor: "pointer", fontSize: "1.1rem" }}>
                {loading ? "⏳" : "➤"}
              </button>
            </div>
            <p style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.4rem", textAlign: "center" }}>
              Articles saved to GitHub → deployed via Vercel automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
