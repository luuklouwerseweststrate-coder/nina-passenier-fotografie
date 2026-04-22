import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export const metadata = { title: "Contact — Nina Passenier" };
export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const email    = settings?.email    || "hallo@ninapassenier.nl";
  const instagram = settings?.instagram || "ninapassenier";
  const location = settings?.location  || "Rotterdam, werkt door heel NL";

  return (
    <section className="px-7 lg:px-12 pt-20 lg:pt-28 pb-0">

      {/* ── Header ─────────────────────────────────── */}
      <div className="border-b border-border pb-14 max-w-2xl">
        <p className="text-[9px] uppercase tracking-[0.28em] text-muted mb-6">Contact</p>
        <h1 className="text-4xl md:text-6xl font-light leading-[1.05] text-ink">
          Laten we praten.
        </h1>
        <p className="mt-6 text-base text-ink/55 leading-relaxed max-w-md">
          Plan een shoot, bespreek een campagne, of stel een vraag over vrij werk.
          Ik reageer meestal binnen een werkdag.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 py-14 lg:py-20 border-b border-border">

        {/* ── Gegevens ─────────────────────────────── */}
        <div className="space-y-10">
          {[
            { label: "E-mail",    value: email,        href: `mailto:${email}` },
            { label: "Instagram", value: `@${instagram}`, href: `https://instagram.com/${instagram}` },
            { label: "Locatie",   value: location,     href: null },
          ].map(({ label, value, href }) => (
            <div key={label} className="border-t border-border pt-6">
              <p className="text-[9px] uppercase tracking-[0.28em] text-faint mb-2">{label}</p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xl lg:text-2xl font-light text-ink hover:text-muted transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="text-xl lg:text-2xl font-light text-ink">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Formulier ────────────────────────────── */}
        <form
          action={`mailto:${email}`}
          method="post"
          encType="text/plain"
          className="space-y-7"
        >
          {[
            { id: "naam",   label: "Naam",    type: "text",  required: true },
            { id: "email",  label: "E-mail",  type: "email", required: true },
          ].map(({ id, label, type, required }) => (
            <div key={id} className="border-t border-border pt-5">
              <label htmlFor={id} className="block text-[9px] uppercase tracking-[0.28em] text-muted mb-3">
                {label}
              </label>
              <input
                id={id} name={id} type={type} required={required}
                className="w-full bg-transparent text-ink placeholder:text-faint focus:outline-none text-sm py-1"
              />
            </div>
          ))}

          <div className="border-t border-border pt-5">
            <label htmlFor="type" className="block text-[9px] uppercase tracking-[0.28em] text-muted mb-3">
              Soort project
            </label>
            <select id="type" name="type"
              className="w-full bg-transparent text-ink text-sm py-1 focus:outline-none appearance-none cursor-pointer">
              <option>Bedrijfsfotografie</option>
              <option>Campagne / branding</option>
              <option>Portret</option>
              <option>Kunst / publicatie</option>
              <option>Anders</option>
            </select>
          </div>

          <div className="border-t border-border pt-5">
            <label htmlFor="bericht" className="block text-[9px] uppercase tracking-[0.28em] text-muted mb-3">
              Bericht
            </label>
            <textarea
              id="bericht" name="bericht" rows={5} required
              className="w-full bg-transparent text-ink text-sm py-1 focus:outline-none resize-none"
            />
          </div>

          <div className="border-t border-border pt-6">
            <button
              type="submit"
              className="w-full border border-ink py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-ink hover:text-bg transition-all duration-300"
            >
              Verstuur bericht
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
