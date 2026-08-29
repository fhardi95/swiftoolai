"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";

type Kind = "image" | "video";

type ModelInfo = { id: string; label: string; kind: Kind; description: string };

// Mirrors lib/higgsfield.ts — kept in sync manually since this list is tiny.
const MODELS: ModelInfo[] = [
  { id: "qwen-image-3", label: "Qwen Image 3", kind: "image", description: "Photoreal, editorial-style stills." },
  { id: "nano-banana-2-lite", label: "Nano Banana 2 Lite", kind: "image", description: "Fast drafts & thumbnails." },
  { id: "gpt-image-2", label: "GPT Image 2", kind: "image", description: "General-purpose image generation." },
  { id: "minimax-h3", label: "Minimax H3", kind: "video", description: "Cinematic text-to-video." },
  { id: "ltx-2.5-pro", label: "LTX 2.5 Pro", kind: "video", description: "High-fidelity, handheld realism." },
  { id: "kling-3.0", label: "Kling 3.0", kind: "video", description: "Smooth, coherent motion." },
  { id: "veo-3.1-fast", label: "Veo 3.1 Fast", kind: "video", description: "Quick-turnaround video." },
];

type Stage = "idle" | "queued" | "processing" | "done" | "error" | "nsfw";

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_MS = 6 * 60 * 1000; // 6 minutes safety cap

