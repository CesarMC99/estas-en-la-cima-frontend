import "server-only";
import type {
  CategoryFieldsFragment,
  CategoryRankingQuery,
  CimaFieldsFragment,
} from "@/graphql/generated/graphql";
import { query } from "@/lib/apollo/server-client";
import { CATEGORIES_QUERY, CATEGORY_RANKING_QUERY, CIMAS_QUERY } from "./ranking.graphql";

/*
 * Punto único de acceso a los datos del ranking desde el servidor. Las
 * páginas llaman a estas funciones y no saben que por dentro es GraphQL.
 *
 * "server-only" hace que el build falle si algún componente del navegador
 * intenta importar este archivo por error.
 */

export async function getCategories(): Promise<CategoryFieldsFragment[]> {
  const { data } = await query({ query: CATEGORIES_QUERY });
  return data?.categories ?? [];
}

/** Los #1 de cada categoría, del que más dinero junta al que menos */
export async function getCimas(): Promise<CimaFieldsFragment[]> {
  const { data } = await query({ query: CIMAS_QUERY });
  return data?.cimas ?? [];
}

/** Ranking completo de una categoría, o null si la categoría no existe */
export async function getCategoryRanking(
  slug: string,
): Promise<CategoryRankingQuery["categoryRanking"]> {
  const { data } = await query({ query: CATEGORY_RANKING_QUERY, variables: { slug } });
  return data?.categoryRanking ?? null;
}
