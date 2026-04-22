"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactForm({ email, instagram }: { email: string; instagram: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data    = new FormData(e.currentTarget);
    const naam    = data.get("naam");
    const mail    = data.get("email");
    const type    = data.get("type");
    const bericht = data.get("bericht");
    const subject = encodeURIComponent(`Nieuwe aanvraag — ${naam}`);
    const body    = encodeURIComponent(`Van: ${naam}\nE-mail: ${mail}\nProject: ${type}\n\n${bericht}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-7">
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-5">Verstuurd</p>
          <h2 className="text-3xl font-light text-ink mb-4">Je mailprogramma staat klaar.</h2>
          <p className="text-sm text-ink/45 mb-8">Druk op verzenden in je mail — dan hoor je snel van me.</p>
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
            <a href={`mailto:${email}`} className="text-sm text-ink hover:text-muted transition-colors break-all">
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
        </aside>

        {/* ── Formulier ──────────────────────────────── */}
        <form onSubmit={handleSubmit} className="px-7 lg:px-12 py-12 lg:py-16 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Naam of bedrijf" required>
              <input
                name="naam" type="text" required
                placeholder="Jouw naam"
                className="field-input"
              />
            </Field>
            <Field label="E-mailadres" required>
              <input
                name="email" type="email" required
                placeholder="jouw@emailadres.nl"
                className="field-input"
              />
            </Field>
          </div>

          <Field label="Soort project">
            <select name="type" className="field-input cursor-pointer">
              <option value="">Maak een keuze</option>
              <option>Bedrijfsfotografie</option>
              <option>Campagne / branding</option>
              <option>Portret</option>
              <option>Evenement</option>
              <option>Autonoom werk / print</option>
              <option>Anders</option>
            </select>
          </Field>

          <Field label="Bericht" required>
            <textarea
              name="bericht" rows={5} required
              placeholder="Vertel wat over je project — context, datum, locatie, budget. Alles wat helpt."
              className="field-input resize-none"
            />
          </Field>

          <button
            type="submit"
            className="w-full sm:w-auto border border-ink bg-ink text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-white hover:text-ink transition-all duration-300"
          >
            Verstuur bericht →
          </button>

        </form>
      </div>

      <style jsx>{`
        :global(.field-input) {
          display: block;
          width: 100%;
          background: #F7F6F3;
          border: 1px solid #E5E2DC;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #141414;
          outline: none;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        :global(.field-input::placeholder) {
          color: #9e9890;
        }
        :global(.field-input:focus) {
          border-color: #141414;
          background: #ffffff;
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[9px] uppercase tracking-[0.28em] text-ink/60 font-medium">
        {label}{required && <span className="text-ink/30 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
