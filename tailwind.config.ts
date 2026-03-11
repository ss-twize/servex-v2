import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sx: {
          deep: "#050A0A",
          card: "#111B1E",
          surface: "#1A2A2D",
          border: "#2A4A47",
          cream: "#EEFCF9",
          secondary: "#94B8B4",
          muted: "#6A8E8A",
          accent: "#00F090",
          "accent-hover": "#00D47E",
          "accent-dim": "rgba(0,240,144,0.12)",
          hot: "#FF3B3B",
        },
      },
      fontFamily: {
        heading: ["var(--font-unbounded)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
