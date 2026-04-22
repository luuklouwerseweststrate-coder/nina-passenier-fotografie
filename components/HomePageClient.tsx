"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScatteredGallery from "./ScatteredGallery";
import InstagramFeed from "./InstagramFeed";

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

// ─── Fade-in wrapper ───────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Sectie label ─────────────────────────────────────────────
function Label({ children, color = "text-muted" }: { children: React.ReactNode; color?: string }) {
  return (
    <p className={`text-[9px] uppercase tracking-[0.28em] ${color} mb-5`}>
      {children}
    </p>
  );
}

// ─── Homepage ─────────────────────────────────────────────────
export default function HomePageClient({
  businessPhoto,
  artPhoto,
  businessPhotos,
  artPhotos,
  ninaPortret,
  featured,
  beschikbaar = true,
  beschikbaarTekst,
  igFeedBedrijf,
  igFeedVrijwerk,
}: Props) {

  // Minimaal 1 foto per kant voor de scattered galerij
  const vrijPhotos = artPhotos.length > 0
    ? artPhotos
    : [{ src: artPhoto, alt: "Vrij werk Nina Passenier" }];

  const bedrijfPhotos = businessPhotos.length > 0
    ? businessPhotos
    : [{ src: businessPhoto, alt: "Bedrijfsfotografie Nina Passenier" }];

  return (
    <div>

      {/* ════════════════════════════════════════════════
          HERO — BOVEN DE VOUW
          Twee kanten, één naam in het midden
      ════════════════════════════════════════════════ */}
      <section className="relative flex h-screen pt-12">

        {/* ── Linker helft: Vrij werk ── */}
        <Link
          href="/vrij-werk"
          className="group relative flex-1 overflow-hidden block"
        >
          <Image
            src={vrijPhotos[0].src}
            alt={vrijPhotos[0].alt}
            fill
            sizes="50vw"
            className="object-cover transition-all duration-[800ms] ease-out group-hover:scale-[1.02]"
            priority
          />
          {/* Donkere overlay die oplicht op hover */}
          <div className="absolute inset-0 bg-black/30 transition-all duration-[800ms] group-hover:bg-black/15" />

          {/* Label linksonder */}
          <div className="absolute bottom-8 left-7 z-10">
            <p className="text-[9px] uppercase tracking-[0.32em] text-white/60 mb-1.5">
              Vrij werk
            </p>
            <div className="w-4 h-px bg-white/30 group-hover:w-8 transition-all duration-500" />
          </div>

          {/* Pijl rechtsonder op hover */}
          <div className="absolute bottom-8 right-7 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/50">Bekijk →</span>
          </div>
        </Link>

        {/* ── Verticale scheidingslijn ── */}
        <div className="absolute top-12 bottom-0 left-1/2 -translate-x-px w-px bg-white/20 z-10 pointer-events-none" />

        {/* ── Naam: gecentreerd op de scheidingslijn ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="bg-bg px-5 py-3.5 shadow-sm">
            <p className="text-[9px] uppercase tracking-[0.38em] text-ink whitespace-nowrap font-medium">
              Nina Passenier
            </p>
          </div>
        </div>

        {/* ── Rechter helft: Bedrijfsfotografie ── */}
        <Link
          href="/bedrijfsfotografie"
          className="group relative flex-1 overflow-hidden block"
        >
          <Image
            src={bedrijfPhotos[0].src}
            alt={bedrijfPhotos[0].alt}
            fill
            sizes="50vw"
            className="object-cover transition-all duration-[800ms] ease-out group-hover:scale-[1.02]"
            priority
          />
          {/* Donkere overlay */}
          <div className="absolute inset-0 bg-black/30 transition-all duration-[800ms] group-hover:bg-black/15" />

          {/* Label rechtsonder */}
          <div className="absolute bottom-8 right-7 z-10 text-right">
            <p className="text-[9px] uppercase tracking-[0.32em] text-white/60 mb-1.5">
              Bedrijfsfotografie
            </p>
            <div className="ml-auto w-4 h-px bg-white/30 group-hover:w-8 transition-all duration-500" />
          </div>

          {/* Pijl linksonder op hover */}
          <div className="absolute bottom-8 left-7 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/50">← Bekijk</span>
          </div>
        </Link>

        {/* Scroll-hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-white/25"
          />
        </div>

        {/* Beschikbaar badge (optioneel) */}
        {beschikbaar && (
          <div className="absolute top-[72px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-bg/90 backdrop-blur-sm px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-free" />
              <span className="text-[8px] uppercase tracking-[0.25em] text-ink/60">
                {beschikbaarTekst || "Beschikbaar voor opdrachten"}
              </span>
            </div>
          </div>
        )}
      </section>


      {/* ════════════════════════════════════════════════
          POSITIE-REGEL — na de hero
      ════════════════════════════════════════════════ */}
      <FadeUp>
        <div className="px-7 lg:px-12 py-8 border-b border-border flex items-center justify-between gap-4">
          <p className="text-sm lg:text-base font-light text-ink/70 leading-relaxed max-w-xl">
            Fotograaf in Rotterdam — bedrijfsfotografie voor merken en organisaties,
            en autonoom vrij werk.
          </p>
          <Link
            href="/over"
            className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors hidden sm:block shrink-0"
          >
            Over Nina →
          </Link>
        </div>
      </FadeUp>


      {/* ════════════════════════════════════════════════
          VRIJ WERK — scattered galerij
      ════════════════════════════════════════════════ */}
      <section className="px-7 lg:px-12 pt-16 pb-4">
        <FadeUp>
          <div className="flex items-center justify-between mb-10 lg:mb-16">
            <Label color="text-free">Vrij werk</Label>
            <Link
              href="/vrij-werk"
              className="text-[9px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
            >
              Bekijk alles
            </Link>
          </div>
        </FadeUp>

        <ScatteredGallery
          photos={vrijPhotos}
          href="/vrij-werk"
          containerMinHeight="640px"
        />
      </section>


      {/* ════════════════════════════════════════════════
          SCHEIDING — subtiele divider
      ════════════════════════════════════════════════ */}
      <div className="px-7 lg:px-12 py-10 lg:py-14">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-border" />
          <p className="text-[8px] uppercase tracking-[0.4em] text-faint">Nina Passenier</p>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>


      {/* ════════════════════════════════════════════════
          BEDRIJFSFOTOGRAFIE — scattered galerij
      ════════════════════════════════════════════════ */}
      <section className="px-7 lg:px-12 pb-4">
        <FadeUp>
          <div className="flex items-center justify-between mb-10 lg:mb-16">
            <Label color="text-commerce">Bedrijfsfotografie</Label>
            <Link
              href="/bedrijfsfotografie"
              className="text-[9px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
            >
              Bekijk alles
            </Link>
          </div>
        </FadeUp>

        <ScatteredGallery
          photos={bedrijfPhotos}
          href="/bedrijfsfotografie"
          containerMinHeight="640px"
        />
      </section>


      {/* ════════════════════════════════════════════════
          UITGELICHT PROJECT
      ════════════════════════════════════════════════ */}
      {featured?.cover && featured?.slug && (
        <FadeUp>
          <section className="border-t border-border mt-8 px-7 lg:px-12 py-16 lg:py-20">
            <Label>Uitgelicht project</Label>
            <Link
              href={`/cases/${featured.slug}`}
              className="group grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  src={featured.cover}
                  alt={featured.client}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-light leading-snug">{featured.client}</h3>
                <p className="text-sm text-muted mt-3 leading-relaxed max-w-sm">{featured.intro}</p>
                <p className="mt-8 text-[9px] uppercase tracking-[0.28em] text-faint group-hover:text-ink transition-colors">
                  Lees case →
                </p>
              </div>
            </Link>

            <div className="mt-6 border-t border-border pt-5">
              <Link
                href="/cases"
                className="text-[9px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
              >
                Alle cases
              </Link>
            </div>
          </section>
        </FadeUp>
      )}


      {/* ════════════════════════════════════════════════
          OVER NINA — minimale teaser
      ════════════════════════════════════════════════ */}
      <FadeUp>
        <section className="border-t border-border grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[320px] overflow-hidden">
            <Image
              src={ninaPortret}
              alt="Nina Passenier"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="px-8 lg:px-12 py-10 flex flex-col justify-center bg-surface">
            <Label>Over Nina</Label>
            <p className="text-xl lg:text-2xl font-light leading-snug text-ink max-w-xs">
              Fotograaf. Kijker. Verteller van&nbsp;stilte.
            </p>
            <Link
              href="/over"
              className="mt-8 text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors inline-flex items-center gap-2"
            >
              Lees meer
            </Link>
          </div>
        </section>
      </FadeUp>


      {/* ════════════════════════════════════════════════
          INSTAGRAM — twee accounts
      ════════════════════════════════════════════════ */}
      {(igFeedBedrijf || igFeedVrijwerk) && (
        <section className="bg-ink py-14 lg:py-18">
          <div className="px-7 lg:px-12">
            <Label color="text-white/25">Instagram</Label>
            <div className={`grid gap-12 ${igFeedBedrijf && igFeedVrijwerk ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {igFeedVrijwerk && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-free mb-5">Vrij werk</p>
                  <InstagramFeed feedId={igFeedVrijwerk} handle="ninapassenierfotografie" />
                </div>
              )}
              {igFeedBedrijf && (
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-commerce mb-5">Bedrijfsfotografie</p>
                  <InstagramFeed feedId={igFeedBedrijf} handle="nina.bedrijfsfotografie" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════
          CONTACT CTA
      ════════════════════════════════════════════════ */}
      <FadeUp>
        <section className="px-7 lg:px-12 py-16 lg:py-24 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <Label>Contact</Label>
              <h2 className="text-3xl lg:text-4xl font-light leading-tight max-w-xs">
                Zullen we kennismaken?
              </h2>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-5 py-2.5 border border-ink text-[11px] uppercase tracking-[0.18em] hover:bg-ink hover:text-bg transition-all duration-300"
              >
                Plan een gesprek
              </Link>
              <Link
                href="/werkwijze"
                className="px-5 py-2.5 border border-border text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300"
              >
                Werkwijze
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>

    </div>
  );
}
