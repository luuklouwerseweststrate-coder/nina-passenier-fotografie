"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie" },
  { href: "/autonoom-werk",      label: "Autonoom werk" },
  { href: "/cases",              label: "Cases" },
  { href: "/over",               label: "Over" },
  { href: "/werkwijze",          label: "Werkwijze" },
  { href: "/contact",            label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Topbar — geen border-b zodat het overloopt in de pagina */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white grid grid-cols-3 items-center px-5 lg:px-8">

        {/* Links: hamburger — dikke lijnen zoals ACDB */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Sluiten" : "Menu"}
          className="flex flex-col gap-[6px] justify-center w-8 h-8 relative"
        >
          <motion.span
            animate={open
              ? { rotate: 45, y: 7, backgroundColor: "#F7F6F3" }
              : { rotate: 0,  y: 0, backgroundColor: "#141414" }}
            transition={{ duration: 0.2 }}
            className="block h-[3px] w-6 origin-center rounded-none"
          />
          <motion.span
            animate={open
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1, backgroundColor: "#141414" }}
            transition={{ duration: 0.15 }}
            className="block h-[3px] w-6 rounded-none"
          />
          <motion.span
            animate={open
              ? { rotate: -45, y: -7, backgroundColor: "#F7F6F3" }
              : { rotate: 0,   y: 0,  backgroundColor: "#141414" }}
            transition={{ duration: 0.2 }}
            className="block h-[3px] w-6 origin-center rounded-none"
          />
        </button>

        {/* Midden: naam als wordmark — groter */}
        <div className="flex justify-center">
          <Link
            href="/"
            aria-label="Home"
            className={`text-base sm:text-lg tracking-[0.12em] uppercase font-medium whitespace-nowrap transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          >
            Nina Passenier
          </Link>
        </div>

        {/* Rechts: stad */}
        <div className="flex justify-end">
          <span className="hidden lg:block text-[9px] uppercase tracking-[0.22em] text-muted">
            Rotterdam
          </span>
        </div>
      </header>

      {/* Overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: "rgba(20, 20, 20, 0.92)", backdropFilter: "blur(4px)" }}
          >
            {/* Naam bovenaan */}
            <div className="flex justify-center pt-[18px]">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-[10px] tracking-[0.28em] uppercase text-white/30 hover:text-white/60 transition-colors"
              >
                Nina Passenier
              </Link>
            </div>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    className={`block py-3 text-center text-3xl lg:text-5xl uppercase tracking-[0.12em] font-normal transition-colors duration-150 ${
                      pathname === l.href ? "text-white" : "text-white/35 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pb-6 text-center text-[9px] uppercase tracking-[0.3em] text-white/20"
            >
              Rotterdam &mdash; Fotografie
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
