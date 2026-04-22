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
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square:    "aspect-square",
};

export default function PhotoCard({ src, alt, title, meta, href, ratio = "portrait" }: Props) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    // @ts-expect-error polymorphic element
    <Wrapper {...wrapperProps} className="group block">
      <div className={`relative overflow-hidden bg-surface ${ratioClasses[ratio]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Info overlay op hover */}
        {(title || meta) && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10">
            <div className="bg-ink/50 backdrop-blur-sm px-4 py-3">
              {title && <p className="text-sm font-medium text-white">{title}</p>}
              {meta && <p className="text-xs text-white/60 mt-0.5">{meta}</p>}
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
