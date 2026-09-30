import { routes } from "./routes";

/** Nombre del parámetro: /ingresar?redirigir=/categoria/cervezas */
export const REDIRECT_PARAM = "redirigir";

/**
 * Adónde volver después de iniciar sesión, sin abrir la puerta a un
 * "redireccionamiento abierto": si alguien comparte un enlace como
 * /ingresar?redirigir=https://sitio-falso.com, tras ingresar la persona
 * terminaría en una copia falsa del sitio pidiéndole sus datos.
 *
 * Solo se aceptan rutas internas que empiezan con una sola "/" (no "//",
 * que el navegador interpreta como otro dominio).
 */
export function getSafeRedirect(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return routes.home;
  }
  return value;
}
