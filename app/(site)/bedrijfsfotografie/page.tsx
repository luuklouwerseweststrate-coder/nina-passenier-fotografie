import Image from "next/image";
import Link from "next/link";
import PhotoCard from "@/components/PhotoCard";
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

  const horecaPhoto = settings?.horecaPhoto
    ? urlFor(settings.horecaPhoto).width(1200).quality(85).url()
    : photos[0]?.src ?? "";

  return (
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-16 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-commerce mb-6">Bedrijfsfotografie</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-ink max-w-3xl">
          {settings?.bedrijfTagline || "Beeld dat werkt voor je bedrijf."}
        </h1>
        <p className="mt-7 text-base text-ink/55 max-w-lg leading-relaxed">
          {settings?.bedrijfIntro ||
            "Ik fotografeer voor bedrijven, merken en organisaties. Beeld dat zichtbaarheid geeft zonder dat het aanvoelt als een advertentie."}
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-ink hover:text-bg transition-all duration-300"
        >
          Plan een shoot
        </Link>
      </section>

      {/* ── Diensten ───────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-12">Wat ik doe</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {diensten.map((d: { title: string; desc: string }, i: number) => (
            <div key={d.title} className="border-t border-border pt-6">
              <p className="text-[9px] uppercase tracking-[0.2em] text-faint mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-medium leading-snug mb-2">{d.title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Specialisatie: Horeca ──────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Specialisatie</p>
            <h2 className="text-3xl lg:text-4xl font-light leading-tight max-w-sm">
              Horeca &amp; restaurants.
            </h2>
            <p className="mt-6 text-base text-ink/55 leading-relaxed max-w-md">
              Een groot deel van mijn werk zit in de horeca. Gerechten, sfeer, team en ruimte —
              op het moment dat alles klopt. Niet geposeerd, maar zoals een goed restaurant er
              echt uitziet.
            </p>
            <ul className="mt-8 space-y-2.5 border-t border-border pt-7">
              {["Gerechten & drinks", "Sfeer & interieur", "Team & portret", "Social content", "Menu- en campagnebeelden"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink/55">
                  <span className="w-1 h-1 rounded-full bg-faint shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300"
            >
              Offerte aanvragen
            </Link>
          </div>

          {horecaPhoto && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={horecaPhoto}
                alt="Horecafotografie Nina Passenier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Portfolio ──────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-20 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-10">Portfolio</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
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

      {/* ── Voor wie ───────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-24 bg-surface">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-7">Voor wie</p>
        <p className="text-2xl lg:text-3xl font-light leading-relaxed max-w-3xl text-ink/75">
          Modemerken, creatieve bureaus, advocatenkantoren, restaurants, makers,
          culturele instellingen — en alles daartussenin.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-ink hover:text-bg transition-all duration-300"
        >
          Stuur een bericht
        </Link>
      </section>
    </>
  );
}
