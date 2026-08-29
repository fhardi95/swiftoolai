// lib/higgsfield.ts
// Thin server-side wrapper around the Higgsfield inference API.
// Docs (as supplied): base https://platform.higgsfield.ai
// Auth: Authorization: Key <key_id>:<secret>
// All generation endpoints return a queued job { request_id, status_url, cancel_url }.
// Poll status_url with the same auth header until status is
// "completed" | "failed" | "nsfw" | "canceled".
// Images land in images[0].url, videos land in video.url.

export const HF_BASE = "https://platform.higgsfield.ai";

// Host allow-list used when a status/cancel URL returned by Higgsfield
// is later passed back to our API — prevents the poll endpoint being
// used as an open proxy (SSRF) to arbitrary hosts.
export const HF_ALLOWED_HOST = "platform.higgsfield.ai";

export type HfModelKind = "image" | "video";

export interface HfModelConfig {
  id: string;
  label: string;
  kind: HfModelKind;
  path: string; // path appended to HF_BASE
  description: string;
}

// Keep this in sync with the "models" table supplied by the user.
export const HF_MODELS: Record<string, HfModelConfig> = {
  "qwen-image-3": {
    id: "qwen-image-3",
    label: "Qwen Image 3",
    kind: "image",
    path: "/alibaba/qwen-image-3/text-to-image",
    description: "Alibaba's Qwen text-to-image model — strong at editorial and photoreal stills.",
  },
  "nano-banana-2-lite": {
    id: "nano-banana-2-lite",
    label: "Nano Banana 2 Lite",
    kind: "image",
    path: "/nano-banana-2/lite/text-to-image",
    description: "Fast, lightweight text-to-image model — good for quick drafts and thumbnails.",
  },
  "gpt-image-2": {
    id: "gpt-image-2",
    label: "GPT Image 2",
    kind: "image",
    path: "/openai/gpt-image-2",
    description: "OpenAI's image model — versatile general-purpose text-to-image generation.",
  },
  "minimax-h3": {
    id: "minimax-h3",
    label: "Minimax H3",
    kind: "video",
    path: "/minimax/h3/text-to-video",
    description: "Minimax's text-to-video model — cinematic motion from a single prompt.",
  },
  "ltx-2.5-pro": {
    id: "ltx-2.5-pro",
    label: "LTX 2.5 Pro",
    kind: "video",
    path: "/lightricks/ltx-2.5/text-to-video/pro",
    description: "Lightricks LTX 2.5 Pro — high-fidelity text-to-video with handheld realism.",
  },
  "kling-3.0": {
    id: "kling-3.0",
    label: "Kling 3.0",
    kind: "video",
    path: "/kling-video/v3.0/std/text-to-video",
    description: "Kling 3.0 standard — smooth, coherent text-to-video generation.",
  },
  "veo-3.1-fast": {
    id: "veo-3.1-fast",
    label: "Veo 3.1 Fast",
    kind: "video",
    path: "/veo3.1/fast/text-to-video",
    description: "Google Veo 3.1 Fast — quick-turnaround text-to-video generation.",
  },
};

export const HF_IMAGE_MODELS = Object.values(HF_MODELS).filter((m) => m.kind === "image");
export const HF_VIDEO_MODELS = Object.values(HF_MODELS).filter((m) => m.kind === "video");

export function getHfCredentials(): { keyId: string; keySecret: string } | null {
  const keyId = process.env.HF_API_KEY_ID;
  const keySecret = process.env.HF_API_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

export function hfAuthHeader(keyId: string, keySecret: string): string {
  return `Key ${keyId}:${keySecret}`;
}

export interface HfQueuedJob {
  status: string;
  request_id: string;
  status_url: string;
  cancel_url?: string;
}

export interface HfStatusResult {
  status: string;
  images?: { url: string }[];
  video?: { url: string };
  error?: string;
  [key: string]: unknown;
}

// Starts a generation job. Returns the raw queued-job payload from Higgsfield.
export async function startHfGeneration(
  modelId: string,
  prompt: string
): Promise<{ ok: true; data: HfQueuedJob } | { ok: false; status: number; error: string }> {
  const cfg = HF_MODELS[modelId];
  const creds = getHfCredentials();
  if (!cfg) return { ok: false, status: 400, error: "Unknown model." };
  if (!creds) return { ok: false, status: 500, error: "Higgsfield API credentials are not configured." };

  try {
    const res = await fetch(`${HF_BASE}${cfg.path}`, {
      method: "POST",
      headers: {
        Authorization: hfAuthHeader(creds.keyId, creds.keySecret),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data) {
      const msg =
        (data && (data.error || data.message)) || `Higgsfield API error (${res.status})`;
      return { ok: false, status: 502, error: typeof msg === "string" ? msg : JSON.stringify(msg) };
    }

    if (!data.request_id || !data.status_url) {
      return { ok: false, status: 502, error: "Unexpected response shape from Higgsfield." };
    }

    return { ok: true, data };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 500, error: `Network error contacting Higgsfield: ${msg}` };
  }
}

// Polls a previously-returned status_url. Validates the host to avoid
// the endpoint being abused to fetch arbitrary URLs.
export async function pollHfStatus(
  statusUrl: string
): Promise<{ ok: true; data: HfStatusResult } | { ok: false; status: number; error: string }> {
  let parsed: URL;
  try {
    parsed = new URL(statusUrl);
  } catch {
    return { ok: false, status: 400, error: "Invalid status URL." };
  }

  if (parsed.protocol !== "https:" || parsed.hostname !== HF_ALLOWED_HOST) {
    return { ok: false, status: 400, error: "statusUrl is not a valid Higgsfield URL." };
  }

  const creds = getHfCredentials();
  if (!creds) return { ok: false, status: 500, error: "Higgsfield API credentials are not configured." };

  try {
    const res = await fetch(parsed.toString(), {
      headers: { Authorization: hfAuthHeader(creds.keyId, creds.keySecret) },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data) {
      const msg =
        (data && (data.error || data.message)) || `Higgsfield API error (${res.status})`;
      return { ok: false, status: 502, error: typeof msg === "string" ? msg : JSON.stringify(msg) };
    }

    return { ok: true, data };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 500, error: `Network error contacting Higgsfield: ${msg}` };
  }
}
