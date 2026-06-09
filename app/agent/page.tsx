import { cookies } from "next/headers";
import AgentClient from "./AgentClient";
import { login } from "./actions";

export const metadata = { robots: "noindex" };

export default async function AgentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const authed = cookieStore.get("agent_authed")?.value === "1";
  if (authed) return <AgentClient />;

  const params = await searchParams;

  return (
    <div style={{ minHeight: "100vh", background: "#07070d", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ padding: "2.5rem", borderRadius: 16, border: "1px solid rgba(108,99,255,0.25)", background: "rgba(16,16,26,0.95)", width: 340, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔐</div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#6c63ff", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>
          Agent Dashboard
        </h1>
        <p style={{ color: "rgba(238,238,248,0.4)", fontSize: "0.8rem", marginBottom: "1.75rem" }}>swiftoolai.com — AI Content System</p>
        <form action={login}>
          <input
            type="password"
            name="pw"
            placeholder="Enter password"
            autoFocus
            style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: 10, border: "1px solid rgba(108,99,255,0.25)", background: "rgba(0,0,0,0.35)", color: "white", fontSize: "0.9rem", marginBottom: "0.75rem", boxSizing: "border-box", outline: "none", fontFamily: "inherit" }}
          />
          <button type="submit" style={{ width: "100%", padding: "0.7rem", borderRadius: 10, border: "none", background: "#6c63ff", color: "#fff", fontSize: "0.95rem", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>
            Enter →
          </button>
        </form>
        {params.error && (
          <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.75rem" }}>❌ Wrong password</p>
        )}
      </div>
    </div>
  );
}
