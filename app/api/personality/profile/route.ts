import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabaseAdmin
    .from("personality_profiles")
    .select("trait_scores, report, chat_history, updated_at")
    .eq("user_id", session.user.id)
    .single();

  if (!data) {
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({
    exists: true,
    traitScores: data.trait_scores,
    report: data.report,
    chatHistory: data.chat_history || [],
    updatedAt: data.updated_at,
  });
}
