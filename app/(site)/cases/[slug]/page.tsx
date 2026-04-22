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

  const labelColor = c.type === "bedrijf" ? "text-commerce" : "text-free";

  return (
    <>
      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative aspect-[16/10] lg:aspect-[21/9] overflow-hidden">
        <Image src={c.cover} alt={c.client} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-7 lg:px-12 pb-10 lg:pb-14">
          <p className={`text-[9px] uppercase tracking-[0.28em] mb-4 ${labelColor}`}>
            {c.type === "bedrijf" ? "Bedrijfsfotografie" : "Vrij werk"} &middot; {c.year}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-bg leading-tight max-w-3xl">
            {c.client}
          </h1>
        </div>
      </section>

      {/* ── Intro ──────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border max-w-3xl">
        <h2 className="text-xl lg:text-2xl font-light leading-snug text-ink/80"
          dangerouslySetInnerHTML={{ __html: c.title }} />
        {c.intro && (
          <p className="mt-6 text-base text-ink/55 leading-relaxed">{c.intro}</p>
        )}
      </section>

      {/* ── Galerij ────────────────────────────────── */}
      {c.images?.length > 0 && (
        <section className="px-7 lg:px-12 py-10 border-b border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {c.images.map((img: string, i: number) => (
              <div key={i} className={`relative overflow-hidden ${
                i % 3 === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/9]" : "aspect-[4/5]"
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

      {/* ── Aanpak & quote ─────────────────────────── */}
      {(c.approach || c.quote) && (
        <section className="px-7 lg:px-12 py-14 lg:py-20 border-b border-border max-w-3xl">
          {c.approach && (
            <>
              <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Aanpak</p>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-ink/75">{c.approach}</p>
            </>
          )}
          {c.quote && (
            <blockquote className="mt-14 border-l border-border pl-7">
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-ink">
                &ldquo;{c.quote.text}&rdquo;
              </p>
              <cite className="block mt-4 text-[9px] uppercase tracking-[0.28em] text-faint not-italic">
                &mdash; {c.quote.author}
              </cite>
            </blockquote>
          )}
        </section>
      )}

      {/* ── Volgende case ──────────────────────────── */}
      {nextCase && (
        <section>
          <Link href={`/cases/${nextCase.slug}`} className="block group">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={nextCase.cover}
                alt={nextCase.client}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-ink/55 group-hover:bg-ink/40 transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-bg text-center px-7">
                <p className="text-[9px] uppercase tracking-[0.28em] text-bg/40 mb-4">Volgende case</p>
                <h3 className="text-3xl md:text-5xl font-light group-hover:text-bg/80 transition-colors">
                  {nextCase.client} &rarr;
                </h3>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Terug ──────────────────────────────────── */}
      <div className="px-7 lg:px-12 py-8 border-t border-border">
        <Link href="/cases" className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors">
          &larr; Alle cases
        </Link>
      </div>
    </>
  );
}
