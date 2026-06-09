import type { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Free Color Picker — HEX, RGB & HSL Converter | SwiftToolAI",
  description:
    "Pick any colour and instantly get HEX, RGB, and HSL values. Copy CSS code, find complementary colours, and browse colour palettes. Free, no sign-up.",
  keywords: [
    "color picker",
    "colour picker",
    "hex to rgb",
    "rgb to hex",
    "color converter",
    "hex color picker",
    "css color picker",
    "hsl converter",
    "colour code picker",
    "online color picker",
  ],
  openGraph: {
    title: "Free Color Picker — HEX, RGB & HSL | SwiftToolAI",
    description: "Pick colours and convert between HEX, RGB, and HSL instantly. Copy CSS code with one click.",
    url: "https://www.swiftoolai.com/tools/color-picker",
    siteName: "SwiftToolAI",
    type: "website",
  },
  alternates: { canonical: "https://www.swiftoolai.com/tools/color-picker" },
};

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}
