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

export default function HomePageClient({ businessPhotos, artPhotos, featured, featured2 }: Props) {
  const bedrijfImg = businessPhotos[0]?.src || "";
  const vrijImg    = artPhotos[0]?.src || "";
  const proj1      = featured;
  const proj2      = featured2 ?? featured;

  return (
    <div className="bg-bg">

      {/* ══ WIT + CONTAINER MET PADDING ══════════════════════════ */}
      <div className="px-8 lg:px-20 xl:px-28 pt-8 pb-12">
        <div className="grid grid-cols-2 gap-3 lg:gap-4">

          {/* ── LINKER KOLOM: BEDRIJFSFOTOGRAFIE ── */}
          <div className="flex flex-col gap-3 lg:gap-4">

            {/* Klein uitgelicht project — duidelijk kleiner */}
            <Link href={`/cases/${proj1.slug}`} className="group relative overflow-hidden block" style={{ aspectRatio: "16/6" }}>
              {proj1.cover && (
                <Image src={proj1.cover} alt={proj1.client} fill sizes="45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-1.5">Uitgelicht project</p>
                <p className="text-xs lg:text-sm font-bold uppercase text-white leading-snug tracking-wide">{proj1.client}</p>
              </div>
              <div className="absolute top-3 right-4 text-[8px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors">
                Bekijk →
              </div>
            </Link>

            {/* Grote sectieafbeelding — dominant */}
            <Link href="/bedrijfsfotografie" className="group relative overflow-hidden block" style={{ aspectRatio: "3/4" }}>
              {bedrijfImg && (
                <Image src={bedrijfImg} alt="Bedrijfsfotografie" fill sizes="45vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]" />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0) 100%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Commissioned</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase text-white leading-[1.05]">
                  Bedrijfs-<br />fotografie
                </p>
              </div>
            </Link>
          </div>

          {/* ── RECHTER KOLOM: VRIJ WERK ── */}
          <div className="flex flex-col gap-3 lg:gap-4">

            {/* Klein uitgelicht project */}
            <Link href={`/cases/${proj2.slug}`} className="group relative overflow-hidden block" style={{ aspectRatio: "16/6" }}>
              {proj2.cover && (
                <Image src={proj2.cover} alt={proj2.client} fill sizes="45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-1.5">Uitgelicht project</p>
                <p className="text-xs lg:text-sm font-bold uppercase text-white leading-snug tracking-wide">{proj2.client}</p>
              </div>
              <div className="absolute top-3 right-4 text-[8px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors">
                Bekijk →
              </div>
            </Link>

            {/* Grote sectieafbeelding */}
            <Link href="/vrij-werk" className="group relative overflow-hidden block" style={{ aspectRatio: "3/4" }}>
              {vrijImg && (
                <Image src={vrijImg} alt="Vrij werk" fill sizes="45vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]" />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0) 100%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Persoonlijk</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase text-white leading-[1.05]">
                  Vrij werk
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* ══ LINKS ONDERAAN ═══════════════════════════════════════ */}
      <div className="px-8 lg:px-20 xl:px-28 pb-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-5">
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
