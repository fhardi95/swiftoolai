import { supabaseAdmin } from "./supabase-admin";

export async function upsertUser({
  id, email, name, image,
}: {
  id: string; email: string; name?: string | null; image?: string | null;
}) {
  const { error } = await supabaseAdmin.from("users").upsert(
    { id, email, name: name ?? null, image: image ?? null, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
  if (error) console.error("[upsertUser] Supabase error:", error.message);
}
