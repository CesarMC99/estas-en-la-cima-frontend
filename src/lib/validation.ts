import { z } from "zod";

/*
 * Reglas de validación que comparten varios formularios. Viven fuera de los
 * componentes para poder leerlas, reutilizarlas y probarlas sin React.
 */

/**
 * Celular peruano: 9 dígitos que empiezan con 9 (987 654 321). Se aceptan
 * espacios porque la gente los escribe así; se quitan antes de validar.
 */
const PERU_MOBILE = /^9\d{8}$/;

export function normalizePhone(value: string): string {
  return value.replace(/\s+/g, "");
}

export function isPeruMobile(value: string): boolean {
  return PERU_MOBILE.test(normalizePhone(value));
}

export function isEmail(value: string): boolean {
  return z.email().safeParse(value.trim()).success;
}

/*
 * La contraseña REFLEJA la regla que tendrá el backend: validar igual en los
 * dos lados da respuesta inmediata al usuario, pero la validación que manda
 * siempre será la del servidor (el frontend se puede saltar).
 */
export const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72; // límite del algoritmo bcrypt que usaremos en el backend

export const newPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Mínimo ${PASSWORD_MIN_LENGTH} caracteres`)
  .max(PASSWORD_MAX_LENGTH, `Máximo ${PASSWORD_MAX_LENGTH} caracteres`);

/** "Correo o celular": el login y la recuperación aceptan cualquiera de los dos */
export const emailOrPhoneSchema = z
  .string()
  .trim()
  .min(1, "Escribe tu correo o celular")
  .refine((value) => isEmail(value) || isPeruMobile(value), {
    message: "Escribe un correo válido o un celular de 9 dígitos",
  });
