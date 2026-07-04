"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

type Stage = "idle" | "uploading" | "processing" | "done" | "error";

const PROGRESS_MSGS = [
  "Uploading image…",
  "Detecting subject…",
  "Building mask…",
  "Removing background…",
  "Finishing up…",
];

export default function BackgroundRemoverClient() {
  const { data: session, status } = useSession();
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  // ── Skeleton ─────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {[120, 300, 200].map((h, i) => (
          <div key={i} style={{ height: h, background: "#f3f4f6", borderRadius: 12, marginBottom: "1rem", animation: "pulse 1.5s ease-in-out infinite" }} />
        ))}
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      </div>
    );
  }

  // ── Auth gate ─────────────────────────────────────────────────────────────
  if (status === "unauthenticated") {
    return (
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 1.25rem" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.5rem)", letterSpacing: "-0.03em", marginBottom: "0.6rem", color: "#111827" }}>
          Background Remover — Free AI Background Eraser
        </h1>
        <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.6, marginBottom: "2rem" }}>
          Remove image backgrounds instantly using AI. Perfect for product photos, portraits, profile pictures, and more — free &amp; private.
        </p>
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none", opacity: 0.4, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "3rem 2rem", textAlign: "center", minHeight: 260 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
            <div style={{ height: 14, background: "#e5e7eb", borderRadius: 4, width: 200, margin: "0 auto 8px" }} />
            <div style={{ height: 10, background: "#e5e7eb", borderRadius: 4, width: 140, margin: "0 auto" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(249,250,251,0.85)", backdropFilter: "blur(2px)" }}>
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, padding: "2rem 2.5rem", textAlign: "center", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
              <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>✂️</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#111827", marginBottom: "0.5rem" }}>Sign in to Remove Backgrounds</h2>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: "1.5rem" }}>Free access to our AI background remover and 25+ AI tools.</p>
              <button
                onClick={() => signIn("google", { callbackUrl: window.location.href })}
                style={{ width: "100%", padding: "12px 20px", background: "#2563eb", border: "none", borderRadius: 9, fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer" }}
              >
                Continue with Google — free
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function startProgressSim(durationMs: number) {
    let pct = 0; let msgIdx = 0;
    setProgress(0); setProgressMsg(PROGRESS_MSGS[0]);
    if (intervalRef.current) clearInterval(intervalRef.current);
    const step = 90 / (durationMs / 150);
    intervalRef.current = setInterval(() => {
      pct = Math.min(pct + step + Math.random() * step * 0.4, 90);
      setProgress(Math.round(pct));
      const idx = Math.min(Math.floor((pct / 90) * PROGRESS_MSGS.length), PROGRESS_MSGS.length - 1);
      if (idx !== msgIdx) { msgIdx = idx; setProgressMsg(PROGRESS_MSGS[idx]); }
      if (pct >= 90 && intervalRef.current) clearInterval(intervalRef.current);
    }, 150);
  }

  function stopProgress(final = 100, msg = "Done!") {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(final); setProgressMsg(msg);
  }

  // Client-side fallback using @imgly/background-removal loaded lazily
  async function runClientSide(file: File): Promise<string> {
    const { removeBackground } = await import("@imgly/background-removal");
    setProgressMsg("Running AI in browser…");
    const blob = await removeBackground(file, {
      progress: (_key: string, current: number, total: number) => {
        if (total > 0) setProgress(Math.round((current / total) * 100));
      },
    });
    return URL.createObjectURL(blob);
  }

  async function processImage(file: File) {
    if (!file.type.startsWith("image/")) { setError("Please upload a valid image file (JPG, PNG, WebP)."); return; }
    if (file.size > 20 * 1024 * 1024) { setError("Image must be under 20 MB."); return; }

    setError(""); setResultUrl(null); setFileName(file.name); setCompareMode(false);
    setOriginalUrl(URL.createObjectURL(file));

    try {
      setStage("uploading");
      startProgressSim(6000);

      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch("/api/background-remover", { method: "POST", body: fd });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Server error. Please try again.");
      }

      const data = await res.json();

      let outputUrl: string;

      if (data.fallback) {
        // Server has no API key → run client-side WASM
        setStage("processing");
        setProgressMsg("Loading AI model in browser…");
        outputUrl = await runClientSide(file);
      } else {
        // Server returned base64 PNG from remove.bg
        outputUrl = `data:image/png;base64,${data.result}`;
      }

      stopProgress(100, "Done!");
      setResultUrl(outputUrl);
      setStage("done");
    } catch (err) {
      stopProgress(0, "");
      console.error(err);
      // Last resort: try client-side
      try {
        setStage("processing");
        setProgressMsg("Trying browser-based removal…");
        const outputUrl = await runClientSide(file);
        stopProgress(100, "Done!");
        setResultUrl(outputUrl);
        setStage("done");
      } catch {
        setError(err instanceof Error ? err.message : "Background removal failed. Please try a different image.");
        setStage("error");
      }
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  }

  function handleReset() {
    setStage("idle"); setOriginalUrl(null); setResultUrl(null);
    setError(""); setFileName(""); setProgress(0); setCompareMode(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleDownload() {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = fileName.replace(/\.[^.]+$/, "") + "-no-bg.png";
    a.click();
  }

  const isProcessing = stage === "uploading" || stage === "processing";

  // ── Main UI ───────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.4rem)", letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#111827" }}>
          Background Remover
        </h1>
        <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.6 }}>
          Remove the background from any image instantly using AI — portraits, product photos, logos, and more. Free, private, and no watermarks.
        </p>
      </div>

      {/* Upload zone */}
      {(stage === "idle" || stage === "error") && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${dragging ? "#2563eb" : "rgba(0,0,0,0.15)"}`, borderRadius: 20, padding: "3.5rem 2rem", textAlign: "center", cursor: "pointer", background: dragging ? "#eff6ff" : "#fff", transition: "all 0.2s", marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div style={{ fontSize: 48, marginBottom: 12, lineHeight: 1 }}>✂️</div>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111827", marginBottom: 6 }}>
            Drop your image here, or click to browse
          </p>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>Supports JPG, PNG, WebP · Max 20 MB</p>
          <span style={{ display: "inline-block", background: "#2563eb", color: "#fff", fontSize: 14, fontWeight: 600, padding: "10px 24px", borderRadius: 9, pointerEvents: "none" }}>
            Upload Image
          </span>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) processImage(f); }} />
        </div>
      )}

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#dc2626", marginBottom: "1.5rem" }}>
          {error}
        </div>
      )}

      {/* Processing */}
      {isProcessing && originalUrl && (
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, padding: "2.5rem", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: "1.5rem" }}>
          <div style={{ width: 160, height: 160, margin: "0 auto 1.5rem", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={originalUrl} alt="Processing" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px)", opacity: 0.6 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(37,99,235,0.06)" }}>
              <div style={{ width: 40, height: 40, border: "3px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            </div>
          </div>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 6 }}>{progressMsg || "Processing…"}</p>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: "1.25rem" }}>Hang tight — removing the background now.</p>
          <div style={{ height: 8, background: "#f3f4f6", borderRadius: 100, overflow: "hidden", maxWidth: 320, margin: "0 auto" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#2563eb", borderRadius: 100, transition: "width 0.4s ease" }} />
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>{progress}%</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {/* Result */}
      {stage === "done" && originalUrl && resultUrl && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <div style={{ display: "inline-flex", background: "#f3f4f6", borderRadius: 100, padding: 4, gap: 4 }}>
              {(["Result", "Compare"] as const).map((label) => {
                const isCompare = label === "Compare";
                const active = compareMode === isCompare;
                return (
                  <button key={label} onClick={() => setCompareMode(isCompare)}
                    style={{ fontSize: 13, fontWeight: 600, padding: "6px 18px", borderRadius: 100, border: "none", cursor: "pointer", background: active ? "#fff" : "transparent", color: active ? "#111827" : "#9ca3af", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}
                  >{label}</button>
                );
              })}
            </div>
          </div>

          {compareMode ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="img-grid">
              {([["Original", originalUrl, false], ["No Background", resultUrl, true]] as [string, string, boolean][]).map(([label, url, checker]) => (
                <div key={label} style={{ background: checker ? "repeating-conic-gradient(#e5e7eb 0% 25%,#fff 0% 50%) 0 0/16px 16px" : "#f9fafb", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", aspectRatio: "1/1" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%,#fff 0% 50%) 0 0/20px 20px", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", marginBottom: "1rem", minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt="Background removed" style={{ maxWidth: "100%", maxHeight: 480, objectFit: "contain", display: "block", margin: "0 auto" }} />
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }} className="btn-grid">
            <button onClick={handleDownload} style={{ padding: "14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }}>
              ⬇ Download PNG
            </button>
            <button onClick={handleReset} style={{ padding: "14px", background: "#fff", color: "#374151", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              ↑ Remove Another
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
            ✓ Transparent PNG · ✓ No watermark · ✓ Image never stored
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:600px){.img-grid{grid-template-columns:1fr!important}.btn-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}
