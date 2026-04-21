import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Uit het logo afgeleid
        nina: {
          oranje: "#E8913A",
          geel: "#E8B544",
          groen: "#8FA368",
          petrol: "#3E6773",
          beige: "#C9A988",
          cream: "#FAF7F2",
          ink: "#1A1A1A"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "DM Serif Display", "Georgia", "serif"]
      },
      letterSpacing: {
        display: "-0.02em"
      }
    }
  },
  plugins: []
};

export default config;
