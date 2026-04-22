import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { casesQuery, caseBySlugQuery, caseSlugsQuery } from "@/sanity/lib/queries";
import { cases as fallbackCases } from "@/lib/cases";

export const revalidate = 3600;

export async function generateStaticParams() {
  const sanitySlugs = await client.fetch(caseSlugsQuery).catch(() => []);
  if (sanitySlugs.length > 0) return sanitySlugs.map((s: { slug: string }) => ({ slug: s.slug }));
  return fallbackCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const sanityCase = await client.fetch(caseBySlugQuery, { slug: params.slug }).catch(() => null);
  const name = sanityCase?.client ?? fallbackCases.find((c) => c.slug === params.slug)?.client ?? "Case";
  return { title: `${name} — Nina Passenier` };
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  const sanityCase = await client.fetch(caseBySlugQuery, { slug: params.slug }).catch(() => null);

  let c: any;
  let isSanity = false;

  if (sanityCase?.client) {
    isSanity = true;
    c = {
      slug:     sanityCase.slug?.current,
      client:   sanityCase.client,
      year:     sanityCase.year,
      type:     sanityCase.type,
      title:    sanityCase.title,
      intro:    sanityCase.intro,
      approach: sanityCase.approach,
      quote:    sanityCase.quote,
      cover:    sanityCase.cover?.asset ? urlFor(sanityCase.cover).width(2000).quality(85).url() : "",
      images:   (sanityCase.images || []).map((img: any) => urlFor(img).width(1600).quality(80).url()),
    };
  } else {
    const fallback = fallbackCases.find((x) => x.slug === params.slug);
    if (!fallback) notFound();
    c = fallback;
  }

  const allSlugs = isSanity
    ? (await client.fetch(caseSlugsQuery).catch(() => [])).map((s: any) => s.slug)
    : fallbackCases.map((x) => x.slug);

  const currentIndex = allSlugs.indexOf(c.slug ?? params.slug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length] ?? params.slug;

  const nextCase = isSanity
    ? await client.fetch(caseBySlugQuery, { slug: nextSlug })
        .then((n: any) => ({ client: n.client, slug: n.slug?.current, cover: n.cover?.asset ? urlFor(n.cover).width(2000).quality(85).url() : "" }))
        .catch(() => null)
    : fallbackCases.find((x) => x.slug === nextSlug);

  const typeLabel = c.type === "bedrijf" ? "Bedrijfsfotografie" : "Autonoom werk";

  return (
    <div className="bg-white">

      {/* ── Hero — grote afbeelding full-width ─────── */}
      <section className="relative w-full overflow-hidden" style={{ aspectRatio: "16/8", minHeight: "320px" }}>
        <Image src={c.cover} alt={c.client} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 55%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-7 lg:px-12 pb-9 lg:pb-12">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/50 mb-3">
            {typeLabel} · {c.year}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            {c.client}
          </h1>
        </div>
      </section>

      {/* ── Terug + breadcrumb ──────────────────────── */}
      <div className="px-7 lg:px-12 py-5 border-b border-border flex items-center justify-between">
        <Link href="/cases" className="text-[9px] uppercase tracking-[0.28em] text-faint hover:text-ink transition-colors">
          ← Alle cases
        </Link>
        <span className="text-[9px] uppercase tracking-[0.28em] text-faint">{typeLabel}</span>
      </div>

      {/* ── Intro ──────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border">
        <div className="max-w-2xl">
          {c.title && (
            <h2 className="text-xl lg:text-2xl font-light leading-snug text-ink mb-6"
              dangerouslySetInnerHTML={{ __html: c.title }} />
          )}
          {c.intro && (
            <p className="text-base text-ink/55 leading-relaxed">{c.intro}</p>
          )}
        </div>
      </section>

      {/* ── Galerij ────────────────────────────────── */}
      {c.images?.length > 0 && (
        <section className="px-7 lg:px-12 py-10 border-b border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            {c.images.map((img: string, i: number) => (
              <div key={i} className={`relative overflow-hidden ${
                i % 3 === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/5]"
              }`}>
                <Image
                  src={img}
                  alt={`${c.client} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Aanpak ─────────────────────────────────── */}
      {c.approach && (
        <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-7">Aanpak</p>
          <p className="text-xl lg:text-2xl font-light leading-relaxed text-ink/70 max-w-2xl">{c.approach}</p>
        </section>
      )}

      {/* ── Quote ──────────────────────────────────── */}
      {c.quote?.text && (
        <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border">
          <div className="max-w-2xl border-l-2 border-border pl-8">
            <p className="text-xl lg:text-2xl font-light leading-relaxed text-ink">
              &ldquo;{c.quote.text}&rdquo;
            </p>
            {c.quote.author && (
              <cite className="block mt-5 text-[9px] uppercase tracking-[0.28em] text-faint not-italic">
                — {c.quote.author}
              </cite>
            )}
          </div>
        </section>
      )}

      {/* ── Volgende case ──────────────────────────── */}
      {nextCase && nextCase.slug !== c.slug && (
        <section className="border-t border-border">
          <Link href={`/cases/${nextCase.slug}`} className="group block relative overflow-hidden" style={{ aspectRatio: "21/8", minHeight: "240px" }}>
            <Image
              src={nextCase.cover}
              alt={nextCase.client}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-white/70 group-hover:bg-white/60 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-7">
              <p className="text-[9px] uppercase tracking-[0.28em] text-ink/40 mb-4">Volgende case</p>
              <h3 className="text-2xl md:text-4xl font-light text-ink group-hover:text-ink/70 transition-colors">
                {nextCase.client} →
              </h3>
            </div>
          </Link>
        </section>
      )}

    </div>
  );
}
