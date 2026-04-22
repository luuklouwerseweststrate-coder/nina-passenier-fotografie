"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Photo = { src: string; alt: string };
type GalleryItem = { src: string; alt: string; href: string };
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
  galleryCases?: GalleryItem[];
};

export default function HomePageClient({ businessPhotos, artPhotos, galleryCases }: Props) {
  const bedrijfImg = businessPhotos[0]?.src || "";
  const vrijImg    = artPhotos[0]?.src || "";
  const galleryItems = galleryCases ?? [];

  return (
    <div className="bg-white">

      {/* ══ HERO — vult ~90vh zodat galerij net piekt ══════════════ */}
      <div style={{ minHeight: "88vh", paddingTop: "4vh", paddingBottom: "0" }}>

        {/* 2 grote kolommen */}
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

          {/* Kolom 1: Bedrijfsfotografie */}
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

          {/* Kolom 2: Autonoom werk */}
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

        {/* Navigatielinks — zitten in de hero wrapper */}
        <div className="px-8 lg:px-12 py-5 flex flex-wrap gap-x-8 gap-y-2">
          {[
            { href: "/cases",    label: "Cases"    },
            { href: "/over",     label: "Over"     },
            { href: "/werkwijze",label: "Werkwijze"},
            { href: "/contact",  label: "Contact"  },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="text-[13px] uppercase tracking-[0.22em] font-medium text-ink hover:text-muted transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

      </div>

      {/* ══ SCROLL HINT ════════════════════════════════════════════ */}
      <div className="flex flex-col items-center py-8 gap-2">
        <span className="text-[8px] uppercase tracking-[0.35em] text-faint">Projecten</span>
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

      {/* ══ SCATTERED GALERIJ — piekt net onder de vouw ════════════ */}
      <section className="px-6 lg:px-12 pt-2 pb-20">

        {/* Titel */}
        <div className="flex items-baseline justify-between mb-2 lg:mb-4">
          <p className="text-[9px] uppercase tracking-[0.32em] text-muted">Projecten</p>
          <Link href="/cases"
            className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors">
            Alle cases →
          </Link>
        </div>

        {/* Desktop: scattered — elk project individueel klikbaar */}
        {galleryItems.length > 0 && (
          <>
            <div className="relative hidden lg:block" style={{ minHeight: "480px" }}>
              {galleryItems.map((item, i) => {
                const slots = [
                  { left: "2%",  top: "5%",  width: "15%", rotate: "-1.8deg" },
                  { left: "20%", top: "2%",  width: "20%", rotate: "1deg"    },
                  { left: "62%", top: "4%",  width: "14%", rotate: "1.8deg"  },
                  { left: "42%", top: "8%",  width: "16%", rotate: "-0.6deg" },
                  { left: "5%",  top: "58%", width: "16%", rotate: "-0.8deg" },
                  { left: "38%", top: "53%", width: "13%", rotate: "1.5deg"  },
                  { left: "58%", top: "48%", width: "18%", rotate: "-1.2deg" },
                ];
                const slot = slots[i % slots.length];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group absolute overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}
                  >
                    <div className="relative w-full" style={{ paddingTop: i % 3 === 0 ? "133%" : i % 3 === 1 ? "62%" : "100%" }}>
                      <Image src={item.src} alt={item.alt} fill sizes="20vw" className="object-cover" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobiel: scattered met grotere percentages */}
            <div className="lg:hidden relative" style={{ minHeight: "520px" }}>
              {galleryItems.map((item, i) => {
                const mobileSlots = [
                  { left: "4%",  top: "2%",  width: "44%", rotate: "-2deg"   },
                  { left: "50%", top: "5%",  width: "42%", rotate: "1.5deg"  },
                  { left: "12%", top: "36%", width: "38%", rotate: "-1deg"   },
                  { left: "52%", top: "40%", width: "40%", rotate: "2deg"    },
                  { left: "6%",  top: "68%", width: "42%", rotate: "-1.5deg" },
                  { left: "46%", top: "70%", width: "38%", rotate: "1deg"    },
                ];
                const slot = mobileSlots[i % mobileSlots.length];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group absolute overflow-hidden shadow-sm"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}
                  >
                    <div className="relative w-full" style={{ paddingTop: i % 3 === 0 ? "133%" : i % 3 === 1 ? "65%" : "100%" }}>
                      <Image src={item.src} alt={item.alt} fill sizes="45vw" className="object-cover" />
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
