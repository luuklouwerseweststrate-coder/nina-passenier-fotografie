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

function WorkCard({ src, alt, label, labelColor, title, href }: {
  src: string; alt: string; label: string; labelColor: string; title?: string; href: string;
}) {
  return (
    <Link href={href} className="group block shrink-0">
      <div className="relative overflow-hidden aspect-[3/4] bg-black/5">
        <Image
          src={src} alt={alt} fill
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-2">
        <p className={`text-[9px] uppercase tracking-[0.35em] ${labelColor}`}>{label}</p>
        {title && <p className="text-sm font-serif mt-0.5 text-black/70">{title}</p>}
      </div>
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

  // Zorg voor minimaal 3 kaarten per sectie via herhaling
  const bedrijfCards = businessPhotos.length > 0
    ? [...businessPhotos, ...businessPhotos].slice(0, 5)
    : [{ src: businessPhoto, alt: "Bedrijfsfotografie" }];

  const vrijwerkCards = artPhotos.length > 0
    ? [...artPhotos, ...artPhotos].slice(0, 5)
    : [{ src: artPhoto, alt: "Vrij werk" }];

  return (
    <div className="pt-14">

      {/* ── Intro ── */}
      <div className="px-5 lg:px-10 pt-8 pb-6 flex items-end justify-between gap-4">
        <h1 className="font-serif text-xl lg:text-2xl leading-snug text-black/80">
          Fotograaf in Rotterdam —<br />
          <em>bedrijfsfotografie &amp; vrij werk.</em>
        </h1>
        {beschikbaar !== false && (
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 shrink-0 hidden sm:block">
            {beschikbaarTekst || "Beschikbaar"}
          </p>
        )}
      </div>

      {/* ── Bedrijfsfotografie sectie ── */}
      <section className="px-5 lg:px-10 pb-10">
        <div className="flex items-center justify-between mb-4 border-t border-black/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-nina-oranje shrink-0" />
            <h2 className="text-[10px] uppercase tracking-[0.35em] text-black/50">Bedrijfsfotografie</h2>
          </div>
          <Link href="/bedrijfsfotografie" className="text-[10px] uppercase tracking-[0.3em] text-nina-oranje hover:text-black transition-colors">
            Bekijk alles →
          </Link>
        </div>

        {/* Grid van kaarten */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
          {bedrijfCards.map((p, i) => (
            <WorkCard
              key={i}
              src={p.src} alt={p.alt}
              label="Zakelijk"
              labelColor="text-nina-oranje"
              href="/bedrijfsfotografie"
            />
          ))}
        </div>
      </section>

      {/* ── Vrij werk sectie ── */}
      <section className="px-5 lg:px-10 pb-10">
        <div className="flex items-center justify-between mb-4 border-t border-black/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-nina-groen shrink-0" />
            <h2 className="text-[10px] uppercase tracking-[0.35em] text-black/50">Vrij werk</h2>
          </div>
          <Link href="/vrij-werk" className="text-[10px] uppercase tracking-[0.3em] text-nina-groen hover:text-black transition-colors">
            Bekijk alles →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
          {vrijwerkCards.map((p, i) => (
            <WorkCard
              key={i}
              src={p.src} alt={p.alt}
              label="Autonoom"
              labelColor="text-nina-groen"
              href="/vrij-werk"
            />
          ))}
        </div>
      </section>

      {/* ── Convergentie: oranje lijn | logo | groene lijn ── */}
      <div className="flex items-center px-5 lg:px-10 py-8 gap-4">
        <div className="flex-1 h-px bg-nina-oranje/40" />
        <Link href="/" className="shrink-0">
          <img src="/logo.png" alt="Nina Passenier" className="h-8 lg:h-10 w-auto opacity-70 hover:opacity-100 transition-opacity" />
        </Link>
        <div className="flex-1 h-px bg-nina-groen/40" />
      </div>

      {/* ── Uitgelicht project ── */}
      {featured.cover && (
        <section className="px-5 lg:px-10 py-8 border-t border-black/8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-5">Uitgelicht project</p>
          <Link href={`/cases/${featured.slug}`} className="group grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
            <div className="relative overflow-hidden aspect-[16/10]">
              <Image
                src={featured.cover} alt={featured.client} fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl">{featured.client}</h3>
              <p className="text-sm text-black/45 mt-2 leading-relaxed">{featured.intro}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-black/30 group-hover:text-black transition-colors">
                Lees case →
              </p>
            </div>
          </Link>
          <Link href="/cases" className="mt-5 inline-block text-[10px] uppercase tracking-[0.3em] text-black/25 hover:text-black transition-colors">
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
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-4">Over Nina</p>
          <h2 className="font-serif text-2xl lg:text-3xl leading-snug">Kijken is <em>kiezen</em>.</h2>
          <p className="mt-3 text-sm text-black/45 leading-relaxed max-w-sm">
            Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
          </p>
          <Link href="/over" className="mt-6 text-[10px] uppercase tracking-[0.3em] text-black/30 hover:text-black transition-colors group inline-flex items-center gap-2">
            Lees meer <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* ── Instagram ── */}
      {(igFeedBedrijf || igFeedVrijwerk) && (
        <section className="bg-[#1a1a1a] py-12 lg:py-16">
          <div className="px-5 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-8">Instagram</p>
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-3">Contact</p>
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
