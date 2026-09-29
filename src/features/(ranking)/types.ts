/*
 * TEMPORAL: tipos de las pantallas mientras no existe el backend.
 * Cuando la API GraphQL esté lista, estos tipos se BORRAN y se usan los que
 * genera Codegen (regla del proyecto: nunca escribir a mano los tipos de una
 * operación GraphQL). Por eso tienen la forma que tendrá la respuesta de la
 * API y no la del HTML del diseño.
 */

export interface Category {
  slug: string;
  /** Nombre corto para la navegación: "Cervezas" */
  name: string;
  /** Título de la corona de su #1: "La mejor cerveza" */
  crownTitle: string;
}

export interface Product {
  slug: string;
  name: string;
  /** La empresa es solo una etiqueta; se rankean productos, no empresas */
  company: string;
  imageUrl: string | null;
}

/** 1 = mayor donante, 2 y 3 = los que le siguen */
export type DonorRank = 1 | 2 | 3;

export interface DonorMedia {
  type: "video" | "photo";
  url: string | null;
  durationSeconds: number | null;
}

export interface DonorComment {
  id: string;
  username: string;
  rank: DonorRank;
  amountCents: number;
  text: string;
  /**
   * Solo el mayor donante (rank 1) puede tener foto o video. Esa regla la
   * aplicará el backend: si un donante baja al puesto 2, la API ya no envía
   * su media. El frontend solo muestra lo que recibe.
   */
  media: DonorMedia | null;
}

/** Un producto que persigue al #1 en la página de su categoría */
export interface Contender {
  position: number;
  product: Product;
  totalCents: number;
  /** Lo que le falta para superar al #1 (su diferencia + S/ 1) */
  missingCents: number;
}

/** Página de una categoría: su líder destacado y la cola que lo persigue */
export interface CategoryRanking {
  leader: CategoryCima;
  contenders: Contender[];
}

/** El #1 de una categoría, tal como se muestra en "Las cimas" */
export interface CategoryCima {
  category: Category;
  product: Product;
  totalCents: number;
  /** El segundo de la categoría y cuánto le falta; null si compite solo */
  rival: { name: string; gapCents: number } | null;
  comments: DonorComment[];
}
