import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { settingsQuery } from "@/sanity/lib/queries";
import { ninaPortret as fallbackPortret, heroStrip as fallbackStrip } from "@/lib/photos";

export const metadata = { title: "Over Nina — Nina Passenier" };
export const revalidate = 3600;

export default async function OverPage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const ninaPortret = settings?.ninaPortret
    ? urlFor(settings.ninaPortret).width(1200).quality(85).url()
    : fallbackPortret;

  const heroStrip = settings?.heroStrip?.length > 0
    ? settings.heroStrip.map((img: any) => ({ src: urlFor(img).width(1200).quality(80).url(), alt: img.alt || "Foto Nina Passenier" }))
    : fallbackStrip;

  const bio = {
    p1: settings?.bio1 || "Ik ben Nina Passenier, fotograaf in Rotterdam. Ik studeerde fotografie aan de Willem de Kooning en vervolg mijn weg nu op de kunstacademie. Die twee werelden — het commerciële en het autonome — versterken elkaar in mijn werk.",
    p2: settings?.bio2 || "Voor bedrijven maak ik beeld dat klopt: portretten die iets zeggen, campagnes met karakter, branding die verder gaat dan een productfoto. Daarnaast werk ik aan eigen series, waarin ik onderzoek wat beeld kan zijn als je het niet hoeft te verkopen.",
    p3: settings?.bio3 || "Wat beide verbindt: een manier van kijken die rustig is, geduldig en net iets scheef.",
    p4: settings?.bio4 || "Ik geloof dat de beste foto's ontstaan als je blijft wachten tot iemand zichzelf vergeet. Dat geldt voor een advocaat in een overhemd, voor een model in een veld met zoute lucht, en voor een vreemde in een wachtkamer.",
    p5: settings?.bio5 || "Werken met mij betekent: geen strakke shotlist van zes uur, geen geforceerde poses. Wel voorbereiding, gesprek, en genoeg ruimte om de dag haar werk te laten doen.",
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        <div className="px-7 lg:px-12 pt-20 lg:pt-28 pb-12 lg:pb-16 flex flex-col justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Over Nina</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-ink max-w-sm">
              Kijken is kiezen.
            </h1>
          </div>
          <p className="mt-10 text-base text-ink/55 max-w-sm leading-relaxed">
            Fotograaf in Rotterdam — bedrijfsfotografie en autonoom vrij werk.
          </p>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
          <Image
            src={ninaPortret}
            alt="Nina Passenier"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── Verhaal ────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-24 border-b border-border">
        <div className="max-w-2xl space-y-7 text-base text-ink/65 leading-relaxed">
          <p>{bio.p1}</p>
          <p>{bio.p2}</p>
        </div>

        <blockquote className="my-12 lg:my-16 max-w-xl border-l border-border pl-7">
          <p className="text-2xl lg:text-3xl font-light leading-snug text-ink">{bio.p3}</p>
        </blockquote>

        <div className="max-w-2xl space-y-7 text-base text-ink/65 leading-relaxed">
          <p>{bio.p4}</p>
          <p>{bio.p5}</p>
        </div>
      </section>

      {/* ── CV ─────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 border-b border-border bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-7">Opleiding</p>
            <ul className="space-y-5">
              <li className="border-t border-border pt-4">
                <p className="text-sm font-medium text-ink">Kunstacademie</p>
                <p className="text-sm text-ink/45 mt-0.5">Lopend &middot; autonome fotografie</p>
              </li>
              <li className="border-t border-border pt-4">
                <p className="text-sm font-medium text-ink">Willem de Kooning · Rotterdam</p>
                <p className="text-sm text-ink/45 mt-0.5">Fotografie, BA</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-7">Exposities & publicaties</p>
            <ul className="space-y-5">
              <li className="border-t border-border pt-4">
                <p className="text-sm font-medium text-ink">Expo Nina Passenier — Polderhuis Westkapelle</p>
                <a href="https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier"
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-ink/45 mt-0.5 hover:text-ink transition-colors underline underline-offset-4 decoration-border block">
                  polderhuiswestkapelle.nl
                </a>
              </li>
              <li className="border-t border-border pt-4">
                <p className="text-sm font-medium text-ink">Wachtkamer — groepsexpositie</p>
                <p className="text-sm text-ink/45 mt-0.5">Rotterdam, 2025</p>
              </li>
              <li className="border-t border-border pt-4">
                <p className="text-sm font-medium text-ink">Willem de Kooning eindexamen</p>
                <p className="text-sm text-ink/45 mt-0.5">Rotterdam, 2024</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Beeldenstrip ───────────────────────────── */}
      {heroStrip.length > 0 && (
        <section className="py-14 border-b border-border">
          <div className="no-scrollbar flex overflow-x-auto gap-3 pb-2 px-7 lg:px-12 snap-x snap-mandatory">
            {heroStrip.map((p: { src: string; alt: string }, i: number) => (
              <div key={i} className="relative shrink-0 w-[60vw] sm:w-[35vw] lg:w-[20vw] aspect-[3/4] snap-start overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 60vw, 20vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 border-b border-border">
        <h2 className="text-2xl lg:text-3xl font-light leading-tight max-w-xs">
          Benieuwd hoe ik werk?
        </h2>
        <div className="flex gap-3">
          <Link href="/werkwijze" className="border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-ink hover:text-bg transition-all duration-300">
            Werkwijze
          </Link>
          <Link href="/contact" className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
