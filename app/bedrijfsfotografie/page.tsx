import Image from "next/image";
import Button from "@/components/Button";
import PhotoCard from "@/components/PhotoCard";
import SectionHeader from "@/components/SectionHeader";
import ColorBlob from "@/components/ColorBlob";
import { businessPhotos } from "@/lib/photos";

export const metadata = { title: "Bedrijfsfotografie &mdash; Nina Passenier" };

const diensten = [
  { title: "Brand portretten", desc: "Portretten voor teams, oprichters en makers. Geen stockbeeld, wel persoonlijkheid." },
  { title: "Campagne shoots", desc: "Seizoenscampagnes voor kleding, lifestyle en design merken. On-location of in studio." },
  { title: "Branding & sfeer", desc: "Beeld dat een merk in zijn geheel vertelt: product, mensen, proces, werkruimte." },
  { title: "Social content", desc: "Losse beelden en series voor Instagram, LinkedIn en websites, kort op de bal." },
  { title: "Evenementen", desc: "Jaarevents, opening, launches. Verhalend gedocumenteerd in plaats van afgevinkt." },
  { title: "Producten in context", desc: "Productfotografie die laat zien hoe iets wordt gebruikt, niet alleen hoe het eruitziet." }
];

export default function BedrijfsfotografiePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-nina-ink text-nina-cream">
        <ColorBlob color="#E8913A" className="w-[60vw] h-[60vw] -top-40 -right-40" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-40">
          <p className="text-nina-oranje text-xs uppercase tracking-[0.3em] mb-6">Zakelijk werk</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display max-w-4xl">
            Beeld dat werkt voor je <span className="text-nina-oranje italic">merk</span>.
          </h1>
          <p className="mt-8 text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed">
            Ik fotografeer voor bedrijven, merken, organisaties en makers. Beeld dat zichtbaarheid en herkenning geeft, zonder dat het aanvoelt als een advertentie.
          </p>
          <div className="mt-10">
            <Button href="/contact" variant="oranje">Plan een shoot</Button>
          </div>
        </div>
      </section>

      {/* Diensten */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <SectionHeader eyebrow="Wat ik doe" title="Voor elke fase van jouw merk." accent="oranje" />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {diensten.map((d, i) => (
            <div key={d.title} className="border-t border-nina-ink/10 pt-6">
              <p className="text-nina-oranje text-sm font-medium">0{i + 1}</p>
              <h3 className="font-serif text-2xl mt-2 mb-3">{d.title}</h3>
              <p className="text-nina-ink/70 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <SectionHeader eyebrow="Portfolio" title="Recent werk voor merken en bedrijven." accent="oranje" />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {businessPhotos.map((p, i) => (
            <div key={i} className={i === 1 || i === 4 ? "md:mt-12" : ""}>
              <PhotoCard
                src={p.src}
                alt={p.alt}
                title={p.title}
                meta={p.meta}
                ratio={i % 2 === 0 ? "portrait" : "landscape"}
                accent="oranje"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Voor wie */}
      <section className="bg-nina-oranje/10 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-nina-oranje mb-6">Voor wie</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-display">
            Modemerken, creatieve bureaus, advocatenkantoren, restaurants, makers, culturele instellingen, en alles daartussenin.
          </h2>
          <div className="mt-12">
            <Button href="/contact" variant="ink">Stuur een bericht</Button>
          </div>
        </div>
      </section>
    </>
  );
}
