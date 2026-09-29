import { z } from "zod";
import { emailOrPhoneSchema } from "@/lib/validation";

export const loginSchema = z.object({
  emailOrPhone: emailOrPhoneSchema,
  // En el login NO se exige longitud mínima: si la contraseña es corta,
  // simplemente será incorrecta. Exigirla aquí daría pistas a un atacante
  password: z.string().min(1, "Escribe tu contraseña"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
