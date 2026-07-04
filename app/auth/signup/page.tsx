"use client";
import { Suspense, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUpContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { error: err } = await supabaseBrowser.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/verify-email` },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    router.push("/auth/verify-email?email=" + encodeURIComponent(email));
  };

  return (
    <div style={centeredPage}>
      <div style={card}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#111827" }}>
              Swift<span style={{ color: "#2563eb" }}>Tool</span>
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>AI</span>
            </span>
          </Link>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#111827", textAlign: "center", marginBottom: "0.5rem" }}>
          Create your free account
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, textAlign: "center", marginBottom: "2rem", lineHeight: 1.6 }}>
          Access all 24 AI tools. No credit card required.
        </p>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: "1.25rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
            onKeyDown={e => e.key === "Enter" && handleSignUp()}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            style={inputStyle}
            onKeyDown={e => e.key === "Enter" && handleSignUp()}
          />
        </div>

        <button onClick={handleSignUp} disabled={loading} style={primaryBtn}>
          {loading ? "Creating account…" : "Create free account →"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1.5rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
        </div>

        <Link href="/auth/signin" style={{ display: "block", width: "100%", padding: "13px 20px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, textAlign: "center", fontSize: 14, fontWeight: 600, color: "#374151", textDecoration: "none" }}>
          Sign in with Google instead
        </Link>

        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: "1.5rem", lineHeight: 1.6 }}>
          Already have an account?{" "}
          <Link href="/auth/signin" style={{ color: "#2563eb", fontWeight: 600 }}>Sign in</Link>
        </p>

        <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: "0.75rem", lineHeight: 1.6 }}>
          By signing up you agree to our{" "}
          <Link href="/terms" style={{ color: "#2563eb" }}>Terms</Link> and{" "}
          <Link href="/privacy" style={{ color: "#2563eb" }}>Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div style={centeredPage}><div style={spinner} /></div>}>
      <SignUpContent />
    </Suspense>
  );
}

const centeredPage: React.CSSProperties = { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem", background: "linear-gradient(135deg, #f0f7ff 0%, #f9fafb 50%, #fdf0f0 100%)" };
const card: React.CSSProperties = { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "2.5rem", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: 9, fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box", background: "#fafafa" };
const primaryBtn: React.CSSProperties = { width: "100%", padding: "13px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "opacity 0.15s" };
const spinner: React.CSSProperties = { width: 28, height: 28, border: "3px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" };
