/*
 * Todo monto viaja en CÉNTIMOS (enteros), nunca en soles con decimales.
 * En JavaScript 0.1 + 0.2 da 0.30000000000000004: sumar donaciones con
 * decimales acabaría con rankings que difieren por un céntimo fantasma.
 * Con enteros la suma es exacta; solo al mostrar el número se divide entre 100.
 */

const solesFormatter = new Intl.NumberFormat("es-PE", {
  maximumFractionDigits: 0,
});

/** 4832000 → "48,320". El "S/" lo pone cada componente con su propio estilo. */
export function formatSoles(amountCents: number): string {
  return solesFormatter.format(Math.floor(amountCents / 100));
}
