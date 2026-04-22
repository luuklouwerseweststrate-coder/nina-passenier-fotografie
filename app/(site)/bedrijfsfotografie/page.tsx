import Image from "next/image";
import Link from "next/link";
import PhotoCard from "@/components/PhotoCard";
import InstagramFeed from "@/components/InstagramFeed";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { businessPhotosQuery, settingsQuery } from "@/sanity/lib/queries";
import { businessPhotos as fallbackBusinessPhotos } from "@/lib/photos";

export const metadata = { title: "Bedrijfsfotografie — Nina Passenier" };
export const revalidate = 3600;

const fallbackDiensten = [
  { title: "Brand portretten",   desc: "Portretten voor teams, oprichters en makers. Persoonlijkheid, geen stockgezicht." },
  { title: "Campagne shoots",    desc: "Seizoenscampagnes voor kleding, lifestyle en design merken. On-location of in studio." },
  { title: "Branding & sfeer",   desc: "Beeld dat een merk in zijn geheel vertelt: product, mensen, proces, werkruimte." },
  { title: "Social content",     desc: "Losse beelden en series voor Instagram, LinkedIn en website — actueel en herkenbaar." },
  { title: "Evenementen",        desc: "Jaarevents, openingen, launches. Verhalend gedocumenteerd, niet afgevinkt." },
  { title: "Product in context", desc: "Productfotografie die laat zien hoe iets wordt gebruikt, niet alleen hoe het eruitziet." },
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
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-14 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Bedrijfsfotografie</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-ink max-w-3xl">
          {settings?.bedrijfTagline || "Beeld dat werkt voor je bedrijf."}
        </h1>
        <p className="mt-6 text-sm text-ink/50 max-w-md leading-relaxed">
          {settings?.bedrijfIntro ||
            "Ik fotografeer voor bedrijven, merken en organisaties. Beeld dat zichtbaarheid geeft zonder dat het aanvoelt als een advertentie."}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-all duration-300"
        >
          Plan een shoot
        </Link>
      </section>

      {/* ── Diensten ───────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-10">Wat ik doe</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {diensten.map((d: { title: string; desc: string }, i: number) => (
            <div key={d.title} className="border-t border-border pt-6">
              <p className="text-[9px] uppercase tracking-[0.2em] text-faint mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-base font-medium leading-snug mb-2 text-ink">{d.title}</h3>
              <p className="text-sm text-ink/50 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Portfolio ──────────────────────────────── */}
      {photos.length > 0 && (
        <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-10">Portfolio</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {photos.map((p, i) => (
              <div key={i} className={i === 1 || i === 4 ? "sm:mt-10" : ""}>
                <PhotoCard
                  src={p.src}
                  alt={p.alt}
                  title={p.title}
                  meta={p.meta}
                  ratio={i % 2 === 0 ? "portrait" : "landscape"}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Voor wie ───────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Voor wie</p>
        <p className="text-xl lg:text-2xl font-light leading-relaxed max-w-2xl text-ink/70">
          Modemerken, creatieve bureaus, advocatenkantoren, restaurants, makers,
          culturele instellingen — en alles daartussenin.
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-all duration-300"
        >
          Stuur een bericht
        </Link>
      </section>

      {/* ── Instagram ──────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 lg:py-20">
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

    </div>
  );
}
