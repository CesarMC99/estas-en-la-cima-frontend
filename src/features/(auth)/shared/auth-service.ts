/*
 * TEMPORAL: operaciones de cuenta mientras no existe el backend.
 *
 * Simulan una llamada a la API (esperan un momento y responden OK) para poder
 * construir y probar los formularios completos: estados de carga, errores y
 * navegación. Cuando exista la API, el cuerpo de cada función se reemplaza por
 * su mutación GraphQL y los formularios no cambian, porque solo conocen estas
 * funciones.
 *
 * Todas lanzan un Error con un mensaje para el usuario si algo falla; los
 * formularios lo muestran con <FormServerError>.
 */

const FAKE_NETWORK_DELAY_MS = 700;

function simulateRequest(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, FAKE_NETWORK_DELAY_MS));
}

export async function login(input: { emailOrPhone: string; password: string }): Promise<void> {
  void input;
  await simulateRequest();
}

export async function register(input: {
  username: string;
  email: string;
  phone: string;
  password: string;
}): Promise<void> {
  void input;
  await simulateRequest();
}

/** Envía un código de 6 dígitos al correo o celular de la cuenta */
export async function requestRecoveryCode(input: { emailOrPhone: string }): Promise<void> {
  void input;
  await simulateRequest();
}

export async function resetPassword(input: {
  emailOrPhone: string;
  code: string;
  newPassword: string;
}): Promise<void> {
  void input;
  await simulateRequest();
}

/** Convierte cualquier error en un mensaje que se puede mostrar al usuario */
export function toUserMessage(error: unknown): string {
  return error instanceof Error && error.message
    ? error.message
    : "No pudimos conectar. Revisa tu internet e inténtalo de nuevo.";
}
