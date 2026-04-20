import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-nina-ink text-nina-cream mt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl mb-3">Nina Passenier</p>
          <p className="text-sm opacity-70 leading-relaxed">
            Fotograaf in Rotterdam. Beeld voor merken en vrije series voor mezelf.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest opacity-60 mb-4">Navigatie</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/bedrijfsfotografie" className="hover:opacity-70">Bedrijfsfotografie</Link></li>
            <li><Link href="/vrij-werk" className="hover:opacity-70">Vrij werk</Link></li>
            <li><Link href="/cases" className="hover:opacity-70">Cases</Link></li>
            <li><Link href="/over" className="hover:opacity-70">Over Nina</Link></li>
            <li><Link href="/contact" className="hover:opacity-70">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest opacity-60 mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:hallo@ninapassenier.nl" className="hover:opacity-70">hallo@ninapassenier.nl</a></li>
            <li><a href="https://instagram.com" className="hover:opacity-70">Instagram</a></li>
            <li className="opacity-70">Rotterdam, NL</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 text-xs opacity-50 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Nina Passenier Fotografie</span>
          <span>KvK · BTW · Algemene voorwaarden</span>
        </div>
      </div>
    </footer>
  );
}
