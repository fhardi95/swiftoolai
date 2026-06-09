import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="110" height="130" viewBox="0 0 20 24" fill="none">
          <path d="M14 0 L4 13 L9 13 L6 24 L16 11 L11 11 Z" fill="white" opacity="0.95"/>
        </svg>
        <div style={{
          position: "absolute", top: 18, right: 22,
          width: 28, height: 28, borderRadius: "50%", background: "#facc15",
        }} />
      </div>
    ),
    { ...size }
  );
}
