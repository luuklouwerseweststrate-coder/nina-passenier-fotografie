import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  alt: string;
  title?: string;
  meta?: string;
  href?: string;
  ratio?: "portrait" | "landscape" | "square";
};

const ratioClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square"
};

export default function PhotoCard({ src, alt, title, meta, href, ratio = "portrait" }: Props) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    // @ts-expect-error polymorphic element
    <Wrapper {...wrapperProps} className="group block">
      <div className={`relative overflow-hidden bg-nina-ink/5 ${ratioClasses[ratio]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
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
