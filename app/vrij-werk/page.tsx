import Image from "next/image";
import Button from "@/components/Button";
import PhotoCard from "@/components/PhotoCard";
import ColorBlob from "@/components/ColorBlob";
import FadeIn from "@/components/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { artPhotos } from "@/lib/photos";

export const metadata = { title: "Vrij werk — Nina Passenier" };

const series = [
  {
    title: "Wachtkamer",
    year: "2024",
    text: "Verstilde ruimtes waar mensen even niet weten wat ze met zichzelf aan moeten. Wachtkamers, stationshallen, gangen.",
    cover: artPhotos[0].src
  },
  {
    title: "Zacht licht",
    year: "2024",
    text: "Een studie naar het moment vlak voor het donker wordt, en wat dat licht met gezichten doet.",
    cover: artPhotos[1].src
  },
  {
    title: "Ongezien",
    year: "2025",
    text: "Portretten van mensen die normaal niet worden gefotografeerd. Geen pose, geen styling, alleen aanwezig zijn.",
    cover: artPhotos[2].src
  }
];

export default function VrijWerkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-nina-cream">
        <ColorBlob color="#8FA368" className="w-[55vw] h-[55vw] -top-20 -left-20" />
        <ColorBlob color="#C9A988" className="w-[40vw] h-[40vw] top-40 -right-20" delay={0.3} />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-40">
          <p className="text-nina-groen text-xs uppercase tracking-[0.3em] mb-6">Vrij werk</p>
          <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display max-w-4xl">
            Onderzoek <br className="hidden md:block" />in beeld.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-nina-ink/70 max-w-2xl leading-relaxed">
            Naast opdrachten werk ik aan eigen series. Langzaam, zonder deadline, zonder vooraf bedacht eindresultaat.
            Dit is waar mijn blik zich blijft ontwikkelen.
          </p>
        </div>
      </section>

      {/* Expositie — uitgelicht */}
      <section className="bg-nina-ink text-nina-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28">
          <FadeIn>
            <SectionLabel nr="01" label="Nu te zien" className="[&>span]:text-nina-cream/50 [&>div]:bg-nina-cream/20" />
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <FadeIn className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://www.polderhuiswestkapelle.nl/images/album/expo25_nina_passenier.jpg"
                  alt="Foto-expositie Nina Passenier — Polderhuis Westkapelle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-nina-groen text-white text-xs uppercase tracking-widest px-3 py-1.5">
                    Nu te zien
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="lg:col-span-7 order-1 lg:order-2">
              <p className="text-nina-cream/50 text-xs uppercase tracking-[0.3em] mb-3">
                Museumcafé Polderhuis · Westkapelle
              </p>
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-tight tracking-display">
                Foto-expositie<br />Nina Passenier
              </h2>
              <p className="mt-6 text-lg text-nina-cream/75 leading-relaxed max-w-xl">
                Een expositie die onderzoekt hoe mensen zich verhouden tot elkaar en hun omgeving.
                Door het gewone in een onverwachte context te plaatsen, ontstaan beelden die
                tegelijk vertrouwd en vervreemdend aanvoelen — een uitnodiging om opnieuw te kijken
                naar wat vanzelfsprekend lijkt.
              </p>

              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm border-t border-nina-cream/10 pt-8">
                <div>
                  <dt className="text-nina-cream/40 uppercase tracking-widest text-xs mb-1">Locatie</dt>
                  <dd className="text-nina-cream">Museumcafé Polderhuis, Westkapelle</dd>
                </div>
                <div>
                  <dt className="text-nina-cream/40 uppercase tracking-widest text-xs mb-1">Periode</dt>
                  <dd className="text-nina-cream">11 oktober 2025 — 7 mei 2026</dd>
                </div>
                <div>
                  <dt className="text-nina-cream/40 uppercase tracking-widest text-xs mb-1">Toegang</dt>
                  <dd className="text-nina-cream">Gratis, tijdens openingstijden café</dd>
                </div>
                <div>
                  <dt className="text-nina-cream/40 uppercase tracking-widest text-xs mb-1">Adres</dt>
                  <dd className="text-nina-cream">Zuidstraat 154–156, Westkapelle</dd>
                </div>
              </dl>

              <div className="mt-8">
                <a
                  href="https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-nina-groen hover:text-nina-cream transition-colors text-sm border-b border-nina-groen hover:border-nina-cream pb-1 tracking-wide"
                >
                  Meer info op polderhuiswestkapelle.nl
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* In de media */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28 border-b border-nina-ink/10">
        <FadeIn>
          <SectionLabel nr="02" label="In de media" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <a
            href="https://www.pzc.nl/veere/de-passie-van-nina-voor-zeeland-spat-van-de-fotos-dit-is-waar-ik-ben-opgegroeid~a94553fd/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-t border-nina-ink/10 hover:border-nina-ink/30 transition-colors"
          >
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <p className="text-xs uppercase tracking-widest text-nina-ink/40 mb-1">PZC</p>
                <p className="text-xs text-nina-ink/40">Provinciale Zeeuwse Courant</p>
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl leading-snug tracking-display group-hover:text-nina-groen transition-colors">
                  De passie van Nina voor Zeeland spat van de foto&apos;s —{" "}
                  <em>&lsquo;Dit is waar ik ben opgegroeid&rsquo;</em>
                </h3>
                <p className="mt-2 text-nina-ink/50 text-sm">
                  Interview over haar werk, haar band met Zeeland en de expositie in Westkapelle.
                </p>
              </div>
            </div>
            <span className="shrink-0 text-nina-ink/30 group-hover:text-nina-groen transition-colors text-xl group-hover:translate-x-1 inline-block transition-transform duration-300">
              &rarr;
            </span>
          </a>
        </FadeIn>
      </section>

      {/* Series */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <FadeIn>
          <SectionLabel nr="03" label="Series" />
        </FadeIn>
        <div className="space-y-32 lg:space-y-40">
          {series.map((s, i) => (
            <FadeIn key={s.title} delay={0.05}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={`relative aspect-[4/5] ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={s.cover}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-nina-groen text-sm tracking-widest">{s.year}</p>
                  <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl mt-3 tracking-display leading-tight">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lg text-nina-ink/70 leading-relaxed">{s.text}</p>
                  <p className="mt-8 text-sm text-nina-petrol">Serie &middot; analoge fotografie</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Losse beelden */}
      <section className="bg-nina-beige/20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <FadeIn>
            <SectionLabel nr="04" label="Fragmenten" />
            <h2 className="font-serif text-4xl md:text-5xl tracking-display italic">Losse beelden, tussen series in.</h2>
          </FadeIn>
          <div className="mt-16 columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
            {artPhotos.concat(artPhotos.slice(0, 3)).map((p, i) => (
              <div key={i} className="break-inside-avoid">
                <PhotoCard
                  src={p.src}
                  alt={p.alt}
                  ratio={i % 3 === 0 ? "portrait" : i % 3 === 1 ? "landscape" : "square"}
                  accent="groen"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FadeIn as="section" className="mx-auto max-w-4xl px-5 lg:px-10 py-24 lg:py-32 text-center">
        <h2 className="font-serif italic text-4xl md:text-5xl tracking-display">
          Tentoonstellingen, prints of samenwerkingen?
        </h2>
        <p className="mt-6 text-nina-ink/70 text-lg max-w-xl mx-auto">
          Mijn vrije werk is op aanvraag als print beschikbaar. Voor exposities of publicaties sta ik altijd open voor een gesprek.
        </p>
        <div className="mt-10">
          <Button href="/contact" variant="groen">Neem contact op</Button>
        </div>
      </FadeIn>
    </>
  );
}
