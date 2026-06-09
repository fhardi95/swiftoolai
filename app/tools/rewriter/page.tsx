"use client";
import { useState } from "react";
import ToolLayout from "../../_components/ToolLayout";

const tones = [
  { name: "Professional", prompt: "formal, confident, corporate professional tone" },
  { name: "Casual", prompt: "warm, conversational, friendly tone" },
  { name: "Gen Z", prompt: "Gen Z slang: no cap, lowkey, fr, slay, it's giving" },
  { name: "Luxury", prompt: "high-end luxury brand: sophisticated, exclusive, aspirational" },
  { name: "Viral Tweet", prompt: "punchy viral tweet style, max 280 chars, bold hook, mic-drop ending" },
  { name: "Sales Copy", prompt: "persuasive direct-response sales copy with strong hooks and CTA" },
  { name: "Academic", prompt: "formal academic: precise, objective, third person, no contractions" },
  { name: "Storytelling", prompt: "compelling narrative: vivid, emotional, show don't tell" },
  { name: "Empathetic", prompt: "deeply empathetic, warm, validating and human" },
];

export default function RewriterPage() {
  const [tone, setTone] = useState(tones[0]);

  const systemPrompt = `You are an expert writing transformer. Rewrite the user's text in a ${tone.name} tone (${tone.prompt}). Preserve the core meaning. Output ONLY the rewritten text — no preamble, no explanation.`;

  return (
    <ToolLayout
      title="AI Text Rewriter"
      description="Paste any text and instantly rewrite it in any tone. Professional emails, casual posts, Gen Z captions, luxury copy — you choose."
      inputPlaceholder="Paste your text here… emails, bios, product descriptions, social posts, anything."
      systemPrompt={systemPrompt}
      outputLabel={`Rewritten (${tone.name})`}
      maxChars={800}
      extraControls={
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
          }}>Choose tone</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tones.map(t => (
              <button key={t.name} onClick={() => setTone(t)} style={{
                fontSize: 13, fontWeight: 400,
                background: tone.name === t.name ? "var(--accent-light)" : "var(--surface)",
                border: `1px solid ${tone.name === t.name ? "rgba(108,99,255,0.5)" : "var(--border)"}`,
                color: tone.name === t.name ? "var(--text)" : "var(--muted)",
                borderRadius: 100, padding: "6px 14px",
                cursor: "pointer", transition: "all 0.15s",
              }}>{t.name}</button>
            ))}
          </div>
        </div>
      }
    />
  );
}
