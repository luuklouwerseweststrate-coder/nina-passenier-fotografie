import Image from "next/image";
import Button from "@/components/Button";
import PhotoCard from "@/components/PhotoCard";
import SectionHeader from "@/components/SectionHeader";
import ColorBlob from "@/components/ColorBlob";
import FadeIn from "@/components/FadeIn";
import SectionLabel from "@/components/SectionLabel";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { businessPhotosQuery } from "@/sanity/lib/queries";
import { businessPhotos as fallbackBusinessPhotos } from "@/lib/photos";

export const metadata = { title: "Bedrijfsfotografie &mdash; Nina Passenier" };
export const revalidate = 3600;

const diensten = [
  { title: "Brand portretten", desc: "Portretten voor teams, oprichters en makers. Geen stockbeeld, wel persoonlijkheid." },
  { title: "Campagne shoots", desc: "Seizoenscampagnes voor kleding, lifestyle en design merken. On-location of in studio." },
  { title: "Branding & sfeer", desc: "Beeld dat een merk in zijn geheel vertelt: product, mensen, proces, werkruimte." },
  { title: "Social content", desc: "Losse beelden en series voor Instagram, LinkedIn en websites, kort op de bal." },
  { title: "Evenementen", desc: "Jaarevents, opening, launches. Verhalend gedocumenteerd in plaats van afgevinkt." },
  { title: "Producten in context", desc: "Productfotografie die laat zien hoe iets wordt gebruikt, niet alleen hoe het eruitziet." }
];

export default async function BedrijfsfotografiePage() {
  const sanityPhotos = await client.fetch(businessPhotosQuery).catch(() => []);

  const businessPhotos =
    sanityPhotos.length > 0
      ? sanityPhotos.map((p: any) => ({
          src: urlFor(p.image).width(1600).quality(80).url(),
          alt: p.alt,
          title: p.title,
          meta: p.meta,
        }))
      : fallbackBusinessPhotos;

  const horecaPhoto = businessPhotos[1]?.src ?? businessPhotos[0].src;

  return (
    <>
      <section className="relative overflow-hidden bg-nina-cream">
        <ColorBlob color="#E8913A" className="w-[60vw] h-[60vw] -top-40 -right-40" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-40">
          <p className="text-nina-oranje text-xs uppercase tracking-[0.3em] mb-6">Zakelijk werk</p>
          <h1 className="font-serif text-nina-ink text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-display max-w-4xl">
            Beeld dat werkt voor je <span className="text-nina-oranje italic">merk</span>.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-nina-ink/70 max-w-2xl leading-relaxed">
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

      {/* Horeca & restaurants — uitgelicht */}
      <section className="bg-nina-ink text-nina-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-20 lg:py-28">
          <FadeIn>
            <SectionLabel nr="02" label="Specialisatie" className="[&>span]:text-nina-cream/50 [&>div]:bg-nina-cream/20" />
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-tight tracking-display">
                Horeca &amp; restaurants.
              </h2>
              <p className="mt-6 text-lg text-nina-cream/75 leading-relaxed max-w-xl">
                Een groot deel van mijn werk zit in de horeca. Ik fotografeer gerechten, sfeer, team en ruimte — op het moment dat alles klopt. Niet geposeerd, maar zoals een goed restaurant er echt uitziet.
              </p>
              <p className="mt-4 text-nina-cream/60 leading-relaxed max-w-xl">
                Of het nu gaat om een menukaart, een nieuwe locatie, social content of een complete brand shoot: ik weet hoe horeca werkt en fotografeer daaromheen — voor openingstijd, na service, in het licht dat er altijd al was.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-nina-cream/70 border-t border-nina-cream/10 pt-8">
                {["Gerechten & drinks", "Sfeer & interieur", "Team & portret", "Social content pakketten", "Menu- en campagnebeelden"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-nina-oranje shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href="/contact" variant="oranje">Vraag een offerte aan</Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative aspect-[4/5]">
                <Image
                  src={horecaPhoto}
                  alt="Horecafotografie Nina Passenier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-nina-oranje text-white text-xs uppercase tracking-widest px-3 py-1.5">
                    Horeca
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
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
