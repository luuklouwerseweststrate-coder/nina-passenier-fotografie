import { createClient } from "next-sanity";

// Saneer project ID: alleen a-z, 0-9 en koppeltekens toegestaan
const rawId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const projectId = rawId.toLowerCase().replace(/[^a-z0-9-]/g, "") || "placeholder";

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
