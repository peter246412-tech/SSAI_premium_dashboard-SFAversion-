import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ssai: {
          ink: "#111827",
          muted: "#64748b",
          line: "#e2e8f0",
          panel: "#ffffff",
          blue: "#2563eb",
          green: "#16a34a",
          yellow: "#eab308",
          orange: "#f97316",
          red: "#dc2626",
        },
      },
      boxShadow: {
        card: "0 10px 24px rgba(15, 23, 42, 0.07)",
      },
    },
  },
  plugins: [],
} satisfies Config;
