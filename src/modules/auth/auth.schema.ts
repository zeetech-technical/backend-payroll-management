import { z } from "zod";

export const AuthSignInSchema = z.object({
  email: z.email(),
  password: z.string()
});

export const AuthVerifyOtpSchema = z.object({
  otp: z.string(),
  token: z.string(),
});

export const AuthRefreshTokenSchema = z.object({
  userId: z.number(),
  deviceId: z.string(),
});

export type ITAuthSignInSchemaBody = z.infer<typeof AuthSignInSchema>
export type ITAuthVerifyOtpSchemaBody = z.infer<typeof AuthVerifyOtpSchema>
export type ITAuthRefreshTokenSchemaBody = z.infer<typeof AuthRefreshTokenSchema>