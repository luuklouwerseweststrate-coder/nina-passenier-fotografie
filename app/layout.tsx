import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Nina Passenier Fotografie &mdash; Bedrijfsfotografie en vrij werk",
  description:
    "Nina Passenier is fotograaf in Rotterdam. Beeld voor merken, portretten, campagnes en autonoom vrij werk. Studie Willem de Kooning, nu kunstacademie.",
  metadataBase: new URL("https://ninapassenier.nl"),
  openGraph: {
    title: "Nina Passenier Fotografie",
    description: "Bedrijfsfotografie en vrij werk uit Rotterdam",
    type: "website",
    locale: "nl_NL"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
