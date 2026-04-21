"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import ParallaxHero from "@/components/ParallaxHero";

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
};

export default function HomePageClient({
  heroImage,
  businessPhoto,
  artPhoto,
  ninaPortret,
  heroStrip,
  featured,
  heroTagline,
  heroSubtitel,
  introTekst,
}: Props) {
  return (
    <>
      {/* Hero met parallax */}
      <ParallaxHero src={heroImage} alt="Nina Passenier aan het werk">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-nina-cream/70 text-xs tracking-[0.3em] uppercase mb-5"
        >
          Fotograaf &middot; Rotterdam
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-nina-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display max-w-4xl"
        >
          {heroTagline || <>Beeld dat <span className="italic">blijft</span> hangen.</>}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block text-nina-cream/75 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
        >
          {heroSubtitel || "Fotografie voor merken die willen opvallen, en vrije series voor mezelf. Beide uit dezelfde manier van kijken."}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          <Button href="/bedrijfsfotografie" variant="oranje">Voor bedrijven</Button>
          <Button href="/vrij-werk" variant="groen">Vrij werk</Button>
        </motion.div>
      </ParallaxHero>

      {/* Intro */}
      <FadeIn as="section" className="mx-auto max-w-4xl px-5 lg:px-10 py-24 lg:py-36 text-center">
        <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-display">
          {introTekst || <>Ik ben Nina. Ik fotografeer{" "}
          <span className="text-nina-oranje">merken</span>{" "}
          en maak{" "}
          <span className="text-nina-groen">vrij werk</span>.
          Die twee werelden versterken elkaar.</>}
        </p>
      </FadeIn>

      {/* Twee pijlers */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionLabel nr="01" label="Twee richtingen" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeIn>
            <Link href="/bedrijfsfotografie" className="group relative overflow-hidden block">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={businessPhoto}
                  alt="Bedrijfsfotografie"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/90 via-nina-ink/20 to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-nina-oranje" />
                  <span className="text-nina-cream text-xs uppercase tracking-[0.3em]">Zakelijk</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <h3 className="font-serif text-4xl lg:text-5xl text-nina-cream leading-tight">
                    Bedrijfsfotografie
                  </h3>
                  <p className="text-nina-cream/75 mt-3 text-sm lg:text-base max-w-md">
                    Portretten, brand shoots, campagnebeeld en content dat past bij wie je bent.
                  </p>
                  <p className="text-nina-oranje mt-5 text-sm tracking-wide flex items-center gap-2">
                    Bekijk werk
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                  </p>
                </div>
              </div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.12}>
            <Link href="/vrij-werk" className="group relative overflow-hidden block lg:mt-24">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={artPhoto}
                  alt="Vrij werk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/90 via-nina-ink/20 to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-nina-groen" />
                  <span className="text-nina-cream text-xs uppercase tracking-[0.3em]">Autonoom</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <h3 className="font-serif italic text-4xl lg:text-5xl text-nina-cream leading-tight">
                    Vrij werk
                  </h3>
                  <p className="text-nina-cream/75 mt-3 text-sm lg:text-base max-w-md">
                    Series en concepten. Onderzoek in beeld, zonder opdracht, zonder deadline.
                  </p>
                  <p className="text-nina-groen mt-5 text-sm tracking-wide flex items-center gap-2">
                    Ontdek series
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                  </p>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Uitgelichte case */}
      <section className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-36">
        <FadeIn>
          <SectionLabel nr="02" label="Uitgelicht project" />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-display max-w-3xl">
            {featured.client} &mdash; {featured.intro.slice(0, 60)}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <Link href={`/cases/${featured.slug}`} className="block mt-12 relative aspect-[16/9] overflow-hidden group">
            <Image
              src={featured.cover}
              alt={featured.client}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
          </Link>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-6 items-start">
            <p className="text-nina-ink/65 text-lg max-w-xl leading-relaxed">
              {featured.intro}
            </p>
            <Button href="/cases" variant="outline">Alle cases</Button>
          </div>
        </FadeIn>
      </section>

      {/* Over Nina teaser */}
      <section className="bg-nina-beige/15 py-24 lg:py-36 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] max-w-md">
              <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -right-4 bg-nina-oranje w-20 h-20"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <SectionLabel nr="03" label="Over Nina" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-display">
              Kijken is <em className="text-nina-oranje">kiezen</em>.
            </h2>
            <p className="mt-6 text-lg text-nina-ink/65 leading-relaxed">
              Ik studeerde fotografie aan de Willem de Kooning in Rotterdam en vervolg mijn weg nu op de kunstacademie.
              Die achtergrond vertaalt zich in alles wat ik maak: rustig, geduldig, en net iets scheef.
            </p>
            <div className="mt-8">
              <Button href="/over" variant="ink">Lees mijn verhaal</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beeldenstrip */}
      <section className="py-24 lg:py-36">
        <FadeIn className="mx-auto max-w-7xl px-5 lg:px-10 mb-10">
          <SectionLabel nr="04" label="Recent werk" />
          <h2 className="font-serif text-4xl md:text-5xl tracking-display">Een greep uit beide werelden</h2>
        </FadeIn>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          }}
          className="scroll-strip flex overflow-x-auto gap-4 pb-4 px-5 lg:px-10 snap-x snap-mandatory"
        >
          {heroStrip.map((p, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="relative shrink-0 w-[75vw] sm:w-[45vw] lg:w-[28vw] aspect-[3/4] snap-start overflow-hidden group"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 28vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact CTA */}
      <FadeIn as="section" className="mx-auto max-w-5xl px-5 lg:px-10 py-24 lg:py-36 text-center">
        <SectionLabel nr="05" label="Contact" className="justify-center" />
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-display leading-[1.05]">
          Zullen we <em className="text-nina-oranje">koffie</em> drinken?
        </h2>
        <p className="mt-6 text-lg text-nina-ink/65 max-w-xl mx-auto">
          Idee voor een shoot, campagne of samenwerking? Stuur een bericht &mdash; ik reageer meestal binnen een dag.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/contact" variant="ink">Plan een kennismaking</Button>
          <Button href="/werkwijze" variant="outline">Hoe ik werk</Button>
        </div>
      </FadeIn>
    </>
  );
}
