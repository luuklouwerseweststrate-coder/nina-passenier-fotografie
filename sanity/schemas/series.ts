import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "series",
  title: "Vrij werk — serie",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "series" }),
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
  ],
  preview: {
    select: { title: "title", subtitle: "year", media: "cover" },
  },
});
