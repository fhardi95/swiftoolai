// SERVER COMPONENT — exports metadata (no "use client")
import type { Metadata } from "next";
import WordUnscramblerClient from "./WordUnscramblerClient";

export const metadata: Metadata = {
  title: "Word Unscrambler - Unscramble Letters To Find Words",
  description:
    "Word Unscrambler is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble.",
  keywords: [
    "word unscrambler",
    "unscramble words",
    "unscramble letters",
    "word unscrambler free",
    "scrabble word finder",
    "words with friends cheat",
    "wordle helper",
    "anagram solver",
    "wordscapes solver",
    "word descrambler",
    "unscramble word game helper",
    "text twist solver",
    "word cookies solver",
    "wordfeud helper",
    "scrambled word solver",
  ],
  openGraph: {
    title: "Free Word Unscrambler — Solve Scrambled Words Instantly",
    description:
      "Unscramble any set of letters into valid words. Perfect for Scrabble, Wordle, Words with Friends, and more. Free, instant, no sign-up.",
    url: "https://www.swiftoolai.com/tools/word-unscrambler",
    siteName: "SwiftToolAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word Unscrambler — Solve Scrambled Words Instantly",
    description:
      "Unscramble any set of letters into valid words. Perfect for Scrabble, Wordle & more. Free, no sign-up.",
  },
  alternates: {
    canonical: "https://www.swiftoolai.com/tools/word-unscrambler",
  },
};

export default function WordUnscramblerPage() {
  return <WordUnscramblerClient />;
}
