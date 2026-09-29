/*
 * Fondo de las pantallas de acceso (distinto al del ranking): soles
 * concéntricos abajo a la derecha, tres zigzags de colores arriba y figuras
 * sueltas. Es decorativo: aria-hidden + pointer-events-none.
 */

const ZIGZAG_POINTS =
  "0,20 10,4 20,20 30,4 40,20 50,4 60,20 70,4 80,20 90,4 100,20 110,4 120,20 130,4 140,20 150,4 160,20 170,4 180,20 190,4 200,20";

/** Tres zigzags escalonados: cada uno más corto y más abajo que el anterior */
const ZIGZAGS = [
  { top: "top-7", width: "w-[46%]", stroke: "stroke-gold" },
  { top: "top-14", width: "w-[38%]", stroke: "stroke-cyan" },
  { top: "top-21", width: "w-[30%]", stroke: "stroke-green" },
] as const;

export function AuthBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sol de anillos: naranja, fucsia y dorado con el centro "vacío" */}
      <div className="absolute -right-75 -bottom-75 size-[520px] rounded-full bg-orange" />
      <div className="absolute -right-60 -bottom-60 size-100 rounded-full bg-magenta" />
      <div className="absolute -right-45 -bottom-45 size-70 rounded-full bg-gold" />
      <div className="absolute -right-30 -bottom-30 size-40 rounded-full bg-night" />

      {ZIGZAGS.map((zigzag) => (
        <svg
          key={zigzag.stroke}
          className={`absolute -right-2.5 h-6 ${zigzag.top} ${zigzag.width}`}
          preserveAspectRatio="none"
          viewBox="0 0 200 24"
        >
          <polyline points={ZIGZAG_POINTS} fill="none" className={zigzag.stroke} strokeWidth="4" />
        </svg>
      ))}

      <div className="absolute bottom-[4%] -left-15 h-30 w-40 bg-[radial-gradient(var(--color-cyan)_3px,transparent_3.5px)] bg-size-[22px_22px] opacity-75" />
      <div className="absolute -bottom-17.5 left-[22%] size-45 rounded-full border-[20px] border-dotted border-magenta" />
      <div className="absolute right-10 bottom-62.5 size-11 rotate-45 bg-green" />
      {/* Rombos sueltos: solo en pantallas medianas o más; en celular caían encima del texto */}
      <div className="absolute top-[44%] right-[22%] hidden size-6.5 rotate-45 bg-magenta md:block" />
      <div className="absolute top-[18%] left-[58%] hidden size-4.5 rotate-45 bg-gold md:block" />
    </div>
  );
}
