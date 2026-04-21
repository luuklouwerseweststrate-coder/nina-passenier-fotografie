"use client";

import Image from "next/image";
import Link from "next/link";
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

function WorkCard({ src, alt, label, labelColor, href }: {
  src: string; alt: string; label: string; labelColor: string; href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden aspect-[3/4] bg-black/5">
        <Image
          src={src} alt={alt} fill
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <p className={`mt-1.5 text-[9px] uppercase tracking-[0.35em] ${labelColor}`}>{label}</p>
    </Link>
  );
}

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

  const bedrijfCards = businessPhotos.length > 0
    ? [...businessPhotos, ...businessPhotos].slice(0, 5)
    : [{ src: businessPhoto, alt: "Bedrijfsfotografie" }];

  const vrijwerkCards = artPhotos.length > 0
    ? [...artPhotos, ...artPhotos].slice(0, 5)
    : [{ src: artPhoto, alt: "Vrij werk" }];

  // Hero: eerste 2 van elk (fallback naar 1 als er maar 1 is)
  const heroVW = vrijwerkCards.slice(0, 2);
  const heroBF = bedrijfCards.slice(0, 2);

  return (
    <div>

      {/* ── HERO: DE SPLITSING — volledige viewport hoogte ── */}
      <section className="h-screen pt-14 relative flex">

        {/* ── Linker helft: Vrij werk ── */}
        <div className="relative flex flex-1 overflow-hidden">
          {/* Mobile: 1 foto, Desktop: 2 foto's naast elkaar */}
          <Link href="/vrij-werk" className="group relative flex-1 overflow-hidden">
            <Image
              src={heroVW[0].src} alt={heroVW[0].alt} fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
          </Link>
          {heroVW[1] && (
            <Link href="/vrij-werk" className="group relative flex-1 overflow-hidden hidden md:block">
              <Image
                src={heroVW[1].src} alt={heroVW[1].alt} fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
            </Link>
          )}

          {/* Label linksonder */}
          <div className="absolute bottom-6 left-5 z-10 pointer-events-none flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nina-groen" />
            <span className="text-[9px] uppercase tracking-[0.45em] text-white/80 drop-shadow">Vrij werk</span>
          </div>

          {/* Zachte groene gloed rechtsonder */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-nina-groen/20 to-transparent pointer-events-none" />
        </div>

        {/* ── Convergentie: logo exact in midden ── */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-[#f5f4f1] px-4 py-5 shadow-md">
            <img src="/logo.png" alt="Nina Passenier" className="h-10 lg:h-12 w-auto" />
          </div>
        </div>

        {/* Dunne verticale scheidingslijn */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px bg-white/25 z-10 pointer-events-none" />

        {/* ── Rechter helft: Bedrijfsfotografie ── */}
        <div className="relative flex flex-1 overflow-hidden">
          {heroBF[1] && (
            <Link href="/bedrijfsfotografie" className="group relative flex-1 overflow-hidden hidden md:block">
              <Image
                src={heroBF[1].src} alt={heroBF[1].alt} fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
            </Link>
          )}
          <Link href="/bedrijfsfotografie" className="group relative flex-1 overflow-hidden">
            <Image
              src={heroBF[0].src} alt={heroBF[0].alt} fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
          </Link>

          {/* Label rechtsonder */}
          <div className="absolute bottom-6 right-5 z-10 pointer-events-none flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.45em] text-white/80 drop-shadow">Bedrijfsfotografie</span>
            <span className="w-1.5 h-1.5 rounded-full bg-nina-oranje" />
          </div>

          {/* Zachte oranje gloed linksonder */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-nina-oranje/20 to-transparent pointer-events-none" />
        </div>

        {/* Scroll-indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1">
          <div className="w-px h-7 bg-white/35" />
        </div>
      </section>

      {/* ── Intro-regel ── */}
      <div className="px-5 lg:px-10 pt-8 pb-5 flex items-baseline justify-between gap-4 border-b border-black/8">
        <h1 className="font-serif text-lg lg:text-xl leading-snug text-black/70">
          Fotograaf in Rotterdam — <em>bedrijfsfotografie &amp; vrij werk.</em>
        </h1>
        {beschikbaar !== false && (
          <p className="text-[9px] uppercase tracking-[0.35em] text-black/25 shrink-0 hidden sm:block">
            {beschikbaarTekst || "Beschikbaar"}
          </p>
        )}
      </div>

      {/* ── Bedrijfsfotografie sectie ── */}
      <section className="px-5 lg:px-10 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-nina-oranje" />
            <h2 className="text-[9px] uppercase tracking-[0.4em] text-black/40">Bedrijfsfotografie</h2>
          </div>
          <Link href="/bedrijfsfotografie" className="text-[9px] uppercase tracking-[0.3em] text-nina-oranje hover:text-black transition-colors">
            Bekijk alles →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 lg:gap-3">
          {bedrijfCards.map((p, i) => (
            <WorkCard key={i} src={p.src} alt={p.alt} label="Zakelijk" labelColor="text-nina-oranje" href="/bedrijfsfotografie" />
          ))}
        </div>
      </section>

      {/* ── Convergentie-lijn: oranje ← logo → groen ── */}
      <div className="flex items-center px-5 lg:px-10 py-6 gap-4">
        <div className="flex-1 h-px bg-nina-oranje/30" />
        <img src="/logo.png" alt="Nina Passenier" className="h-7 lg:h-8 w-auto opacity-50" />
        <div className="flex-1 h-px bg-nina-groen/30" />
      </div>

      {/* ── Vrij werk sectie ── */}
      <section className="px-5 lg:px-10 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-nina-groen" />
            <h2 className="text-[9px] uppercase tracking-[0.4em] text-black/40">Vrij werk</h2>
          </div>
          <Link href="/vrij-werk" className="text-[9px] uppercase tracking-[0.3em] text-nina-groen hover:text-black transition-colors">
            Bekijk alles →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 lg:gap-3">
          {vrijwerkCards.map((p, i) => (
            <WorkCard key={i} src={p.src} alt={p.alt} label="Autonoom" labelColor="text-nina-groen" href="/vrij-werk" />
          ))}
        </div>
      </section>

      {/* ── Uitgelicht project ── */}
      {featured.cover && (
        <section className="px-5 lg:px-10 py-10 border-t border-black/8">
          <p className="text-[9px] uppercase tracking-[0.4em] text-black/25 mb-6">Uitgelicht project</p>
          <Link href={`/cases/${featured.slug}`} className="group grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="relative overflow-hidden aspect-[16/10]">
              <Image
                src={featured.cover} alt={featured.client} fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl">{featured.client}</h3>
              <p className="text-sm text-black/40 mt-2 leading-relaxed">{featured.intro}</p>
              <p className="mt-5 text-[9px] uppercase tracking-[0.35em] text-black/25 group-hover:text-black transition-colors">
                Lees case →
              </p>
            </div>
          </Link>
          <Link href="/cases" className="mt-5 inline-block text-[9px] uppercase tracking-[0.35em] text-black/20 hover:text-black transition-colors">
            Alle cases
          </Link>
        </section>
      )}

      {/* ── Over Nina ── */}
      <section className="border-t border-black/8 grid grid-cols-1 sm:grid-cols-2">
        <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[360px] overflow-hidden">
          <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="px-8 lg:px-12 py-10 flex flex-col justify-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-black/25 mb-4">Over Nina</p>
          <h2 className="font-serif text-2xl lg:text-3xl leading-snug">Kijken is <em>kiezen</em>.</h2>
          <p className="mt-3 text-sm text-black/40 leading-relaxed max-w-sm">
            Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
          </p>
          <Link href="/over" className="mt-6 text-[9px] uppercase tracking-[0.35em] text-black/25 hover:text-black transition-colors group inline-flex items-center gap-2">
            Lees meer <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* ── Instagram ── */}
      {(igFeedBedrijf || igFeedVrijwerk) && (
        <section className="bg-[#1a1a1a] py-12 lg:py-16">
          <div className="px-5 lg:px-10">
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-8">Instagram</p>
            <div className={`grid gap-10 ${igFeedBedrijf && igFeedVrijwerk ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {igFeedBedrijf && <InstagramFeed feedId={igFeedBedrijf} handle="nina.bedrijfsfotografie" />}
              {igFeedVrijwerk && <InstagramFeed feedId={igFeedVrijwerk} handle="ninapassenierfotografie" />}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section className="px-5 lg:px-10 py-12 lg:py-20 border-t border-black/8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-black/25 mb-3">Contact</p>
            <h2 className="font-serif text-2xl lg:text-4xl leading-tight">Zullen we <em>koffie</em> drinken?</h2>
          </div>
          <div className="flex gap-3">
            <Link href="/contact" className="px-5 py-2.5 border border-black/60 text-sm tracking-wide hover:bg-black hover:text-white hover:border-black transition-all duration-300">
              Plan een gesprek
            </Link>
            <Link href="/werkwijze" className="px-5 py-2.5 border border-black/15 text-sm text-black/40 tracking-wide hover:border-black/40 hover:text-black transition-all duration-300">
              Werkwijze
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
