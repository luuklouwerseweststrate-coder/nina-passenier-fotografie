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
      ? urlFor(settings.heroImage).width(2000).quality(85).url()
      : fallbackHeroImage;

  // Nina portret
  const ninaPortret =
    settings?.ninaPortret
      ? urlFor(settings.ninaPortret).width(1200).quality(85).url()
      : fallbackNinaPortret;

  // Hero strip
  const heroStrip: { src: string; alt: string }[] =
    settings?.heroStrip?.length > 0
      ? settings.heroStrip.map((img: any) => ({
          src: urlFor(img).width(1200).quality(80).url(),
          alt: img.alt || "Foto Nina Passenier",
        }))
      : fallbackHeroStrip.map((p) => ({ src: p.src, alt: p.alt }));

  // Bedrijfsfoto (pijler card)
  const businessPhoto =
    sanityBusinessPhotos.length > 0
      ? urlFor(sanityBusinessPhotos[0].image).width(1600).quality(80).url()
      : fallbackBusinessPhotos[0].src;

  // Kunstfoto (pijler card)
  const artPhoto =
    sanityArtPhotos.length > 0
      ? urlFor(sanityArtPhotos[0].image).width(1600).quality(80).url()
      : fallbackArtPhotos[0].src;

  // Uitgelichte case: handmatig gekozen in Studio → anders eerste case
  const chosenCase = settings?.featuredCase;
  const rawCase = chosenCase ?? (sanityCases.length > 0 ? sanityCases[0] : fallbackCases[0]);
  const featured = {
    slug: chosenCase ? rawCase.slug?.current : sanityCases.length > 0 ? rawCase.slug?.current : rawCase.slug,
    client: rawCase.client,
    intro: rawCase.intro,
    cover:
      rawCase.cover?.asset
        ? urlFor(rawCase.cover).width(2000).quality(85).url()
        : rawCase.cover ?? "",
  };

  return (
    <HomePageClient
      heroImage={heroImage}
      businessPhoto={businessPhoto}
      artPhoto={artPhoto}
      ninaPortret={ninaPortret}
      heroStrip={heroStrip}
      featured={featured}
      heroTagline={settings?.heroTagline}
      heroSubtitel={settings?.heroSubtitel}
      introTekst={settings?.introTekst}
      beschikbaar={settings?.beschikbaar}
      beschikbaarTekst={settings?.beschikbaarTekst}
    />
  );
}
