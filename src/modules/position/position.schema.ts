import { z } from "zod";

export const createPositionSchema = z.object({
  name: z.string(),
});

export type ICreatePositionBody = z.infer<typeof createPositionSchema>;
