// app/api/usage/route.ts
// Returns the current user's daily usage stats — called by dashboard + tool pages

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDailyUsage, getUserPlan, PLAN_LIMITS } from "@/lib/usage";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const [plan, used] = await Promise.all([
    getUserPlan(userId),
    getDailyUsage(userId),
  ]);

  const limit = PLAN_LIMITS[plan];

  return NextResponse.json({
    plan,
    used,
    limit,
    remaining: Math.max(0, limit - used),
    isPro: plan === "pro",
  });
}
