/*
 * Fondo "de fiesta" del diseño: círculos, zigzag, puntos y rombos de colores,
 * más el collage de fotos del Perú al pie de la página.
 *
 * Todo es decorativo: aria-hidden lo oculta a los lectores de pantalla y
 * pointer-events-none evita que tape clics sobre el contenido. Va en una capa
 * "absolute" detrás (z-0) y el contenido real va encima (z-10) en el layout.
 */

import { PeruCollage } from "./PeruCollage";

export function DecorativeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Sol fucsia con aro dorado, arriba a la derecha */}
      <div className="absolute -top-40 -right-40 size-[460px] rounded-full bg-magenta" />
      <div className="absolute -top-15 -right-15 size-[260px] rounded-full border-[22px] border-gold" />

      {/* Zigzag dorado */}
      <svg
        className="absolute top-[300px] right-0 h-6 w-2/5"
        preserveAspectRatio="none"
        viewBox="0 0 200 24"
      >
        <polyline
          points="0,20 10,4 20,20 30,4 40,20 50,4 60,20 70,4 80,20 90,4 100,20 110,4 120,20 130,4 140,20 150,4 160,20 170,4 180,20 190,4 200,20"
          fill="none"
          className="stroke-gold"
          strokeWidth="4"
        />
      </svg>

      {/* Trama de puntos celestes */}
      <div className="absolute top-[120px] -left-10 size-[180px] bg-[radial-gradient(var(--color-cyan)_3px,transparent_3.5px)] bg-size-[22px_22px] opacity-70" />

      {/* Aros y figuras sueltas */}
      <div className="absolute top-[520px] -left-[110px] size-60 rounded-full border-[26px] border-orange" />
      <div className="absolute top-[44%] -right-10 size-30 rounded-full bg-[repeating-linear-gradient(45deg,var(--color-gold)_0_10px,transparent_10px_20px)]" />
      <div className="absolute top-[58%] -left-15 size-40 rounded-full border-[20px] border-dotted border-magenta" />
      <div className="absolute top-[36%] left-[48%] size-[22px] rotate-45 bg-gold" />
      <div className="absolute top-[74%] right-[14%] size-9 rotate-45 bg-green" />

      {/* Collage de fotos del Perú al pie de la página */}
      <PeruCollage />
    </div>
  );
}
