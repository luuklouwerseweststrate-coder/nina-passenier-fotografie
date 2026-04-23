"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Photo = { src: string; alt: string; objectPosition?: string };
type GalleryItem = { src: string; alt: string; href: string; objectPosition?: string };
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
  galleryPhotos?: GalleryItem[];
};

// Desktop: links=bedrijf (max right edge ~46%), rechts=autonoom (min left ~54%)
// Het witte streepje in het midden spiegelt de gap in de hero
const DESKTOP_BEDRIJF_SLOTS = [
  { left: "1%",  top: "3%",  width: "22%", rotate: "-1.8deg", aspect: "133%" },
  { left: "25%", top: "0%",  width: "21%", rotate: "1deg",    aspect: "65%"  },
  { left: "2%",  top: "51%", width: "21%", rotate: "0.8deg",  aspect: "65%"  },
  { left: "24%", top: "49%", width: "18%", rotate: "-1.5deg", aspect: "130%" },
];
const DESKTOP_AUTONOOM_SLOTS = [
  { left: "54%", top: "0%",  width: "22%", rotate: "1.5deg",  aspect: "65%"  },
  { left: "78%", top: "3%",  width: "18%", rotate: "-0.8deg", aspect: "130%" },
  { left: "56%", top: "49%", width: "18%", rotate: "-1.2deg", aspect: "130%" },
  { left: "77%", top: "51%", width: "20%", rotate: "2deg",    aspect: "65%"  },
];

