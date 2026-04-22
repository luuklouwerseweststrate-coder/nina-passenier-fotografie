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

      {/* Wrapper — overflow visible zodat thumbnails eronder hangen */}
      <div className="relative" style={{ paddingBottom: "22vh", paddingTop: "4vh" }}>

        {/* ══ ACDB STRIP: 2 grote kolommen ══════════════════════════ */}
        <section
          className="flex gap-4 lg:gap-6 border-t border-b border-border"
          style={{ height: "58vh", minHeight: "360px", overflow: "visible" }}
        >

          {/* Verticale label */}
          <div className="hidden lg:flex flex-col items-center justify-center border-r border-border w-7 shrink-0">
            <span
              className="text-[7px] uppercase tracking-[0.4em] text-muted whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Uitgelichte projecten
            </span>
          </div>

          {/* ── Kolom 1: Bedrijfsfotografie ── */}
          <div className="relative" style={{ flex: "1 1 0%", overflow: "visible" }}>

            {/* Grote achtergrond — gaat naar sectie */}
            <Link href="/bedrijfsfotografie" className="group block absolute inset-0 overflow-hidden">
              {bedrijfImg && (
                <Image src={bedrijfImg} alt="Bedrijfsfotografie" fill sizes="50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]" />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Commissioned</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase text-white leading-[1.05]">
                  Bedrijfs-<br />fotografie
                </p>
              </div>
            </Link>

            {/* Klein uitgelicht project — hangt artistiek over de onderrand */}
            <Link
              href={`/cases/${proj1.slug}`}
              className="group absolute z-20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              style={{ bottom: "-18%", right: "-14%", width: "38%", aspectRatio: "4/3" }}
            >
              {proj1.cover && (
                <Image src={proj1.cover} alt={proj1.client} fill sizes="22vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[7px] uppercase tracking-[0.25em] text-white/55 mb-1">Uitgelicht</p>
                <p className="text-[10px] lg:text-xs font-bold uppercase text-white leading-snug">{proj1.client}</p>
              </div>
            </Link>
          </div>

          {/* ── Kolom 2: Vrij werk ── */}
          <div className="relative" style={{ flex: "1 1 0%", overflow: "visible" }}>

            {/* Grote achtergrond — gaat naar sectie */}
            <Link href="/vrij-werk" className="group block absolute inset-0 overflow-hidden">
              {vrijImg && (
                <Image src={vrijImg} alt="Vrij werk" fill sizes="50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]" />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-[7px] uppercase tracking-[0.32em] text-white/50 mb-2">Persoonlijk</p>
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase text-white leading-[1.05]">
                  Vrij werk
                </p>
              </div>
            </Link>

            {/* Klein uitgelicht project — hangt artistiek over de onderrand */}
            <Link
              href={`/cases/${proj2.slug}`}
              className="group absolute z-20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              style={{ bottom: "-18%", right: "8%", width: "38%", aspectRatio: "4/3" }}
            >
              {proj2.cover && (
                <Image src={proj2.cover} alt={proj2.client} fill sizes="20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[7px] uppercase tracking-[0.25em] text-white/55 mb-1">Uitgelicht</p>
                <p className="text-[10px] lg:text-xs font-bold uppercase text-white leading-snug">{proj2.client}</p>
              </div>
            </Link>
          </div>

          {/* Pijl rechts */}
          <div className="hidden lg:flex flex-col items-center justify-center border-l border-border w-7 shrink-0">
            <span className="text-muted text-lg leading-none">›</span>
          </div>

        </section>
      </div>

      {/* ══ NAVIGATIELINKS ════════════════════════════════════════ */}
      <div className="px-8 lg:px-12 py-6 border-t border-border flex flex-wrap gap-x-8 gap-y-2">
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
