import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const email = settings?.email || "hallo@ninapassenier.nl";
  const instagram = settings?.instagram || "ninapassenier";
  const location = settings?.location || "Rotterdam, NL";

  return (
    <footer className="bg-nina-ink text-nina-cream mt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-3">Nina Passenier</p>
          <p className="text-sm opacity-70 leading-relaxed">
            Fotograaf in Rotterdam. Beeld voor bedrijven en vrije series voor mezelf.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest opacity-60 mb-4">Navigatie</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/bedrijfsfotografie" className="hover:text-nina-oranje transition-colors">Bedrijfsfotografie</Link></li>
            <li><Link href="/vrij-werk" className="hover:text-nina-groen transition-colors">Vrij werk</Link></li>
            <li><Link href="/cases" className="hover:text-nina-geel transition-colors">Cases</Link></li>
            <li><Link href="/over" className="hover:text-nina-beige transition-colors">Over Nina</Link></li>
            <li><Link href="/werkwijze" className="hover:text-nina-oranje transition-colors">Werkwijze</Link></li>
            <li><Link href="/contact" className="hover:text-nina-oranje transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest opacity-60 mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${email}`} className="hover:text-nina-oranje transition-colors">
                {email}
              </a>
            </li>
            <li>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-nina-oranje transition-colors">
                @{instagram}
              </a>
            </li>
            <li className="opacity-70">{location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 text-xs opacity-50 flex flex-col md:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Nina Passenier Fotografie</span>
        </div>
      </div>
    </footer>
  );
}
