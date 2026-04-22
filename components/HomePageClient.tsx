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

const STRIP = [
  { href: "/vrij-werk",          category: "Persoonlijk",  label: "Vrij werk",          color: "#4a7c59" },
  { href: "/bedrijfsfotografie", category: "Commissioned", label: "Bedrijfs-\nfotografie", color: "#c0784a" },
  { href: "/cases",              category: "Projecten",    label: "Cases",              color: "#6b8cba" },
  { href: "/over",               category: "Studio",       label: "Over Nina",          color: "#b5a89a" },
  { href: "/werkwijze",          category: "Aanpak",       label: "Werkwijze",          color: "#8b8680" },
];

const NAV_LINKS = [
  { href: "/vrij-werk",          label: "Vrij werk"          },
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie" },
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
  const images = [
    artPhotos[0]?.src      || "",
    businessPhotos[0]?.src || "",
    artPhotos[1]?.src      || artPhotos[0]?.src || "",
    ninaPortret            || "",
    businessPhotos[1]?.src || businessPhotos[0]?.src || "",
  ];

  return (
    <div className="bg-bg">

      {/* ══ STRIP — vult het volledige scherm, direct onder de nav ══ */}
      <section
        className="flex border-b border-border"
        style={{ height: "calc(100svh - 48px)" }}
      >

        {/* Links: verticale label */}
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
            style={{ flex: "1 1 0%", minWidth: 0 }}
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

            {/* Tekst linksboven — geen overlay, tekst direct op foto */}
            <div className="absolute top-4 left-4 right-4">
              <p className="text-[7px] uppercase tracking-[0.32em] text-white/60 mb-1.5">
                {section.category}
              </p>
              <p
                className="text-xl lg:text-2xl xl:text-3xl font-bold uppercase leading-tight"
                style={{ color: section.color, whiteSpace: "pre-line" }}
              >
                {section.label}
              </p>
            </div>
          </Link>
        ))}

        {/* Rechts: pijl */}
        <div className="hidden lg:flex flex-col items-center justify-center border-l border-border px-1.5 shrink-0 w-7">
          <span className="text-muted text-lg leading-none">›</span>
        </div>

      </section>

      {/* ══ WIT ERONDER — simpele navigatielinks ════════════════════ */}
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
