"use client";
import { useState } from "react";
import ToolLayout from "../../_components/ToolLayout";

const platforms = [
  { name: "LinkedIn", prompt: "professional LinkedIn bio in first person, highlights achievements and value, ends with a soft CTA, 3-4 sentences" },
  { name: "Instagram", prompt: "punchy Instagram bio with line breaks, emojis optional, personality-forward, max 150 chars" },
  { name: "Twitter/X", prompt: "concise Twitter/X bio, max 160 chars, personality + what you do, optionally witty" },
  { name: "Website", prompt: "warm professional website About section in third person, 2-3 paragraphs, storytelling approach" },
  { name: "TikTok", prompt: "fun TikTok bio, very short, personality-led, max 80 chars, gen-z friendly" },
];

export default function BioGeneratorPage() {
  const [platform, setPlatform] = useState(platforms[0]);

  const systemPrompt = `You are an expert personal branding copywriter. Generate a compelling bio for ${platform.name} based on the user's information. Style: ${platform.prompt}. Output ONLY the bio — no preamble, no explanation, no quotation marks.`;

  return (
    <ToolLayout
      title="AI Bio Generator"
      description="Generate a perfect bio for any platform in seconds. Tell us about yourself and we'll write a bio that stands out."
      inputPlaceholder="Tell us about yourself: your job, skills, passions, achievements, or what makes you unique. The more detail, the better the bio."
      systemPrompt={systemPrompt}
      outputLabel={`${platform.name} Bio`}
      maxChars={600}
      extraControls={
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem",
          }}>Platform</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {platforms.map(p => (
              <button key={p.name} onClick={() => setPlatform(p)} style={{
                fontSize: 13,
                background: platform.name === p.name ? "rgba(255,99,132,0.15)" : "var(--surface)",
                border: `1px solid ${platform.name === p.name ? "rgba(255,99,132,0.5)" : "var(--border)"}`,
                color: platform.name === p.name ? "var(--text)" : "var(--muted)",
                borderRadius: 100, padding: "6px 14px",
                cursor: "pointer", transition: "all 0.15s",
              }}>{p.name}</button>
            ))}
          </div>
        </div>
      }
    />
  );
}
