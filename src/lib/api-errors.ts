import { CombinedGraphQLErrors } from "@apollo/client";

/**
 * Convierte cualquier error de una operación en un mensaje para mostrar.
 *
 * - Error de la API (GraphQL): el backend ya manda mensajes en español y
 *   pensados para la persona ("Ya hay una cuenta con ese correo…").
 * - Cualquier otra cosa (sin internet, API caída): mensaje genérico. Nunca
 *   se muestra el texto técnico del error.
 */
export function toUserMessage(error: unknown): string {
  if (CombinedGraphQLErrors.is(error) && error.errors[0]?.message) {
    return error.errors[0].message;
  }
  return "No pudimos conectar. Revisa tu internet e inténtalo de nuevo.";
}

/** Código estable del error de la API ("CONFLICT", "UNAUTHENTICATED"…) */
export function errorCode(error: unknown): string | null {
  if (!CombinedGraphQLErrors.is(error)) return null;
  const code = error.errors[0]?.extensions?.code;
  return typeof code === "string" ? code : null;
}
