import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Site-instellingen",
  type: "document",

  // Tabs in de Studio — overzichtelijk voor Nina
  groups: [
    { name: "afbeeldingen", title: "📷 Afbeeldingen" },
    { name: "homepage", title: "🏠 Homepage" },
    { name: "over", title: "👤 Over Nina" },
    { name: "bedrijf", title: "🏢 Bedrijfsfotografie" },
    { name: "vrijwerk", title: "🎨 Vrij werk" },
    { name: "contact", title: "✉️ Contact" },
  ],

  fields: [
    // ── AFBEELDINGEN ──────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero afbeelding (homepage achtergrond)",
      type: "image",
      options: { hotspot: true },
      group: "afbeeldingen",
    }),
    defineField({
      name: "ninaPortret",
      title: "Portretfoto Nina (homepage + Over-pagina)",
      type: "image",
      options: { hotspot: true },
      group: "afbeeldingen",
    }),
    defineField({
      name: "horecaPhoto",
      title: "Horecafoto (uitgelicht op bedrijfsfotografie-pagina)",
      type: "image",
      options: { hotspot: true },
      description: "De grote foto in het donkere 'Horeca & restaurants' blok",
      group: "afbeeldingen",
    }),
    defineField({
      name: "heroStrip",
      title: "Beeldenstrip homepage (horizontale scroll onderaan)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-tekst",
              type: "string",
              description: "Bijv: 'Portret Nina Passenier, Rotterdam' — Google leest dit.",
              validation: (r) => r.required().error("Alt-tekst is verplicht voor elke stripfoto"),
            }),
          ],
        },
      ],
      group: "afbeeldingen",
    }),

    // ── HOMEPAGE ──────────────────────────────────────
    defineField({
      name: "heroTagline",
      title: "Hero tagline",
      type: "string",
      placeholder: "Beeld dat blijft hangen.",
      description: "De grote tekst op de homepage",
      group: "homepage",
    }),
    defineField({
      name: "heroSubtitel",
      title: "Hero subtitel",
      type: "text",
      rows: 2,
      placeholder: "Fotografie voor merken die willen opvallen…",
      group: "homepage",
    }),
    defineField({
      name: "introTekst",
      title: "Intro tekst (onder de hero)",
      type: "text",
      rows: 2,
      description: "De zin in het midden van de pagina met 'Ik ben Nina…'",
      group: "homepage",
    }),

    // ── OVER NINA ─────────────────────────────────────
    defineField({
      name: "bio1",
      title: "Bio — alinea 1",
      type: "text",
      rows: 4,
      placeholder: "Ik ben Nina Passenier, fotograaf in Rotterdam…",
      group: "over",
    }),
    defineField({
      name: "bio2",
      title: "Bio — alinea 2",
      type: "text",
      rows: 4,
      group: "over",
    }),
    defineField({
      name: "bio3",
      title: "Bio — alinea 3 (citaat in groot schrift)",
      type: "text",
      rows: 3,
      group: "over",
    }),
    defineField({
      name: "bio4",
      title: "Bio — alinea 4",
      type: "text",
      rows: 4,
      group: "over",
    }),
    defineField({
      name: "bio5",
      title: "Bio — alinea 5",
      type: "text",
      rows: 4,
      group: "over",
    }),

    // ── BEDRIJFSFOTOGRAFIE ────────────────────────────
    defineField({
      name: "bedrijfTagline",
      title: "Hero tagline",
      type: "string",
      placeholder: "Beeld dat werkt voor je bedrijf.",
      group: "bedrijf",
    }),
    defineField({
      name: "bedrijfIntro",
      title: "Intro tekst",
      type: "text",
      rows: 3,
      placeholder: "Ik fotografeer voor bedrijven, merken…",
      group: "bedrijf",
    }),

    // ── VRIJ WERK ─────────────────────────────────────
    defineField({
      name: "vrijwerkTagline",
      title: "Hero tagline",
      type: "string",
      placeholder: "Onderzoek in beeld.",
      group: "vrijwerk",
    }),
    defineField({
      name: "vrijwerkIntro",
      title: "Intro tekst",
      type: "text",
      rows: 3,
      group: "vrijwerk",
    }),

    // ── CONTACT ───────────────────────────────────────
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      placeholder: "hallo@ninapassenier.nl",
      group: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle (zonder @)",
      type: "string",
      placeholder: "ninapassenier",
      group: "contact",
    }),
    defineField({
      name: "location",
      title: "Werklocatie",
      type: "string",
      placeholder: "Rotterdam, werkt door heel NL",
      group: "contact",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Site-instellingen" };
    },
  },
});
