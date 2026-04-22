import Image from "next/image";
import Link from "next/link";
import PhotoCard from "@/components/PhotoCard";
import InstagramFeed from "@/components/InstagramFeed";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { artPhotosQuery, seriesQuery, exhibitionQuery, pressMentionsQuery, settingsQuery } from "@/sanity/lib/queries";
import { artPhotos as fallbackArtPhotos } from "@/lib/photos";

export const metadata = { title: "Vrij werk — Nina Passenier" };
export const revalidate = 3600;

const fallbackSeries = [
  { title: "Wachtkamer", year: "2024", text: "Verstilde ruimtes waar mensen even niet weten wat ze met zichzelf aan moeten.", cover: fallbackArtPhotos[0]?.src ?? "" },
  { title: "Zacht licht", year: "2024", text: "Een studie naar het moment vlak voor het donker wordt, en wat dat licht met gezichten doet.", cover: fallbackArtPhotos[1]?.src ?? "" },
  { title: "Ongezien", year: "2025", text: "Portretten van mensen die normaal niet worden gefotografeerd. Geen pose, geen styling.", cover: fallbackArtPhotos[2]?.src ?? "" },
];

const fallbackExhibition = {
  title: "Expo Nina Passenier", location: "Museumcafé Polderhuis · Westkapelle",
  address: "Zuidstraat 154–156, Westkapelle", period: "11 oktober 2025 — 7 mei 2026",
  access: "Gratis, tijdens openingstijden café",
  description: "Een expositie die onderzoekt hoe mensen zich verhouden tot elkaar en hun omgeving. Door het gewone in een onverwachte context te plaatsen, ontstaan beelden die tegelijk vertrouwd en vervreemdend aanvoelen.",
  imageUrl: "https://www.polderhuiswestkapelle.nl/images/album/expo25_nina_passenier.jpg",
  linkUrl: "https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier",
  linkLabel: "Meer info op polderhuiswestkapelle.nl",
};

const fallbackPress = [{
  publication: "PZC", publicationFull: "Provinciale Zeeuwse Courant",
  title: "De passie van Nina voor Zeeland spat van de foto's — 'Dit is waar ik ben opgegroeid'",
  description: "Interview over haar werk, haar band met Zeeland en de expositie in Westkapelle.",
  url: "https://www.pzc.nl/veere/de-passie-van-nina-voor-zeeland-spat-van-de-fotos-dit-is-waar-ik-ben-opgegroeid~a94553fd/",
}];

