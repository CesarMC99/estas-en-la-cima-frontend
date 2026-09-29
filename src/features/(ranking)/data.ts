import { MOCK_CATEGORIES, MOCK_CIMAS, mockContenders } from "./mock-data";
import type { Category, CategoryCima, CategoryRanking } from "./types";

/*
 * Punto único de acceso a los datos del ranking. Las páginas llaman a estas
 * funciones y no saben de dónde salen los datos.
 *
 * TEMPORAL: hoy leen los datos de ejemplo. Cuando exista la API, solo cambia
 * el cuerpo de estas funciones (harán la consulta GraphQL) y ninguna página
 * se toca. Ya son `async` por eso: la versión real esperará a la red, y así
 * las páginas se escriben desde ahora con `await`.
 */

export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

/** Los #1 de cada categoría, del que más dinero junta al que menos */
export async function getCimas(): Promise<CategoryCima[]> {
  return MOCK_CIMAS;
}

/** Ranking completo de una categoría, o null si la categoría no existe */
export async function getCategoryRanking(slug: string): Promise<CategoryRanking | null> {
  const leader = MOCK_CIMAS.find((cima) => cima.category.slug === slug);
  if (!leader) return null;

  return { leader, contenders: mockContenders(slug, leader.totalCents) };
}
