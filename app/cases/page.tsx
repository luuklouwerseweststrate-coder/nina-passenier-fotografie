import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { cases } from "@/lib/cases";

export const metadata = { title: "Cases — Nina Passenier" };

export default function CasesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <SectionHeader
          eyebrow="Klantcases & series"
          title="Projecten, samenwerkingen en eigen werk."
          lead="Een selectie van projecten waar ik trots op ben. Sommige commercieel, sommige autonoom, allemaal vanuit dezelfde manier van kijken."
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 space-y-24 lg:space-y-40 pb-32">
        {cases.map((c, i) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="group block">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-end ${i % 2 === 1 ? "lg:text-right" : ""}`}>
              <div className={`relative aspect-[16/10] ${i % 2 === 1 ? "lg:col-start-4 lg:col-span-9" : "lg:col-span-9"}`}>
                <Image
                  src={c.cover}
                  alt={c.client}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className={`lg:col-span-3 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <p className="text-xs uppercase tracking-[0.3em] mb-3 text-nina-ink/50">
                  {c.type === "bedrijf" ? "Bedrijfsfotografie" : "Vrij werk"} · {c.year}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-display">
                  {c.client}
                </h3>
                <p className="mt-3 text-nina-ink/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: c.title }} />
                <p className="mt-6 text-sm text-nina-ink/50 group-hover:text-nina-ink transition-colors">
                  Lees case →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
