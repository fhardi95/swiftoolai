"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

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

        <div style={{ textAlign: "center", fontSize: 48, marginBottom: "1rem" }}>📬</div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.03em", color: "#111827", textAlign: "center", marginBottom: "0.75rem" }}>
          Check your inbox
        </h1>

        <p style={{ color: "#6b7280", fontSize: 14, textAlign: "center", lineHeight: 1.7, marginBottom: "2rem" }}>
          We sent a verification link to <strong style={{ color: "#111827" }}>{email}</strong>.
          Click the link in the email to activate your account.
        </p>

        <div style={{ background: "#f0f7ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "14px 16px", fontSize: 13, color: "#1d4ed8", lineHeight: 1.6, marginBottom: "2rem" }}>
          <strong>Didn't get it?</strong> Check your spam folder, or{" "}
          <Link href="/auth/signup" style={{ color: "#2563eb", fontWeight: 600 }}>try signing up again</Link>.
        </div>

        <Link href="/auth/signin" style={{ display: "block", width: "100%", padding: "13px 20px", background: "#2563eb", color: "#fff", borderRadius: 10, textAlign: "center", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div style={centeredPage}><div style={spinner} /></div>}>
      <VerifyContent />
    </Suspense>
  );
}

const centeredPage: React.CSSProperties = { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem", background: "linear-gradient(135deg, #f0f7ff 0%, #f9fafb 50%, #fdf0f0 100%)" };
const card: React.CSSProperties = { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 18, padding: "2.5rem", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" };
const spinner: React.CSSProperties = { width: 28, height: 28, border: "3px solid #bfdbfe", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" };
