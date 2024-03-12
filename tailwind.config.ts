import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      "2xsm": "150px",
      xsm: "300px",
      sm: "450px",
      md: "680px",
      md2: "850px",
      lg: "1200px",
      lg2: "1500px",
      fhd: "1900px",
      "2k": "2000px",
      "4k": "3800px",
    },
    extend: {
      minHeight: {
        "80dvh": "80dvh",
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      fontFamily: {
        main: '"Inria Sans", sans-serif',
      },
      spacing: {
        "60vh": "60vh",
        "110": "32rem",
        "116": "36rem",
        "128": "40rem",
        "138": "48rem",
        "142": "52rem",
        "148": "56rem",
        "152": "60rem",
        "200": "100rem",
        "10dvh": "10dvh",
        "60dvh": "60dvh",
        "70dvh": "70dvh",
        "80dvh": "80dvh",
        big: "55rem",
        nav: "52rem",
        "550px": "550px",
        "6rem": "6rem",
        snackbarTop: "85%",
        "10percent": "10%",
        "20percent": "20%",
        "25percent": "25%",
        "30percent": "30%",
        "35percent": "35%",
        "40percent": "40%",
        "50percent": "50%",
        "60percent": "60%",
        "70percent": "70%",
        "80percent": "80%",
        "90percent": "90%",
        "100percent": "100%",
      },
      zIndex: {
        "1000": "1000",
      },
      boxShadow: {
        headerLightShadow:
          "-4px 4px 8px rgba(196, 196, 196, 0.2), 4px -4px 8px rgba(196, 196, 196, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.9), 4px 4px 10px rgba(196, 196, 196, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(196, 196, 196, 0.5)",
        headerDarkShadow:
          "-4px 4px 8px rgba(41, 41, 41, 0.2), 4px -4px 8px rgba(41, 41, 41, 0.2), -4px -4px 8px rgba(55, 55, 55, 0.9), 4px 4px 10px rgba(41, 41, 41, 0.9), inset 1px 1px 2px rgba(55, 55, 55, 0.3), inset -1px -1px 2px rgba(41, 41, 41, 0.5)",
        profileShadow:
          "1px 1px 2px rgba(250, 250, 250, 0.3), -1px -1px 2px rgba(184, 184, 184, 0.5), inset -4px 4px 8px rgba(184, 184, 184, 0.2), inset 4px -4px 8px rgba(184, 184, 184, 0.2), inset -4px -4px 8px rgba(250, 250, 250, 0.9), inset 4px 4px 10px rgba(184, 184, 184, 0.9)",
        outShadow:
          "-4px 4px 8px rgba(202, 202, 202, 0.2), 4px -4px 8px rgba(202, 202, 202, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.9), 4px 4px 10px rgba(202, 202, 202, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(202, 202, 202, 0.5)",
        normal: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        productLightShadow:
          "-4px 4px 8px rgba(202, 202, 202, 0.2), 4px -4px 8px rgba(202, 202, 202, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.9), 4px 4px 10px rgba(202, 202, 202, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(202, 202, 202, 0.5)",
        productDarkShadow:
          "-4px 4px 8px rgba(41, 41, 41, 0.2), 4px -4px 8px rgba(41, 41, 41, 0.2), -4px -4px 8px rgba(55, 55, 55, 0.9), 4px 4px 10px rgba(41, 41, 41, 0.9), inset 1px 1px 2px rgba(55, 55, 55, 0.3), inset -1px -1px 2px rgba(41, 41, 41, 0.5)",
      },
      borderRadius: {
        regular: "10px",
        small: "5px",
      },
      colors: {
        main: "rgb(35, 101, 186)",
        darkMain: "rgb(18, 51, 94)",
        error: "rgba(210, 58, 58, 1)",
        success: "#229E2E",
        warning: "rgb(209, 155, 51)",
        light: "#eeeeee",
        dark: "#292929",
        coverDark: "#303030",
        darkMenu: "#333333",
        coverLight: "#E7E7E7",
        cardHover: "rgba(0, 0, 0, 0.75)",
        borderError: "rgb(255, 122, 122)",
        borderSuccess: "#51D446",
        borderWarning: "rgb(255, 198, 53)",
        borderMain: "rgb(20, 65, 122)",
        offDark: "rgba(255, 255, 255, .1)",
        offLight: "rgba(0, 0, 0, .1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
