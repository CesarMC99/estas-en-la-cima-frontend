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
 * Tarjeta de los demás #1 (del segundo en adelante). Misma información que
 * CimaSpotlight pero compacta, para que varias quepan en una grilla.
 */
export function CimaCard({ cima, position }: { cima: CategoryCima; position: number }) {
  const { category, product } = cima;

  return (
    <article className="flex flex-col gap-3.5 rounded-[20px] border border-mist/14 bg-panel p-5">
      <div className="flex flex-wrap items-center gap-2">
        <PositionBadge position={position} />
        <CrownLabel title={category.crownTitle} />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ProductThumb imageUrl={product.imageUrl} name={product.name} className="size-[76px] rounded-[14px]" />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className="font-display text-[32px] leading-none font-extrabold tracking-[-0.03em]">
              {product.name}
            </h3>
            <CompanyTag company={product.company} />
          </div>
        </div>
        <Amount cents={cima.totalCents} className="text-[40px]" />
      </div>

      <RivalGap rival={cima.rival} />

      <div className="flex flex-col border-t border-mist/8">
        {cima.comments.map((comment) => (
          <DonorCommentCard key={comment.id} comment={comment} variant="compact" />
        ))}
      </div>

      {/* mt-auto empuja los botones al fondo: tarjetas de la misma fila quedan alineadas */}
      <div className="mt-auto flex flex-wrap gap-2">
        <DonateButton />
        <Link
          href={routes.category(category.slug)}
          className="flex min-h-12 grow basis-[180px] items-center justify-center rounded-xl border border-mist/22 text-[15px] font-semibold text-cream transition-colors hover:border-gold"
        >
          Ver ranking de {category.name.toLowerCase()}
        </Link>
      </div>
    </article>
  );
}
