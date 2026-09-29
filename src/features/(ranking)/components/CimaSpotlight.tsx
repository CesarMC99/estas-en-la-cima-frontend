import Link from "next/link";
import { routes } from "@/lib/routes";
import type { CategoryCima } from "../types";
import { DonorCommentCard } from "./DonorCommentCard";
import {
  Amount,
  CompanyTag,
  CrownLabel,
  DonateButton,
  PositionBadge,
  ProductThumb,
  RivalGap,
} from "./RankingBits";

interface CimaSpotlightProps {
  cima: CategoryCima;
  /** Puesto que muestra la insignia: en "Las cimas" es el orden entre categorías */
  position: number;
  /**
   * En "Las cimas" el título de la página es otro y el producto va como h2;
   * en la página de categoría el producto ES el título principal (h1).
   * Mantener la jerarquía correcta ayuda a lectores de pantalla y a Google.
   */
  headingLevel: "h1" | "h2";
  /** El enlace "Ver ranking de…" sobra cuando ya estás en ese ranking */
  showRankingLink: boolean;
}

/**
 * Tarjeta grande de un #1: foto, nombre, total acumulado, distancia con el
 * rival y los comentarios de sus 3 mayores donantes.
 *
 * La usan "Las cimas" (para la categoría que más junta) y la página de cada
 * categoría (para su líder). Antes vivía solo en "Las cimas"; al necesitarla
 * en dos páginas se movió a components/ y se volvió configurable con props,
 * en vez de copiarla y mantener dos versiones que acabarían diferentes.
 *
 * Dos columnas en escritorio (datos a la izquierda, comentarios a la derecha)
 * que pasan a una sola en celular gracias a flex-wrap: sin media queries.
 */
export function CimaSpotlight({ cima, position, headingLevel, showRankingLink }: CimaSpotlightProps) {
  const { category, product } = cima;
  // Componente dinámico: JSX permite usar una variable con mayúscula como etiqueta
  const Heading = headingLevel;

  return (
    <article className="flex flex-wrap gap-[clamp(24px,4vw,48px)] overflow-hidden rounded-3xl border-2 border-gold bg-panel p-[clamp(20px,4vw,40px)] shadow-[8px_8px_0_var(--color-magenta)]">
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <PositionBadge position={position} />
          <CrownLabel title={category.crownTitle} outlined />
        </div>

        <div className="flex items-center gap-[clamp(14px,3vw,24px)]">
          <ProductThumb
            imageUrl={product.imageUrl}
            name={product.name}
            className="size-[clamp(110px,18vw,160px)] rounded-[20px]"
          />
          <div className="flex min-w-0 flex-col gap-2">
            <Heading className="font-display text-[clamp(40px,8vw,72px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
              {product.name}
            </Heading>
            <CompanyTag company={product.company} />
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-2">
          <span className="text-[13px] font-semibold tracking-[0.08em] text-lilac-soft uppercase">
            Total acumulado
          </span>
          <Amount cents={cima.totalCents} className="text-[clamp(56px,12vw,112px)]" />
        </div>

        <RivalGap rival={cima.rival} large />

        <div className="flex flex-wrap gap-2.5 pt-3">
          <DonateButton large />
          {showRankingLink && (
            <Link
              href={routes.category(category.slug)}
              className="flex min-h-13 grow basis-[200px] items-center justify-center rounded-[14px] border border-mist/25 text-base font-semibold text-cream transition-colors hover:border-gold"
            >
              Ver ranking de {category.name.toLowerCase()}
            </Link>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
        {cima.comments.map((comment) => (
          <DonorCommentCard key={comment.id} comment={comment} variant="featured" />
        ))}
      </div>
    </article>
  );
}
