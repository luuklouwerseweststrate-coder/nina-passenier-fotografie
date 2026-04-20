import Image from "next/image";
import Button from "@/components/Button";
import { ninaPortret, heroStrip } from "@/lib/photos";

export const metadata = { title: "Over Nina — Nina Passenier Fotografie" };

export default function OverPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-nina-ink/50 mb-6">Over Nina</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display">
              Kijken is kiezen.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4]">
              <Image src={ninaPortret} alt="Nina Passenier" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Verhaal */}
      <section className="mx-auto max-w-3xl px-5 lg:px-10 py-20 lg:py-28 space-y-8 text-lg leading-relaxed text-nina-ink/80 border-t border-nina-ink/10">
        <p>
          Ik ben Nina Passenier, fotograaf in Rotterdam. Ik studeerde fotografie aan de <strong className="text-nina-ink">Willem de Kooning</strong>{" "}
          en vervolg mijn weg nu op de kunstacademie. Die twee werelden — het commerciële en het autonome — versterken elkaar in mijn werk.
        </p>
        <p>
          Voor bedrijven maak ik beeld dat klopt: portretten die iets zeggen, campagnes met karakter, branding die verder gaat dan een productfoto.
          Daarnaast werk ik aan eigen series, waarin ik onderzoek wat beeld kan zijn als je het niet hoeft te verkopen.
        </p>
        <p className="font-serif text-2xl md:text-3xl text-nina-ink leading-snug">
          Wat beide verbindt: een manier van kijken die rustig is, geduldig en net iets scheef.
        </p>
        <p>
          Ik geloof dat de beste foto&apos;s ontstaan als je blijft wachten tot iemand zichzelf vergeet. Dat geldt voor een advocaat in een overhemd,
          voor een model in een veld met zoute lucht, en voor een vreemde in een wachtkamer.
        </p>
        <p>
          Werken met mij betekent: geen strakke shotlist van zes uur, geen geforceerde poses. Wel voorbereiding, gesprek, en genoeg ruimte om de dag
          haar werk te laten doen.
        </p>
      </section>

      {/* Opleiding & CV */}
      <section className="border-t border-nina-ink/10 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-nina-ink/50 mb-5">Opleiding</p>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-medium text-nina-ink">Kunstacademie</p>
                <p className="text-nina-ink/60">Lopend · autonome fotografie</p>
              </li>
              <li>
                <p className="font-medium text-nina-ink">Willem de Kooning, Rotterdam</p>
                <p className="text-nina-ink/60">Fotografie, BA</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-nina-ink/50 mb-5">Exposities & publicaties</p>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-medium text-nina-ink">Expo Nina Passenier — Polderhuis Westkapelle</p>
                <p className="text-nina-ink/60">
                  <a
                    href="https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-nina-ink underline underline-offset-4"
                  >
                    Museum Polderhuis Westkapelle
                  </a>
                </p>
              </li>
              <li>
                <p className="font-medium text-nina-ink">Wachtkamer — groepsexpositie</p>
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
      <section className="py-20 lg:py-28 border-t border-nina-ink/10">
        <div className="scroll-strip flex overflow-x-auto gap-4 pb-4 px-5 lg:px-10 snap-x snap-mandatory">
          {heroStrip.map((p, i) => (
            <div key={i} className="relative shrink-0 w-[70vw] sm:w-[40vw] lg:w-[22vw] aspect-[3/4] snap-start">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 70vw, 22vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-10 py-20 lg:py-28 text-center border-t border-nina-ink/10">
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