export default async function VrijWerkPage() {
  const [sanityArtPhotos, sanitySeries, sanityExpo, sanityPress, settings] = await Promise.all([
    client.fetch(artPhotosQuery).catch(() => []),
    client.fetch(seriesQuery).catch(() => []),
    client.fetch(exhibitionQuery).catch(() => null),
    client.fetch(pressMentionsQuery).catch(() => []),
    client.fetch(settingsQuery).catch(() => null),
  ]);

  const artPhotos = sanityArtPhotos.length > 0
    ? sanityArtPhotos.map((p: any) => ({ src: urlFor(p.image).width(1600).quality(80).url(), alt: p.alt }))
    : fallbackArtPhotos.map((p) => ({ src: p.src, alt: p.alt }));

  const series = sanitySeries.length > 0
    ? sanitySeries.map((s: any) => ({ title: s.title, year: s.year, text: s.text, cover: urlFor(s.cover).width(1600).quality(80).url() }))
    : fallbackSeries;

  const expo = sanityExpo
    ? { ...sanityExpo, imageUrl: sanityExpo.image ? urlFor(sanityExpo.image).width(1200).quality(80).url() : fallbackExhibition.imageUrl }
    : fallbackExhibition;

  const press = sanityPress.length > 0 ? sanityPress : fallbackPress;
  const igHandle = settings?.igHandleAutonoom as string | undefined;
  const igFeedId = settings?.igFeedIdAutonoom as string | undefined;

  return (
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-16 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-free mb-6">Autonoom werk</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-ink max-w-3xl">
          {settings?.autonomTagline || "Onderzoek in beeld."}
        </h1>
        <p className="mt-7 text-base text-ink/55 max-w-lg leading-relaxed">
          {settings?.autonomIntro || "Naast opdrachten werk ik aan eigen series. Langzaam, zonder deadline, zonder vooraf bedacht eindresultaat."}
        </p>
      </section>

      {/* ── Expositie ──────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-10">Nu te zien</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {expo.imageUrl && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={expo.imageUrl} alt={expo.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          )}
          <div className="lg:pt-4">
            <p className="text-[9px] uppercase tracking-[0.22em] text-muted mb-4">{expo.location}</p>
            <h2 className="text-2xl lg:text-3xl font-light leading-snug">{expo.title}</h2>
            <p className="mt-5 text-base text-ink/55 leading-relaxed">{expo.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-sm border-t border-border pt-7">
              {([["Periode", expo.period], ["Locatie", expo.location], ["Toegang", expo.access], ["Adres", expo.address]] as [string,string][])
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[9px] uppercase tracking-[0.22em] text-faint mb-1">{label}</dt>
                    <dd className="text-ink/65">{value}</dd>
                  </div>
                ))}
            </dl>
            {expo.linkUrl && (
              <a href={expo.linkUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-7 text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors border-b border-border hover:border-ink pb-0.5">
                {expo.linkLabel}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Pers ───────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-8">In de media</p>
        {press.map((item: any, i: number) => (
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-7 border-t border-border">
            <div className="flex items-start gap-6">
              <span className="text-[9px] uppercase tracking-[0.22em] text-faint w-12 shrink-0 mt-0.5">{item.publication}</span>
              <div>
                <h3 className="text-base font-medium leading-snug max-w-xl group-hover:text-ink/60 transition-colors">{item.title}</h3>
                <p className="mt-1.5 text-sm text-ink/40">{item.description}</p>
              </div>
            </div>
            <span className="shrink-0 text-muted group-hover:text-ink group-hover:translate-x-1 inline-block transition-all duration-300">&rarr;</span>
          </a>
        ))}
      </section>

      {/* ── Series ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-14">Series</p>
        <div className="space-y-24 lg:space-y-32">
          {series.map((s: any, i: number) => (
            <div key={s.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              <div className={`relative aspect-[4/5] overflow-hidden ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <Image src={s.cover} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-free mb-4">{s.year}</p>
                <h2 className="text-3xl lg:text-4xl font-light leading-tight">{s.title}</h2>
                <p className="mt-5 text-base text-ink/55 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fragmenten ─────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-10">Fragmenten</p>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {artPhotos.concat(artPhotos.slice(0, 3)).map((p: any, i: number) => (
            <div key={i} className="break-inside-avoid">
              <PhotoCard src={p.src} alt={p.alt} ratio={i % 3 === 0 ? "portrait" : i % 3 === 1 ? "landscape" : "square"} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-24 bg-surface border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Samenwerken</p>
        <h2 className="text-2xl lg:text-3xl font-light leading-tight max-w-md">
          Tentoonstellingen, prints of samenwerkingen?
        </h2>
        <p className="mt-5 text-base text-ink/55 max-w-sm leading-relaxed">
          Mijn autonome werk is op aanvraag als print beschikbaar. Voor exposities of publicaties sta ik altijd open voor een gesprek.
        </p>
        <Link href="/contact" className="mt-9 inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-ink hover:text-bg transition-all duration-300">
          Neem contact op
        </Link>
      </section>

      {/* ── Instagram ──────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted">Instagram</p>
          {igHandle && (
            <a
              href={`https://instagram.com/${igHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors"
            >
              @{igHandle} →
            </a>
          )}
        </div>
        {igFeedId ? (
          <InstagramFeed feedId={igFeedId} handle={igHandle} />
        ) : (
          <div className="border border-dashed border-border py-16 text-center">
            <p className="text-[9px] uppercase tracking-[0.28em] text-faint">Instagram feed</p>
            <p className="text-sm text-ink/30 mt-3">
              Voeg een Behold Feed ID toe via{" "}
              <span className="font-medium text-ink/50">Site-instellingen → Instagram</span>
            </p>
          </div>
        )}
      </section>
    </>
  );
}
