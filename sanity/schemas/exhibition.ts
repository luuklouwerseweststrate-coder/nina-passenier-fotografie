import { defineField, defineType } from "sanity";

export default defineType({
  name: "exhibition",
  title: "Expositie",
  type: "document",
  fields: [
    defineField({
      name: "active",
      title: "Nu te zien (actief tonen op site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Titel van de expositie",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Locatie (kort)",
      type: "string",
      description: "Bijv. 'Museumcafé Polderhuis · Westkapelle'",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "string",
      description: "Bijv. 'Zuidstraat 154–156, Westkapelle'",
    }),
    defineField({
      name: "period",
      title: "Periode",
      type: "string",
      description: "Bijv. '11 oktober 2025 — 7 mei 2026'",
    }),
    defineField({
      name: "access",
      title: "Toegang",
      type: "string",
      description: "Bijv. 'Gratis, tijdens openingstijden café'",
    }),
    defineField({
      name: "description",
      title: "Omschrijving",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "image",
      title: "Foto van de expositie",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "linkUrl",
      title: "Externe link (URL)",
      type: "url",
    }),
    defineField({
      name: "linkLabel",
      title: "Link tekst",
      type: "string",
      description: "Bijv. 'Meer info op polderhuiswestkapelle.nl'",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
