import { supabaseAdmin } from "./supabase-admin";

// ─── Plan limits ──────────────────────────────────────────────────────────────
export const PLAN_LIMITS = {
  free: 10,   // 10 AI tool uses per day
  pro: 999,   // effectively unlimited
} as const;

// Tools that are always free (no AI cost, no limit)
export const FREE_TOOLS = new Set([
  "word-counter",
  "case-converter",
  "password-generator",
  "qr-code-generator",
  "color-picker",
  "word-unscrambler",
  "image-compressor",
  "webp-to-jpg",
  "svg-to-png",
  "png-to-pdf",
]);

// ─── Get user's current plan ──────────────────────────────────────────────────
export async function getUserPlan(userId: string): Promise<"free" | "pro"> {
  const { data } = await supabaseAdmin
    .from("subscriptions")
    .select("plan, status, current_period_end")
    .eq("user_id", userId)
    .single();

  if (!data) return "free";
  if (data.plan === "pro" && data.status === "active") {
    // Check subscription hasn't expired
    if (data.current_period_end) {
      const expired = new Date(data.current_period_end) < new Date();
      if (expired) return "free";
    }
    return "pro";
  }
  return "free";
}

// ─── Get today's usage count ──────────────────────────────────────────────────
export async function getDailyUsage(userId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { count } = await supabaseAdmin
    .from("tool_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("date", today);

  return count ?? 0;
}

// ─── Check if user can use a tool (and record usage) ────────────────────────
export type UsageCheckResult =
  | { allowed: true; used: number; limit: number; plan: "free" | "pro" }
  | { allowed: false; used: number; limit: number; plan: "free" | "pro"; reason: string };

export async function checkAndRecordUsage(
  userId: string,
  toolSlug: string
): Promise<UsageCheckResult> {
  // Free utility tools — always allow, don't track
  if (FREE_TOOLS.has(toolSlug)) {
    return { allowed: true, used: 0, limit: 999, plan: "free" };
  }

  const [plan, used] = await Promise.all([
    getUserPlan(userId),
    getDailyUsage(userId),
  ]);

  const limit = PLAN_LIMITS[plan];

  if (used >= limit) {
    return {
      allowed: false,
      used,
      limit,
      plan,
      reason: plan === "free"
        ? `You've used all ${limit} free AI runs today. Upgrade to Pro for unlimited access.`
        : `Daily limit reached. Contact support if you think this is an error.`,
    };
  }

  // Record the usage
  const today = new Date().toISOString().split("T")[0];
  await supabaseAdmin.from("tool_usage").insert({
    user_id: userId,
    tool_slug: toolSlug,
    date: today,
  });

  return { allowed: true, used: used + 1, limit, plan };
}
