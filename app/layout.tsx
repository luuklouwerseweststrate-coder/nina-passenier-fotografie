import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nina Passenier — Fotografie",
  description:
    "Nina Passenier is fotograaf in Rotterdam. Bedrijfsfotografie voor merken en organisaties, en autonoom vrij werk.",
  metadataBase: new URL("https://ninapassenier.nl"),
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Nina Passenier — Fotografie",
    description: "Bedrijfsfotografie en vrij werk vanuit Rotterdam",
    type: "website",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nina Passenier — Fotografie",
    description: "Bedrijfsfotografie en vrij werk vanuit Rotterdam",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={spaceGrotesk.variable}>
      <body className="font-sans bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
