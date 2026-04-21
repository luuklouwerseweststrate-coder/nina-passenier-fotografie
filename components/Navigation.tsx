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

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Vergrendel body scroll als menu open is
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-20 lg:h-24 border-b border-nina-beige/30 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-nina-cream/95 shadow-sm" : "bg-nina-cream/85"}`}>
        <nav className="mx-auto max-w-7xl px-5 lg:px-10 h-full flex items-center justify-between">
          <Link href="/" onClick={handleLogoClick} aria-label="Home" className="block relative z-50">
            <Logo priority className={`h-14 md:h-16 lg:h-16 w-auto drop-shadow-sm transition-opacity duration-300 ${open ? "opacity-0 lg:opacity-100" : "opacity-100"}`} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 text-sm text-nina-ink">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative pb-1 tracking-wide transition-colors duration-300 ${active ? `${l.color} font-medium` : "text-nina-ink/70 hover:text-nina-ink"} after:absolute after:bottom-0 after:left-0 after:h-px after:bg-nina-oranje after:transition-[width] after:duration-300 ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger — altijd zichtbaar op z-50 ook als overlay open */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2 flex flex-col gap-1.5 w-10 h-10 items-center justify-center z-50 relative"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 8, backgroundColor: "#FAF7F2" } : { rotate: 0, y: 0, backgroundColor: "#1A1A1A" }}
              transition={{ duration: 0.25 }}
              className="h-0.5 w-7 block origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-7 bg-nina-ink block"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8, backgroundColor: "#FAF7F2" } : { rotate: 0, y: 0, backgroundColor: "#1A1A1A" }}
              transition={{ duration: 0.25 }}
              className="h-0.5 w-7 block origin-center"
            />
          </button>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-nina-ink lg:hidden flex flex-col"
          >
            {/* Navigatielinks — verticaal gecentreerd */}
            <nav className="flex flex-col justify-center flex-1 px-8 pt-20">
              {links.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      className={`flex items-center justify-between py-5 border-b border-white/10 font-serif text-4xl italic leading-tight transition-colors ${active ? l.color : "text-nina-cream hover:text-nina-oranje"}`}
                    >
                      {l.label}
                      {active && <span className="w-2 h-2 rounded-full bg-nina-oranje shrink-0" />}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer in overlay: locatie + instagram */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-8 pb-10 flex items-center justify-between text-xs text-nina-cream/40 tracking-widest uppercase"
            >
              <span>Rotterdam</span>
              <span>© Nina Passenier</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
