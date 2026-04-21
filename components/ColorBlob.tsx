"use client";

import { motion } from "framer-motion";

type Props = {
  color?: string;
  className?: string;
  delay?: number;
};

export default function ColorBlob({ color = "#E8913A", className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.28, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}
