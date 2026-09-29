import { CrownIcon } from "@/components/shared/icons";
import { formatSoles } from "@/lib/money";

/*
 * Piezas pequeñas que se repiten en "Las cimas" y en la página de categoría.
 * Viven juntas porque son diminutas y siempre cambian a la vez (mismo estilo
 * de etiqueta, mismo formato de montos); separarlas en un archivo cada una
 * solo haría más difícil verlas en conjunto.
 */

/** "#1", "#2"… El primero va en dorado; el resto, discreto */
export function PositionBadge({ position }: { position: number }) {
  const isFirst = position === 1;
  return (
    <span
      className={
        "rounded-[10px] px-3 py-1 font-display font-extrabold " +
        (isFirst ? "bg-gold text-lg text-ink" : "bg-mist/10 text-[15px] text-cream")
      }
    >
      #{position}
    </span>
  );
}

/** Etiqueta con corona: "LA MEJOR CERVEZA" */
export function CrownLabel({ title, outlined = false }: { title: string; outlined?: boolean }) {
  return (
    <span
      className={
        "flex items-center gap-1.5 font-bold tracking-[0.08em] text-gold uppercase " +
        (outlined ? "rounded-full border border-gold/50 px-3 py-1.5 text-[13px]" : "text-xs")
      }
    >
      <CrownIcon className="h-2.5 w-3.5" />
      {title}
    </span>
  );
}

/** Empresa dueña del producto; es solo informativa */
export function CompanyTag({ company }: { company: string }) {
  return (
    <span className="self-start rounded-md bg-mist/8 px-2 py-[3px] text-xs font-semibold text-lilac-soft">
      {company}
    </span>
  );
}

/**
 * Foto del producto. Mientras no haya imagen muestra el relleno a rayas del
 * diseño, que avisa "aquí va una foto" sin romper la composición.
 */
export function ProductThumb({
  imageUrl,
  name,
  className,
}: {
  imageUrl: string | null;
  name: string;
  className: string;
}) {
  if (!imageUrl) {
    return <div role="img" aria-label={`Foto de ${name} (pendiente)`} className={`bg-stripes shrink-0 ${className}`} />;
  }
  // <img> simple por ahora: se cambiará por next/image cuando definamos dónde
  // se guardan las fotos (ese componente necesita conocer el dominio de origen)
  return <img src={imageUrl} alt={name} className={`shrink-0 object-cover ${className}`} />;
}

/** Monto grande con el "S/" más pequeño y elevado, como un marcador */
export function Amount({ cents, className }: { cents: number; className: string }) {
  return (
    <span className={`font-display leading-[0.9] font-extrabold tracking-tight text-gold tabular-nums ${className}`}>
      <span className="mr-1.5 align-[0.7em] text-[0.45em]">S/</span>
      {formatSoles(cents)}
    </span>
  );
}

/**
 * Botón principal "Donar". TEMPORAL: todavía no hace nada; se conectará al
 * flujo de donación (Yape, Plin, tarjeta, PagoEfectivo) cuando lo construyamos.
 */
export function DonateButton({ large = false }: { large?: boolean }) {
  return (
    <button
      type="button"
      className={`grow basis-[120px] bg-gold font-display font-extrabold text-ink transition-colors hover:bg-gold-light ${large ? "min-h-13 rounded-[14px] text-[19px]" : "min-h-12 rounded-xl text-[17px]"}`}
    >
      Donar
    </button>
  );
}

/** "Cristal está a S/ 1,200": la distancia con el segundo, para picar a los rivales */
export function RivalGap({
  rival,
  large = false,
}: {
  rival: { name: string; gapCents: number } | null;
  large?: boolean;
}) {
  if (!rival) {
    return <p className="text-[15px] font-semibold text-lilac">Nadie le hace sombra… todavía.</p>;
  }
  return (
    <p className={`flex items-center gap-2 font-semibold ${large ? "text-[17px]" : "text-[15px]"}`}>
      <span className={`shrink-0 rounded-full bg-green ${large ? "size-2.5" : "size-2"}`} />
      <span>
        {rival.name} está a{" "}
        <strong className={`text-pink ${large ? "font-display text-xl" : ""}`}>
          S/ {formatSoles(rival.gapCents)}
        </strong>
      </span>
    </p>
  );
}
