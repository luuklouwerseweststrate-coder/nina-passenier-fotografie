import Image from "next/image";
import Button from "@/components/Button";
import ColorBlob from "@/components/ColorBlob";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { settingsQuery } from "@/sanity/lib/queries";
import { ninaPortret as fallbackPortret, heroStrip as fallbackStrip } from "@/lib/photos";

export const metadata = { title: "Over Nina &mdash; Nina Passenier Fotografie" };
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
      <section className="relative overflow-hidden">
        <ColorBlob color="#E8913A" className="w-[50vw] h-[50vw] -top-20 -right-20" />
        <ColorBlob color="#8FA368" className="w-[40vw] h-[40vw] top-60 -left-20" delay={0.3} />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-nina-petrol mb-6">Over Nina</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display">
              Kijken is <em className="text-nina-oranje">kiezen</em>.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4]">
              <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" priority />
              <div className="absolute -bottom-4 -right-4 bg-nina-geel w-24 h-24 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Verhaal */}
      <section className="mx-auto max-w-3xl px-5 lg:px-10 py-20 lg:py-28 space-y-8 text-lg leading-relaxed text-nina-ink/80">
        <p>{bio.p1}</p>
        <p>{bio.p2}</p>
        <p className="font-serif italic text-2xl md:text-3xl text-nina-ink leading-snug">{bio.p3}</p>
        <p>{bio.p4}</p>
        <p>{bio.p5}</p>
      </section>

      {/* Opleiding & CV */}
      <section className="bg-nina-beige/20 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-nina-oranje mb-5">Opleiding</p>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-medium text-nina-ink">Kunstacademie</p>
                <p className="text-nina-ink/60">Lopend &middot; autonome fotografie</p>
              </li>
              <li>
                <p className="font-medium text-nina-ink">Willem de Kooning, Rotterdam</p>
                <p className="text-nina-ink/60">Fotografie, BA</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-nina-groen mb-5">Exposities & publicaties</p>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-medium text-nina-ink">Expo Nina Passenier &mdash; Polderhuis Westkapelle</p>
                <p className="text-nina-ink/60">
                  <a
                    href="https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-nina-groen underline underline-offset-4"
                  >
                    Museum Polderhuis Westkapelle
                  </a>
                </p>
              </li>
              <li>
                <p className="font-medium text-nina-ink">Wachtkamer &mdash; groepsexpositie</p>
                <p className="text-nina-ink/60">Rotterdam, 2025</p>
              </li>
              <li>
                <p className="font-medium text-nina-ink">Willem de Kooning eindexamen expositie</p>
                <p className="text-nina-ink/60">Rotterdam, 2024</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Beeldenstrip */}
      <section className="py-20 lg:py-28">
        <div className="scroll-strip flex overflow-x-auto gap-4 pb-4 px-5 lg:px-10 snap-x snap-mandatory">
          {heroStrip.map((p: { src: string; alt: string }, i: number) => (
            <div key={i} className="relative shrink-0 w-[70vw] sm:w-[40vw] lg:w-[22vw] aspect-[3/4] snap-start">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 70vw, 22vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-10 py-20 lg:py-28 text-center">
        <h2 className="font-serif text-4xl md:text-5xl tracking-display leading-tight">
          Benieuwd hoe ik werk?
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/werkwijze" variant="ink">Bekijk mijn werkwijze</Button>
          <Button href="/contact" variant="outline">Plan een gesprek</Button>
        </div>
      </section>
    </>
  );
}
