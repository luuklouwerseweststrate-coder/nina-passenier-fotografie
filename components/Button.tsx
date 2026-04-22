import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "ghost" | "glass" | "commerce" | "free";
type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary:  "bg-ink text-bg border border-ink hover:bg-transparent hover:text-ink",
  ghost:    "border border-border text-muted hover:border-ink hover:text-ink",
  glass:    "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  commerce: "bg-commerce text-white hover:bg-ink",
  free:     "bg-free text-white hover:bg-ink",
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </Link>
  );
}
