import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://yegpaefvctaideajanql.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZ3BhZWZ2Y3RhaWRlYWphbnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NjE2ODUsImV4cCI6MjA5NzEzNzY4NX0.ImNSA7836eq2pks7-C9msPVjZhMbj7WE07iVfV9mrHU";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client (bypasses RLS) — used in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Browser-side client — used for email/password auth in client components
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
