import { z } from "zod";

export const createPermissionSchema = z.object({
  slug: z.string(),
  name: z.string(),
});

export type ITCreatePermissionBody = z.infer<typeof createPermissionSchema>