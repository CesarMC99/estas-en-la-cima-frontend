import { CimaCard } from "@/features/(ranking)/cimas/CimaCard";
import { CimaSpotlight } from "@/features/(ranking)/components/CimaSpotlight";
import { getCimas } from "@/features/(ranking)/data";

/**
 * Página principal "Las cimas": solo el #1 de cada categoría, ordenados del
 * que más dinero junta al que menos. El primero se destaca con la tarjeta
 * grande; los demás van en una grilla.
 *
 * La página solo compone: los datos llegan listos y ordenados, y cada tarjeta
 * sabe dibujarse sola. Así, cuando cambiemos los datos de ejemplo por la API,
 * solo cambiará la función getCimas() y esta página seguirá igual.
 */
export default async function CimasPage() {
  const cimas = await getCimas();
  const [first, ...rest] = cimas;

  if (!first) {
    return (
      <p className="py-10 text-lg font-semibold text-lilac">
        Todavía nadie llegó a la cima. ¿Serás el primero?
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4">
        <h1 className="font-display text-[clamp(32px,6vw,48px)] leading-none font-extrabold tracking-[-0.03em]">
          Aquí manda el que pone
        </h1>
        <span className="rounded-full bg-panel/85 px-2.5 py-1 text-sm font-semibold text-lilac">
          Los #1 de cada categoría
        </span>
      </div>

      <div className="mb-5">
        <CimaSpotlight cima={first} position={1} headingLevel="h2" showRankingLink />
      </div>

      {/*
        Grilla sin media queries: entran tantas columnas de al menos 300px como
        quepan (1 en celular, 2 en tablet, 3 en escritorio). El min(100%, …)
        evita que en pantallas de menos de 300px la tarjeta se salga del borde.
      */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4 pb-8">
        {rest.map((cima, index) => (
          // index + 2: el primero ya se mostró en la tarjeta grande
          <CimaCard key={cima.category.slug} cima={cima} position={index + 2} />
        ))}
      </div>
    </>
  );
}
