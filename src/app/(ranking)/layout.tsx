import { CategoryNav } from "@/components/shared/CategoryNav";
import { DecorativeBackground } from "@/components/shared/DecorativeBackground";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { MOCK_CATEGORIES } from "@/features/(ranking)/mock-data";

/**
 * Marco común de las páginas del ranking ("Las cimas" y cada categoría):
 * fondo decorativo, cabecera, chips de categorías y aviso de moderación.
 *
 * Vive en el grupo de rutas (ranking) — los paréntesis no aparecen en la URL —
 * para que las pantallas de acceso (login, registro) tengan su propio layout
 * con otro fondo, sin heredar esta cabecera.
 */
export default function RankingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DecorativeBackground />

      {/* z-10: el contenido va por encima de la capa decorativa */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(16px,4vw,32px)]">
        <SiteHeader />
        {/* TEMPORAL: las categorías vendrán de la API */}
        <CategoryNav categories={MOCK_CATEGORIES} />

        <main>{children}</main>

        {/*
          Espacio inferior = alto del collage + 4rem de aire, para que ninguna
          tarjeta ni este aviso tape las fotos del fondo
        */}
        <footer className="pt-5 pb-[calc(var(--spacing-collage)+4rem)]">
          <p className="w-fit rounded-full bg-panel/85 px-2.5 py-1 text-[13px] font-semibold text-lilac">
            Todo comentario, foto o video pasa por revisión antes de publicarse.
          </p>
        </footer>
      </div>
    </div>
  );
}
