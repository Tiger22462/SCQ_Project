/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "6/10": "60%",
        "4/10": "40%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        dark: {
          300: "#141736",
          200: "rgba(83, 85, 107, 1)",
          100: "rgba(20, 23, 54, 0.5)",
        },
        grey: {
          100: "rgba(213, 215, 229, 1)",
        },
        whiteopa: {
          800: "rgba(255, 255, 255, 0.8)",
          500: "rgba(255, 255, 255, 0.5)",
        },
        froly: {
          50: "#fff1f2",
          100: "#fee5e7",
          200: "#fccfd5",
          300: "#faa7b3",
          400: "#f77d91",
          500: "#ee4565",
          600: "#db234f",
          700: "#b81842",
          800: "#9a173d",
          900: "#84173a",
          950: "#4a071b",
        },
      },
    },

    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    screens: {
      phone: "375px", // 375-599 phone
      tablet: "600px", // 600-1023 tablet
      laptop: "1024px", // 1024-1279 labtop
      desktop: "1280px", // more than 1280
    },
  },
  plugins: [],
}
