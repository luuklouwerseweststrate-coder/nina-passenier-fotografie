import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  alt: string;
  title?: string;
  meta?: string;
  href?: string;
  ratio?: "portrait" | "landscape" | "square";
  accent?: "oranje" | "groen" | "geel" | "petrol";
};

const ratioClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square"
};

const accentBar = {
  oranje: "bg-nina-oranje",
  groen: "bg-nina-groen",
  geel: "bg-nina-geel",
  petrol: "bg-nina-petrol"
};

export default function PhotoCard({ src, alt, title, meta, href, ratio = "portrait", accent }: Props) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    // @ts-expect-error polymorphic element
    <Wrapper {...wrapperProps} className="group block">
      <div className={`relative overflow-hidden bg-nina-beige/20 ${ratioClasses[ratio]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {accent && (
          <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${accentBar[accent]}`} />
        )}
      </div>
      {(title || meta) && (
        <div className="mt-3">
          {title && <p className="text-sm font-medium text-nina-ink">{title}</p>}
          {meta && <p className="text-xs text-nina-ink/60 mt-0.5">{meta}</p>}
        </div>
      )}
    </Wrapper>
  );
}
