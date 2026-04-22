import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Site-instellingen",
  type: "document",

  groups: [
    { name: "homepage",    title: "🏠 Homepage"           },
    { name: "bedrijf",     title: "🏢 Bedrijfsfotografie" },
    { name: "autonoom",    title: "🎨 Autonoom werk"      },
    { name: "werkwijze",   title: "📋 Werkwijze"          },
    { name: "over",        title: "👤 Over Nina"          },
    { name: "instagram",   title: "📸 Instagram"          },
    { name: "contact",     title: "✉️ Contact"            },
  ],

  fields: [

    // ── HOMEPAGE ──────────────────────────────────────────
    defineField({
      name: "beschikbaar",
      title: "Beschikbaarheidsbadge tonen",
      type: "boolean",
      description: "Toont 'Beschikbaar voor opdrachten' op de homepage",
      initialValue: true,
      group: "homepage",
    }),
    defineField({
      name: "beschikbaarTekst",
      title: "Badge tekst",
      type: "string",
      placeholder: "Beschikbaar voor opdrachten",
      group: "homepage",
    }),
    defineField({
      name: "featuredCase",
      title: "Uitgelicht project — Bedrijfsfotografie kolom",
      type: "reference",
      to: [{ type: "caseStudy" }],
      description: "Verschijnt als eerste uitgelicht project op de homepage. Laat leeg = automatisch de eerste case.",
      group: "homepage",
    }),
    defineField({
      name: "featuredCase2",
      title: "Uitgelicht project — Autonoom werk kolom",
      type: "reference",
      to: [{ type: "caseStudy" }],
      description: "Verschijnt als tweede uitgelicht project op de homepage.",
      group: "homepage",
    }),

    // ── BEDRIJFSFOTOGRAFIE ────────────────────────────────
    defineField({
      name: "bedrijfTagline",
      title: "Grote titel",
      type: "string",
      placeholder: "Beeld dat werkt voor je bedrijf.",
      group: "bedrijf",
    }),
    defineField({
      name: "bedrijfIntro",
      title: "Intro alinea",
      type: "text",
      rows: 3,
      placeholder: "Ik fotografeer voor bedrijven, merken en organisaties…",
      group: "bedrijf",
    }),
    defineField({
      name: "diensten",
      title: "Diensten (kaartjes)",
      type: "array",
      description: "De diensten-kaartjes op de bedrijfsfotografie pagina",
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

    // ── AUTONOOM WERK ─────────────────────────────────────
    defineField({
      name: "autonomTagline",
      title: "Grote titel",
      type: "string",
      placeholder: "Onderzoek in beeld.",
      group: "autonoom",
    }),
    defineField({
      name: "autonomIntro",
      title: "Intro alinea",
      type: "text",
      rows: 3,
      placeholder: "Naast opdrachten werk ik aan eigen series…",
      group: "autonoom",
    }),

    // ── WERKWIJZE ─────────────────────────────────────────
    defineField({
      name: "werkwijzeStappen",
      title: "Stappen",
      type: "array",
      description: "De genummerde stappen op de werkwijze-pagina",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "titel", title: "Stap naam", type: "string", validation: r => r.required() }),
          defineField({ name: "tekst", title: "Omschrijving", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "titel", subtitle: "tekst" } },
      }],
      group: "werkwijze",
    }),

    // ── OVER NINA ─────────────────────────────────────────
    defineField({
      name: "ninaPortret",
      title: "Portretfoto Nina",
      type: "image",
      options: { hotspot: true },
      group: "over",
    }),
    defineField({
      name: "bio1",
      title: "Alinea 1",
      type: "text",
      rows: 4,
      placeholder: "Ik ben Nina Passenier, fotograaf in Rotterdam…",
      group: "over",
    }),
    defineField({
      name: "bio2",
      title: "Alinea 2",
      type: "text",
      rows: 4,
      group: "over",
    }),
    defineField({
      name: "bio3",
      title: "Groot citaat (cursief weergegeven)",
      type: "text",
      rows: 3,
      group: "over",
    }),
    defineField({
      name: "bio4",
      title: "Alinea 4",
      type: "text",
      rows: 4,
      group: "over",
    }),
    defineField({
      name: "bio5",
      title: "Slotalinea",
      type: "text",
      rows: 4,
      group: "over",
    }),

    // ── INSTAGRAM ─────────────────────────────────────────
    defineField({
      name: "igHandleBedrijf",
      title: "Instagram handle — Bedrijfsfotografie (zonder @)",
      type: "string",
      placeholder: "nina.bedrijfsfotografie",
      description: "Getoond als @handle op de bedrijfsfotografie pagina",
      group: "instagram",
    }),
    defineField({
      name: "igFeedIdBedrijf",
      title: "Behold Feed ID — Bedrijfsfotografie",
      type: "string",
      description: "Feed ID van behold.so voor de bedrijfsfotografie Instagram feed",
      group: "instagram",
    }),
    defineField({
      name: "igHandleAutonoom",
      title: "Instagram handle — Autonoom werk (zonder @)",
      type: "string",
      placeholder: "ninapassenierfotografie",
      description: "Getoond als @handle op de autonoom werk pagina",
      group: "instagram",
    }),
    defineField({
      name: "igFeedIdAutonoom",
      title: "Behold Feed ID — Autonoom werk",
      type: "string",
      description: "Feed ID van behold.so voor de autonoom werk Instagram feed",
      group: "instagram",
    }),

    // ── CONTACT ───────────────────────────────────────────
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
      placeholder: "hallo@ninapassenier.nl",
      group: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Hoofd Instagram handle (zonder @)",
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
