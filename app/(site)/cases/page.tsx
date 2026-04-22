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
          cover:  urlFor(c.cover).width(3600).quality(92).url(),
        }))
      : fallbackCases.map((c) => ({ slug: c.slug, client: c.client, year: c.year, type: c.type, title: c.title, cover: c.cover }));

  const bedrijfCases = cases.filter((c) => c.type === "bedrijf");
  const kunstCases   = cases.filter((c) => c.type === "kunst");

  return (
    <div className="bg-white">

      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-14 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Cases</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-ink max-w-2xl">
          Projecten & werk.
        </h1>
        <p className="mt-5 text-sm text-ink/50 max-w-md leading-relaxed">
          Een selectie samenwerkingen en eigen werk — bedrijfsfotografie en autonoom.
        </p>
      </section>

      {/* ── Bedrijfsfotografie ─────────────────────── */}
      {bedrijfCases.length > 0 && (
        <section className="border-b border-border">
          <div className="px-7 lg:px-12 pt-12 pb-4 flex items-baseline justify-between">
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted">Bedrijfsfotografie</p>
            <span className="text-[9px] text-faint">{bedrijfCases.length} projecten</span>
          </div>
          {bedrijfCases.map((c, i) => (
            <CaseRow key={c.slug} c={c} i={i} total={bedrijfCases.length} />
          ))}
        </section>
      )}

      {/* ── Autonoom werk ──────────────────────────── */}
      {kunstCases.length > 0 && (
        <section className="border-b border-border">
          <div className="px-7 lg:px-12 pt-12 pb-4 flex items-baseline justify-between">
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted">Autonoom werk</p>
            <span className="text-[9px] text-faint">{kunstCases.length} projecten</span>
          </div>
          {kunstCases.map((c, i) => (
            <CaseRow key={c.slug} c={c} i={i} total={kunstCases.length} />
          ))}
        </section>
      )}

    </div>
  );
}

function CaseRow({ c, i, total }: { c: CaseItem; i: number; total: number }) {
  return (
    <Link href={`/cases/${c.slug}`} className="group block border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

        {/* Afbeelding */}
        <div className={`relative overflow-hidden ${
          i % 2 === 1 ? "lg:col-start-5 lg:col-span-8" : "lg:col-span-8"
        }`} style={{ minHeight: "300px", maxHeight: "480px", aspectRatio: "16/9" }}>
          <Image
            src={c.cover}
            alt={c.client}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        {/* Meta */}
        <div className={`lg:col-span-4 flex flex-col justify-end px-7 lg:px-10 py-8 ${
          i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
        }`}>
          <p className="text-[9px] uppercase tracking-[0.28em] text-faint mb-3">
            {c.year}
          </p>
          <h3 className="text-2xl lg:text-3xl font-light leading-tight text-ink">{c.client}</h3>
          {c.title && (
            <p className="mt-2 text-sm text-ink/45 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.title }} />
          )}
          <p className="mt-6 text-[9px] uppercase tracking-[0.28em] text-faint group-hover:text-ink transition-colors duration-300">
            Bekijk case →
          </p>
        </div>

      </div>
    </Link>
  );
}
