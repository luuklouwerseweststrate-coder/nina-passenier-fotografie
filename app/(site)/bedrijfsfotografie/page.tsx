import Image from "next/image";
import Link from "next/link";
import InstagramFeed from "@/components/InstagramFeed";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { businessPhotosQuery, settingsQuery } from "@/sanity/lib/queries";
import { businessPhotos as fallbackBusinessPhotos } from "@/lib/photos";

export const metadata = { title: "Bedrijfsfotografie — Nina Passenier" };
export const revalidate = 3600;

const fallbackDiensten = [
  { title: "Brand portretten",   desc: "Teams, oprichters en makers. Persoonlijkheid, geen stockgezicht." },
  { title: "Campagne shoots",    desc: "Seizoenscampagnes voor kleding, lifestyle en design merken." },
  { title: "Branding & sfeer",   desc: "Product, mensen, proces, werkruimte — in één samenhangend verhaal." },
  { title: "Social content",     desc: "Beelden voor Instagram, LinkedIn en website. Actueel en herkenbaar." },
  { title: "Evenementen",        desc: "Jaarevents, openingen, launches. Verhalend gedocumenteerd." },
  { title: "Product in context", desc: "Productfotografie die laat zien hoe iets wordt gebruikt." },
];

type PhotoItem = { src: string; alt: string; title?: string; meta?: string };

export default async function BedrijfsfotografiePage() {
  const [sanityPhotos, settings] = await Promise.all([
    client.fetch(businessPhotosQuery).catch(() => []),
    client.fetch(settingsQuery).catch(() => null),
  ]);

  const photos: PhotoItem[] =
    sanityPhotos.length > 0
      ? sanityPhotos.map((p: any) => ({
          src:   urlFor(p.image).width(1600).quality(80).url(),
          alt:   p.alt,
          title: p.title,
          meta:  p.meta,
        }))
      : fallbackBusinessPhotos;

  const diensten = settings?.diensten?.length > 0 ? settings.diensten : fallbackDiensten;
  const igHandle = settings?.igHandleBedrijf as string | undefined;
  const igFeedId = settings?.igFeedIdBedrijf as string | undefined;

  return (
    <div className="bg-white">

      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-24 pb-10 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-4">Bedrijfsfotografie</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-ink max-w-xl">
          {settings?.bedrijfTagline || "Beeld dat werkt voor je bedrijf."}
        </h1>
      </section>

      {/* ── Portfolio — foto's eerst ────────────────── */}
      {photos.length > 0 && (
        <section className="border-b border-border">
          {/* Grote hero-foto */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "70vh" }}>
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Grid: rest van de foto's */}
          {photos.length > 1 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {photos.slice(1).map((p, i) => (
                <div key={i} className="relative bg-white overflow-hidden"
                  style={{ aspectRatio: i % 4 === 0 ? "4/5" : "1/1" }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Diensten — compact lijst ────────────────── */}
      <section className="px-7 lg:px-12 py-12 lg:py-16 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-8">Wat ik doe</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
          {diensten.map((d: { title: string; desc: string }, i: number) => (
            <div key={d.title} className="py-5 border-t border-border flex gap-5 items-start">
              <span className="text-[9px] uppercase tracking-[0.2em] text-faint shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-sm font-medium text-ink mb-1">{d.title}</p>
                <p className="text-xs text-ink/45 leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-10 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <p className="text-sm text-ink/60 max-w-sm leading-relaxed">
            {settings?.bedrijfIntro || "Voor bedrijven, merken en organisaties die echt willen laten zien wie ze zijn."}
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link href="/contact"
            className="border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-all duration-300">
            Plan een shoot
          </Link>
          <Link href="/cases"
            className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300">
            Cases
          </Link>
        </div>
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
