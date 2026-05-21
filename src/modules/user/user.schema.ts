import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string(),
  p_surname: z.string(),
  m_surname: z.string(),
  password: z.string(),
  positionId: z.number(),
  roleId: z.number(),
});

export type ITCreateUserBody = z.infer<typeof createUserSchema>