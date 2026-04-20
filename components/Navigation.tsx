"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/bedrijfsfotografie", label: "Bedrijf" },
  { href: "/kunstfotografie", label: "Kunst" },
  { href: "/cases", label: "Cases" },
  { href: "/over", label: "Over Nina" },
  { href: "/werkwijze", label: "Werkwijze" },
  { href: "/contact", label: "Contact" }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Achtergrond-balk (sticky header blijft smal) */}
      <div className="absolute inset-x-0 top-0 h-20 lg:h-24 bg-nina-cream/85 backdrop-blur-md border-b border-nina-beige/30" />

      <nav className="relative mx-auto max-w-7xl px-5 lg:px-10 h-20 lg:h-24 flex items-center justify-between">
        {/* Logo hangt over de balk heen (veel groter dan de header zelf) */}
        <Link href="/" aria-label="Home" className="block relative">
          <Logo
            priority
            className="h-24 md:h-32 lg:h-40 xl:h-48 w-auto drop-shadow-sm"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-sm text-nina-ink">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-nina-oranje transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 -mr-2"
          aria-label="Menu"
        >
          <div className="w-7 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-nina-ink transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 bg-nina-ink transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-nina-ink transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="lg:hidden relative border-t border-nina-beige/30 bg-nina-cream">
          <ul className="px-5 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-serif text-nina-ink hover:text-nina-oranje"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
