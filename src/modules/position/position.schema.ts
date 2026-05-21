import { z } from "zod";

export const createPositionSchema = z.object({
  name: z.string(),
});

export type ICreatePositionBody = z.infer<typeof createPositionSchema>;

export const assignToTabSchema = z.object({
  tabuladorId: z.number(),
  positionId: z.number(),
});

export type IAssignToTabBody = z.infer<typeof assignToTabSchema>;