export default function AiMediaGeneratorClient() {
  const { data: session, status } = useSession();

  const [modelId, setModelId] = useState<string>("qwen-image-3");
  const [prompt, setPrompt] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultKind, setResultKind] = useState<Kind | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAt = useRef<number>(0);

  const selectedModel = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  const clearTimers = useCallback(() => {
    if (pollTimer.current) clearInterval(pollTimer.current);
    if (elapsedTimer.current) clearInterval(elapsedTimer.current);
    pollTimer.current = null;
    elapsedTimer.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  async function handleGenerate() {
    if (!prompt.trim() || stage === "queued" || stage === "processing") return;

    setError("");
    setResultUrl(null);
    setResultKind(null);
    setStage("queued");
    setElapsed(0);
    startedAt.current = Date.now();

    elapsedTimer.current = setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 1000);

    try {
      const res = await fetch("/api/ai-media-generator/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: modelId, prompt: prompt.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        clearTimers();
        setStage("error");
        setError(data?.error || "Failed to start generation.");
        return;
      }

      pollStatus(data.statusUrl, data.kind as Kind);
    } catch (err) {
      clearTimers();
      setStage("error");
      setError(err instanceof Error ? err.message : "Failed to start generation.");
    }
  }

  function pollStatus(statusUrl: string, kind: Kind) {
    setStage("processing");

    pollTimer.current = setInterval(async () => {
      if (Date.now() - startedAt.current > MAX_POLL_MS) {
        clearTimers();
        setStage("error");
        setError("Generation is taking longer than expected. Please try again.");
        return;
      }

      try {
        const res = await fetch(
          `/api/ai-media-generator/status?statusUrl=${encodeURIComponent(statusUrl)}`
        );
        const data = await res.json();

        if (!res.ok) {
          clearTimers();
          setStage("error");
          setError(data?.error || "Failed to check generation status.");
          return;
        }

        if (data.status === "completed") {
          clearTimers();
          const url = kind === "video" ? data.videoUrl : data.imageUrl;
          if (!url) {
            setStage("error");
            setError("Generation completed but no media URL was returned.");
            return;
          }
          setResultUrl(url);
          setResultKind(kind);
          setStage("done");
        } else if (data.status === "failed") {
          clearTimers();
          setStage("error");
          setError(data.error || "Generation failed.");
        } else if (data.status === "nsfw") {
          clearTimers();
          setStage("nsfw");
        } else if (data.status === "canceled") {
          clearTimers();
          setStage("error");
          setError("Generation was canceled.");
        }
        // else: still queued/processing — keep polling
      } catch (err) {
        clearTimers();
        setStage("error");
        setError(err instanceof Error ? err.message : "Failed to check generation status.");
      }
    }, POLL_INTERVAL_MS);
  }

  function reset() {
    clearTimers();
    setStage("idle");
    setError("");
    setResultUrl(null);
    setResultKind(null);
    setElapsed(0);
  }

  const busy = stage === "queued" || stage === "processing";

  // ── Skeleton ─────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {[120, 300, 200].map((h, i) => (
          <div
            key={i}
            style={{
              height: h,
              background: "#f3f4f6",
              borderRadius: 12,
              marginBottom: "1rem",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      </div>
    );
  }

  // ── Auth gate ────────────────────────────────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem,4vw,2.5rem)",
            letterSpacing: "-0.03em",
            marginBottom: "0.6rem",
            color: "#111827",
          }}
        >
          AI Image &amp; Video Generator
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6, marginBottom: "2rem" }}>
          Turn a text prompt into an image or video using seven state-of-the-art AI models — free
          to try, sign in to get started.
        </p>
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
          <div
            style={{
              filter: "blur(3px)",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.4,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 16,
              padding: "3rem 2rem",
              textAlign: "center",
              minHeight: 260,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
            <div style={{ height: 14, background: "#e5e7eb", borderRadius: 4, width: 220, margin: "0 auto 8px" }} />
            <div style={{ height: 10, background: "#e5e7eb", borderRadius: 4, width: 150, margin: "0 auto" }} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(249,250,251,0.85)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 16,
                padding: "2rem 2.5rem",
                textAlign: "center",
                maxWidth: 380,
                boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>🎨</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#111827", marginBottom: "0.5rem" }}>
                Sign in to Generate Media
              </h2>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Free access to our AI image &amp; video generator and 25+ AI tools.
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: window.location.href })}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  background: "#2563eb",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Continue with Google — free
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main tool ────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "2.5rem 1.25rem 1rem" }}>
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem,4vw,2.5rem)",
          letterSpacing: "-0.03em",
          marginBottom: "0.6rem",
          color: "#111827",
        }}
      >
        AI Image &amp; Video Generator
      </h1>
      <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6, marginBottom: "1.75rem" }}>
        Describe what you want and pick a model — SwiftoolAI generates the image or video for you.
      </p>

      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 16,
          padding: "1.75rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Model picker */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>Model</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8 }}>
            {MODELS.map((m) => {
              const active = m.id === modelId;
              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={busy}
                  onClick={() => setModelId(m.id)}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: active ? "2px solid #2563eb" : "1px solid rgba(0,0,0,0.1)",
                    background: active ? "#eff6ff" : "#fff",
                    cursor: busy ? "not-allowed" : "pointer",
                    opacity: busy ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 14 }}>{m.kind === "video" ? "🎬" : "🖼️"}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{m.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>{m.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompt */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>Prompt</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={busy}
            placeholder={
              selectedModel.kind === "video"
                ? "e.g. Handheld shot following a runner through an empty station"
                : "e.g. Editorial portrait, hard flash, 35mm grain"
            }
            rows={4}
            maxLength={2000}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "vertical",
              color: "#111827",
              background: busy ? "#f9fafb" : "#fff",
            }}
          />
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, textAlign: "right" }}>
            {prompt.length}/2000
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={busy || !prompt.trim()}
          style={{
            width: "100%",
            padding: "13px 20px",
            background: busy || !prompt.trim() ? "#93c5fd" : "#2563eb",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            cursor: busy || !prompt.trim() ? "not-allowed" : "pointer",
          }}
        >
          {busy
            ? `Generating… ${elapsed}s`
            : `Generate ${selectedModel.kind === "video" ? "Video" : "Image"}`}
        </button>

        {/* Progress */}
        {busy && (
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <div
              style={{
                width: 28,
                height: 28,
                margin: "0 auto 10px",
                border: "3px solid #dbeafe",
                borderTopColor: "#2563eb",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {stage === "queued" ? "Queued — waiting for a worker…" : "Rendering your " + selectedModel.kind + "…"}
              {selectedModel.kind === "video" && " This can take a couple of minutes."}
            </div>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* Error */}
        {stage === "error" && (
          <div
            style={{
              marginTop: "1rem",
              padding: "12px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 10,
              color: "#b91c1c",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {/* NSFW */}
        {stage === "nsfw" && (
          <div
            style={{
              marginTop: "1rem",
              padding: "12px 14px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 10,
              color: "#92400e",
              fontSize: 13,
            }}
          >
            This prompt was flagged by content moderation and couldn&apos;t be generated. Try
            rewording your prompt.
          </div>
        )}

        {/* Result */}
        {stage === "done" && resultUrl && (
          <div style={{ marginTop: "1.25rem" }}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.1)",
                background: "#000",
              }}
            >
              {resultKind === "video" ? (
                <video src={resultUrl} controls autoPlay loop style={{ width: "100%", display: "block" }} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={resultUrl} alt={prompt} style={{ width: "100%", display: "block" }} />
              )}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <a
                href={resultUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px 16px",
                  background: "#111827",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Download
              </a>
              <button
                type="button"
                onClick={reset}
                style={{
                  flex: 1,
                  padding: "11px 16px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Generate Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
