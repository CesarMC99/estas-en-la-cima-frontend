import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContenderRow } from "@/features/(ranking)/categoria/ContenderRow";
import { CimaSpotlight } from "@/features/(ranking)/components/CimaSpotlight";
import { getCategoryRanking } from "@/features/(ranking)/data";

/*
 * Página de una categoría (/categoria/cervezas, /categoria/gaseosas…):
 * su #1 destacado arriba y "La cola para la cima" con el resto debajo.
 *
 * En Next 16 `params` es una Promesa: hay que esperarla con await antes de
 * leer el slug (el acceso síncrono se eliminó en esta versión).
 */

/** Título de la pestaña: "Cervezas · Estás en la cima" (la plantilla está en el layout raíz) */
export async function generateMetadata({ params }: PageProps<"/categoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ranking = await getCategoryRanking(slug);
  if (!ranking) return {};

  const { category, product } = ranking.leader;
  return {
    title: category.name,
    description: `${product.name} está en la cima como ${category.crownTitle.toLowerCase()}. ¿Quién le quita el trono?`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/categoria/[slug]">) {
  const { slug } = await params;
  const ranking = await getCategoryRanking(slug);

  // Categoría inexistente (/categoria/lo-que-sea): página 404 en vez de un error
  if (!ranking) notFound();

  const { leader, contenders } = ranking;

  return (
    <>
      <div className="mb-10">
        <CimaSpotlight cima={leader} position={1} headingLevel="h1" showRankingLink={false} />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4">
        <h2 className="font-display text-[clamp(28px,5vw,40px)] leading-none font-extrabold tracking-[-0.03em]">
          La cola para la cima
        </h2>
        <span className="rounded-full bg-panel/85 px-2.5 py-1 text-sm font-semibold text-lilac">
          {leader.category.name}
        </span>
      </div>

      {contenders.length > 0 ? (
        // <ol>: es una lista con orden (un ranking), no un montón de cajas sueltas
        <ol className="flex flex-col gap-2.5 pb-8">
          {contenders.map((contender) => (
            <ContenderRow
              key={contender.product.slug}
              contender={contender}
              leaderTotalCents={leader.totalCents}
            />
          ))}
        </ol>
      ) : (
        <p className="pb-8 text-lg font-semibold text-lilac">
          Nadie le compite todavía. ¿Quién se anima a ser el primero en la cola?
        </p>
      )}
    </>
  );
}
