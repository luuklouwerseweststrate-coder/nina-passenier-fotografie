export const metadata = { title: "Contact — Nina Passenier" };

export default function ContactPage() {
  return (
    <section className="min-h-[80vh]">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-nina-ink/50 mb-6">Contact</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-display">
            Laten we praten.
          </h1>
          <p className="mt-8 text-lg text-nina-ink/70 max-w-lg leading-relaxed">
            Plan een shoot, bespreek een campagne, of stel een vraag over vrij werk.
            Ik reageer meestal binnen een werkdag.
          </p>

          <div className="mt-12 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-nina-ink/50 mb-1">E-mail</p>
              <a href="mailto:hallo@ninapassenier.nl" className="font-serif text-2xl md:text-3xl hover:text-nina-ink/60">
                hallo@ninapassenier.nl
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-nina-ink/50 mb-1">Instagram</p>
              <a href="https://instagram.com" className="font-serif text-2xl md:text-3xl hover:text-nina-ink/60">
                @ninapassenier
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-nina-ink/50 mb-1">Locatie</p>
              <p className="font-serif text-2xl md:text-3xl">Rotterdam, werkt door heel NL</p>
            </div>
          </div>
        </div>

        {/* Formulier */}
        <form
          className="border-t border-nina-ink/10 pt-10 space-y-6"
          action="mailto:hallo@ninapassenier.nl"
          method="post"
          encType="text/plain"
        >
          <div>
            <label htmlFor="naam" className="block text-xs uppercase tracking-widest text-nina-ink/50 mb-2">Naam</label>
            <input
              id="naam" name="naam" type="text" required
              className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-ink"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-nina-ink/50 mb-2">E-mail</label>
            <input
              id="email" name="email" type="email" required
              className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-ink"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-xs uppercase tracking-widest text-nina-ink/50 mb-2">Soort project</label>
            <select id="type" name="type" className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-ink">
              <option>Bedrijfsfotografie</option>
              <option>Campagne / branding</option>
              <option>Portret</option>
              <option>Vrij werk / publicatie</option>
              <option>Anders</option>
            </select>
          </div>
          <div>
            <label htmlFor="bericht" className="block text-xs uppercase tracking-widest text-nina-ink/50 mb-2">Bericht</label>
            <textarea
              id="bericht" name="bericht" rows={5} required
              className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-ink resize-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-nina-ink text-nina-cream px-6 py-3 text-sm tracking-wide hover:bg-nina-ink/80 transition-colors"
          >
            Verstuur bericht →
          </button>
        </form>
      </div>
    </section>
  );
}
