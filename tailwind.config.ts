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
        ivory: "#FDF6EE",
        peach: {
          pale: "#FFF4EE",
          light: "#FFE4D0",
          DEFAULT: "#F4956A",
          dark: "#D46040",
        },
        paw: {
          light: "#FFDDE5",
          DEFAULT: "#E8839A",
          dark: "#C85070",
        },
        sage: {
          light: "#D8EDD1",
          DEFAULT: "#7DAF68",
          dark: "#4D7A42",
        },
        caramel: {
          light: "#F5E6D5",
          DEFAULT: "#C4874B",
          dark: "#8A5A2A",
        },
        latte: {
          pale: "#F5EDE8",
          light: "#A67C5B",
          DEFAULT: "#5C3D2E",
          dark: "#3D2518",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-sm": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        float: "float 3.5s ease-in-out infinite",
        "float-sm": "float-sm 2.5s ease-in-out infinite",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