export default function HomePageClient({ businessPhotos, artPhotos, galleryPhotos }: Props) {
  const bedrijfImg = businessPhotos[0]?.src || "";
  const vrijImg    = artPhotos[0]?.src || "";
  const galleryItems = galleryPhotos ?? [];

  // Splitsen voor mobiel — filter op href
  const bedrijfItems = galleryItems.filter((g) => g.href === "/bedrijfsfotografie");
  const autonomItems = galleryItems.filter((g) => g.href === "/autonoom-werk");

  return (
    <div className="bg-white">

      {/* ══ HERO — vult ~90vh zodat galerij net piekt ══════════════ */}
      <div style={{ minHeight: "88vh", paddingTop: "4vh", paddingBottom: "0" }}>

        {/* 2 grote kolommen */}
        <section
          className="flex gap-4 lg:gap-6"
          style={{ height: "58vh", minHeight: "360px" }}
        >
          <div className="hidden lg:block w-7 shrink-0" />

          {/* Kolom 1: Bedrijfsfotografie */}
          <div className="relative overflow-hidden" style={{ flex: "1 1 0%" }}>
            <Link href="/bedrijfsfotografie" className="group block absolute inset-0">
              {bedrijfImg && (
                <Image
                  src={bedrijfImg}
                  alt="Bedrijfsfotografie"
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
                  style={{ objectPosition: businessPhotos[0]?.objectPosition || "center center" }}
                />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-2xl lg:text-3xl xl:text-4xl font-light uppercase text-white leading-[1.05]">
                  Bedrijfs-<br />fotografie
                </p>
              </div>
            </Link>
          </div>

          {/* Kolom 2: Autonoom werk */}
          <div className="relative overflow-hidden" style={{ flex: "1 1 0%" }}>
            <Link href="/autonoom-werk" className="group block absolute inset-0">
              {vrijImg && (
                <Image
                  src={vrijImg}
                  alt="Autonoom werk"
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
                  style={{ objectPosition: artPhotos[0]?.objectPosition || "center center" }}
                />
              )}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute top-5 left-5">
                <p className="text-2xl lg:text-3xl xl:text-4xl font-light uppercase text-white leading-[1.05]">
                  Autonoom<br />werk
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:block w-7 shrink-0" />
        </section>

        {/* Navigatielinks */}
        <div className="px-8 lg:px-12 py-5 flex gap-x-5 sm:gap-x-8 gap-y-2 flex-nowrap overflow-x-auto no-scrollbar">
          {[
            { href: "/cases",     label: "Cases"     },
            { href: "/over",      label: "Over"      },
            { href: "/werkwijze", label: "Werkwijze" },
            { href: "/contact",   label: "Contact"   },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="text-[10px] sm:text-[13px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-medium text-ink hover:text-muted transition-colors whitespace-nowrap shrink-0">
              {l.label}
            </Link>
          ))}
        </div>

      </div>

      {/* ══ SCROLL HINT ════════════════════════════════════════════ */}
      <div className="flex flex-col items-center py-8 gap-2">
        <span className="text-[8px] uppercase tracking-[0.35em] text-faint">Werk</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-6 bg-border" />
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="text-faint">
            <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* ══ GALERIJ ════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-12 pt-2 pb-20">

        {/* Header: labels boven de juiste helft */}
        <div className="flex mb-2 lg:mb-6">
          <div className="w-1/2">
            <Link href="/bedrijfsfotografie"
              className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors">
              Bedrijfsfotografie →
            </Link>
          </div>
          <div className="w-1/2">
            <Link href="/autonoom-werk"
              className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors">
              Autonoom werk →
            </Link>
          </div>
        </div>

        {galleryItems.length > 0 && (
          <>
            {/* ── DESKTOP: scattered, links=bedrijf rechts=autonoom ── */}
            <div className="relative hidden lg:block" style={{ minHeight: "760px" }}>

              {/* Verticale middenlijn — spiegelt de gap van de hero */}
              <div className="absolute top-0 bottom-0 w-px bg-white"
                style={{ left: "50%", zIndex: 20 }} />

              {/* Linker helft — bedrijfsfotografie */}
              {DESKTOP_BEDRIJF_SLOTS.map((slot, i) => {
                const item = bedrijfItems[i];
                if (!item) return null;
                return (
                  <Link key={`db${i}`} href={item.href}
                    className="group absolute overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}>
                    <div className="relative w-full" style={{ paddingTop: slot.aspect }}>
                      <Image src={item.src} alt={item.alt} fill sizes="25vw"
                        className="object-cover"
                        style={{ objectPosition: item.objectPosition || "center center" }} />
                    </div>
                  </Link>
                );
              })}

              {/* Rechter helft — autonoom werk */}
              {DESKTOP_AUTONOOM_SLOTS.map((slot, i) => {
                const item = autonomItems[i];
                if (!item) return null;
                return (
                  <Link key={`da${i}`} href={item.href}
                    className="group absolute overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}>
                    <div className="relative w-full" style={{ paddingTop: slot.aspect }}>
                      <Image src={item.src} alt={item.alt} fill sizes="25vw"
                        className="object-cover"
                        style={{ objectPosition: item.objectPosition || "center center" }} />
                    </div>
                  </Link>
                );
              })}

            </div>

            {/* ── MOBIEL: scattered, links=bedrijf rechts=autonoom ── */}
            {/* De split van de hero loopt door: linker kolom = bedrijf, rechter kolom = autonoom */}
            <div className="lg:hidden relative" style={{ minHeight: "920px" }}>

              {/* Linker kolom — bedrijfsfotografie */}
              {[
                { left: "2%",  top: "0%",  width: "43%", rotate: "-1.5deg", aspect: "130%" },
                { left: "4%",  top: "28%", width: "40%", rotate: "1deg",    aspect: "70%"  },
                { left: "1%",  top: "52%", width: "44%", rotate: "-0.8deg", aspect: "125%" },
                { left: "3%",  top: "77%", width: "41%", rotate: "1.5deg",  aspect: "70%"  },
              ].map((slot, i) => {
                const item = bedrijfItems[i];
                if (!item) return null;
                return (
                  <Link key={`b${i}`} href={item.href}
                    className="absolute overflow-hidden shadow-sm"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}>
                    <div className="relative w-full" style={{ paddingTop: slot.aspect }}>
                      <Image src={item.src} alt={item.alt} fill sizes="45vw"
                        className="object-cover"
                        style={{ objectPosition: item.objectPosition || "center center" }} />
                    </div>
                  </Link>
                );
              })}

              {/* Rechter kolom — autonoom werk */}
              {[
                { left: "53%", top: "5%",  width: "42%", rotate: "1.8deg",  aspect: "70%"  },
                { left: "51%", top: "25%", width: "43%", rotate: "-1.2deg", aspect: "130%" },
                { left: "54%", top: "53%", width: "40%", rotate: "1deg",    aspect: "70%"  },
                { left: "52%", top: "74%", width: "44%", rotate: "-2deg",   aspect: "125%" },
              ].map((slot, i) => {
                const item = autonomItems[i];
                if (!item) return null;
                return (
                  <Link key={`a${i}`} href={item.href}
                    className="absolute overflow-hidden shadow-sm"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}>
                    <div className="relative w-full" style={{ paddingTop: slot.aspect }}>
                      <Image src={item.src} alt={item.alt} fill sizes="45vw"
                        className="object-cover"
                        style={{ objectPosition: item.objectPosition || "center center" }} />
                    </div>
                  </Link>
                );
              })}

            </div>
          </>
        )}

      </section>

    </div>
  );
}
