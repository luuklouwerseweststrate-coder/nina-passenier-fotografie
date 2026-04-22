"use client";

import Image from "next/image";
import Link from "next/link";

type Photo = { src: string; alt: string };
type FeaturedCase = { cover: string; client: string; intro: string; slug: string };

type Props = {
  heroImage: string;
  businessPhoto: string;
  artPhoto: string;
  businessPhotos: Photo[];
  artPhotos: Photo[];
  ninaPortret: string;
  heroStrip: Photo[];
  featured: FeaturedCase;
  heroTagline?: string;
  heroSubtitel?: string;
  introTekst?: string;
  beschikbaar?: boolean;
  beschikbaarTekst?: string;
  igFeedBedrijf?: string;
  igFeedVrijwerk?: string;
};

// Ongelijke kolommen — groot | groot | klein | klein (zoals ACDB)
const STRIP = [
  { href: "/bedrijfsfotografie", category: "Commissioned", label: "Bedrijfs-\nfotografie", flex: 2.6 },
  { href: "/vrij-werk",          category: "Persoonlijk",  label: "Vrij werk",             flex: 2.2 },
  { href: "/over",               category: "Studio",       label: "Over Nina",             flex: 1.2 },
  { href: "/werkwijze",          category: "Aanpak",       label: "Werkwijze",             flex: 1.0 },
];

const NAV_LINKS = [
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie" },
  { href: "/vrij-werk",          label: "Vrij werk"          },
  { href: "/cases",              label: "Cases"              },
  { href: "/over",               label: "Over"               },
  { href: "/werkwijze",          label: "Werkwijze"          },
  { href: "/contact",            label: "Contact"            },
];

export default function HomePageClient({
  artPhotos,
  businessPhotos,
  ninaPortret,
}: Props) {
  // Volgorde matcht STRIP: bedrijf, vrij, over, werkwijze
  const images = [
    businessPhotos[0]?.src || "",
    artPhotos[0]?.src      || "",
    ninaPortret            || "",
    businessPhotos[1]?.src || businessPhotos[0]?.src || "",
  ];

  return (
    <div className="bg-bg">

      {/* ══ RUIMTE BOVEN DE STRIP — wit, zoals ACDB ════════════════ */}
      <div style={{ height: "clamp(28px, 4vh, 48px)" }} />

      {/* ══ STRIP ══════════════════════════════════════════════════ */}
      <section
        className="flex border-t border-b border-border mx-0"
        style={{ height: "clamp(360px, 55vh, 500px)" }}
      >
        {/* Verticale label links */}
        <div className="hidden lg:flex flex-col items-center justify-center border-r border-border px-2 shrink-0 w-7">
          <span
            className="text-[7px] uppercase tracking-[0.4em] text-muted whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Uitgelichte projecten
          </span>
        </div>

        {/* 5 kolommen */}
        {STRIP.map((section, i) => (
          <Link
            key={section.href}
            href={section.href}
            className="group relative overflow-hidden border-r border-border last:border-r-0"
            style={{ flex: `${section.flex} 1 0%`, minWidth: 0 }}
          >
            {images[i] && (
              <Image
                src={images[i]}
                alt={section.label.replace("\n", " ")}
                fill
                sizes="20vw"
                className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
              />
            )}

            {/* Donkere gradient bovenin zodat tekst altijd leesbaar is */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 100%)" }}
            />

            {/* Tekst linksboven */}
            <div className="absolute top-4 left-4 right-4">
              <p className="text-[7px] uppercase tracking-[0.32em] text-white/60 mb-2">
                {section.category}
              </p>
              <p
                className="text-xl lg:text-2xl xl:text-3xl font-bold uppercase leading-tight text-white"
                style={{ whiteSpace: "pre-line" }}
              >
                {section.label}
              </p>
            </div>
          </Link>
        ))}

        {/* Pijl rechts */}
        <div className="hidden lg:flex flex-col items-center justify-center border-l border-border px-1.5 shrink-0 w-7">
          <span className="text-muted text-lg leading-none">›</span>
        </div>
      </section>

      {/* ══ WIT ERONDER — navigatielinks ═══════════════════════════ */}
      <div className="px-7 lg:px-10 py-6 flex flex-wrap gap-x-8 gap-y-2">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

    </div>
  );
}
