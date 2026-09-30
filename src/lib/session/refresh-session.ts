import { print } from "graphql";
import { REFRESH_SESSION } from "@/features/(auth)/shared/auth.graphql";
import type { SessionFieldsFragment } from "@/graphql/generated/graphql";
import { GRAPHQL_URL } from "@/lib/graphql-endpoint";
import { setAccessToken } from "./access-token";

/*
 * Renueva la sesión usando la cookie httpOnly (el navegador la envía solo
 * gracias a credentials: "include").
 *
 * Usa fetch directo y no Apollo a propósito: Apollo llama a esta función
 * cuando una consulta falla por sesión vencida; si la renovación pasara por
 * Apollo, un fallo aquí podría volver a disparar la renovación en bucle.
 */

let inFlight: Promise<SessionFieldsFragment | null> | null = null;

/**
 * Devuelve la sesión nueva, o null si no hay sesión válida.
 *
 * Si varias consultas fallan a la vez, TODAS esperan la misma renovación en
 * curso (`inFlight`) en lugar de lanzar una cada una. Importante porque cada
 * token de renovación sirve una sola vez: dos renovaciones simultáneas con
 * el mismo token harían creer al servidor que fue robado.
 */
export function refreshSession(): Promise<SessionFieldsFragment | null> {
  inFlight ??= doRefresh().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

async function doRefresh(): Promise<SessionFieldsFragment | null> {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: print(REFRESH_SESSION), operationName: "RefreshSession" }),
    });
    const json = (await response.json()) as {
      data?: { refreshSession: SessionFieldsFragment } | null;
    };
    const session = json.data?.refreshSession ?? null;
    setAccessToken(session?.accessToken ?? null);
    return session;
  } catch {
    // Sin conexión o API caída: se trata como "sin sesión" (no rompe la página)
    setAccessToken(null);
    return null;
  }
}
