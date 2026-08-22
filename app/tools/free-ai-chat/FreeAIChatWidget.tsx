"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "Write a professional email",
  "Explain a complex topic simply",
  "Help me debug this code",
  "Brainstorm business ideas",
];

export default function FreeAIChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! Ask me anything — no sign-up needed to get started." },
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
          messages: newMessages.filter((m) => m.role !== "assistant" || newMessages.indexOf(m) > 0),
          model: "gpt-5-mini",
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
    <div id="widget">
      <div style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: "1rem", background: "#fff" }}>
        <div style={{ minHeight: 300, maxHeight: 440, overflowY: "auto", padding: "1.5rem", background: "#fafafa" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: "1rem", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role === "assistant" && (
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✨</div>
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
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✨</div>
              <div style={{ padding: "10px 14px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px 16px 16px 4px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9ca3af", animation: `pos-bounce 1s ease-in-out ${i * 0.15}s infinite` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.08)", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, background: "#f3f4f6", borderRadius: 10, padding: "4px 12px" }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything — no sign-up required..."
              rows={1}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#111827", resize: "none", fontFamily: "inherit", lineHeight: 1.5, maxHeight: 120, overflowY: "auto", padding: "8px 0" }}
              onInput={(e) => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 120) + "px"; }}
            />
          </div>
          <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 10, background: loading || !input.trim() ? "#e5e7eb" : "#2563eb", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke={loading || !input.trim() ? "#9ca3af" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={loading || !input.trim() ? "#9ca3af" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {showSuggested && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {SUGGESTED.map((s) => (
            <button key={s} onClick={() => sendMessage(s)} style={{ padding: "8px 16px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, fontSize: 13, color: "#374151", cursor: "pointer", fontWeight: 500 }}>
              {s}
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes pos-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }`}</style>
    </div>
  );
}
