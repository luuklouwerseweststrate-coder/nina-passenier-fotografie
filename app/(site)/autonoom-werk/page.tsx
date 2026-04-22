import Image from "next/image";
import Link from "next/link";
import InstagramFeed from "@/components/InstagramFeed";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { artPhotosQuery, seriesQuery, exhibitionQuery, pressMentionsQuery, settingsQuery } from "@/sanity/lib/queries";
import { artPhotos as fallbackArtPhotos } from "@/lib/photos";

export const metadata = { title: "Autonoom werk — Nina Passenier" };
export const revalidate = 3600;

const fallbackSeries = [
  { title: "Wachtkamer", year: "2024", text: "Verstilde ruimtes waar mensen even niet weten wat ze met zichzelf aan moeten.", cover: fallbackArtPhotos[0]?.src ?? "" },
  { title: "Zacht licht", year: "2024", text: "Een studie naar het moment vlak voor het donker wordt.", cover: fallbackArtPhotos[1]?.src ?? "" },
  { title: "Ongezien",   year: "2025", text: "Portretten van mensen die normaal niet worden gefotografeerd.", cover: fallbackArtPhotos[2]?.src ?? "" },
];

const fallbackExhibition = {
  title: "Expo Nina Passenier",
  location: "Museumcafé Polderhuis · Westkapelle",
  period: "11 okt 2025 — 7 mei 2026",
  linkUrl: "https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier",
};

const fallbackPress = [{
  publication: "PZC",
  title: "De passie van Nina voor Zeeland spat van de foto's",
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
    ? sanityArtPhotos.map((p: any) => ({ src: urlFor(p.image).width(3200).quality(92).url(), alt: p.alt }))
    : fallbackArtPhotos.map((p) => ({ src: p.src, alt: p.alt }));

  const series = sanitySeries.length > 0
    ? sanitySeries.map((s: any) => ({ title: s.title, year: s.year, text: s.text, cover: urlFor(s.cover).width(3200).quality(92).url() }))
    : fallbackSeries;

  const expo = sanityExpo ?? fallbackExhibition;
  const press = sanityPress.length > 0 ? sanityPress : fallbackPress;
  const igHandle = settings?.igHandleAutonoom as string | undefined;
  const igFeedId = settings?.igFeedIdAutonoom as string | undefined;

  return (
    <div className="bg-white">

      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-24 pb-10 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-4">Autonoom werk</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-ink max-w-xl">
          {settings?.autonomTagline || "Fotografie buiten opdracht."}
        </h1>
        {settings?.autonomIntro && (
          <p className="mt-4 text-sm text-ink/45 max-w-sm leading-relaxed">{settings.autonomIntro}</p>
        )}
      </section>

      {/* ── Series — groot, foto centraal ──────────── */}
      <section className="border-b border-border">
        {series.map((s: any, i: number) => (
          <div key={s.title} className="border-b border-border last:border-0">
            {/* Foto full-width */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2", maxHeight: "70vh" }}>
              <Image
                src={s.cover}
                alt={s.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              {/* Subtiel label over de foto */}
              <div className="absolute bottom-0 left-0 right-0 px-7 lg:px-12 pb-6"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)" }}>
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/50 mb-1">{s.year}</p>
                <h2 className="text-xl lg:text-2xl font-light text-white">{s.title}</h2>
              </div>
            </div>
            {/* Korte tekst alleen als die er is */}
            {s.text && (
              <div className="px-7 lg:px-12 py-6">
                <p className="text-sm text-ink/50 max-w-lg leading-relaxed">{s.text}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ── Foto's — masonry grid ───────────────────── */}
      {artPhotos.length > 0 && (
        <section className="px-7 lg:px-12 py-12 border-b border-border">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-8">Werk</p>
          <div className="columns-2 lg:columns-3 gap-3 space-y-3">
            {artPhotos.map((p: any, i: number) => (
              <div key={i} className="break-inside-avoid overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={800}
                  height={i % 3 === 0 ? 1066 : i % 3 === 1 ? 533 : 800}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Info — expositie + pers compact ────────── */}
      <section className="px-7 lg:px-12 py-10 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">

          {/* Expositie */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Nu te zien</p>
            <p className="text-base font-light text-ink">{expo.title}</p>
            <p className="text-sm text-ink/45 mt-1">{expo.location}</p>
            {expo.period && <p className="text-sm text-ink/45 mt-0.5">{expo.period}</p>}
            {expo.linkUrl && (
              <a href={expo.linkUrl} target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-block text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors border-b border-border hover:border-ink pb-0.5">
                Meer info →
              </a>
            )}
          </div>

          {/* Pers */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">In de media</p>
            <div className="space-y-4">
              {press.map((item: any, i: number) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="group block">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-faint mb-1">{item.publication}</p>
                  <p className="text-sm text-ink/70 group-hover:text-ink transition-colors leading-snug">{item.title} →</p>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Contact + Instagram ─────────────────────── */}
      <section className="px-7 lg:px-12 py-10 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <p className="text-sm text-ink/50">
          Prints, exposities of samenwerkingen?
        </p>
        <Link href="/contact"
          className="shrink-0 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-all duration-300">
          Neem contact op
        </Link>
      </section>

      {/* ── Instagram ──────────────────────────────── */}
      <section className="px-7 lg:px-12 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted">Instagram</p>
          {igHandle && (
            <a href={`https://instagram.com/${igHandle}`} target="_blank" rel="noopener noreferrer"
              className="text-[9px] uppercase tracking-[0.22em] text-faint hover:text-ink transition-colors">
              @{igHandle} →
            </a>
          )}
        </div>
        {igFeedId ? (
          <InstagramFeed feedId={igFeedId} handle={igHandle} />
        ) : (
          <div className="border border-dashed border-border py-14 text-center">
            <p className="text-[9px] uppercase tracking-[0.28em] text-faint">Instagram feed</p>
            <p className="text-sm text-ink/30 mt-2">Voeg een Behold Feed ID toe via Site-instellingen → Instagram</p>
          </div>
        )}
      </section>

    </div>
  );
}
