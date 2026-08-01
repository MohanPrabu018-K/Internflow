import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07111f",
          900: "#0b1729",
          800: "#12233c",
        },
        sky: {
          500: "#2b7fff",
          600: "#1f6ae8",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.10)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 20% 20%, rgba(43,127,255,0.14), transparent 28%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.14), transparent 24%), linear-gradient(to bottom, #f8fbff, #eef4fb)",
      },
    },
  },
  plugins: [],
};

export default config;
