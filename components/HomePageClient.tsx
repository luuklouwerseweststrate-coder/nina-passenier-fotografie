"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import InstagramFeed from "@/components/InstagramFeed";

type StripPhoto = { src: string; alt: string };
type FeaturedCase = { cover: string; client: string; intro: string; slug: string };

type Props = {
  heroImage: string;
  businessPhoto: string;
  artPhoto: string;
  ninaPortret: string;
  heroStrip: StripPhoto[];
  featured: FeaturedCase;
  heroTagline?: string;
  heroSubtitel?: string;
  introTekst?: string;
  beschikbaar?: boolean;
  beschikbaarTekst?: string;
  igFeedBedrijf?: string;
  igFeedVrijwerk?: string;
};

export default function HomePageClient({
  businessPhoto,
  artPhoto,
  ninaPortret,
  featured,
  beschikbaar = true,
  beschikbaarTekst,
  igFeedBedrijf,
  igFeedVrijwerk,
}: Props) {
  return (
    <div className="pt-14">

      {/* ── SPLIT-SCREEN HERO — boven de vouw ── */}
      <section className="grid grid-cols-2 md:grid-cols-2" style={{ height: "calc(100svh - 3.5rem)" }}>

        {/* Links: Bedrijfsfotografie */}
        <Link href="/bedrijfsfotografie" className="group relative overflow-hidden">
          <Image
            src={businessPhoto}
            alt="Bedrijfsfotografie Nina Passenier"
            fill
            priority
            sizes="50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-500" />

          {/* Label linksboven */}
          <div className="absolute top-6 left-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-nina-oranje">Zakelijk</span>
          </div>

          {/* Titel linksonder */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl text-white leading-tight">
              Bedrijfs­fotografie
            </h2>
            <p className="mt-2 text-white/60 text-xs sm:text-sm leading-relaxed hidden sm:block">
              Merken, campagnes, horeca &amp; portret.
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-nina-oranje transition-colors duration-300 hidden sm:block">
              Bekijk werk →
            </p>
          </div>
        </Link>

        {/* Rechts: Vrij werk */}
        <Link href="/vrij-werk" className="group relative overflow-hidden border-l border-white/10">
          <Image
            src={artPhoto}
            alt="Vrij werk Nina Passenier"
            fill
            priority
            sizes="50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-500" />

          {/* Label rechtsboven */}
          <div className="absolute top-6 right-6 text-right">
            <span className="text-[10px] uppercase tracking-[0.35em] text-nina-groen">Autonoom</span>
          </div>

          {/* Titel rechtsonder */}
          <div className="absolute bottom-6 left-6 right-6 text-right">
            <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-5xl text-white leading-tight">
              Vrij werk
            </h2>
            <p className="mt-2 text-white/60 text-xs sm:text-sm leading-relaxed hidden sm:block">
              Series &amp; concepten zonder opdracht.
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-nina-groen transition-colors duration-300 hidden sm:block">
              Ontdek series →
            </p>
          </div>
        </Link>

      </section>

      {/* ── Beschikbaar lijn ── */}
      {beschikbaar !== false && (
        <div className="px-5 lg:px-10 py-5 border-b border-black/8 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/30">
            {beschikbaarTekst || "Rotterdam · Beschikbaar voor opdrachten"}
          </span>
          <Link href="/contact" className="text-[10px] uppercase tracking-[0.3em] text-black/30 hover:text-black transition-colors">
            Neem contact op →
          </Link>
        </div>
      )}

      {/* ── Uitgelicht project ── */}
      {featured.cover && (
        <section className="px-5 lg:px-10 py-16 lg:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-8">Uitgelicht project</p>
          <Link href={`/cases/${featured.slug}`} className="group block">
            <div className="relative overflow-hidden aspect-[16/9]">
              <Image
                src={featured.cover}
                alt={featured.client}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
              <h3 className="font-serif text-2xl">{featured.client}</h3>
              <p className="text-sm text-black/40 max-w-md">{featured.intro}</p>
              <span className="text-sm text-black/30 group-hover:text-black transition-colors shrink-0">Case →</span>
            </div>
          </Link>
          <Link href="/cases" className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-black/25 hover:text-black transition-colors">
            Alle cases
          </Link>
        </section>
      )}

      {/* ── Over Nina ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-black/8">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden">
          <Image
            src={ninaPortret}
            alt="Nina Passenier"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="px-8 lg:px-12 py-12 lg:py-16 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-6">Over Nina</p>
          <h2 className="font-serif text-3xl lg:text-4xl leading-snug">
            Kijken is <em>kiezen</em>.
          </h2>
          <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-sm">
            Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
            Die achtergrond vertaalt zich in alles: rustig, geduldig, en net iets scheef.
          </p>
          <Link href="/over" className="mt-8 inline-flex items-center gap-2 text-sm text-black/35 hover:text-black transition-colors group">
            Lees mijn verhaal
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </section>

      {/* ── Instagram ── */}
      {(igFeedBedrijf || igFeedVrijwerk) && (
        <section className="bg-[#1a1a1a] py-16 lg:py-20">
          <div className="px-5 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-10">Instagram</p>
            <div className={`grid gap-12 ${igFeedBedrijf && igFeedVrijwerk ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {igFeedBedrijf && <InstagramFeed feedId={igFeedBedrijf} handle="nina.bedrijfsfotografie" />}
              {igFeedVrijwerk && <InstagramFeed feedId={igFeedVrijwerk} handle="ninapassenierfotografie" />}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section className="px-5 lg:px-10 py-16 lg:py-24 border-t border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-5">Contact</p>
            <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
              Zullen we <em>koffie</em> drinken?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 border border-black/70 text-sm tracking-wide hover:bg-[#1a1a1a] hover:text-[#f5f4f1] hover:border-[#1a1a1a] transition-all duration-300"
            >
              Plan een kennismaking
            </Link>
            <Link
              href="/werkwijze"
              className="px-6 py-3 border border-black/15 text-sm text-black/40 tracking-wide hover:border-black/40 hover:text-black transition-all duration-300"
            >
              Werkwijze
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
