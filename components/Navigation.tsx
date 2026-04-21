"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/bedrijfsfotografie", label: "Bedrijf", color: "text-nina-oranje" },
  { href: "/vrij-werk", label: "Vrij werk", color: "text-nina-groen" },
  { href: "/cases", label: "Cases", color: "text-nina-petrol" },
  { href: "/over", label: "Over Nina", color: "text-nina-oranje" },
  { href: "/werkwijze", label: "Werkwijze", color: "text-nina-petrol" },
  { href: "/contact", label: "Contact", color: "text-nina-oranje" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Sluit menu bij routewijziging
  useEffect(() => { setOpen(false); }, [pathname]);

  // Header wordt iets donkerder na scrollen
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`}>
      <div className={`absolute inset-x-0 top-0 h-20 lg:h-24 transition-colors duration-300 border-b border-nina-beige/30 ${scrolled ? "bg-nina-cream/95 backdrop-blur-md" : "bg-nina-cream/85 backdrop-blur-md"}`} />

      <nav className="relative mx-auto max-w-7xl px-5 lg:px-10 h-20 lg:h-24 flex items-center justify-between">
        <Link href="/" onClick={handleLogoClick} aria-label="Home – scroll naar boven" className="block relative">
          <Logo priority className="h-14 md:h-16 lg:h-16 w-auto drop-shadow-sm" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8 text-sm text-nina-ink">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative pb-1 transition-colors duration-300 ${active ? `${l.color} font-medium` : "text-nina-ink/70 hover:text-nina-ink"} after:absolute after:bottom-0 after:left-0 after:h-px after:bg-nina-oranje after:transition-[width] after:duration-300 ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 -mr-2 flex flex-col gap-1.5 w-10 h-10 items-center justify-center"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="h-0.5 w-7 bg-nina-ink block origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="h-0.5 w-7 bg-nina-ink block"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="h-0.5 w-7 bg-nina-ink block origin-center"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-nina-beige/30 bg-nina-cream/98 backdrop-blur-md"
          >
            <ul className="px-5 py-8 flex flex-col gap-1">
              {links.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      className={`flex items-center justify-between py-3 border-b border-nina-ink/5 font-serif text-2xl transition-colors ${active ? l.color : "text-nina-ink hover:text-nina-oranje"}`}
                    >
                      {l.label}
                      {active && <span className="w-2 h-2 rounded-full bg-nina-oranje" />}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Oranje gloed onderaan menu */}
            <div className="h-1 bg-gradient-to-r from-nina-oranje/40 via-nina-groen/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
