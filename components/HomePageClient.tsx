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
          1. SPLIT-SCREEN HERO — boven de vouw
      ════════════════════════════════════════ */}
      <section className="grid grid-cols-2" style={{ height: "calc(100svh - 3.5rem)" }}>

        {/* Links: Bedrijfsfotografie */}
        <Link href="/bedrijfsfotografie" className="group relative overflow-hidden">
          <Image
            src={businessPhoto}
            alt="Bedrijfsfotografie Nina Passenier"
            fill priority sizes="50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />
          {/* Oranje streep links */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-nina-oranje" />
          <div className="absolute top-6 left-6">
            <span className="text-[9px] uppercase tracking-[0.4em] text-nina-oranje">Zakelijk</span>
          </div>
          <div className="absolute bottom-8 left-6 right-6">
            <h2 className="font-serif text-xl sm:text-3xl lg:text-5xl text-white leading-tight">
              Bedrijfs&shy;fotografie
            </h2>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-nina-oranje transition-colors hidden sm:block">
              Bekijk werk →
            </p>
          </div>
        </Link>

        {/* Rechts: Vrij werk */}
        <Link href="/vrij-werk" className="group relative overflow-hidden border-l border-white/15">
          <Image
            src={artPhoto}
            alt="Vrij werk Nina Passenier"
            fill priority sizes="50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-500" />
          {/* Groene streep rechts */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-nina-groen" />
          <div className="absolute top-6 right-6 text-right">
            <span className="text-[9px] uppercase tracking-[0.4em] text-nina-groen">Autonoom</span>
          </div>
          <div className="absolute bottom-8 left-6 right-6 text-right">
            <h2 className="font-serif italic text-xl sm:text-3xl lg:text-5xl text-white leading-tight">
              Vrij werk
            </h2>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-nina-groen transition-colors hidden sm:block">
              Ontdek series →
            </p>
          </div>
        </Link>

      </section>

      {/* Beschikbaar lijn */}
      {beschikbaar !== false && (
        <div className="px-5 lg:px-10 py-4 border-b border-black/8 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/30">
            {beschikbaarTekst || "Rotterdam · Beschikbaar voor opdrachten"}
          </span>
          <Link href="/contact" className="text-[10px] uppercase tracking-[0.3em] text-black/25 hover:text-black transition-colors hidden sm:block">
            Contact →
          </Link>
        </div>
      )}

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
