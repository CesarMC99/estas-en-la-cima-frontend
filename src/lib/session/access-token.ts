/*
 * El token de acceso vive SOLO en la memoria de la pestaña (esta variable),
 * nunca en localStorage.
 *
 * ¿Por qué? Todo lo que está en localStorage lo puede leer cualquier script
 * de la página: si algún día se colara código malicioso (XSS), robaría la
 * sesión. En memoria desaparece al cerrar la pestaña, y no importa: al
 * volver, la cookie httpOnly (que JavaScript no puede leer) renueva la sesión.
 */
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}
