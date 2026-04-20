import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import PhotoCard from "@/components/PhotoCard";
import SectionHeader from "@/components/SectionHeader";
import ColorBlob from "@/components/ColorBlob";
import { businessPhotos, artPhotos, heroStrip, heroImage, ninaPortret } from "@/lib/photos";
import { cases } from "@/lib/cases";

export default function HomePage() {
  const featured = cases[0];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] lg:min-h-[88vh] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt="Nina Passenier aan het werk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/80 via-nina-ink/20 to-transparent" />
        <ColorBlob color="#E8913A" className="w-[60vw] h-[60vw] -top-20 -right-40" />
        <ColorBlob color="#8FA368" className="w-[50vw] h-[50vw] -bottom-40 -left-40" delay={0.2} />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 pb-16 lg:pb-24 w-full">
          <p className="text-nina-cream/80 text-sm tracking-[0.3em] uppercase mb-4">Fotograaf &middot; Rotterdam</p>
          <h1 className="font-serif text-nina-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display max-w-4xl">
            Beeld dat <span className="text-nina-geel italic">blijft</span> hangen.
          </h1>
          <p className="text-nina-cream/80 text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
            Ik maak fotografie voor merken die willen opvallen, en vrije series voor mezelf. Beide uit dezelfde manier van kijken.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button href="/bedrijfsfotografie" variant="oranje">Voor bedrijven</Button>
            <Button href="/kunstfotografie" variant="groen">Vrij werk</Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-5 lg:px-10 py-24 lg:py-32 text-center">
        <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-display">
          Ik ben Nina. Ik fotografeer <span className="text-nina-oranje">merken</span> en maak <span className="text-nina-groen">vrij werk</span>.
          Die twee werelden versterken elkaar in alles wat ik doe.
        </p>
      </section>

      {/* Twee pijlers */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Bedrijf */}
        <Link href="/bedrijfsfotografie" className="group relative overflow-hidden">
          <div className="aspect-[4/5] relative">
            <Image
              src={businessPhotos[0].src}
              alt="Bedrijfsfotografie"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/90 to-nina-ink/10" />
            <div className="absolute top-6 left-6">
              <span className="inline-block w-3 h-3 rounded-full bg-nina-oranje mr-2 align-middle" />
              <span className="text-nina-cream text-xs uppercase tracking-[0.3em] align-middle">Zakelijk</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <h3 className="font-serif text-4xl lg:text-5xl text-nina-cream leading-tight">Bedrijfsfotografie</h3>
              <p className="text-nina-cream/80 mt-3 text-sm lg:text-base max-w-md">
                Portretten, brand shoots, campagnebeeld en content dat past bij wie je bent.
              </p>
              <p className="text-nina-oranje mt-5 text-sm tracking-wide">Bekijk werk &rarr;</p>
            </div>
          </div>
        </Link>

        {/* Kunst */}
        <Link href="/kunstfotografie" className="group relative overflow-hidden lg:mt-24">
          <div className="aspect-[4/5] relative">
            <Image
              src={artPhotos[0].src}
              alt="Kunstfotografie"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/90 to-nina-ink/10" />
            <div className="absolute top-6 left-6">
              <span className="inline-block w-3 h-3 rounded-full bg-nina-groen mr-2 align-middle" />
              <span className="text-nina-cream text-xs uppercase tracking-[0.3em] align-middle">Autonoom</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <h3 className="font-serif text-4xl lg:text-5xl text-nina-cream leading-tight italic">Kunstfotografie</h3>
              <p className="text-nina-cream/80 mt-3 text-sm lg:text-base max-w-md">
                Series en concepten. Onderzoek in beeld, zonder opdracht, zonder deadline.
              </p>
              <p className="text-nina-groen mt-5 text-sm tracking-wide">Ontdek series &rarr;</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Uitgelichte case */}
      <section className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <ColorBlob color="#E8B544" className="w-[40vw] h-[40vw] -top-20 right-10" />
        <SectionHeader
          eyebrow="Uitgelicht project"
          title="De Waal Advocaten &mdash; echte mensen, geen stockbeeld"
          accent="geel"
        />
        <div className="mt-12 relative aspect-[16/9] overflow-hidden">
          <Image
            src={featured.cover}
            alt={featured.client}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-6 items-start">
          <p className="text-nina-ink/70 text-lg max-w-xl leading-relaxed">
            Advocatenkantoor De Waal wilde af van het stockbeeld op hun website. Ik fotografeerde het team in hun eigen werkritme, zonder stropdas-poses.
          </p>
          <Button href={`/cases`} variant="outline">Alle cases</Button>
        </div>
      </section>

      {/* Over Nina teaser */}
      <section className="bg-nina-beige/20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[3/4] max-w-md">
            <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            <div className="absolute -bottom-4 -right-4 bg-nina-oranje w-24 h-24 -z-0" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-nina-petrol mb-4">Over Nina</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-display">
              Kijken is <em className="text-nina-oranje">kiezen</em>.
            </h2>
            <p className="mt-6 text-lg text-nina-ink/70 leading-relaxed">
              Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
              Die achtergrond vertaalt zich in alles wat ik maak: rustig, geduldig, en net iets scheef.
            </p>
            <div className="mt-8">
              <Button href="/over" variant="ink">Lees mijn verhaal</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beeldstrip */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-nina-oranje mb-4">Recent werk</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-display">Een greep uit beide werelden</h2>
        </div>
        <div className="scroll-strip flex overflow-x-auto gap-4 pb-4 px-5 lg:px-10 snap-x snap-mandatory">
          {heroStrip.map((p, i) => (
            <div key={i} className="relative shrink-0 w-[75vw] sm:w-[45vw] lg:w-[28vw] aspect-[3/4] snap-start overflow-hidden">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 28vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-5xl px-5 lg:px-10 py-24 lg:py-32 text-center">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-display leading-[1.05]">
          Zullen we <span className="text-nina-oranje italic">koffie</span> drinken?
        </h2>
        <p className="mt-6 text-lg text-nina-ink/70 max-w-xl mx-auto">
          Idee voor een shoot, campagne of samenwerking? Stuur een bericht of bel &mdash; ik reageer meestal binnen een dag.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/contact" variant="ink">Plan een kennismaking</Button>
          <Button href="/werkwijze" variant="outline">Hoe ik werk</Button>
        </div>
      </section>
    </>
  );
}
