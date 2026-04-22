import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { settingsQuery } from "@/sanity/lib/queries";
import { ninaPortret as fallbackPortret } from "@/lib/photos";

export const metadata = { title: "Over Nina — Nina Passenier" };
export const revalidate = 3600;

export default async function OverPage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const ninaPortret = settings?.ninaPortret
    ? urlFor(settings.ninaPortret).width(1200).quality(85).url()
    : fallbackPortret;

  const bio = {
    p1: settings?.bio1 || "Ik ben Nina Passenier, fotograaf gevestigd in Rotterdam. Ik fotografeer voor bedrijven en werk daarnaast aan mijn eigen autonome series. Die combinatie maakt mijn werk: ik breng dezelfde aandacht mee bij een portretshoot voor een bedrijf als bij een eigen project.",
    p2: settings?.bio2 || "Ik studeerde fotografie aan de Willem de Kooning Academie in Rotterdam en ben momenteel bezig met een vervolgopleiding aan de kunstacademie, gericht op autonoom fotografisch onderzoek.",
    p3: settings?.bio3 || "Voor bedrijven maak ik portretten, campagnebeelden, social content en branding. Ik werk voor uiteenlopende opdrachtgevers — van kleine zelfstandigen tot grotere organisaties.",
    p4: settings?.bio4 || "Werken met mij is prettig en georganiseerd. Ik denk vooraf goed na, communiceer duidelijk en zorg dat je weet wat je kunt verwachten. Het resultaat zijn beelden die kloppen — voor jouw merk, jouw team of jouw verhaal.",
    p5: settings?.bio5 || "",
  };

  return (
    <div className="bg-white">

      {/* ── Header — foto + intro ───────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
        <div className="px-7 lg:px-12 pt-20 lg:pt-24 pb-10 lg:pb-16 flex flex-col justify-end">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-4">Over Nina</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-ink">
            Hoi, ik ben Nina.
          </h1>
          <p className="mt-5 text-sm text-ink/55 max-w-sm leading-relaxed">
            Fotograaf in Rotterdam. Ik werk voor bedrijven en aan mijn eigen werk — en doe beide met veel plezier.
          </p>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
          <Image
            src={ninaPortret}
            alt="Nina Passenier"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── Over mij ───────────────────────────────── */}
      <section className="px-7 lg:px-12 py-12 lg:py-16 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div className="space-y-5 text-sm text-ink/65 leading-relaxed">
            <p>{bio.p1}</p>
            <p>{bio.p2}</p>
          </div>
          <div className="space-y-5 text-sm text-ink/65 leading-relaxed">
            <p>{bio.p3}</p>
            <p>{bio.p4}</p>
            {bio.p5 && <p>{bio.p5}</p>}
          </div>
        </div>
      </section>

      {/* ── CV ─────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-12 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">

          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Opleiding</p>
            <ul className="space-y-4">
              <li className="border-t border-border pt-5">
                <p className="text-sm font-medium text-ink">Kunstacademie</p>
                <p className="text-xs text-ink/45 mt-1">Lopend · autonoom fotografisch onderzoek</p>
              </li>
              <li className="border-t border-border pt-5">
                <p className="text-sm font-medium text-ink">Willem de Kooning Academie · Rotterdam</p>
                <p className="text-xs text-ink/45 mt-1">Fotografie, BA · afgestudeerd 2024</p>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Exposities & publicaties</p>
            <ul className="space-y-4">
              <li className="border-t border-border pt-5">
                <p className="text-sm font-medium text-ink">Expo Nina Passenier — Polderhuis Westkapelle</p>
                <a href="https://www.polderhuiswestkapelle.nl/nl/exposities-museum/1663-expo-nina-passenier"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-ink/45 mt-1 hover:text-ink transition-colors underline underline-offset-4 decoration-border block">
                  polderhuiswestkapelle.nl
                </a>
              </li>
              <li className="border-t border-border pt-5">
                <p className="text-sm font-medium text-ink">Wachtkamer — groepsexpositie Rotterdam</p>
                <p className="text-xs text-ink/45 mt-1">2025</p>
              </li>
              <li className="border-t border-border pt-5">
                <p className="text-sm font-medium text-ink">Willem de Kooning eindexamen</p>
                <p className="text-xs text-ink/45 mt-1">Rotterdam, 2024</p>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="px-7 lg:px-12 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <p className="text-sm text-ink/50">Wil je samenwerken of gewoon kennismaken?</p>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/contact"
            className="border border-ink bg-ink text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-white hover:text-ink transition-all duration-300">
            Neem contact op
          </Link>
          <Link href="/werkwijze"
            className="border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted hover:border-ink hover:text-ink transition-all duration-300">
            Werkwijze
          </Link>
        </div>
      </section>

    </div>
  );
}
