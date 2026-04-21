"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
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

// Vaste collageposities voor maximaal 7 foto's
const collagePositions = [
  { top: "8%",  left: "2%",   w: "24%", rotate: "-2deg",  aspect: "3/4"  },
  { top: "4%",  left: "27%",  w: "30%", rotate: "1.5deg", aspect: "4/3"  },
  { top: "3%",  left: "60%",  w: "18%", rotate: "-1deg",  aspect: "3/4"  },
  { top: "44%", left: "64%",  w: "26%", rotate: "2deg",   aspect: "3/4"  },
  { top: "40%", left: "26%",  w: "22%", rotate: "-1.5deg",aspect: "4/3"  },
  { top: "50%", left: "1%",   w: "19%", rotate: "1deg",   aspect: "3/4"  },
  { top: "12%", left: "78%",  w: "20%", rotate: "-0.5deg",aspect: "2/3"  },
];

export default function HomePageClient({
  heroImage,
  businessPhoto,
  artPhoto,
  ninaPortret,
  heroStrip,
  featured,
  heroTagline,
  heroSubtitel,
  beschikbaar = true,
  beschikbaarTekst,
  igFeedBedrijf,
  igFeedVrijwerk,
}: Props) {
  return (
    <>
      {/* ─── HERO: foto collage op wit vlak ─── */}
      <section className="relative bg-white overflow-hidden" style={{ minHeight: "100svh" }}>

        {/* Desktop: scattered collage */}
        <div className="hidden lg:block relative w-full" style={{ height: "100svh" }}>
          {heroStrip.slice(0, 7).map((p, i) => {
            const pos = collagePositions[i];
            if (!pos) return null;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  width: pos.w,
                  aspectRatio: pos.aspect,
                  rotate: pos.rotate,
                  zIndex: i === 1 || i === 3 ? 2 : 1,
                }}
                whileHover={{ scale: 1.02, zIndex: 10, rotate: "0deg" }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="overflow-hidden shadow-md cursor-default"
              >
                <Image src={p.src} alt={p.alt} fill sizes="30vw" className="object-cover" />
              </motion.div>
            );
          })}

          {/* Naam + tagline linksonder */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute bottom-12 left-10 z-20"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/40 mb-3">
              {beschikbaar !== false ? (beschikbaarTekst || "Rotterdam · beschikbaar") : "Rotterdam"}
            </p>
            <h1 className="font-serif text-5xl xl:text-6xl leading-[1.05] text-black max-w-xl">
              {heroTagline || <><em>Fotografie</em> voor bedrijven &amp; vrij werk.</>}
            </h1>
            <div className="flex items-center gap-8 mt-8 text-sm">
              <Link href="/bedrijfsfotografie" className="group flex items-center gap-2 text-black/70 hover:text-black transition-colors">
                Bedrijfsfotografie
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/vrij-werk" className="group flex items-center gap-2 text-black/70 hover:text-black transition-colors">
                Vrij werk
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobiel: één grote hero afbeelding + scroll strip */}
        <div className="lg:hidden">
          <div className="relative w-full" style={{ height: "65svh" }}>
            <Image
              src={heroImage}
              alt="Nina Passenier"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="px-5 pt-8 pb-6">
            {beschikbaar !== false && (
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-3">
                {beschikbaarTekst || "Rotterdam · beschikbaar"}
              </p>
            )}
            <h1 className="font-serif text-4xl leading-tight text-black">
              {heroTagline || <><em>Fotografie</em> voor bedrijven &amp; vrij werk.</>}
            </h1>
            <div className="flex gap-6 mt-6 text-sm text-black/60">
              <Link href="/bedrijfsfotografie" className="hover:text-black transition-colors">Bedrijfsfotografie →</Link>
              <Link href="/vrij-werk" className="hover:text-black transition-colors">Vrij werk →</Link>
            </div>
          </div>
          {/* Scroll strip mobiel */}
          <div className="scroll-strip flex overflow-x-auto gap-3 pb-4 px-5 snap-x snap-mandatory mt-4">
            {heroStrip.map((p, i) => (
              <div key={i} className="relative shrink-0 w-[70vw] aspect-[3/4] snap-start overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="70vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWEE PIJLERS ─── */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-3 h-px bg-nina-oranje" />
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/35">Werk</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <FadeIn>
            <Link href="/bedrijfsfotografie" className="group block">
              <div className="relative overflow-hidden aspect-[4/5]">
                <Image
                  src={businessPhoto}
                  alt="Bedrijfsfotografie"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-nina-oranje mr-3">Zakelijk</span>
                  <h3 className="font-serif text-2xl inline">Bedrijfsfotografie</h3>
                </div>
                <span className="text-sm text-black/30 group-hover:text-nina-oranje transition-colors">→</span>
              </div>
              <p className="mt-1 text-sm text-black/45">Merken, campagnes, horeca, team &amp; portret.</p>
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Link href="/vrij-werk" className="group block lg:mt-20">
              <div className="relative overflow-hidden aspect-[4/5]">
                <Image
                  src={artPhoto}
                  alt="Vrij werk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-nina-groen mr-3">Autonoom</span>
                  <h3 className="font-serif italic text-2xl inline">Vrij werk</h3>
                </div>
                <span className="text-sm text-black/30 group-hover:text-nina-groen transition-colors">→</span>
              </div>
              <p className="mt-1 text-sm text-black/45">Series &amp; concepten. Onderzoek zonder opdracht.</p>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── UITGELICHT PROJECT ─── */}
      {featured.cover && (
        <section className="mx-auto max-w-7xl px-5 lg:px-10 pb-24 lg:pb-32">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/35 mb-6">Uitgelicht</p>
            <Link href={`/cases/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={featured.cover}
                  alt={featured.client}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h2 className="font-serif text-2xl">{featured.client}</h2>
                <p className="text-sm text-black/45 max-w-xl">{featured.intro}</p>
                <span className="text-sm text-black/40 group-hover:text-black transition-colors shrink-0">Lees case →</span>
              </div>
            </Link>
            <Link href="/cases" className="inline-block mt-4 text-xs uppercase tracking-[0.25em] text-black/40 hover:text-black transition-colors">
              Alle cases
            </Link>
          </FadeIn>
        </section>
      )}

      {/* ─── OVER NINA ─── */}
      <section className="border-t border-black/8 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] max-w-sm">
              <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/35 mb-8">Over Nina</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Kijken is <em>kiezen</em>.
            </h2>
            <p className="mt-6 text-black/55 leading-relaxed max-w-md">
              Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
              Die achtergrond vertaalt zich in alles wat ik maak: rustig, geduldig, en net iets scheef.
            </p>
            <Link href="/over" className="inline-flex items-center gap-2 mt-8 text-sm text-black/60 hover:text-black transition-colors group">
              Lees mijn verhaal
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      {(igFeedBedrijf || igFeedVrijwerk) && (
        <section className="bg-black py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <FadeIn>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/30 mb-12">Instagram</p>
            </FadeIn>
            <div className={`grid gap-16 ${igFeedBedrijf && igFeedVrijwerk ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {igFeedBedrijf && (
                <FadeIn>
                  <InstagramFeed feedId={igFeedBedrijf} handle="nina.bedrijfsfotografie" />
                </FadeIn>
              )}
              {igFeedVrijwerk && (
                <FadeIn delay={0.1}>
                  <InstagramFeed feedId={igFeedVrijwerk} handle="ninapassenierfotografie" />
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTACT CTA ─── */}
      <FadeIn as="section" className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-36">
        <div className="border-t border-black/8 pt-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/35 mb-6">Contact</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight max-w-xl">
              Zullen we <em>koffie</em> drinken?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300"
            >
              Plan een kennismaking
            </Link>
            <Link
              href="/werkwijze"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black/20 text-sm text-black/50 tracking-wide hover:border-black hover:text-black transition-all duration-300"
            >
              Hoe ik werk
            </Link>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
