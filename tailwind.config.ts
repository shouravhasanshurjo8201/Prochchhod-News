import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d2427",
        paper: "#f7f6f2",
        accent: "#b52c32",
        muted: "#707779",
        line: "#deded8",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-hind)", "sans-serif"],
        bengali: ["var(--font-hind)", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 16px 40px rgba(29, 36, 39, .08)",
      },
    },
  },
  plugins: [],
};

export default config;
