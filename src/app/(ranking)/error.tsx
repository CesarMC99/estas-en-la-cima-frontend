"use client";

/*
 * Pantalla de error de las páginas del ranking (por ejemplo, si la API no
 * responde). Next la muestra en lugar de la página rota y conserva la
 * cabecera y el fondo del layout.
 *
 * Tiene que ser un Client Component: el botón "Reintentar" necesita
 * JavaScript en el navegador. `reset` vuelve a intentar renderizar la página.
 */
export default function RankingError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-4 rounded-3xl bg-panel p-[clamp(20px,4vw,40px)]">
      <h1 className="font-display text-[clamp(28px,5vw,40px)] leading-none font-extrabold tracking-[-0.03em]">
        No pudimos cargar el ranking
      </h1>
      <p className="text-lg text-lilac">Puede ser tu conexión o que estemos ajustando algo. Inténtalo de nuevo en un momento.</p>
      <button
        type="button"
        onClick={reset}
        className="min-h-12 rounded-xl bg-gold px-6 font-display text-[17px] font-extrabold text-ink transition-colors hover:bg-gold-light"
      >
        Reintentar
      </button>
    </div>
  );
}
