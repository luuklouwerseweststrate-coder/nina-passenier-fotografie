"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import InstagramFeed from "@/components/InstagramFeed";

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
  return (
    <div className="pt-14 overflow-x-hidden">

      {/* ════════════════════════════════════════
          1. SPLIT-SCREEN — twee foto's met wit kader
      ════════════════════════════════════════ */}
      <section className="px-5 lg:px-12 pt-10 lg:pt-14 pb-6">

        {/* Beschikbaar */}
        {beschikbaar !== false && (
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-black/30">
              {beschikbaarTekst || "Rotterdam · Beschikbaar voor opdrachten"}
            </span>
            <Link href="/contact" className="text-[10px] uppercase tracking-[0.3em] text-black/25 hover:text-black transition-colors hidden sm:block">
              Contact →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 lg:gap-5 items-start">

          {/* Links: Bedrijfsfotografie */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link href="/bedrijfsfotografie" className="group block">
              {/* Wit kader */}
              <div className="bg-white p-2 shadow-sm">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <Image
                    src={businessPhoto}
                    alt="Bedrijfsfotografie Nina Passenier"
                    fill priority sizes="(max-width: 768px) 50vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="mt-3 px-1">
                <span className="text-[9px] uppercase tracking-[0.4em] text-nina-oranje">Zakelijk</span>
                <div className="flex items-baseline justify-between mt-1">
                  <h2 className="font-serif text-lg lg:text-2xl">Bedrijfsfotografie</h2>
                  <span className="text-black/25 group-hover:text-nina-oranje group-hover:translate-x-0.5 transition-all duration-300 text-sm">→</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Rechts: Vrij werk — iets lager voor ritme */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 lg:mt-16"
          >
            <Link href="/vrij-werk" className="group block">
              {/* Wit kader */}
              <div className="bg-white p-2 shadow-sm">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <Image
                    src={artPhoto}
                    alt="Vrij werk Nina Passenier"
                    fill priority sizes="(max-width: 768px) 50vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="mt-3 px-1">
                <span className="text-[9px] uppercase tracking-[0.4em] text-nina-groen">Autonoom</span>
                <div className="flex items-baseline justify-between mt-1">
                  <h2 className="font-serif italic text-lg lg:text-2xl">Vrij werk</h2>
                  <span className="text-black/25 group-hover:text-nina-groen group-hover:translate-x-0.5 transition-all duration-300 text-sm">→</span>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          2. TWEE KOLOMMEN — scrollen door werk
      ════════════════════════════════════════ */}
      <section className="grid grid-cols-2">

        {/* Oranje kolom: Bedrijfsfotografie */}
        <div className="border-r border-black/8">
          {/* Header */}
          <div className="px-5 lg:px-8 pt-10 pb-6 border-b-2 border-nina-oranje">
            <Link href="/bedrijfsfotografie" className="group flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.35em] text-nina-oranje">Bedrijfsfotografie</span>
              <span className="text-nina-oranje/40 group-hover:text-nina-oranje transition-colors text-sm">→</span>
            </Link>
          </div>
          {/* Foto's */}
          <div className="p-3 space-y-3">
            {businessPhotos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: i % 3 === 1 ? "4/3" : "3/4" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Groene kolom: Vrij werk */}
        <div>
          {/* Header */}
          <div className="px-5 lg:px-8 pt-10 pb-6 border-b-2 border-nina-groen">
            <Link href="/vrij-werk" className="group flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.35em] text-nina-groen">Vrij werk</span>
              <span className="text-nina-groen/40 group-hover:text-nina-groen transition-colors text-sm">→</span>
            </Link>
          </div>
          {/* Foto's — offset voor ritme */}
          <div className="p-3 pt-12 space-y-3">
            {artPhotos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: i % 3 === 0 ? "4/3" : "3/4" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════
          3. CONVERGENTIE — logo in het midden
      ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center py-10 lg:py-14"
      >
        {/* Oranje lijn links */}
        <div className="flex-1 h-px bg-nina-oranje" />
        {/* Logo in midden */}
        <div className="mx-6 lg:mx-10 shrink-0">
          <Logo className="h-10 lg:h-14 w-auto opacity-90" />
        </div>
        {/* Groene lijn rechts */}
        <div className="flex-1 h-px bg-nina-groen" />
      </motion.div>

      {/* ════════════════════════════════════════
          4. UITGELICHT PROJECT
      ════════════════════════════════════════ */}
      {featured.cover && (
        <section className="px-5 lg:px-10 pb-16 lg:pb-24 border-t border-black/8 pt-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-8">Uitgelicht project</p>
          <Link href={`/cases/${featured.slug}`} className="group block">
            <div className="relative overflow-hidden aspect-[16/9]">
              <Image
                src={featured.cover}
                alt={featured.client}
                fill sizes="(max-width: 1200px) 100vw, 1200px"
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

      {/* ════════════════════════════════════════
          5. OVER NINA
      ════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-black/8">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden">
          <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
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

      {/* ════════════════════════════════════════
          6. INSTAGRAM
      ════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════
          7. CONTACT
      ════════════════════════════════════════ */}
      <section className="px-5 lg:px-10 py-16 lg:py-24 border-t border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-5">Contact</p>
            <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
              Zullen we <em>koffie</em> drinken?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="px-6 py-3 border border-black/70 text-sm tracking-wide hover:bg-[#1a1a1a] hover:text-[#f5f4f1] hover:border-[#1a1a1a] transition-all duration-300">
              Plan een kennismaking
            </Link>
            <Link href="/werkwijze" className="px-6 py-3 border border-black/15 text-sm text-black/40 tracking-wide hover:border-black/40 hover:text-black transition-all duration-300">
              Werkwijze
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
