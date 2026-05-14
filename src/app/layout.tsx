import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { CouponProvider } from "@/context/CouponContext";
import { DiscountPopup } from "@/components/popup/DiscountPopup";
import { SharedCanvas } from "@/components/three/SharedCanvas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seekhoai.pk"),
  title: "SeekhoAI — Complete AI Bootcamp | Master AI. Build the future.",
  description:
    "Join 24,318+ students learning Prompt Engineering, ChatGPT, MidJourney, and Vibe Coding. Self-paced. Lifetime access. From one of the world's top-rated AI instructors.",
  keywords: [
    "AI course",
    "Prompt Engineering",
    "ChatGPT",
    "MidJourney",
    "Vibe Coding",
    "AI Bootcamp",
    "SeekhoAI",
    "learn AI Pakistan",
  ],
  authors: [{ name: "SeekhoAI" }],
  openGraph: {
    title: "SeekhoAI — Complete AI Bootcamp",
    description:
      "Master Prompt Engineering, ChatGPT, MidJourney & Vibe Coding. 24,318+ students. Lifetime access.",
    type: "website",
    url: "https://seekhoai.pk",
    siteName: "SeekhoAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeekhoAI — Complete AI Bootcamp",
    description:
      "Master Prompt Engineering, ChatGPT, MidJourney & Vibe Coding. 24,318+ students.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body className="bg-base text-text-primary">
        <CouponProvider>
          <LenisProvider>
            <SharedCanvas />
            {children}
            <DiscountPopup />
          </LenisProvider>
        </CouponProvider>
      </body>
    </html>
  );
}
