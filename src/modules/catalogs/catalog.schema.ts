import { z } from "zod";

export const CatalogSchema = z.object({
  name: z.string(),
  typeCatalogId: z.number(),
});

export type ICatalogSchemaBody = z.infer<typeof CatalogSchema>;

export const TypeCatalogSchema = z.object({
  name: z.string(),
  factor: z.string(),
});

export type ITypeCatalogSchemaBody = z.infer<typeof TypeCatalogSchema>;