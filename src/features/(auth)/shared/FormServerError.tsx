/**
 * Error que devuelve el SERVIDOR y que no pertenece a un campo concreto
 * ("Correo o contraseña incorrectos", "No pudimos conectar…"). role="alert"
 * hace que el lector de pantalla lo anuncie apenas aparece.
 */
export function FormServerError({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p role="alert" className="rounded-xl border border-pink/40 bg-pink/10 px-4 py-3 text-sm font-semibold text-pink">
      {message}
    </p>
  );
}
