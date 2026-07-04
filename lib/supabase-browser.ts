import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yegpaefvctaideajanql.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZ3BhZWZ2Y3RhaWRlYWphbnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NjE2ODUsImV4cCI6MjA5NzEzNzY4NX0.ImNSA7836eq2pks7-C9msPVjZhMbj7WE07iVfV9mrHU";

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
