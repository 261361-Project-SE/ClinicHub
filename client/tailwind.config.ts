import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "shadow-bg": "0 4px 20px 0 rgba(0,0,0,0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-pink":
          "linear-gradient(-117deg, theme('colors.pink-300'), theme('colors.pink-200'))",
      },
      colors: {
        "pink-200": "#FB6F92",
        "pink-300": "#FFC2D1",
      },
    },
  },
  plugins: [],
};
export default config;
