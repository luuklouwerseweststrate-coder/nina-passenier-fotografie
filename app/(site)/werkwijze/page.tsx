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
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-14 border-b border-border max-w-3xl">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Werkwijze</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-ink">
          Rustig, voorbereid, en met ruimte voor wat&nbsp;gebeurt.
        </h1>
        <p className="mt-6 text-base text-ink/55 leading-relaxed">
          Een shoot met mij is geen assemblagelijn. Maar ook geen chaos. Dit is hoe een project meestal loopt.
        </p>
      </section>

      {/* ── Stappen ────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-2 border-b border-border">
        {stappen.map((s: { titel: string; tekst: string }, i: number) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 lg:py-12 border-t border-border"
          >
            <div className="md:col-span-2 flex items-start">
              <p className="text-[9px] uppercase tracking-[0.28em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <div className="md:col-span-10">
              <h3 className="text-xl lg:text-2xl font-medium leading-snug mb-3">{s.titel}</h3>
              <p className="text-base text-ink/55 leading-relaxed max-w-xl">{s.tekst}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-16 lg:py-24 bg-ink text-bg">
        <p className="text-[9px] uppercase tracking-[0.28em] text-bg/30 mb-7">Klaar om te starten?</p>
        <h2 className="text-3xl lg:text-4xl font-light leading-tight max-w-sm">
          Eerst een gesprek, dan pas cijfers.
        </h2>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 border border-bg/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-bg hover:border-bg hover:bg-bg hover:text-ink transition-all duration-300"
        >
          Plan een kennismaking
        </Link>
      </section>
    </>
  );
}
