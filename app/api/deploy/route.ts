import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (!deployHook) {
    return NextResponse.json({ triggered: false, error: "VERCEL_DEPLOY_HOOK not set" });
  }

  try {
    const res = await fetch(deployHook, { method: "POST" });
    return NextResponse.json({ triggered: res.ok, status: res.status });
  } catch {
    return NextResponse.json({ triggered: false, error: "Failed to reach deploy hook" });
  }
}
