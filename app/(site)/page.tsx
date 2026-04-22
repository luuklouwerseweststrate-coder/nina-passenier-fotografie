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

  // Bedrijfsfoto's (eerste voor split-screen hero, meerdere voor kolom)
  const businessPhoto =
    sanityBusinessPhotos.length > 0
      ? urlFor(sanityBusinessPhotos[0].image).width(1600).quality(80).url()
      : fallbackBusinessPhotos[0].src;

  const businessPhotos: { src: string; alt: string }[] =
    sanityBusinessPhotos.length > 0
      ? sanityBusinessPhotos.slice(0, 5).map((p: any) => ({
          src: urlFor(p.image).width(900).quality(80).url(),
          alt: p.alt || "Bedrijfsfotografie Nina Passenier",
        }))
      : fallbackBusinessPhotos.slice(0, 5).map((p) => ({ src: p.src, alt: p.alt }));

  // Kunstfoto's (eerste voor split-screen hero, meerdere voor kolom)
  const artPhoto =
    sanityArtPhotos.length > 0
      ? urlFor(sanityArtPhotos[0].image).width(1600).quality(80).url()
      : fallbackArtPhotos[0].src;

  const artPhotos: { src: string; alt: string }[] =
    sanityArtPhotos.length > 0
      ? sanityArtPhotos.slice(0, 5).map((p: any) => ({
          src: urlFor(p.image).width(900).quality(80).url(),
          alt: p.alt || "Vrij werk Nina Passenier",
        }))
      : fallbackArtPhotos.slice(0, 5).map((p) => ({ src: p.src, alt: p.alt }));

  // Uitgelichte cases
  const allCases = sanityCases.length > 0 ? sanityCases : fallbackCases;
  const makeFeatured = (raw: any, fromSanity: boolean) => ({
    slug:   fromSanity ? raw.slug?.current : raw.slug,
    client: raw.client,
    intro:  raw.intro,
    cover:  raw.cover?.asset ? urlFor(raw.cover).width(1200).quality(85).url() : raw.cover ?? "",
  });

  const featured  = makeFeatured(allCases[0], sanityCases.length > 0);
  const featured2 = makeFeatured(allCases[1] ?? allCases[0], sanityCases.length > 0);

  // Gallery: case covers als losse klikbare items
  const galleryCases = allCases.slice(0, 6).map((raw: any, i: number) => ({
    src:  raw.cover?.asset ? urlFor(raw.cover).width(800).quality(80).url() : raw.cover ?? "",
    alt:  raw.client ?? `Project ${i + 1}`,
    href: `/cases/${sanityCases.length > 0 ? raw.slug?.current : raw.slug}`,
  }));

  return (
    <HomePageClient
      heroImage={heroImage}
      businessPhoto={businessPhoto}
      artPhoto={artPhoto}
      businessPhotos={businessPhotos}
      artPhotos={artPhotos}
      ninaPortret={ninaPortret}
      heroStrip={heroStrip}
      featured={featured}
      featured2={featured2}
      galleryCases={galleryCases}
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
