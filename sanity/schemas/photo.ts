import { defineField, defineType } from "sanity";

export default defineType({
  name: "photo",
  title: "Foto",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt-tekst",
      type: "string",
      description: "Korte beschrijving voor slechtzienden en zoekmachines",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "meta",
      title: "Meta (locatie, jaar)",
      type: "string",
      description: "Bijv. 'Rotterdam, 2025'",
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Bedrijfsfotografie", value: "business" },
          { title: "Vrij werk / kunst", value: "art" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      description: "Lager = eerder zichtbaar",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Naamloos",
        subtitle: subtitle === "business" ? "Bedrijfsfotografie" : "Vrij werk",
        media,
      };
    },
  },
});
