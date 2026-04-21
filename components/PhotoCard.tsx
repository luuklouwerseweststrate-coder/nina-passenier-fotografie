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

const accentColors = {
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Accent lijn onderaan */}
        {accent && (
          <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 z-20 ${accentColors[accent]}`} />
        )}

        {/* Glass info overlay — schuift omhoog bij hover */}
        {(title || meta) && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10">
            <div className="bg-nina-ink/40 backdrop-blur-md px-4 py-3 border-t border-white/10">
              {title && <p className="text-sm font-medium text-white drop-shadow-sm">{title}</p>}
              {meta && <p className="text-xs text-white/65 mt-0.5">{meta}</p>}
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
