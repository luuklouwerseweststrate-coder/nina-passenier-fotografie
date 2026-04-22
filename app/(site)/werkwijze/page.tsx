import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export const metadata = { title: "Werkwijze — Nina Passenier" };
export const revalidate = 3600;

const fallbackStappen = [
  { titel: "Kennismaking",         tekst: "We drinken koffie, je vertelt wat je wilt maken en voor wie. Geen shot list, nog geen datum. Ik luister vooral." },
  { titel: "Voorstel & moodboard", tekst: "Op basis van het gesprek maak ik een voorstel met richting, locatie-ideeën, planning en prijs. Meestal korter dan je verwacht." },
  { titel: "Voorbereiding",        tekst: "Locatie scouten, styling afstemmen, planning rond. Ik regel wat ik kan, jij houdt tijd over voor wat jij moet doen." },
  { titel: "De shoot",             tekst: "Op de dag zelf werk ik het liefst rustig en geduldig. Ik laat ruimte voor toeval. De beste frames zijn bijna nooit gepland." },
  { titel: "Selectie & bewerking", tekst: "Binnen een week ontvang je een eerste selectie. Na jouw feedback bewerk ik de definitieve beelden, in jouw merkstijl." },
  { titel: "Oplevering",           tekst: "Digitale oplevering in alle benodigde formaten. Web, social, print — waar je het maar voor nodig hebt." },
];

export default async function WerkwijzePage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);
  const stappen  = settings?.werkwijzeStappen?.length > 0 ? settings.werkwijzeStappen : fallbackStappen;

  return (
    <div className="bg-white">

      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-14 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Werkwijze</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-ink max-w-2xl">
          Rustig, voorbereid, en met ruimte voor wat&nbsp;gebeurt.
        </h1>
        <p className="mt-5 text-sm text-ink/50 max-w-md leading-relaxed">
          Een shoot met mij is geen assemblagelijn. Maar ook geen chaos. Dit is hoe een project meestal loopt.
        </p>
      </section>

      {/* ── Stappen ────────────────────────────────── */}
      <section className="px-7 lg:px-12 border-b border-border">
        {stappen.map((s: { titel: string; tekst: string }, i: number) => (
          <div
            key={i}
            className="grid grid-cols-[3rem_1fr] lg:grid-cols-[8rem_1fr] gap-6 lg:gap-12 py-10 lg:py-12 border-t border-border"
          >
            <div className="pt-1">
              <p className="text-[9px] uppercase tracking-[0.28em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-medium leading-snug mb-3 text-ink">{s.titel}</h3>
              <p className="text-sm text-ink/55 leading-relaxed max-w-xl">{s.tekst}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-24 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Klaar om te starten?</p>
        <h2 className="text-2xl lg:text-3xl font-light leading-tight text-ink max-w-sm">
          Eerst een gesprek, dan pas cijfers.
        </h2>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="border border-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-white transition-all duration-300"
          >
            Plan een kennismaking
          </Link>
          <Link
            href="/cases"
            className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300"
          >
            Bekijk cases
          </Link>
        </div>
      </section>

    </div>
  );
}
