import Image from "next/image";
import Button from "@/components/Button";
import PhotoCard from "@/components/PhotoCard";
import ColorBlob from "@/components/ColorBlob";
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

      {/* Expositie */}
      <section className="relative overflow-hidden">
        <ColorBlob color="#E8B544" className="w-[45vw] h-[45vw] -top-20 -right-20" delay={0.2} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
          <p className="text-nina-groen text-xs uppercase tracking-[0.3em] mb-6">Nu te zien</p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <h2 className="font-serif italic text-3xl md:text-5xl tracking-display leading-tight">
                Expo Nina Passenier <br className="hidden md:block" />
                <span className="text-nina-groen">Polderhuis Westkapelle</span>
              </h2>
              <p className="mt-6 text-lg text-nina-ink/70 leading-relaxed max-w-2xl">
                Een solo-expositie met recent vrij werk in Museum Polderhuis Westkapelle. Een selectie uit lopende series,
                gepresenteerd in de ruimtes van het museum.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-y-3 max-w-md text-sm">
                <dt className="text-nina-petrol uppercase tracking-widest text-xs">Locatie</dt>
                <dd className="text-nina-ink">Museum Polderhuis, Westkapelle</dd>
                <dt className="text-nina-petrol uppercase tracking-widest text-xs">Type</dt>
                <dd className="text-nina-ink">Solo-expositie</dd>
              </dl>
              <div className="mt-10">
                <a
                  href="https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-nina-groen hover:text-nina-ink transition-colors border-b border-nina-groen hover:border-nina-ink pb-1 text-sm tracking-wide"
                >
                  Bekijk expositie op polderhuiswestkapelle.nl
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5]">
                <Image
                  src={artPhotos[0].src}
                  alt="Werk uit expositie Nina Passenier in Polderhuis Westkapelle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-nina-groen w-24 h-24 -z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Series */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32 space-y-32 lg:space-y-40">
        {series.map((s, i) => (
          <div
            key={s.title}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
          >
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
        ))}
      </section>

      {/* Losse beelden */}
      <section className="bg-nina-beige/20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-nina-groen mb-4">Fragmenten</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-display italic">Losse beelden, tussen series in.</h2>
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

      <section className="mx-auto max-w-4xl px-5 lg:px-10 py-24 lg:py-32 text-center">
        <h2 className="font-serif italic text-4xl md:text-5xl tracking-display">
          Tentoonstellingen, prints of samenwerkingen?
        </h2>
        <p className="mt-6 text-nina-ink/70 text-lg max-w-xl mx-auto">
          Mijn vrije werk is op aanvraag als print beschikbaar. Voor exposities of publicaties sta ik altijd open voor een gesprek.
        </p>
        <div className="mt-10">
          <Button href="/contact" variant="groen">Neem contact op</Button>
        </div>
      </section>
    </>
  );
}
