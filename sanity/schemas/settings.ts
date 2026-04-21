import { defineField, defineType } from "sanity";

// Singleton document — één instellingen-document voor de hele site
export default defineType({
  name: "settings",
  title: "Site-instellingen",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero afbeelding (homepage)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ninaPortret",
      title: "Portretfoto Nina (Over-pagina)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroStrip",
      title: "Beeldenstrip homepage (horizontale scroll)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt-tekst", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "email",
      title: "E-mailadres",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle (zonder @)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Werklocatie",
      type: "string",
      description: "Bijv. 'Rotterdam, werkt door heel NL'",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site-instellingen" };
    },
  },
});
