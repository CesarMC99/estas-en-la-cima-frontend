import { formatSoles } from "@/lib/money";
import { Amount, CompanyTag, DonateButton, ProductThumb } from "../components/RankingBits";
import type { Contender } from "../types";

/*
 * Colores de la barra de progreso, en rotación. Son solo decoración: ayudan a
 * distinguir las filas, no significan nada distinto cada uno.
 */
const BAR_COLORS = ["bg-magenta", "bg-cyan", "bg-green", "bg-orange"] as const;

interface ContenderRowProps {
  contender: Contender;
  /** Total del #1: la barra muestra qué tan cerca está este producto de él */
  leaderTotalCents: number;
}

/**
 * Una fila de "La cola para la cima": puesto, producto, barra de progreso
 * hacia el #1, lo que le falta y el botón para donarle.
 *
 * El #2 va resaltado en rosa: es el que más cerca está de quitarle la cima al
 * líder, y el diseño quiere que se note la amenaza.
 */
export function ContenderRow({ contender, leaderTotalCents }: ContenderRowProps) {
  const { position, product, totalCents, missingCents } = contender;
  const isRunnerUp = position === 2;

  // Porcentaje del total del líder. Es un cálculo de presentación (el ancho de
  // la barra), no un monto: los montos siempre vienen calculados del backend
  const progress = leaderTotalCents > 0 ? Math.round((totalCents / leaderTotalCents) * 100) : 0;
  const barColor = BAR_COLORS[(position - 2) % BAR_COLORS.length];

  return (
    <li
      className={`flex flex-wrap items-center gap-[clamp(12px,3vw,24px)] rounded-[18px] border bg-panel px-[clamp(16px,3vw,24px)] py-4 ${isRunnerUp ? "border-pink/55" : "border-mist/14"}`}
    >
      <span
        // Más chico en celular para que puesto, foto y nombre quepan en una línea
        className={`w-[clamp(40px,10vw,56px)] shrink-0 font-display text-[clamp(28px,7vw,40px)] leading-none font-extrabold tracking-[-0.04em] ${isRunnerUp ? "text-pink" : "text-cream"}`}
      >
        #{position}
      </span>

      <ProductThumb imageUrl={product.imageUrl} name={product.name} className="size-16 rounded-xl" />

      <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-[clamp(20px,5vw,24px)] leading-[1.05] font-extrabold tracking-[-0.02em]">
            {product.name}
          </span>
          <CompanyTag company={product.company} />
        </div>

        {/* role="progressbar" + aria-*: el lector de pantalla anuncia "78 %" */}
        <div
          role="progressbar"
          aria-label={`${product.name} respecto al primer lugar`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 overflow-hidden rounded-full bg-mist/10"
        >
          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${progress}%` }} />
        </div>

        <p className="text-sm font-semibold text-lilac">
          le faltan <strong className="text-pink">S/ {formatSoles(missingCents)}</strong> para la cima
        </p>
      </div>

      {/* ml-auto empuja el monto y el botón a la derecha; si no caben, bajan de línea */}
      <div className="ml-auto flex shrink-0 items-center gap-4">
        <Amount cents={totalCents} className="text-[clamp(26px,4vw,34px)] whitespace-nowrap" />
        <div className="flex min-w-24">
          <DonateButton />
        </div>
      </div>
    </li>
  );
}
