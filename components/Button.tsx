import Link from "next/link";
import { ReactNode } from "react";

type Variant = "oranje" | "groen" | "ink" | "outline";
type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  oranje: "bg-nina-oranje text-white hover:bg-nina-ink",
  groen: "bg-nina-groen text-white hover:bg-nina-ink",
  ink: "bg-nina-ink text-nina-cream hover:bg-nina-oranje",
  outline: "border border-nina-ink text-nina-ink hover:bg-nina-ink hover:text-nina-cream"
};

export default function Button({ href, children, variant = "ink", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide transition-colors rounded-full ${variants[variant]} ${className}`}
    >
      {children}
      <span aria-hidden className="text-base">&rarr;</span>
    </Link>
  );
}
