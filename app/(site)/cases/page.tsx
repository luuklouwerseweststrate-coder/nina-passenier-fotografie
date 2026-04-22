import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { casesQuery } from "@/sanity/lib/queries";
import { cases as fallbackCases } from "@/lib/cases";

export const metadata = { title: "Cases — Nina Passenier" };
export const revalidate = 3600;

type CaseItem = { slug: string; client: string; year: string; type: string; title: string; cover: string };

export default async function CasesPage() {
  const sanityCases = await client.fetch(casesQuery).catch(() => []);

  const cases: CaseItem[] =
    sanityCases.length > 0
      ? sanityCases.map((c: any) => ({
          slug:   c.slug?.current,
          client: c.client,
          year:   c.year,
          type:   c.type,
          title:  c.title,
          cover:  urlFor(c.cover).width(2000).quality(85).url(),
        }))
      : fallbackCases.map((c) => ({ slug: c.slug, client: c.client, year: c.year, type: c.type, title: c.title, cover: c.cover }));

  return (
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-14 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Cases</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-ink max-w-2xl">
          Projecten, samenwerkingen en eigen werk.
        </h1>
        <p className="mt-6 text-base text-ink/55 max-w-lg leading-relaxed">
          Een selectie van projecten waar ik trots op ben. Sommige commercieel, sommige autonoom — allemaal vanuit dezelfde manier van kijken.
        </p>
      </section>

      {/* ── Cases ──────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-4 pb-16">
        {cases.map((c, i) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="group block border-b border-border">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end py-12 lg:py-16 ${i % 2 === 1 ? "lg:text-right" : ""}`}>

              {/* Afbeelding */}
              <div className={`relative aspect-[16/10] overflow-hidden ${
                i % 2 === 1
                  ? "lg:col-start-4 lg:col-span-9"
                  : "lg:col-span-9"
              }`}>
                <Image
                  src={c.cover}
                  alt={c.client}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              {/* Meta */}
              <div className={`lg:col-span-3 pb-1 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <p className={`text-[9px] uppercase tracking-[0.28em] mb-3 ${c.type === "bedrijf" ? "text-commerce" : "text-free"}`}>
                  {c.type === "bedrijf" ? "Bedrijfsfotografie" : "Vrij werk"} &middot; {c.year}
                </p>
                <h3 className="text-2xl lg:text-3xl font-light leading-tight">{c.client}</h3>
                <p className="mt-3 text-sm text-ink/45 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.title }} />
                <p className="mt-6 text-[9px] uppercase tracking-[0.28em] text-faint group-hover:text-ink transition-colors">
                  Lees case &rarr;
                </p>
              </div>

            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
