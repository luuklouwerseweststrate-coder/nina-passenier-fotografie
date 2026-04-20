import Link from "next/link";
import { ReactNode } from "react";

type Variant = "ink" | "outline" | "cream" | "outlineLight";
type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  ink: "bg-nina-ink text-nina-cream hover:bg-nina-ink/80",
  outline: "border border-nina-ink text-nina-ink hover:bg-nina-ink hover:text-nina-cream",
  cream: "bg-nina-cream text-nina-ink hover:bg-nina-cream/80",
  outlineLight: "border border-nina-cream/70 text-nina-cream hover:bg-nina-cream hover:text-nina-ink"
};

export default function Button({ href, children, variant = "ink", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors ${variants[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="text-base">→</span>
    </Link>
  );
}
