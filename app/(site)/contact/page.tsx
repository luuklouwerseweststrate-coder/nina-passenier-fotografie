import Button from "@/components/Button";
import ColorBlob from "@/components/ColorBlob";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export const metadata = { title: "Contact &mdash; Nina Passenier" };
export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const email = settings?.email || "hallo@ninapassenier.nl";
  const instagram = settings?.instagram || "ninapassenier";
  const location = settings?.location || "Rotterdam, werkt door heel NL";

  return (
    <section className="relative overflow-hidden min-h-[80vh]">
      <ColorBlob color="#E8913A" className="w-[50vw] h-[50vw] -top-20 -right-20" />
      <ColorBlob color="#8FA368" className="w-[40vw] h-[40vw] bottom-0 -left-20" delay={0.3} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-nina-oranje mb-6">Contact</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-display">
            Laten we <span className="italic text-nina-oranje">praten</span>.
          </h1>
          <p className="mt-8 text-lg text-nina-ink/70 max-w-lg leading-relaxed">
            Plan een shoot, bespreek een campagne, of stel een vraag over vrij werk.
            Ik reageer meestal binnen een werkdag.
          </p>

          <div className="mt-12 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-nina-petrol mb-1">E-mail</p>
              <a href={`mailto:${email}`} className="font-serif text-2xl md:text-3xl hover:text-nina-oranje">
                {email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-nina-petrol mb-1">Instagram</p>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="font-serif text-2xl md:text-3xl hover:text-nina-oranje">
                @{instagram}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-nina-petrol mb-1">Locatie</p>
              <p className="font-serif text-2xl md:text-3xl">{location}</p>
            </div>
          </div>
        </div>

        {/* Formulier */}
        <form
          className="bg-white p-6 lg:p-10 rounded-sm border border-nina-beige/40 shadow-sm space-y-5"
          action={`mailto:${email}`}
          method="post"
          encType="text/plain"
        >
          <div>
            <label htmlFor="naam" className="block text-xs uppercase tracking-widest text-nina-petrol mb-2">Naam</label>
            <input
              id="naam" name="naam" type="text" required
              className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-oranje"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-nina-petrol mb-2">E-mail</label>
            <input
              id="email" name="email" type="email" required
              className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-oranje"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-xs uppercase tracking-widest text-nina-petrol mb-2">Soort project</label>
            <select id="type" name="type" className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-oranje">
              <option>Bedrijfsfotografie</option>
              <option>Campagne / branding</option>
              <option>Portret</option>
              <option>Kunst / publicatie</option>
              <option>Anders</option>
            </select>
          </div>
          <div>
            <label htmlFor="bericht" className="block text-xs uppercase tracking-widest text-nina-petrol mb-2">Bericht</label>
            <textarea
              id="bericht" name="bericht" rows={5} required
              className="w-full border-b border-nina-ink/20 bg-transparent py-2 focus:outline-none focus:border-nina-oranje resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-nina-ink text-nina-cream py-4 rounded-full text-sm tracking-wide hover:bg-nina-oranje transition-colors"
          >
            Verstuur bericht &rarr;
          </button>
        </form>
      </div>
    </section>
  );
}
