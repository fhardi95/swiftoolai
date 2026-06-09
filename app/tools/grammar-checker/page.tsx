import ToolLayout from "../../_components/ToolLayout";

const systemPrompt = `You are an expert editor and grammar checker. The user will provide text. Your task:
1. Fix all grammar, spelling, punctuation, and style errors
2. Improve clarity and flow where needed
3. Keep the original meaning and voice intact
4. Output the corrected text followed by a brief "Changes made:" section listing the key fixes.
Output format:
[Corrected text]

---
Changes made:
- [list of fixes]`;

export default function GrammarCheckerPage() {
  return (
    <ToolLayout
      title="AI Grammar Checker"
      description="Fix grammar, spelling, punctuation, and style errors instantly. Paste your text and get a clean, corrected version with a summary of changes."
      inputPlaceholder="Paste your text here — emails, essays, blog posts, social captions, anything you want to polish."
      systemPrompt={systemPrompt}
      outputLabel="Corrected text + changes"
      maxChars={1500}
    />
  );
}
