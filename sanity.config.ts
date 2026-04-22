import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
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
      structure: (S, context) =>
        S.list()
          .title("Beheer")
          .items([

            // ── Instellingen ───────────────────────────────
            S.listItem()
              .title("⚙️ Site-instellingen")
              .id("settings")
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId(SETTINGS_DOC_ID)
              ),

            S.divider(),

            // ── Bedrijfsfotografie ─────────────────────────
            S.listItem()
              .title("📸 Bedrijfsfotografie")
              .child(
                S.list()
                  .title("Bedrijfsfotografie")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "photo",
                      title: "Foto's (sleep om volgorde te bepalen)",
                      filter: `category == "business"`,
                      S,
                      context,
                    }),
                    S.documentTypeListItem("caseStudy").title("Cases & portfolio"),
                  ])
              ),

            // ── Autonoom werk ──────────────────────────────
            S.listItem()
              .title("🎨 Autonoom werk")
              .child(
                S.list()
                  .title("Autonoom werk")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "photo",
                      title: "Foto's (sleep om volgorde te bepalen)",
                      filter: `category == "art"`,
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "series",
                      title: "Series",
                      S,
                      context,
                    }),
                    S.documentTypeListItem("exhibition").title("Exposities"),
                  ])
              ),

            S.divider(),

            // ── Overig ────────────────────────────────────
            S.documentTypeListItem("pressMention").title("📰 Pers & media"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
