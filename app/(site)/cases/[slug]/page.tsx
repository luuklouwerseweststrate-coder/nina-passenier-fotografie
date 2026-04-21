import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { casesQuery, caseBySlugQuery, caseSlugsQuery } from "@/sanity/lib/queries";
import { cases as fallbackCases } from "@/lib/cases";

export const revalidate = 3600;

export async function generateStaticParams() {
  const sanitySlugs = await client.fetch(caseSlugsQuery).catch(() => []);
  if (sanitySlugs.length > 0) {
    return sanitySlugs.map((s: { slug: string }) => ({ slug: s.slug }));
  }
  return fallbackCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const sanityCase = await client.fetch(caseBySlugQuery, { slug: params.slug }).catch(() => null);
  const clientName = sanityCase?.client ?? fallbackCases.find((c) => c.slug === params.slug)?.client ?? "Case";
  return { title: `${clientName} — Nina Passenier` };
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  // Probeer Sanity eerst, dan fallback naar hardcoded data
  const sanityCase = await client.fetch(caseBySlugQuery, { slug: params.slug }).catch(() => null);

  let c: any;
  let isSanity = false;

  if (sanityCase?.client) {
    isSanity = true;
    c = {
      slug: sanityCase.slug?.current,
      client: sanityCase.client,
      year: sanityCase.year,
      type: sanityCase.type,
      title: sanityCase.title,
      intro: sanityCase.intro,
      approach: sanityCase.approach,
      quote: sanityCase.quote,
      cover: sanityCase.cover?.asset ? urlFor(sanityCase.cover).width(2000).quality(85).url() : "",
      images: (sanityCase.images || []).map((img: any) => urlFor(img).width(1600).quality(80).url()),
    };
  } else {
    const fallback = fallbackCases.find((x) => x.slug === params.slug);
    if (!fallback) notFound();
    c = fallback;
  }

  // Volgende case
  const allSlugs = isSanity
    ? (await client.fetch(caseSlugsQuery).catch(() => [])).map((s: any) => s.slug)
    : fallbackCases.map((x) => x.slug);

  const currentIndex = allSlugs.indexOf(c.slug ?? params.slug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length] ?? params.slug;

  const nextCase = isSanity
    ? await client.fetch(caseBySlugQuery, { slug: nextSlug }).then((n: any) => ({
        client: n.client,
        slug: n.slug?.current,
        cover: n.cover?.asset ? urlFor(n.cover).width(2000).quality(85).url() : "",
      })).catch(() => null)
    : fallbackCases.find((x) => x.slug === nextSlug);

  const accent = c.type === "bedrijf" ? "oranje" : "groen";

  return (
    <>
      <section className="relative aspect-[16/10] lg:aspect-[21/9]">
        <Image src={c.cover} alt={c.client} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-16 text-nina-cream">
          <p className={`text-xs uppercase tracking-[0.3em] mb-3 ${c.type === "bedrijf" ? "text-nina-oranje" : "text-nina-groen"}`}>
            {c.type === "bedrijf" ? "Bedrijfsfotografie" : "Vrij werk"} &middot; {c.year}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-display leading-tight max-w-4xl">
            {c.client}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 lg:px-10 py-20 lg:py-28">
        <h2 className="font-serif text-3xl md:text-4xl leading-tight tracking-display" dangerouslySetInnerHTML={{ __html: c.title }} />
        <p className="mt-8 text-lg text-nina-ink/70 leading-relaxed">{c.intro}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {c.images.map((img: string, i: number) => (
          <div key={i} className={`relative ${i % 3 === 0 ? "aspect-[4/5] md:col-span-2 md:aspect-[16/9]" : "aspect-[4/5]"}`}>
            <Image src={img} alt={`${c.client} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-10 py-20 lg:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-nina-petrol mb-4">Aanpak</p>
        <p className="font-serif text-2xl md:text-3xl leading-relaxed tracking-display">{c.approach}</p>
        {c.quote && (
          <blockquote className={`mt-16 border-l-4 pl-6 ${c.type === "bedrijf" ? "border-nina-oranje" : "border-nina-groen"}`}>
            <p className="font-serif italic text-2xl md:text-3xl leading-relaxed">&ldquo;{c.quote.text}&rdquo;</p>
            <cite className="block mt-4 text-sm text-nina-ink/60 not-italic">&mdash; {c.quote.author}</cite>
          </blockquote>
        )}
      </section>

      {nextCase && (
        <section className="border-t border-nina-ink/10">
          <Link href={`/cases/${nextCase.slug}`} className="block group">
            <div className="relative aspect-[16/9] lg:aspect-[21/9]">
              <Image src={nextCase.cover} alt={nextCase.client} fill sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-nina-ink/50 group-hover:bg-nina-ink/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-nina-cream text-center px-5">
                <p className="text-xs uppercase tracking-[0.3em] opacity-80">Volgende case</p>
                <h3 className="font-serif text-4xl md:text-6xl tracking-display mt-3">{nextCase.client} &rarr;</h3>
              </div>
            </div>
          </Link>
        </section>
      )}
    </>
  );
}
