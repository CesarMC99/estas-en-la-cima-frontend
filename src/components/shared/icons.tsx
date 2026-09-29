/*
 * Íconos propios del diseño (la corona y el isotipo). Son SVG pequeños y
 * únicos de esta marca, así que no vale la pena instalar una librería de
 * íconos solo para ellos.
 */

interface IconProps {
  className?: string;
}

/**
 * Corona de 3 puntas. Usa fill="currentColor": toma el color del texto que la
 * rodea, así la misma corona sirve en dorado, negro o donde haga falta.
 */
export function CrownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 10" className={className} aria-hidden="true">
      <polygon points="0,10 1,1 4.5,5 7,0 9.5,5 13,1 14,10" fill="currentColor" />
    </svg>
  );
}

/** Isotipo: montaña fucsia con la corona dorada encima */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <polygon points="4,40 22,14 40,40" className="fill-magenta" />
      <polygon points="16,40 22,31 28,40" className="fill-night" />
      <polygon points="13,12 16,4 22,9 28,4 31,12" className="fill-gold" />
    </svg>
  );
}

/** Banderita del botón "Reportar" */
export function FlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 12" className={className} aria-hidden="true">
      <rect x="0" y="0" width="1.5" height="12" fill="currentColor" />
      <rect x="1.5" y="0.5" width="8" height="6" fill="currentColor" />
    </svg>
  );
}

/** Triángulo de "play" para los videos */
export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 16" className={className} aria-hidden="true">
      <polygon points="1,0 14,8 1,16" fill="currentColor" />
    </svg>
  );
}
