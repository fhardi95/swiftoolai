"use client";
import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "success" | "error";

const TOPICS = [
  { value: "bug", label: "🐛 Bug Report" },
  { value: "suggestion", label: "💡 Tool Suggestion" },
  { value: "feedback", label: "💬 General Feedback" },
  { value: "business", label: "🤝 Business Enquiry" },
  { value: "privacy", label: "🔒 Privacy / Data Request" },
  { value: "other", label: "📩 Other" },
];

const _s = {
  wrap: { maxWidth: 680, margin: "0 auto", padding: "3rem 1.25rem 5rem" } as React.CSSProperties,
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.03em", color: "#111827", marginBottom: "0.5rem" } as React.CSSProperties,
  sub: { color: "#6b7280", fontSize: 15, lineHeight: 1.6, marginBottom: "2.5rem" } as React.CSSProperties,
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 } as React.CSSProperties,
  input: { width: "100%", padding: "11px 14px", fontSize: 14, color: "#111827", background: "#fff", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 9, outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit", transition: "border-color 0.15s" },
  group: { marginBottom: "1.25rem" } as React.CSSProperties,
  card: { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: "1.5rem" } as React.CSSProperties,
  back: { fontSize: 13, color: "#6b7280", display: "inline-block", marginBottom: "2rem", textDecoration: "none" } as React.CSSProperties,
  a: { color: "#2563eb", textDecoration: "none" } as React.CSSProperties,
};

export default function ContactForm() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address.";
    if (!topic) e.topic = "Please select a topic.";
    if (message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    // In production, connect this to an email API (Resend, Formspree, etc.)
    // For now, simulate a successful submission
    await new Promise(res => setTimeout(res, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div style={_s.wrap}>
        <Link href="/" style={_s.back}>← Back to home</Link>
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <div style={{ fontSize: 52, marginBottom: "1rem" }}>✅</div>
          <h1 style={{ ..._s.h1, textAlign: "center", marginBottom: "0.75rem" }}>Message Sent!</h1>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.6, marginBottom: "2rem", maxWidth: 400, margin: "0 auto 2rem" }}>
            Thanks for reaching out, {name.split(" ")[0]}. We&apos;ll get back to you at <strong>{email}</strong> within 2 business days.
          </p>
          <Link href="/tools" style={{ display: "inline-block", padding: "12px 28px", background: "#2563eb", color: "#fff", borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Explore Tools →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={_s.wrap}>
      <Link href="/" style={_s.back}>← Back to home</Link>
      <h1 style={_s.h1}>Contact Us</h1>
      <p style={_s.sub}>
        Have a question, found a bug, or want to suggest a new tool? We read every message and aim to respond within 2 business days.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { icon: "🐛", title: "Bug Report", desc: "Something broken? Let us know what happened and we'll fix it fast.", href: null },
          { icon: "💡", title: "Tool Suggestions", desc: "Got an idea for a new AI tool? We love building what people actually need.", href: null },
          { icon: "🔒", title: "Privacy Requests", desc: "Data access, deletion, or correction requests.", href: "/privacy" },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "1rem 1.1rem", background: "#f9fafb", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 2 }}>{title}</div>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={_s.card}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name + Email row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }} className="contact-grid">
            <div>
              <label style={_s.label} htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Smith"
                style={{ ..._s.input, borderColor: errors.name ? "#fca5a5" : "rgba(0,0,0,0.12)" }}
              />
              {errors.name && <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>{errors.name}</p>}
            </div>
            <div>
              <label style={_s.label} htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@example.com"
                style={{ ..._s.input, borderColor: errors.email ? "#fca5a5" : "rgba(0,0,0,0.12)" }}
              />
              {errors.email && <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>{errors.email}</p>}
            </div>
          </div>

          {/* Topic */}
          <div style={_s.group}>
            <label style={_s.label} htmlFor="topic">Topic</label>
            <select
              id="topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{ ..._s.input, cursor: "pointer", borderColor: errors.topic ? "#fca5a5" : "rgba(0,0,0,0.12)" }}
            >
              <option value="">Select a topic…</option>
              {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            {errors.topic && <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>{errors.topic}</p>}
          </div>

          {/* Message */}
          <div style={_s.group}>
            <label style={_s.label} htmlFor="message">
              Message
              <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: 6 }}>({message.length}/1000)</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value.slice(0, 1000))}
              placeholder="Describe your question, bug, or suggestion in as much detail as possible…"
              rows={6}
              style={{ ..._s.input, resize: "vertical", minHeight: 140, borderColor: errors.message ? "#fca5a5" : "rgba(0,0,0,0.12)" }}
            />
            {errors.message && <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>{errors.message}</p>}
          </div>

          {status === "error" && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 9, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: "1rem" }}>
              Something went wrong. Please try again or email us directly at <a href="mailto:hello@swiftoolai.com" style={{ color: "#dc2626" }}>hello@swiftoolai.com</a>.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            style={{ width: "100%", padding: "13px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1, boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }}
          >
            {status === "sending" ? "Sending…" : "Send Message →"}
          </button>

          <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: "1rem", marginBottom: 0 }}>
            We typically respond within 2 business days. For urgent privacy requests, email <a href="mailto:privacy@swiftoolai.com" style={{ color: "#6b7280" }}>privacy@swiftoolai.com</a> directly.
          </p>
        </form>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/about" style={{ fontSize: 13, color: "#2563eb" }}>About SwiftoolAI →</Link>
        <Link href="/privacy" style={{ fontSize: 13, color: "#2563eb" }}>Privacy Policy →</Link>
        <Link href="/tools" style={{ fontSize: 13, color: "#2563eb" }}>Browse Tools →</Link>
      </div>
      <style>{`@media(max-width:560px){.contact-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  );
}
