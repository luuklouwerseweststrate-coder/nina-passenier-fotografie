import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

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
    <html lang="nl" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <Navigation />
        <main className="pt-20 lg:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
