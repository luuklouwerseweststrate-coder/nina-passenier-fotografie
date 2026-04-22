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
  featured2?: FeaturedCase;
  heroTagline?: string;
  heroSubtitel?: string;
  introTekst?: string;
  beschikbaar?: boolean;
  beschikbaarTekst?: string;
  igFeedBedrijf?: string;
  igFeedVrijwerk?: string;
};

export default function HomePageClient({
  businessPhotos,
  artPhotos,
  featured,
  featured2,
}: Props) {
  const bedrijfImg  = businessPhotos[0]?.src || "";
  const vrijImg     = artPhotos[0]?.src || "";
  const project1    = featured;
  const project2    = featured2 ?? featured;

  return (
    <div className="bg-bg min-h-screen">

      {/* ══ HOOFD LAYOUT ══════════════════════════════════════════
          Wit links en rechts, twee kolommen in het midden
      ═══════════════════════════════════════════════════════════ */}
      <div className="px-8 lg:px-16 xl:px-24 py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-4 lg:gap-5">

          {/* ── KOLOM 1: BEDRIJFSFOTOGRAFIE ── */}
          <div className="flex flex-col gap-4 lg:gap-5">

            {/* Klein uitgelicht project bovenaan */}
            <Link
              href={`/cases/${project1.slug}`}
              className="group relative overflow-hidden"
              style={{ aspectRatio: "16/8" }}
            >
              {project1.cover && (
                <Image
                  src={project1.cover}
                  alt={project1.client}
                  fill
                  sizes="40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)" }} />
              <div className="absolute top-4 left-4">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-1">Uitgelicht project</p>
                <p className="text-sm lg:text-base font-bold uppercase text-white leading-tight">{project1.client}</p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/60">Bekijk →</span>
              </div>
            </Link>

            {/* Grote sectie-afbeelding onderaan → gaat naar bedrijfsfotografie */}
            <Link
              href="/bedrijfsfotografie"
              className="group relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              {bedrijfImg && (
                <Image
                  src={bedrijfImg}
                  alt="Bedrijfsfotografie"
                  fill
                  sizes="40vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0) 100%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Commissioned</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase text-white leading-tight">
                  Bedrijfs-<br />fotografie
                </p>
              </div>
            </Link>
          </div>

          {/* ── KOLOM 2: VRIJ WERK ── */}
          <div className="flex flex-col gap-4 lg:gap-5">

            {/* Klein uitgelicht project bovenaan */}
            <Link
              href={`/cases/${project2.slug}`}
              className="group relative overflow-hidden"
              style={{ aspectRatio: "16/8" }}
            >
              {project2.cover && (
                <Image
                  src={project2.cover}
                  alt={project2.client}
                  fill
                  sizes="40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)" }} />
              <div className="absolute top-4 left-4">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-1">Uitgelicht project</p>
                <p className="text-sm lg:text-base font-bold uppercase text-white leading-tight">{project2.client}</p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/60">Bekijk →</span>
              </div>
            </Link>

            {/* Grote sectie-afbeelding onderaan → gaat naar vrij werk */}
            <Link
              href="/vrij-werk"
              className="group relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              {vrijImg && (
                <Image
                  src={vrijImg}
                  alt="Vrij werk"
                  fill
                  sizes="40vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0) 100%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Persoonlijk</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase text-white leading-tight">
                  Vrij werk
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* ══ NAVIGATIELINKS ONDERAAN ═══════════════════════════════ */}
      <div className="px-8 lg:px-16 xl:px-24 pb-10 flex flex-wrap gap-x-8 gap-y-2">
        {[
          { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie" },
          { href: "/vrij-werk",          label: "Vrij werk"          },
          { href: "/cases",              label: "Cases"              },
          { href: "/over",               label: "Over"               },
          { href: "/werkwijze",          label: "Werkwijze"          },
          { href: "/contact",            label: "Contact"            },
        ].map((l) => (
          <Link key={l.href} href={l.href}
            className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors">
            {l.label}
          </Link>
        ))}
      </div>

    </div>
  );
}
