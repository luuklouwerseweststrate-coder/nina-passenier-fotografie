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

// 8 unieke slots zodat er nooit overlap is bij 8 foto's
const DESKTOP_SLOTS = [
  { left: "1%",  top: "2%",  width: "16%", rotate: "-1.8deg", aspect: "133%" },
  { left: "19%", top: "0%",  width: "22%", rotate: "1.2deg",  aspect: "65%"  },
  { left: "44%", top: "3%",  width: "15%", rotate: "-0.5deg", aspect: "133%" },
  { left: "62%", top: "0%",  width: "21%", rotate: "2deg",    aspect: "65%"  },
  { left: "3%",  top: "50%", width: "20%", rotate: "0.8deg",  aspect: "65%"  },
  { left: "26%", top: "48%", width: "14%", rotate: "-1.5deg", aspect: "133%" },
  { left: "43%", top: "51%", width: "22%", rotate: "1.8deg",  aspect: "65%"  },
  { left: "67%", top: "49%", width: "14%", rotate: "-2deg",   aspect: "133%" },
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

        {/* Desktop header — "Selectie" verborgen op mobiel */}
        <div className="flex items-baseline justify-between mb-2 lg:mb-6">
          <p className="hidden lg:block text-[9px] uppercase tracking-[0.32em] text-muted">Selectie</p>
          <div className="flex gap-5 ml-auto">
            <Link href="/bedrijfsfotografie"
              className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors">
              Bedrijfsfotografie →
            </Link>
            <Link href="/autonoom-werk"
              className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors">
              Autonoom werk →
            </Link>
          </div>
        </div>

        {galleryItems.length > 0 && (
          <>
            {/* ── DESKTOP: scattered, 8 vaste slots ─────────────── */}
            <div className="relative hidden lg:block" style={{ minHeight: "780px" }}>
              {galleryItems.slice(0, DESKTOP_SLOTS.length).map((item, i) => {
                const slot = DESKTOP_SLOTS[i];
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="group absolute overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    style={{ left: slot.left, top: slot.top, width: slot.width, rotate: slot.rotate, zIndex: i + 1 }}
                  >
                    <div className="relative w-full" style={{ paddingTop: slot.aspect }}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="22vw"
                        className="object-cover"
                        style={{ objectPosition: item.objectPosition || "center center" }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ── MOBIEL: per categorie met label ────────────────── */}
            <div className="lg:hidden space-y-10">

              {bedrijfItems.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-muted mb-3">
                    Bedrijfsfotografie
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {bedrijfItems.map((item, i) => (
                      <Link key={i} href={item.href} className="relative block overflow-hidden"
                        style={{ paddingBottom: i % 2 === 0 ? "130%" : "75%" }}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="45vw"
                          className="object-cover absolute inset-0"
                          style={{ objectPosition: item.objectPosition || "center center" }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {autonomItems.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-muted mb-3">
                    Autonoom werk
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {autonomItems.map((item, i) => (
                      <Link key={i} href={item.href} className="relative block overflow-hidden"
                        style={{ paddingBottom: i % 2 === 0 ? "130%" : "75%" }}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="45vw"
                          className="object-cover absolute inset-0"
                          style={{ objectPosition: item.objectPosition || "center center" }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </section>

    </div>
  );
}
