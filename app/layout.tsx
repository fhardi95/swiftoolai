import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import AuthProvider from "./_components/AuthProvider";

export const metadata: Metadata = {
  title: { default: "SwiftToolAI – Free AI Tools Online", template: "%s | SwiftToolAI" },
  description:
    "Free AI-powered tools for writing, content creation, and productivity. Rewrite text, generate bios, check grammar — all in one place.",
  keywords: [
    "AI tools", "free AI tools", "AI writing tools", "text rewriter",
    "bio generator", "grammar checker", "word counter", "AI summarizer", "paraphrasing tool",
  ],
  metadataBase: new URL("https://www.swiftoolai.com"),
  openGraph: {
    type: "website",
    siteName: "SwiftToolAI",
    title: "SwiftToolAI – Free AI Tools Online",
    description: "Free AI-powered tools for writing, content creation, and productivity.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-0S6FRWW5K0" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0S6FRWW5K0');
          `,
        }}
      />
      <body>
        {/* AuthProvider wraps everything so useSession() works in all client components */}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
