import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4FF00",
          hover: "#BFE600",
        },
        teal: {
          DEFAULT: "#00897B",
          hover: "#00796B",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        xs:   ["12px", { lineHeight: "16px" }],
        sm:   ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg:   ["18px", { lineHeight: "28px" }],
        xl:   ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
      },
      borderRadius: {
        sm:      "4px",
        DEFAULT: "8px",
        md:      "8px",
        lg:      "12px",
        xl:      "16px",
      },
      boxShadow: {
        sm:      "0px 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        md:      "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg:      "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl:      "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "stack-1": "stack-hover-1 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "stack-2": "stack-hover-2 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "stack-3": "stack-hover-3 350ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        "stack-hover-1": {
          "0%":   { transform: "translate(0, 0) rotate(0deg)" },
          "100%": { transform: "translate(-8px, -6px) rotate(-4deg)" },
        },
        "stack-hover-2": {
          "0%":   { transform: "translate(0, 0) rotate(0deg)" },
          "100%": { transform: "translate(6px, -3px) rotate(2deg)" },
        },
        "stack-hover-3": {
          "0%":   { transform: "translate(0, 0) rotate(0deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
