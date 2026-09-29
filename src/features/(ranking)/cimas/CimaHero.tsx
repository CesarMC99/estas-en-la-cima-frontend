import Link from "next/link";
import { routes } from "@/lib/routes";
import { DonorCommentCard } from "../components/DonorCommentCard";
import {
  Amount,
  CompanyTag,
  CrownLabel,
  DonateButton,
  PositionBadge,
  ProductThumb,
  RivalGap,
} from "../components/RankingBits";
import type { CategoryCima } from "../types";

/**
 * Tarjeta grande del #1 de "Las cimas": la categoría que más dinero junta.
 * Dos columnas en escritorio (datos a la izquierda, comentarios a la derecha)
 * que pasan a una sola en celular gracias a flex-wrap: sin media queries.
 */
export function CimaHero({ cima, position }: { cima: CategoryCima; position: number }) {
  const { category, product } = cima;

  return (
    <article className="mb-5 flex flex-wrap gap-[clamp(24px,4vw,48px)] overflow-hidden rounded-3xl border-2 border-gold bg-panel p-[clamp(20px,4vw,40px)] shadow-[8px_8px_0_var(--color-magenta)]">
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
            <h2 className="font-display text-[clamp(40px,8vw,72px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance">
              {product.name}
            </h2>
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
          <Link
            href={routes.category(category.slug)}
            className="flex min-h-13 grow basis-[200px] items-center justify-center rounded-[14px] border border-mist/25 text-base font-semibold text-cream transition-colors hover:border-gold"
          >
            Ver ranking de {category.name.toLowerCase()}
          </Link>
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
