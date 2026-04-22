"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  { href: "/vrij-werk",          label: "Vrij werk",          category: "Persoonlijk",  key: "vrij"    },
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie", category: "Commissioned", key: "bedrijf" },
  { href: "/cases",              label: "Cases",              category: "Projecten",    key: "cases"   },
  { href: "/over",               label: "Over Nina",          category: "Studio",       key: "over"    },
  { href: "/werkwijze",          label: "Werkwijze",          category: "Aanpak",       key: "aanpak"  },
];

export default function HomePageClient({
  artPhotos,
  businessPhotos,
  ninaPortret,
  featured,
  beschikbaar = true,
  beschikbaarTekst,
}: Props) {
  const a = artPhotos;
  const b = businessPhotos;

  const strip = [
    { src: a[0]?.src || "", alt: a[0]?.alt || "Vrij werk",           ...SECTIONS[0] },
    { src: b[0]?.src || "", alt: b[0]?.alt || "Bedrijfsfotografie",  ...SECTIONS[1] },
    { src: a[1]?.src || a[0]?.src || "", alt: "Cases",               ...SECTIONS[2] },
    { src: ninaPortret,     alt: "Nina Passenier",                    ...SECTIONS[3] },
    { src: b[1]?.src || b[0]?.src || "", alt: "Werkwijze",           ...SECTIONS[4] },
  ];

  return (
    <div className="bg-bg">

      {/* ══ INTRO — veel wit boven de vouw ════════════════════════ */}
      <section
        className="px-7 lg:px-12 flex flex-col justify-between"
        style={{ height: "calc(100svh - 48px - 72px)", minHeight: "380px" }}
      >
        <div className="pt-14 lg:pt-20">
          {beschikbaar && (
            <div className="flex items-center gap-2 mb-10 lg:mb-14">
              <span className="w-1.5 h-1.5 rounded-full bg-free" />
              <span className="text-[8px] uppercase tracking-[0.28em] text-ink/35">
                {beschikbaarTekst || "Beschikbaar voor opdrachten"}
              </span>
            </div>
          )}

          <h1 className="text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] text-ink tracking-tight">
            Nina<br />Passenier
          </h1>

          <p className="mt-5 lg:mt-7 text-sm text-ink/35 font-light max-w-[240px] leading-relaxed">
            Fotograaf in Rotterdam
          </p>
        </div>

        {/* Scroll hint */}
        <div className="pb-4 flex items-center gap-3">
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-7 bg-border"
          />
          <span className="text-[7px] uppercase tracking-[0.35em] text-faint">Scroll</span>
        </div>
      </section>

      {/* ══ 5-KOLOMS STRIP — ACDB stijl, verticaal bereikbaar ════ */}

      {/* Desktop: 5 kolommen naast elkaar */}
      <section className="hidden lg:flex border-t border-border" style={{ height: "90vh" }}>
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

            {/* Tekst — ACDB stijl: boven */}
            <div className="absolute top-0 left-0 right-0 p-5">
              <p className="text-[7px] uppercase tracking-[0.32em] text-white/45 mb-1.5">
                {item.category}
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white font-light leading-snug">
                {item.label}
              </p>
            </div>

            {/* Pijl hover */}
            <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Mobiel: 2×2 grid + 1 volledig */}
      <section className="lg:hidden border-t border-border">
        <div className="grid grid-cols-2">
          {strip.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden aspect-[3/4] border-b border-r border-border last:border-r-0"
            >
              {item.src && (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
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
          <Link
            href={strip[4].href}
            className="group relative block overflow-hidden aspect-[16/7] border-b border-border"
          >
            {strip[4].src && (
              <Image
                src={strip[4].src}
                alt={strip[4].alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-0 left-0 right-0 p-4">
              <p className="text-[7px] uppercase tracking-[0.28em] text-white/40 mb-1">{strip[4].category}</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white font-light">{strip[4].label}</p>
            </div>
          </Link>
        )}
      </section>

      {/* ══ CONTACT STRIP ═════════════════════════════════════════ */}
      <div className="px-7 lg:px-12 py-8 border-t border-border flex items-center justify-between">
        <p className="text-[8px] uppercase tracking-[0.28em] text-faint">
          Nina Passenier — Rotterdam
        </p>
        <Link
          href="/contact"
          className="text-[8px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors"
        >
          Contact →
        </Link>
      </div>

    </div>
  );
}
