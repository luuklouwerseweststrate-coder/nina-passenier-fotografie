import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case / portfolio",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Klant / project naam",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-slug",
      type: "slug",
      options: { source: "client", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Bedrijfsfotografie", value: "bedrijf" },
          { title: "Autonoom werk", value: "kunst" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Subtitel / tagline",
      type: "string",
      description: "Beschrijving onder de klantnaam op de overzichtspagina",
    }),
    defineField({
      name: "intro",
      title: "Introductie",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "cover",
      title: "Omslagfoto",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Galerij",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "approach",
      title: "Aanpak",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "quote",
      title: "Klantquote (optioneel)",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Citaat", type: "text", rows: 3 }),
        defineField({ name: "author", title: "Naam + functie", type: "string" }),
      ],
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "client", subtitle: "type", media: "cover" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "bedrijf" ? "Bedrijfsfotografie" : "Autonoom werk",
        media,
      };
    },
  },
});
