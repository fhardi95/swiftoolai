"use client";
import { useState } from "react";

export default function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        fontSize: 13,
        fontWeight: 600,
        background: copied ? "var(--success)" : "var(--accent)",
        color: "#fff",
        border: "none",
        padding: "9px 18px",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "background 0.15s",
      }}
    >
      {copied ? "✓ Copied!" : "📋 Copy Prompt"}
    </button>
  );
}
