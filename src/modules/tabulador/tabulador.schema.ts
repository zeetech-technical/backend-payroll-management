import { z } from "zod";

export const conceptSchema = z.object({
  catalogId: z.number(),
  monto: z.number().optional().nullable(),
  porcentaje: z.number().optional().nullable(),
});

export const createTabuladorConfigSchema = z.object({
  concepts: z.array(conceptSchema),
});

export type ITCreateTabuladorConfigBody = z.infer<
  typeof createTabuladorConfigSchema
>;
