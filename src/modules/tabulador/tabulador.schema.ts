
import { z } from "zod";

export const createTabuladorConfigSchema = z.object({
  tabuladorId: z.number(),
  catalogId: z.number(),
  monto: z.number().optional(),
  porcentaje: z.number().optional()
});

export type ITCreateTabuladorConfigBody = z.infer<typeof createTabuladorConfigSchema>