import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string()
});

export type ITCreateUserBody = z.infer<typeof createUserSchema>