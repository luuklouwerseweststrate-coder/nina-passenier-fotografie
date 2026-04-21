import { defineField, defineType } from "sanity";

export default defineType({
  name: "series",
  title: "Vrij werk — serie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naam van de serie",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Jaar",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Beschrijving",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "cover",
      title: "Omslagfoto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "cover" },
  },
});
