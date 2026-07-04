"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Write a professional email",
  "Create a workout plan for beginners",
  "Write a Python script",
  "Brainstorm startup ideas",
];

export default function ClaudeSonnetChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Claude Sonnet 4.6 — your AI assistant. Ask me anything to get started." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/models/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.filter(m => m.role !== "assistant" || newMessages.indexOf(m) > 0),
          model: "claude-sonnet-4-6",
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.content ?? "Sorry, something went wrong." }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const showSuggested = messages.length === 1;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.25rem 4rem" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "1.5rem 0 0", fontSize: 13, color: "#9ca3af" }}>
          <Link href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/models" style={{ color: "#9ca3af", textDecoration: "none" }}>AI Models</Link>
          <span>/</span>
          <span style={{ color: "#374151" }}>Claude Sonnet</span>
        </div>

        {/* Hero */}
        <div style={{ padding: "2rem 0 1.5rem" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#111827", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
            Claude Sonnet 4.6
          </h1>
          <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.7, maxWidth: 640 }}>
            Chat with Claude Sonnet 4.6 — an intelligent AI model developed by Anthropic, sporting a 200K+ context window for high-volume writing tasks and difficult coding challenges.
          </p>
        </div>

        {/* Chat card */}
        <div style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>

          {/* Messages area */}
          <div style={{ minHeight: 320, maxHeight: 480, overflowY: "auto", padding: "1.5rem", background: "#fafafa" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: "1rem", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "assistant" && (
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e8604c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                    ✳️
                  </div>
                )}
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  background: msg.role === "user" ? "#2563eb" : "#fff",
                  color: msg.role === "user" ? "#fff" : "#111827",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: 14, lineHeight: 1.7,
                  border: msg.role === "assistant" ? "1px solid rgba(0,0,0,0.08)" : "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e8604c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✳️</div>
                <div style={{ padding: "10px 14px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px 16px 16px 4px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9ca3af", animation: `bounce 1s ease-in-out ${i*0.15}s infinite` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.08)", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, background: "#f3f4f6", borderRadius: 10, padding: "4px 12px" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#e8604c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>✳️</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", flexShrink: 0 }}>Claude Sonnet 4.6</span>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#111827", resize: "none", fontFamily: "inherit", lineHeight: 1.5, maxHeight: 120, overflowY: "auto" }}
                onInput={e => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 120) + "px"; }}
              />
            </div>
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 10, background: loading || !input.trim() ? "#e5e7eb" : "#2563eb", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke={loading || !input.trim() ? "#9ca3af" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={loading || !input.trim() ? "#9ca3af" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Suggested prompts */}
        {showSuggested && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SUGGESTED.map(s => (
              <button key={s} onClick={() => sendMessage(s)} style={{ padding: "8px 16px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, fontSize: 13, color: "#374151", cursor: "pointer", fontWeight: 500, transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#2563eb"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Info section */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Why use Claude Sonnet 4.6?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "🧠", title: "200K context window", desc: "Handles very long conversations and large documents without losing context." },
              { icon: "👾", title: "Best-in-class coding", desc: "Excels at writing, debugging, and explaining code across all languages." },
              { icon: "✍️", title: "Excellent AI writer", desc: "Writes entire articles, essays, and reports in one go — up to 64K tokens output." },
              { icon: "⚡", title: "Fast responses", desc: "Optimised for speed without compromising quality. Great for everyday tasks." },
            ].map(f => (
              <div key={f.title} style={{ background: "#f9fafb", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "1.25rem" }}>
                <div style={{ fontSize: 24, marginBottom: "0.6rem" }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
}
