"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const email    = "hallo@ninapassenier.nl";
  const instagram = "ninapassenier";
  const location = "Rotterdam — werkt door heel NL";

  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const naam    = data.get("naam");
    const mail    = data.get("email");
    const type    = data.get("type");
    const bericht = data.get("bericht");

    const subject = encodeURIComponent(`Nieuwe aanvraag — ${naam}`);
    const body    = encodeURIComponent(
      `Van: ${naam}\nE-mail: ${mail}\nProject: ${type}\n\n${bericht}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-7">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Verstuurd</p>
          <h2 className="text-3xl font-light text-ink mb-4">Je mailprogramma staat klaar.</h2>
          <p className="text-sm text-ink/45 mb-8">Druk op verzenden in je mail — dan ben ik er snel bij.</p>
          <Link href="/" className="text-[9px] uppercase tracking-[0.28em] text-faint hover:text-ink transition-colors">
            ← Terug naar home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ── Header ─────────────────────────────────── */}
      <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-10 border-b border-border">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-4">Contact</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] text-ink max-w-xl">
          Leuk dat je contact opneemt!
        </h1>
        <p className="mt-4 text-sm text-ink/50 max-w-md leading-relaxed">
          Vul het formulier in en ik laat binnen 2 werkdagen van me horen.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">

        {/* ── Gegevens ───────────────────────────────── */}
        <aside className="px-7 lg:px-12 py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-border space-y-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-faint mb-2">E-mail</p>
            <a href={`mailto:${email}`}
              className="text-sm text-ink hover:text-muted transition-colors break-all">
              {email}
            </a>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-faint mb-2">Instagram</p>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer"
              className="text-sm text-ink hover:text-muted transition-colors">
              @{instagram}
            </a>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-faint mb-2">Locatie</p>
            <p className="text-sm text-ink">{location}</p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-ink/35 leading-relaxed">
              Ik reageer meestal binnen één werkdag.
            </p>
          </div>
        </aside>

        {/* ── Formulier — interview stijl ─────────────── */}
        <form onSubmit={handleSubmit} className="px-7 lg:px-12 py-12 lg:py-16 space-y-0">

          <Question nr="01" vraag="Wie ben je?">
            <input
              id="naam" name="naam" type="text" required
              placeholder="Naam of bedrijf"
              className="w-full bg-transparent text-ink text-lg lg:text-xl font-light placeholder:text-ink/20 focus:outline-none py-3 border-b border-ink/20 focus:border-ink transition-colors duration-200"
            />
          </Question>

          <Question nr="02" vraag="Hoe bereik ik je?">
            <input
              id="email" name="email" type="email" required
              placeholder="jouw@emailadres.nl"
              className="w-full bg-transparent text-ink text-lg lg:text-xl font-light placeholder:text-ink/20 focus:outline-none py-3 border-b border-ink/20 focus:border-ink transition-colors duration-200"
            />
          </Question>

          <Question nr="03" vraag="Wat wil je maken?">
            <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors duration-200">
              <select
                id="type" name="type"
                className="w-full bg-transparent text-ink text-lg lg:text-xl font-light focus:outline-none py-3 appearance-none cursor-pointer pr-6"
              >
                <option value="">Kies een categorie</option>
                <option>Bedrijfsfotografie</option>
                <option>Campagne / branding</option>
                <option>Portret</option>
                <option>Evenement</option>
                <option>Autonoom werk / print</option>
                <option>Anders</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none">↓</span>
            </div>
          </Question>

          <Question nr="04" vraag="Vertel meer.">
            <textarea
              id="bericht" name="bericht" rows={4} required
              placeholder="Context, datum, locatie, budget — wat je wilt delen."
              className="w-full bg-transparent text-ink text-base font-light placeholder:text-ink/20 focus:outline-none py-3 border-b border-ink/20 focus:border-ink transition-colors duration-200 resize-none leading-relaxed"
            />
          </Question>

          <div className="pt-10">
            <button
              type="submit"
              className="border border-ink px-8 py-3 text-[11px] uppercase tracking-[0.22em] text-ink hover:bg-ink hover:text-white transition-all duration-300"
            >
              Verstuur →
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

function Question({ nr, vraag, children }: { nr: string; vraag: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-b border-border">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-[9px] uppercase tracking-[0.28em] text-faint shrink-0">{nr}</span>
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted">{vraag}</p>
      </div>
      {children}
    </div>
  );
}
