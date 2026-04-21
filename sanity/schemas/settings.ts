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

    // ── HERO BADGE ────────────────────────────────────
    defineField({
      name: "beschikbaar",
      title: "Homepage — beschikbaarheidsbadge tonen",
      type: "boolean",
      description: "📍 Homepage · Toont de groene 'Beschikbaar voor opdrachten' badge op de hero. Zet uit als je volgeboekt bent.",
      initialValue: true,
      group: "homepage",
    }),
    defineField({
      name: "beschikbaarTekst",
      title: "Homepage — badge tekst",
      type: "string",
      placeholder: "Rotterdam · Beschikbaar voor opdrachten",
      description: "📍 Homepage · Tekst in de groene badge bovenaan",
      group: "homepage",
    }),

    // ── UITGELICHT PROJECT ────────────────────────────
    defineField({
      name: "featuredCase",
      title: "Homepage — uitgelicht project",
      type: "reference",
      to: [{ type: "caseStudy" }],
      description: "📍 Homepage · Het grote project dat onderaan de homepage wordt uitgelicht. Laat leeg = automatisch de eerste case.",
      group: "homepage",
    }),

    // ── HOMEPAGE ──────────────────────────────────────
    defineField({
      name: "heroTagline",
      title: "Homepage — grote titel (hero)",
      type: "string",
      placeholder: "Beeld dat blijft hangen.",
      description: "📍 Homepage · Het grote opschrift bovenaan over de foto",
      group: "homepage",
    }),
    defineField({
      name: "heroSubtitel",
      title: "Homepage — subtitel onder de titel",
      type: "text",
      rows: 2,
      placeholder: "Fotografie voor merken die willen opvallen…",
      description: "📍 Homepage · De kleinere tekst direct onder de grote titel",
      group: "homepage",
    }),
    defineField({
      name: "introTekst",
      title: "Homepage — intro zin (middensectie)",
      type: "text",
      rows: 2,
      description: "📍 Homepage · De zin in het midden van de pagina: 'Ik ben Nina…'",
      group: "homepage",
    }),

    // ── OVER NINA ─────────────────────────────────────
    defineField({
      name: "bio1",
      title: "Over-pagina — alinea 1",
      type: "text",
      rows: 4,
      placeholder: "Ik ben Nina Passenier, fotograaf in Rotterdam…",
      description: "📍 Over Nina · Eerste alinea van het verhaal",
      group: "over",
    }),
    defineField({
      name: "bio2",
      title: "Over-pagina — alinea 2",
      type: "text",
      rows: 4,
      description: "📍 Over Nina · Tweede alinea",
      group: "over",
    }),
    defineField({
      name: "bio3",
      title: "Over-pagina — citaat (groot schrift)",
      type: "text",
      rows: 3,
      description: "📍 Over Nina · Dit wordt cursief en groot weergegeven als tussenzin",
      group: "over",
    }),
    defineField({
      name: "bio4",
      title: "Over-pagina — alinea 4",
      type: "text",
      rows: 4,
      description: "📍 Over Nina · Vierde alinea",
      group: "over",
    }),
    defineField({
      name: "bio5",
      title: "Over-pagina — alinea 5 (slotalinea)",
      type: "text",
      rows: 4,
      description: "📍 Over Nina · Laatste alinea, over hoe werken met Nina eruitziet",
      group: "over",
    }),

    // ── BEDRIJFSFOTOGRAFIE ────────────────────────────
    defineField({
      name: "bedrijfTagline",
      title: "Bedrijfsfotografie — grote titel (hero)",
      type: "string",
      placeholder: "Beeld dat werkt voor je bedrijf.",
      description: "📍 Bedrijfsfotografie · Het grote opschrift bovenaan de pagina",
      group: "bedrijf",
    }),
    defineField({
      name: "bedrijfIntro",
      title: "Bedrijfsfotografie — intro alinea",
      type: "text",
      rows: 3,
      placeholder: "Ik fotografeer voor bedrijven, merken…",
      description: "📍 Bedrijfsfotografie · De tekst onder de grote titel",
      group: "bedrijf",
    }),
    defineField({
      name: "diensten",
      title: "Bedrijfsfotografie — diensten (6 kaartjes)",
      type: "array",
      description: "📍 Bedrijfsfotografie · De 6 diensten-kaartjes in het midden van de pagina",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Naam dienst", type: "string", validation: r => r.required() }),
          defineField({ name: "desc", title: "Omschrijving", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      }],
      group: "bedrijf",
    }),
    defineField({
      name: "werkwijzeStappen",
      title: "Werkwijze — stappen",
      type: "array",
      description: "📍 Werkwijze · De genummerde stappen op de werkwijze-pagina",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "titel", title: "Stap naam", type: "string", validation: r => r.required() }),
          defineField({ name: "tekst", title: "Omschrijving", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "titel", subtitle: "tekst" } },
      }],
      group: "bedrijf",
    }),

    // ── VRIJ WERK ─────────────────────────────────────
    defineField({
      name: "vrijwerkTagline",
      title: "Vrij werk — grote titel (hero)",
      type: "string",
      placeholder: "Onderzoek in beeld.",
      group: "vrijwerk",
    }),
    defineField({
      name: "vrijwerkIntro",
      title: "Vrij werk — intro alinea",
      type: "text",
      rows: 3,
      description: "📍 Vrij werk · De tekst onder de grote titel bovenaan",
      group: "vrijwerk",
    }),

    // ── CONTACT ───────────────────────────────────────
    defineField({
      name: "email",
      title: "E-mailadres (zichtbaar op contactpagina)",
      type: "string",
      placeholder: "hallo@ninapassenier.nl",
      description: "📍 Contactpagina + footer · Klikbaar mailto-link",
      group: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle (zonder @)",
      type: "string",
      placeholder: "ninapassenier",
      description: "📍 Contactpagina · Wordt @ninapassenier op de site",
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
