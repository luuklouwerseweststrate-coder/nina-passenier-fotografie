import { defineField, defineType } from "sanity";

export default defineType({
  name: "pressMention",
  title: "Pers / media vermelding",
  type: "document",
  fields: [
    defineField({
      name: "publication",
      title: "Publicatie (afkorting)",
      type: "string",
      description: "Bijv. 'PZC'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publicationFull",
      title: "Publicatie (volledige naam)",
      type: "string",
      description: "Bijv. 'Provinciale Zeeuwse Courant'",
    }),
    defineField({
      name: "title",
      title: "Artikel titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Korte beschrijving",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "url",
      title: "Link naar artikel",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publication" },
  },
});
