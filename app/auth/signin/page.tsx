"use client";
import { Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function SignInContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace(callbackUrl);
  }, [status, router, callbackUrl]);

  const handleGoogle = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl });
  };

  if (status === "loading" || status === "authenticated") {
    return <div style={centeredPage}><div style={spinner} /></div>;
  }

  return (
    <div style={centeredPage}>
      <div style={card}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#111827" }}>
              Swift<span style={{ color: "#2563eb" }}>Tool</span>
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>AI</span>
            </span>
          </Link>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#111827", textAlign: "center", marginBottom: "0.5rem" }}>
          Sign in to continue
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, textAlign: "center", marginBottom: "2rem", lineHeight: 1.6 }}>
          Create a free account to access all 24 AI tools. No credit card required.
        </p>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: "1.25rem", textAlign: "center" }}>
            {error === "OAuthSignin" && "Could not start Google sign-in. Please try again."}
            {error === "OAuthCallback" && "Google sign-in failed. Please try again."}
            {error === "AccessDenied" && "Access denied. Please try again."}
            {!["OAuthSignin", "OAuthCallback", "AccessDenied"].includes(error) && "Sign-in error. Please try again."}
          </div>
        )}

        <button onClick={handleGoogle} disabled={loading} style={{ width: "100%", padding: "13px 20px", background: loading ? "#f3f4f6" : "#ffffff", border: "1.5px solid #e5e7eb", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 15, fontWeight: 600, color: "#111827", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.borderColor = "#2563eb"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
        >
          {loading ? (
            <div style={{ width: 18, height: 18, border: "2px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {loading ? "Signing in…" : "Continue with Google"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1.5rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>Free membership includes</span>
          <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[["⚡", "24 free AI tools"], ["📊", "Usage dashboard"], ["🔒", "Private & secure"], ["🆓", "Always free"]].map(([icon, label]) => (
            <div key={label} style={{ background: "#f9fafb", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: "1.5rem", lineHeight: 1.6 }}>
          By signing in you agree to our{" "}
          <Link href="/terms" style={{ color: "#2563eb" }}>Terms</Link> and{" "}
          <Link href="/privacy" style={{ color: "#2563eb" }}>Privacy Policy</Link>.
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={centeredPage}><div style={spinner} /></div>}>
      <SignInContent />
    </Suspense>
  );
}

const centeredPage: React.CSSProperties = { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem", background: "linear-gradient(135deg, #f0f7ff 0%, #f9fafb 50%, #fdf0f0 100%)" };
const card: React.CSSProperties = { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "2.5rem", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" };
const spinner: React.CSSProperties = { width: 28, height: 28, border: "3px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" };
