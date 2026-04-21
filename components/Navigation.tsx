"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/bedrijfsfotografie", label: "Bedrijfsfotografie", sub: "Zakelijk" },
  { href: "/vrij-werk",          label: "Vrij werk",          sub: "Autonoom" },
  { href: "/cases",              label: "Cases",               sub: "Portfolio" },
  { href: "/over",               label: "Over Nina",           sub: "" },
  { href: "/werkwijze",          label: "Werkwijze",           sub: "" },
  { href: "/contact",            label: "Contact",             sub: "" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/" && !open) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (open) setOpen(false);
  };

  return (
    <>
      {/* Smalle topbar — altijd zichtbaar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#f5f4f1] border-b border-black/8 flex items-center px-5 lg:px-8 justify-between">
        <Link href="/" onClick={handleLogoClick} className="block">
          <Logo priority className={`h-9 w-auto transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
        </Link>

        {/* Hamburger — altijd, ook op desktop */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Sluiten" : "Menu"}
          className="z-50 relative flex flex-col gap-[5px] items-end justify-center w-8 h-8"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7, width: "28px", backgroundColor: "#fff" } : { rotate: 0, y: 0, width: "28px", backgroundColor: "#1a1a1a" }}
            transition={{ duration: 0.22 }}
            className="block h-[1.5px] origin-center rounded-full"
          />
          <motion.span
            animate={open ? { opacity: 0, width: "0px" } : { opacity: 1, width: "20px", backgroundColor: "#1a1a1a" }}
            transition={{ duration: 0.18 }}
            className="block h-[1.5px] rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7, width: "28px", backgroundColor: "#fff" } : { rotate: 0, y: 0, width: "28px", backgroundColor: "#1a1a1a" }}
            transition={{ duration: 0.22 }}
            className="block h-[1.5px] origin-center rounded-full"
          />
        </button>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#1a1a1a] flex flex-col"
          >
            <nav className="flex flex-col justify-center flex-1 px-8 lg:px-16 pt-14">
              {links.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={l.href}
                      className={`flex items-baseline justify-between py-5 lg:py-6 group transition-colors ${active ? "text-white" : "text-white/50 hover:text-white"}`}
                    >
                      <span className="font-serif italic text-3xl lg:text-5xl leading-none">{l.label}</span>
                      {l.sub && (
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 group-hover:text-white/50 transition-colors">
                          {l.sub}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="px-8 lg:px-16 pb-8 flex justify-between items-end text-[10px] uppercase tracking-[0.3em] text-white/20"
            >
              <span>Rotterdam</span>
              <span>Nina Passenier Fotografie</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
