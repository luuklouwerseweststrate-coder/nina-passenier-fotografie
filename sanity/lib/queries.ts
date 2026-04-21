import { groq } from "next-sanity";

// Foto's per categorie
export const businessPhotosQuery = groq`
  *[_type == "photo" && category == "business"] | order(order asc) {
    _id, image, alt, title, meta
  }
`;

export const artPhotosQuery = groq`
  *[_type == "photo" && category == "art"] | order(order asc) {
    _id, image, alt, title, meta
  }
`;

// Site-instellingen (singleton) — hero, strip, portret
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    heroImage, ninaPortret, heroStrip
  }
`;

// Cases / portfolio
export const casesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id, slug, client, year, type, title, intro, cover, images, approach, quote
  }
`;

export const caseBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, slug, client, year, type, title, intro, cover, images, approach, quote
  }
`;

export const caseSlugsQuery = groq`
  *[_type == "caseStudy"] { "slug": slug.current }
`;

// Vrij werk series
export const seriesQuery = groq`
  *[_type == "series"] | order(order asc) {
    _id, title, year, text, cover
  }
`;

// Actieve expositie
export const exhibitionQuery = groq`
  *[_type == "exhibition" && active == true][0] {
    _id, title, location, address, period, access, description, image, linkUrl, linkLabel
  }
`;

// Persberichten / media
export const pressMentionsQuery = groq`
  *[_type == "pressMention"] | order(order asc) {
    _id, publication, publicationFull, title, description, url
  }
`;
