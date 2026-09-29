/**
 * Encabezado de cada tarjeta de acceso: paso opcional ("Paso 1 de 3"),
 * título con la voz de la marca y una línea de apoyo.
 */
export function FormHeading({ title, subtitle, step }: { title: string; subtitle: string; step?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {step && <span className="text-xs font-bold tracking-[0.08em] text-gold uppercase">{step}</span>}
      <h1 className="font-display text-4xl leading-none font-extrabold tracking-[-0.03em]">{title}</h1>
      <p className="text-[15px] text-lilac">{subtitle}</p>
    </div>
  );
}
