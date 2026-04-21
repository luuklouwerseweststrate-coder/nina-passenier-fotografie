"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
};

export default function ParallaxHero({ src, alt, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Beeld schuift langzamer dan de pagina (parallax)
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <section ref={ref} className="relative [min-height:100svh] lg:min-h-[90vh] flex items-center lg:items-end overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      {/* Gradient werkt zowel bij gecentreerde (mobiel) als onderste (desktop) positie */}
      <div className="absolute inset-0 bg-gradient-to-t from-nina-ink/90 via-nina-ink/50 to-nina-ink/20" />

      <div className="absolute -top-20 -right-40 w-[55vw] h-[55vw] rounded-full blur-3xl bg-nina-oranje/15 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[45vw] h-[45vw] rounded-full blur-3xl bg-nina-groen/12 pointer-events-none" />

      {/* pt-20 compenseert de sticky nav op mobiel */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 pt-24 pb-12 lg:pt-0 lg:pb-24 w-full">
        {children}
      </div>
    </section>
  );
}
