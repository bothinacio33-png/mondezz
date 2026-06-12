import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../sanity-schemas";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@/lib/sanity";

export default defineConfig({
  name: "mondez-studio",
  title: "Mondez — Catálogo",
  basePath: "/admin",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
