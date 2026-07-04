import type { Metadata } from "next";
import ClaudeSonnetChat from "./ClaudeSonnetChat";

export const metadata: Metadata = {
  title: "Chat with Claude Sonnet 4.6 | SwiftToolAI",
  description: "Chat with Claude Sonnet 4.6 by Anthropic for free. Great for writing, coding, analysis, and complex reasoning.",
};

export default function ClaudeSonnetPage() {
  return <ClaudeSonnetChat />;
}
