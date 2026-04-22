import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "photo",
  title: "Foto",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "photo" }),
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
      description: "Beschrijf WAT er op de foto staat voor Google en slechtzienden. Bijv: 'Portret van een vrouw in een wachtkamer, Rotterdam 2025' — niet 'foto' of de bestandsnaam.",
      validation: (r) => r.required().min(10).error("Vul minimaal 10 tekens in — Google leest dit!"),
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
          { title: "Autonoom werk", value: "art" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Naamloos",
        subtitle: subtitle === "business" ? "Bedrijfsfotografie" : "Autonoom werk",
        media,
      };
    },
  },
});
