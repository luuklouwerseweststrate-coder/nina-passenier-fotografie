"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Photo = { src: string; alt: string };

interface SlotDef {
  left: string;
  top: string;
  width: string;
  ar: string;    // "3/4" | "16/10" | "1/1" | "4/3" | "4/5"
  rot: string;   // CSS rotate value
  z: number;
}

// Curated, editorial compositions — elk slot is bewust geplaatst
const COMPOSITIONS: Record<number, SlotDef[]> = {
  3: [
    { left: "4%",  top: "4%",  width: "36%", ar: "3/4",  rot: "-1.5deg", z: 2 },
    { left: "42%", top: "2%",  width: "52%", ar: "16/10",rot: "1.2deg",  z: 1 },
    { left: "18%", top: "56%", width: "42%", ar: "4/5",  rot: "-0.8deg", z: 3 },
  ],
  4: [
    { left: "4%",  top: "4%",  width: "33%", ar: "3/4",  rot: "-1.5deg", z: 2 },
    { left: "40%", top: "2%",  width: "44%", ar: "16/10",rot: "1.2deg",  z: 1 },
    { left: "10%", top: "58%", width: "28%", ar: "4/5",  rot: "-0.8deg", z: 3 },
    { left: "46%", top: "52%", width: "38%", ar: "3/4",  rot: "2deg",    z: 2 },
  ],
  5: [
    { left: "3%",  top: "4%",  width: "28%", ar: "3/4",  rot: "-1.8deg", z: 2 },
    { left: "34%", top: "2%",  width: "42%", ar: "16/10",rot: "1.2deg",  z: 1 },
    { left: "22%", top: "55%", width: "22%", ar: "1/1",  rot: "-0.8deg", z: 3 },
    { left: "50%", top: "50%", width: "24%", ar: "3/4",  rot: "2.2deg",  z: 2 },
    { left: "68%", top: "40%", width: "28%", ar: "4/3",  rot: "-1deg",   z: 1 },
  ],
  6: [
    { left: "3%",  top: "4%",  width: "28%", ar: "3/4",  rot: "-1.8deg", z: 2 },
    { left: "34%", top: "2%",  width: "38%", ar: "16/10",rot: "1deg",    z: 1 },
    { left: "70%", top: "4%",  width: "24%", ar: "4/5",  rot: "1.8deg",  z: 3 },
    { left: "8%",  top: "58%", width: "26%", ar: "1/1",  rot: "-0.8deg", z: 2 },
    { left: "40%", top: "55%", width: "22%", ar: "3/4",  rot: "1.5deg",  z: 3 },
    { left: "66%", top: "52%", width: "30%", ar: "4/3",  rot: "-1.2deg", z: 1 },
  ],
};

function aspectToPaddingTop(ar: string): string {
  const [w, h] = ar.split("/").map(Number);
  return `${(h / w) * 100}%`;
}

interface ScatteredGalleryProps {
  photos: Photo[];
  href?: string;
  containerMinHeight?: string;
}

export default function ScatteredGallery({
  photos,
  href,
  containerMinHeight = "680px",
}: ScatteredGalleryProps) {
  const count = Math.min(photos.length, 6);
  const slots = COMPOSITIONS[count] ?? COMPOSITIONS[5];
  const display = photos.slice(0, count);

  const ImageWrapper = ({ children, slot }: { children: React.ReactNode; slot: SlotDef }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ scale: 1.025, zIndex: 20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="absolute overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
      style={{
        left: slot.left,
        top: slot.top,
        width: slot.width,
        zIndex: slot.z,
        rotate: slot.rot,
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <>
      {/* Desktop: editorial scattered compositie */}
      <div
        className="relative hidden lg:block w-full"
        style={{ minHeight: containerMinHeight }}
      >
        {display.map((photo, i) => {
          const slot = slots[i];
          if (!slot) return null;

          const inner = (
            <div
              className="relative w-full"
              style={{ paddingTop: aspectToPaddingTop(slot.ar) }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={slot.width}
                className="object-cover"
              />
            </div>
          );

          return (
            <ImageWrapper key={i} slot={slot}>
              {href ? (
                <Link href={href} className="block group">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </ImageWrapper>
          );
        })}
      </div>

      {/* Mobiel: strakke twee-koloms layout */}
      <div className="lg:hidden grid grid-cols-2 gap-2.5">
        {display.slice(0, 4).map((photo, i) => (
          <div
            key={i}
            className={`relative overflow-hidden ${
              i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-[4/5]" : "aspect-[1/1]"
            } ${i === 2 ? "col-span-1" : ""}`}
          >
            {href ? (
              <Link href={href} className="block h-full">
                <Image src={photo.src} alt={photo.alt} fill sizes="45vw" className="object-cover" />
              </Link>
            ) : (
              <Image src={photo.src} alt={photo.alt} fill sizes="45vw" className="object-cover" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
