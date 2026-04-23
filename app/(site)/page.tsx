import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { settingsQuery, businessPhotosQuery, artPhotosQuery, casesQuery } from "@/sanity/lib/queries";
import HomePageClient from "@/components/HomePageClient";

// Fallback Unsplash data voor als Sanity nog geen content heeft
import {
  businessPhotos as fallbackBusinessPhotos,
  artPhotos as fallbackArtPhotos,
  heroStrip as fallbackHeroStrip,
  heroImage as fallbackHeroImage,
  ninaPortret as fallbackNinaPortret,
} from "@/lib/photos";
import { cases as fallbackCases } from "@/lib/cases";

export const revalidate = 3600; // herlaad elk uur

export default async function HomePage() {
  const [settings, sanityBusinessPhotos, sanityArtPhotos, sanityCases] = await Promise.all([
    client.fetch(settingsQuery).catch(() => null),
    client.fetch(businessPhotosQuery).catch(() => []),
    client.fetch(artPhotosQuery).catch(() => []),
    client.fetch(casesQuery).catch(() => []),
  ]);

  // Hero image: Sanity → fallback
  const heroImage =
    settings?.heroImage
      ? urlFor(settings.heroImage).width(3600).quality(92).url()
      : fallbackHeroImage;

  // Nina portret
  const ninaPortret =
    settings?.ninaPortret
      ? urlFor(settings.ninaPortret).width(2400).quality(92).url()
      : fallbackNinaPortret;

  // Hero strip
  const heroStrip: { src: string; alt: string }[] =
    settings?.heroStrip?.length > 0
      ? settings.heroStrip.map((img: any) => ({
          src: urlFor(img).width(2400).quality(92).url(),
          alt: img.alt || "Foto Nina Passenier",
        }))
      : fallbackHeroStrip.map((p) => ({ src: p.src, alt: p.alt }));

  // Hotspot → CSS object-position helper
  const hotspotPos = (img: any): string | undefined => {
    const h = img?.hotspot;
    if (!h) return undefined;
    return `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%`;
  };

  // Hero foto's: aparte server-side crops voor desktop (breed) en mobiel (smal/portret)
  // Sanity past de hotspot automatisch toe bij fit('crop') met expliciete width+height
  const makeHeroUrls = (img: any, fallbackSrc: string) => {
    if (!img) return { src: fallbackSrc, srcMobile: fallbackSrc };
    return {
      src:       urlFor(img).width(1600).height(900).fit("crop").quality(92).url(),
      srcMobile: urlFor(img).width(420).height(820).fit("crop").quality(92).url(),
    };
  };

  const bedrijfHero = sanityBusinessPhotos.length > 0
    ? makeHeroUrls(sanityBusinessPhotos[0].image, fallbackBusinessPhotos[0].src)
    : { src: fallbackBusinessPhotos[0].src, srcMobile: fallbackBusinessPhotos[0].src };

  const autonomHero = sanityArtPhotos.length > 0
    ? makeHeroUrls(sanityArtPhotos[0].image, fallbackArtPhotos[0].src)
    : { src: fallbackArtPhotos[0].src, srcMobile: fallbackArtPhotos[0].src };

  // Bedrijfsfoto's voor galerij (thumbnail-formaat, objectPosition voor kleine bijstelling)
  const businessPhoto = bedrijfHero.src;

  const businessPhotos: { src: string; alt: string; objectPosition?: string }[] =
    sanityBusinessPhotos.length > 0
      ? sanityBusinessPhotos.slice(0, 5).map((p: any) => ({
          src: urlFor(p.image).width(1800).quality(92).url(),
          alt: p.alt || "Bedrijfsfotografie Nina Passenier",
          objectPosition: hotspotPos(p.image),
        }))
      : fallbackBusinessPhotos.slice(0, 5).map((p) => ({ src: p.src, alt: p.alt }));

  // Autonome foto's voor galerij
  const artPhoto = autonomHero.src;

  const artPhotos: { src: string; alt: string; objectPosition?: string }[] =
    sanityArtPhotos.length > 0
      ? sanityArtPhotos.slice(0, 5).map((p: any) => ({
          src: urlFor(p.image).width(1800).quality(92).url(),
          alt: p.alt || "Vrij werk Nina Passenier",
          objectPosition: hotspotPos(p.image),
        }))
      : fallbackArtPhotos.slice(0, 5).map((p) => ({ src: p.src, alt: p.alt }));

  // Uitgelichte cases
  const allCases = sanityCases.length > 0 ? sanityCases : fallbackCases;
  const makeFeatured = (raw: any, fromSanity: boolean) => ({
    slug:   fromSanity ? raw.slug?.current : raw.slug,
    client: raw.client,
    intro:  raw.intro,
    cover:  raw.cover?.asset ? urlFor(raw.cover).width(2400).quality(92).url() : raw.cover ?? "",
  });

  const featured  = makeFeatured(allCases[0], sanityCases.length > 0);
  const featured2 = makeFeatured(allCases[1] ?? allCases[0], sanityCases.length > 0);

  // Gallery: gemixte foto's van bedrijfsfotografie en autonoom werk
  // Afwisselend bedrijf/autonoom zodat de mix zichtbaar is
  const maxPerType = 4;
  const bedrijfBron = sanityBusinessPhotos.length > 0 ? sanityBusinessPhotos : fallbackBusinessPhotos;
  const autonomBron = sanityArtPhotos.length > 0 ? sanityArtPhotos : fallbackArtPhotos;
  const fromSanityBedrijf = sanityBusinessPhotos.length > 0;
  const fromSanityAutonoom = sanityArtPhotos.length > 0;

  const galleryPhotos: { src: string; alt: string; href: string; objectPosition?: string }[] = [];
  for (let i = 0; i < maxPerType; i++) {
    if (bedrijfBron[i]) {
      const p = bedrijfBron[i] as any;
      galleryPhotos.push({
        src: fromSanityBedrijf ? urlFor(p.image).width(1600).quality(92).url() : p.src,
        alt: p.alt || "Bedrijfsfotografie Nina Passenier",
        href: "/bedrijfsfotografie",
        objectPosition: fromSanityBedrijf ? hotspotPos(p.image) : undefined,
      });
    }
    if (autonomBron[i]) {
      const p = autonomBron[i] as any;
      galleryPhotos.push({
        src: fromSanityAutonoom ? urlFor(p.image).width(1600).quality(92).url() : p.src,
        alt: p.alt || "Autonoom werk Nina Passenier",
        href: "/autonoom-werk",
        objectPosition: fromSanityAutonoom ? hotspotPos(p.image) : undefined,
      });
    }
  }

  return (
    <HomePageClient
      heroImage={heroImage}
      businessPhoto={businessPhoto}
      artPhoto={artPhoto}
      bedrijfHeroDesktop={bedrijfHero.src}
      bedrijfHeroMobile={bedrijfHero.srcMobile}
      autonomHeroDesktop={autonomHero.src}
      autonomHeroMobile={autonomHero.srcMobile}
      businessPhotos={businessPhotos}
      artPhotos={artPhotos}
      ninaPortret={ninaPortret}
      heroStrip={heroStrip}
      featured={featured}
      featured2={featured2}
      galleryPhotos={galleryPhotos}
      heroTagline={settings?.heroTagline}
      heroSubtitel={settings?.heroSubtitel}
      introTekst={settings?.introTekst}
      beschikbaar={settings?.beschikbaar}
      beschikbaarTekst={settings?.beschikbaarTekst}
      igFeedBedrijf={process.env.NEXT_PUBLIC_IG_FEED_BEDRIJF}
      igFeedVrijwerk={process.env.NEXT_PUBLIC_IG_FEED_VRIJWERK}
    />
  );
}
