import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const SETTINGS_DOC_ID = "settings";

export default defineConfig({
  name: "nina-passenier",
  title: "Nina Passenier Fotografie",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhoud")
          .items([
            // Singleton: instellingen
            S.listItem()
              .title("Site-instellingen")
              .id("settings")
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId(SETTINGS_DOC_ID)
              ),
            S.divider(),
            S.documentTypeListItem("caseStudy").title("Cases & portfolio"),
            S.documentTypeListItem("photo").title("Foto's"),
            S.documentTypeListItem("series").title("Vrij werk — series"),
            S.documentTypeListItem("exhibition").title("Exposities"),
            S.documentTypeListItem("pressMention").title("Pers & media"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
