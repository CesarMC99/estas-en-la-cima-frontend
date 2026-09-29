import { z } from "zod";
import { emailOrPhoneSchema, newPasswordSchema } from "@/lib/validation";

/** Paso 1: a qué cuenta mandamos el código */
export const requestCodeSchema = z.object({
  emailOrPhone: emailOrPhoneSchema,
});

export type RequestCodeValues = z.infer<typeof requestCodeSchema>;

/** Paso 2: el código recibido y la contraseña nueva */
export const resetPasswordSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "El código tiene 6 dígitos"),
  newPassword: newPasswordSchema,
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
