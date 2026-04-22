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

const SECTIONS = [
  { href: "/vrij-werk",          label: "Vrij werk",          category: "Persoonlijk"  },
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie", category: "Commissioned" },
  { href: "/cases",              label: "Cases",              category: "Projecten"    },
  { href: "/over",               label: "Over Nina",          category: "Studio"       },
  { href: "/werkwijze",          label: "Werkwijze",          category: "Aanpak"       },
];

export default function HomePageClient({
  artPhotos,
  businessPhotos,
  ninaPortret,
}: Props) {
  const a = artPhotos;
  const b = businessPhotos;

  const strip = [
    { src: a[0]?.src || "", alt: a[0]?.alt || "",  ...SECTIONS[0] },
    { src: b[0]?.src || "", alt: b[0]?.alt || "",  ...SECTIONS[1] },
    { src: a[1]?.src || a[0]?.src || "", alt: "",  ...SECTIONS[2] },
    { src: ninaPortret,     alt: "Nina Passenier", ...SECTIONS[3] },
    { src: b[1]?.src || b[0]?.src || "", alt: "",  ...SECTIONS[4] },
  ];

  return (
    <div className="bg-bg">

      {/* ══ 5-KOLOMS STRIP — direct onder de nav, vult het scherm ══ */}
      <section
        className="hidden lg:flex border-b border-border"
        style={{ height: "calc(100svh - 48px)" }}
      >
        {strip.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden border-r border-border last:border-r-0"
            style={{ flex: "1 1 0%" }}
          >
            {item.src && (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="20vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            )}

            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-700" />

            {/* Tekst linksboven — precies zoals ACDB */}
            <div className="absolute top-0 left-0 right-0 p-5">
              <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-1.5">
                {item.category}
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white font-light leading-snug">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Mobiel: 2×2 + 1 volledig */}
      <section className="lg:hidden border-b border-border">
        <div className="grid grid-cols-2">
          {strip.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden aspect-[3/4] border-b border-r border-border even:border-r-0"
            >
              {item.src && (
                <Image src={item.src} alt={item.alt} fill sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              )}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-0 left-0 right-0 p-4">
                <p className="text-[7px] uppercase tracking-[0.28em] text-white/40 mb-1">{item.category}</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white font-light">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
        {strip[4] && (
          <Link href={strip[4].href} className="group relative block overflow-hidden aspect-[16/7]">
            {strip[4].src && (
              <Image src={strip[4].src} alt={strip[4].alt} fill sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-0 left-0 right-0 p-4">
              <p className="text-[7px] uppercase tracking-[0.28em] text-white/40 mb-1">{strip[4].category}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white font-light">{strip[4].label}</p>
            </div>
          </Link>
        )}
      </section>

      {/* ══ WIT ERONDER — simpele links zoals ACDB ════════════════ */}
      <div className="px-7 lg:px-12 py-10 flex flex-wrap gap-x-10 gap-y-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors"
          >
            {s.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors"
        >
          Contact
        </Link>
      </div>

    </div>
  );
}
