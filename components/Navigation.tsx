"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie" },
  { href: "/vrij-werk",          label: "Vrij werk" },
  { href: "/cases",              label: "Cases" },
  { href: "/over",               label: "Over Nina" },
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
      {/* Topbar: hamburger links — logo midden — contact rechts */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#f5f4f1]/95 backdrop-blur-sm border-b border-black/8 grid grid-cols-3 items-center px-5 lg:px-8">

        {/* Links: hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Sluiten" : "Menu"}
          className="flex flex-col gap-[5px] justify-center w-8 h-8 z-50 relative"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6.5, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: "#1a1a1a" }}
            transition={{ duration: 0.22 }}
            className="block h-[1.5px] w-6 origin-center rounded-full"
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1, backgroundColor: "#1a1a1a" }}
            transition={{ duration: 0.18 }}
            className="block h-[1.5px] w-4 rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6.5, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: "#1a1a1a" }}
            transition={{ duration: 0.22 }}
            className="block h-[1.5px] w-6 origin-center rounded-full"
          />
        </button>

        {/* Midden: logo */}
        <div className="flex justify-center">
          <Link href="/" aria-label="Home">
            <Logo priority className={`h-11 lg:h-12 w-auto transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
          </Link>
        </div>

        {/* Rechts: naam (desktop) */}
        <div className="flex justify-end">
          <span className="hidden lg:block text-[10px] uppercase tracking-[0.2em] text-black/35 whitespace-nowrap">
            Nina Passenier Fotografie
          </span>
        </div>
      </header>

      {/* Full-screen semi-transparante overlay — zoals anneclairedebreij.com */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: "rgba(30, 30, 28, 0.82)", backdropFilter: "blur(2px)" }}
          >
            {/* Logo gecentreerd bovenaan */}
            <div className="flex justify-center pt-5">
              <Link href="/" onClick={() => setOpen(false)}>
                <Logo className="h-8 w-auto brightness-0 invert opacity-90" />
              </Link>
            </div>

            {/* Links gecentreerd */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    className={`block py-3 text-center text-xl lg:text-3xl uppercase tracking-[0.15em] font-sans transition-colors ${
                      pathname === l.href ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="pb-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/25"
            >
              Rotterdam — Nina Passenier Fotografie
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
