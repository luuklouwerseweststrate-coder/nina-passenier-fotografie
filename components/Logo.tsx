import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = "", priority = false }: Props) {
  return (
  <Image
    src="/logo.png"
    alt="Nina Passenier Fotografie"
    width={1200}
    height={440}
    priority={priority}
    className={`h-14 w-auto ${className}`}
  />
);
