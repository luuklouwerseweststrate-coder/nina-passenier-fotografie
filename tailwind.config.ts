import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutraal palette — foto's zijn de kleur, UI trekt zich terug
        bg:      "#F7F6F3",  // warme off-white (ACDB-achtig)
        ink:     "#141414",  // bijna-zwart
        muted:   "#8B8680",  // warme middengrijs
        faint:   "#C4C0BA",  // lichte grijs
        border:  "#E5E2DC",  // warme lichte rand
        surface: "#ECEAE5",  // iets donkerder vlak

        // Categorie-accenten — klein, terughoudend, alleen als tekstlabel
        commerce: "#9C4916",  // gedempte terra / rust
        free:     "#365449",  // gedempte forest / slate-green
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label:   "0.14em",
        wide:    "0.22em",
        xl:      "0.35em",
        display: "-0.02em", // bestaande pagina's gebruiken dit nog
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
    },
  },
  plugins: [],
};

export default config;
