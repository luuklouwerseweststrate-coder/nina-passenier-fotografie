"use client";

import { motion } from "framer-motion";

type Props = {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number; // seconden voor een volledige loop
};

export default function Marquee({ items, className = "", reverse = false, speed = 30 }: Props) {
  // Dubbele set zodat de loop naadloos is
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-10 lg:gap-16"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10 lg:gap-16">
            <span>{item}</span>
            <span aria-hidden className="text-commerce">&bull;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
