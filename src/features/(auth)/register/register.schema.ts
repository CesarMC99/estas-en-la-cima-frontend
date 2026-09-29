import { z } from "zod";
import { isPeruMobile, newPasswordSchema, normalizePhone } from "@/lib/validation";

/*
 * El usuario es el "@" público que se ve en los comentarios del ranking, así
 * que se limita a minúsculas, números y guion bajo (como en Instagram o
 * TikTok): sin espacios ni tildes, se lee igual en todas partes y no se puede
 * disfrazar de otro con letras parecidas.
 */
const USERNAME_PATTERN = /^[a-z0-9_]+$/;

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    // Se pasa a minúsculas ANTES de validar: "Chalaco" se guarda como "chalaco"
    .toLowerCase()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(USERNAME_PATTERN, "Solo letras, números y guion bajo (_)"),
  email: z.email("Escribe un correo válido"),
  phone: z
    .string()
    .refine(isPeruMobile, "Escribe un celular de 9 dígitos que empiece con 9")
    // Se guarda sin espacios: "987 654 321" → "987654321"
    .transform(normalizePhone),
  password: newPasswordSchema,
  // boolean + refine (y no z.literal(true)): la casilla EMPIEZA en false, así
  // que su tipo debe admitir false; solo es VÁLIDA cuando está marcada
  acceptTerms: z.boolean().refine((accepted) => accepted, {
    message: "Acepta los términos y las reglas para continuar",
  }),
});

/*
 * Dos tipos porque el esquema TRANSFORMA datos (minúsculas, celular sin
 * espacios): lo que el usuario escribe (input) no es exactamente lo que se
 * envía (output).
 */
export type RegisterFormInput = z.input<typeof registerSchema>;
export type RegisterFormValues = z.output<typeof registerSchema>;
