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

export default function HomePageClient({ businessPhotos, artPhotos }: Props) {
  const bedrijfImg = businessPhotos[0]?.src || "";
  const vrijImg    = artPhotos[0]?.src || "";

  return (
    <div className="bg-white">

      <div className="relative" style={{ paddingTop: "4vh", paddingBottom: "4vh" }}>

        {/* ══ 2 KOLOMMEN ══════════════════════════════════════════ */}
        <section
          className="flex gap-4 lg:gap-6"
          style={{ height: "58vh", minHeight: "360px" }}
        >

          {/* Verticale label */}
          <div className="hidden lg:flex flex-col items-center justify-center w-7 shrink-0">
            <span
              className="text-[7px] uppercase tracking-[0.4em] text-muted whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Uitgelichte projecten
            </span>
          </div>

          {/* ── Kolom 1: Bedrijfsfotografie ── */}
          <div className="relative overflow-hidden" style={{ flex: "1 1 0%" }}>
            <Link href="/bedrijfsfotografie" className="group block absolute inset-0">
              {bedrijfImg && (
                <Image src={bedrijfImg} alt="Bedrijfsfotografie" fill sizes="50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]" />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Commissioned</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase text-white leading-[1.05]">
                  Bedrijfs-<br />fotografie
                </p>
              </div>
            </Link>
          </div>

          {/* ── Kolom 2: Autonoom werk ── */}
          <div className="relative overflow-hidden" style={{ flex: "1 1 0%" }}>
            <Link href="/vrij-werk" className="group block absolute inset-0">
              {vrijImg && (
                <Image src={vrijImg} alt="Autonoom werk" fill sizes="50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]" />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Persoonlijk</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase text-white leading-[1.05]">
                  Autonoom<br />werk
                </p>
              </div>
            </Link>
          </div>

          {/* Pijl rechts */}
          <div className="hidden lg:flex flex-col items-center justify-center w-7 shrink-0">
            <span className="text-muted text-lg leading-none">›</span>
          </div>

        </section>
      </div>

      {/* ══ NAVIGATIELINKS ════════════════════════════════════════ */}
      <div className="px-8 lg:px-12 py-6 border-t border-border flex flex-wrap gap-x-8 gap-y-2">
        {[
          { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie" },
          { href: "/vrij-werk",          label: "Autonoom werk"      },
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
