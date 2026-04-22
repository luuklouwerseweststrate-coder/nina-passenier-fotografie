import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export const metadata = { title: "Werkwijze — Nina Passenier" };
export const revalidate = 3600;

const fallbackStappen = [
  { titel: "Kennismaking",         tekst: "We plannen een kort gesprek — telefonisch of op locatie. Jij vertelt wat je nodig hebt, ik vertel hoe ik werk. Geen verplichtingen." },
  { titel: "Offerte & planning",   tekst: "Je ontvangt een heldere offerte met prijs, planning en wat je kunt verwachten. Geen verrassingen achteraf." },
  { titel: "Voorbereiding",        tekst: "Ik scout de locatie, stem de planning af en zorg dat alles klaarstaat op de dag zelf. Jij hoeft nergens aan te denken." },
  { titel: "De shoot",             tekst: "Op de afgesproken dag fotografeer ik. Ik werk efficiënt en gestructureerd, zodat we binnen de tijd het maximale halen." },
  { titel: "Selectie & bewerking", tekst: "Binnen een week ontvang je een eerste selectie via een online galerij. Na jouw feedback lever ik de definitieve beelden aan." },
  { titel: "Oplevering",           tekst: "Alle beelden digitaal aangeleverd in de formaten die jij nodig hebt — web, social of print." },
];

export default async function WerkwijzePage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);
  const stappen  = settings?.werkwijzeStappen?.length > 0 ? settings.werkwijzeStappen : fallbackStappen;

  return (
    <div className="bg-white">

      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-24 pb-10 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-4">Werkwijze</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-ink max-w-lg">
          Zo werkt het samenwerken met mij.
        </h1>
        <p className="mt-4 text-sm text-ink/50 max-w-md leading-relaxed">
          Van eerste gesprek tot oplevering — duidelijk, zonder gedoe.
        </p>
      </section>

      {/* ── Stappen ────────────────────────────────── */}
      <section className="px-7 lg:px-12 border-b border-border">
        {stappen.map((s: { titel: string; tekst: string }, i: number) => (
          <div
            key={i}
            className="grid grid-cols-[3rem_1fr] lg:grid-cols-[8rem_1fr] gap-6 lg:gap-12 py-8 lg:py-10 border-t border-border"
          >
            <div className="pt-1">
              <p className="text-[9px] uppercase tracking-[0.28em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-medium leading-snug mb-2 text-ink">{s.titel}</h3>
              <p className="text-sm text-ink/55 leading-relaxed max-w-xl">{s.tekst}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <p className="text-sm text-ink/50">Interesse? Neem gerust contact op voor een vrijblijvend gesprek.</p>
        <div className="flex gap-3 shrink-0">
          <Link href="/contact"
            className="border border-ink bg-ink text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-white hover:text-ink transition-all duration-300">
            Neem contact op
          </Link>
          <Link href="/cases"
            className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300">
            Bekijk cases
          </Link>
        </div>
      </section>

    </div>
  );
}
