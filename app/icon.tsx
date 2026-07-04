import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "linear-gradient(135deg, #6c63ff, #4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Lightning bolt */}
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path d="M14 0 L4 13 L9 13 L6 24 L16 11 L11 11 Z" fill="white" opacity="0.95"/>
        </svg>
        {/* Yellow dot */}
        <div style={{
          position: "absolute", top: 3, right: 4,
          width: 5, height: 5, borderRadius: "50%", background: "#facc15",
        }} />
      </div>
    ),
    { ...size }
  );
}
