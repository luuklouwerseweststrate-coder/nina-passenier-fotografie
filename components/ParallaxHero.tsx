"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
};

export default function ParallaxHero({ src, alt, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Parallax alleen op desktop — op mobiel is scrollen anders en veroorzaakt jank
  const y = useTransform(scrollY, [0, 800], isDesktop ? [0, 160] : [0, 0]);

  return (
    <section ref={ref} className="relative [min-height:100svh] lg:min-h-[90vh] flex items-center lg:items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/90 via-nina-ink/50 to-nina-ink/20" />

      <div className="absolute -top-20 -right-40 w-[55vw] h-[55vw] rounded-full blur-3xl bg-nina-oranje/15 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[45vw] h-[45vw] rounded-full blur-3xl bg-nina-groen/12 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 pt-24 pb-12 lg:pt-0 lg:pb-24 w-full">
        {children}
      </div>
    </section>
  );
}
