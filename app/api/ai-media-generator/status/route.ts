import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pollHfStatus } from "@/lib/higgsfield";

export const runtime = "nodejs";
export const maxDuration = 20;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const statusUrl = req.nextUrl.searchParams.get("statusUrl");
  if (!statusUrl) {
    return NextResponse.json({ error: "Missing statusUrl." }, { status: 400 });
  }

  const result = await pollHfStatus(statusUrl);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const data = result.data;

  return NextResponse.json({
    status: data.status,
    imageUrl: data.images?.[0]?.url ?? null,
    videoUrl: data.video?.url ?? null,
    error: typeof data.error === "string" ? data.error : null,
  });
}
