import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        elevated: "var(--bg-elevated)",
        subtle: "var(--bg-subtle)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "accent-warm": "var(--accent-warm)",
        "accent-warm-2": "var(--accent-warm-2)",
        "accent-cool": "var(--accent-cool)",
        "accent-cool-2": "var(--accent-cool-2)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.5rem, 8vw, 8rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 5vw, 5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
      },
      maxWidth: {
        content: "1152px",
      },
      backgroundImage: {
        "radial-warm":
          "radial-gradient(ellipse at top right, rgba(255, 107, 53, 0.18), transparent 60%)",
        "radial-cool":
          "radial-gradient(ellipse at bottom left, rgba(74, 158, 255, 0.12), transparent 60%)",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
