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
  heroImage,
  businessPhoto,
  artPhoto,
  ninaPortret,
  heroStrip,
  featured,
  heroTagline,
  beschikbaar = true,
  beschikbaarTekst,
  igFeedBedrijf,
  igFeedVrijwerk,
}: Props) {
  // Combineer alle beschikbare foto's voor de collage
  const allPhotos = heroStrip.length > 0 ? heroStrip : [
    { src: businessPhoto, alt: "Bedrijfsfotografie" },
    { src: artPhoto, alt: "Vrij werk" },
  ];

  return (
    <div className="pt-14">

      {/* ── Intro lijn ── */}
      <div className="px-5 lg:px-8 pt-8 pb-6 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">
          {heroTagline || "Fotografie — Rotterdam"}
        </p>
        {beschikbaar !== false && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/30">
            {beschikbaarTekst || "Beschikbaar"}
          </p>
        )}
      </div>

      {/* ── Foto collage — masonry naar beneden ── */}
      <div className="px-5 lg:px-8">
        {/* Desktop: 3 kolommen masonry */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-3">
          {allPhotos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="break-inside-avoid mb-3"
            >
              <div className="relative overflow-hidden group">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={800}
                  height={i % 3 === 0 ? 1067 : i % 3 === 1 ? 600 : 900}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobiel: 2 kolommen */}
        <div className="md:hidden columns-2 gap-2">
          {allPhotos.map((p, i) => (
            <div key={i} className="break-inside-avoid mb-2">
              <Image
                src={p.src}
                alt={p.alt}
                width={400}
                height={i % 2 === 0 ? 533 : 300}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Twee richtingen ── */}
      <section className="px-5 lg:px-8 mt-20 lg:mt-28">
        <p className="text-[11px] uppercase tracking-[0.3em] text-black/35 mb-8">Twee richtingen</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">

          <Link href="/bedrijfsfotografie" className="group block">
            <div className="relative overflow-hidden aspect-[4/5]">
              <Image
                src={businessPhoto}
                alt="Bedrijfsfotografie"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-nina-oranje">Zakelijk</span>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="font-serif text-xl">Bedrijfsfotografie</h3>
                <span className="text-sm text-black/30 group-hover:text-black transition-colors duration-300">→</span>
              </div>
              <p className="text-sm text-black/40 mt-1">Merken, campagnes, horeca &amp; portret.</p>
            </div>
          </Link>

          <Link href="/vrij-werk" className="group block md:mt-16">
            <div className="relative overflow-hidden aspect-[4/5]">
              <Image
                src={artPhoto}
                alt="Vrij werk"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-nina-groen">Autonoom</span>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="font-serif italic text-xl">Vrij werk</h3>
                <span className="text-sm text-black/30 group-hover:text-black transition-colors duration-300">→</span>
              </div>
              <p className="text-sm text-black/40 mt-1">Series &amp; concepten zonder opdracht.</p>
            </div>
          </Link>

        </div>
      </section>

      {/* ── Uitgelicht project ── */}
      {featured.cover && (
        <section className="px-5 lg:px-8 mt-20 lg:mt-28">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/35 mb-6">Uitgelicht</p>
          <Link href={`/cases/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={featured.cover}
                alt={featured.client}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h2 className="font-serif text-2xl">{featured.client}</h2>
              <p className="text-sm text-black/40 max-w-md">{featured.intro}</p>
              <span className="text-sm text-black/30 group-hover:text-black transition-colors shrink-0">Case →</span>
            </div>
          </Link>
          <Link href="/cases" className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-black/30 hover:text-black transition-colors">
            Alle cases
          </Link>
        </section>
      )}

      {/* ── Over ── */}
      <section className="px-5 lg:px-8 mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="relative aspect-[3/4] max-w-sm">
          <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/35 mb-6">Over Nina</p>
          <h2 className="font-serif text-3xl lg:text-4xl leading-snug">
            Kijken is <em>kiezen</em>.
          </h2>
          <p className="mt-4 text-sm text-black/50 leading-relaxed max-w-sm">
            Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
          </p>
          <Link href="/over" className="mt-6 inline-flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors group">
            Lees meer
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </section>

      {/* ── Instagram ── */}
      {(igFeedBedrijf || igFeedVrijwerk) && (
        <section className="mt-20 lg:mt-28 bg-[#1a1a1a] py-16 lg:py-20">
          <div className="px-5 lg:px-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/25 mb-10">Instagram</p>
            <div className={`grid gap-12 ${igFeedBedrijf && igFeedVrijwerk ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {igFeedBedrijf && <InstagramFeed feedId={igFeedBedrijf} handle="nina.bedrijfsfotografie" />}
              {igFeedVrijwerk && <InstagramFeed feedId={igFeedVrijwerk} handle="ninapassenierfotografie" />}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section className="px-5 lg:px-8 py-20 lg:py-28 border-t border-black/8 mt-20 lg:mt-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/35 mb-5">Contact</p>
            <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
              Zullen we <em>koffie</em> drinken?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 border border-black/80 text-sm tracking-wide hover:bg-black hover:text-[#f5f4f1] transition-all duration-300"
            >
              Plan een kennismaking
            </Link>
            <Link
              href="/werkwijze"
              className="px-6 py-3 border border-black/20 text-sm text-black/40 tracking-wide hover:border-black/60 hover:text-black transition-all duration-300"
            >
              Werkwijze
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
