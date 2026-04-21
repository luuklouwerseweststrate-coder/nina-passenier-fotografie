import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Nina Passenier Fotografie — Bedrijfsfotografie en vrij werk",
  description:
    "Nina Passenier is fotograaf in Rotterdam. Beeld voor bedrijven, portretten, campagnes en autonoom vrij werk. Studie Willem de Kooning, nu kunstacademie.",
  metadataBase: new URL("https://ninapassenier.nl"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Nina Passenier Fotografie",
    description: "Bedrijfsfotografie en vrij werk uit Rotterdam",
    type: "website",
    locale: "nl_NL",
    images: [{ url: "/logo.png", width: 1200, height: 440, alt: "Nina Passenier Fotografie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nina Passenier Fotografie",
    description: "Bedrijfsfotografie en vrij werk uit Rotterdam",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
