import type { Category, CategoryCima, Contender } from "./types";

/*
 * TEMPORAL: datos de ejemplo copiados del diseño para construir las pantallas
 * antes que el backend. Se reemplazan por consultas GraphQL más adelante.
 * Los montos están en céntimos (ver lib/money.ts).
 */

export const MOCK_CATEGORIES: Category[] = [
  { slug: "gaseosas", name: "Gaseosas", crownTitle: "La mejor gaseosa" },
  { slug: "cervezas", name: "Cervezas", crownTitle: "La mejor cerveza" },
  { slug: "lacteos", name: "Lácteos", crownTitle: "La mejor leche" },
  { slug: "aguas", name: "Aguas", crownTitle: "La mejor agua" },
];

function category(slug: string): Category {
  const found = MOCK_CATEGORIES.find((c) => c.slug === slug);
  if (!found) throw new Error(`Categoría de ejemplo inexistente: ${slug}`);
  return found;
}

/*
 * Ya vienen ordenadas de más dinero a menos, como las devolverá la API:
 * ordenar es responsabilidad del backend (dueño de los datos), no de la vista.
 */
export const MOCK_CIMAS: CategoryCima[] = [
  {
    category: category("cervezas"),
    product: { slug: "pilsen-callao", name: "Pilsen Callao", company: "Backus", imageUrl: null },
    totalCents: 4_832_000,
    rival: { name: "Cristal", gapCents: 120_000 },
    comments: [
      {
        id: "c1",
        username: "chalaco_de_ley",
        rank: 1,
        amountCents: 650_000,
        text: "Chalaco de corazón. Cristal, ve buscando tu sitio en la tabla, que acá arriba no hay espacio.",
        media: { type: "video", url: null, durationSeconds: 12 },
      },
      {
        id: "c2",
        username: "la_rubia_del_barrio",
        rank: 2,
        amountCents: 320_000,
        text: "Mi viejo tomaba Pilsen, mi abuelo tomaba Pilsen. Tradición es tradición, causa.",
        media: null,
      },
      {
        id: "c3",
        username: "pichanguero99",
        rank: 3,
        amountCents: 145_000,
        text: "Aporté pa’ que no nos pasen. No aflojen que Cristal viene con todo.",
        media: null,
      },
    ],
  },
  {
    category: category("gaseosas"),
    product: { slug: "inca-kola", name: "Inca Kola", company: "Lindley", imageUrl: null },
    totalCents: 4_187_000,
    rival: { name: "Kola Real", gapCents: 345_000 },
    comments: [
      {
        id: "c4",
        username: "amarillo_de_corazon",
        rank: 1,
        amountCents: 520_000,
        text: "Sabor nacional, compadre. Con un cebiche no hay otra.",
        media: { type: "video", url: null, durationSeconds: 12 },
      },
      {
        id: "c5",
        username: "la_tia_del_menu",
        rank: 2,
        amountCents: 210_000,
        text: "En mi menú de S/ 12 va Inca Kola sí o sí.",
        media: null,
      },
      {
        id: "c6",
        username: "kolaboy_2006",
        rank: 3,
        amountCents: 95_000,
        text: "Kola Real, ni lo intentes.",
        media: null,
      },
    ],
  },
  {
    category: category("lacteos"),
    product: { slug: "leche-gloria", name: "Leche Gloria", company: "Gloria", imageUrl: null },
    totalCents: 2_215_000,
    rival: { name: "Laive", gapCents: 89_000 },
    comments: [
      {
        id: "c7",
        username: "tarrito_azul",
        rank: 1,
        amountCents: 300_000,
        text: "El tarrito es patrimonio. Laive, a S/ 890 te quedaste.",
        media: { type: "photo", url: null, durationSeconds: null },
      },
      {
        id: "c8",
        username: "desayuno_con_pan",
        rank: 2,
        amountCents: 130_000,
        text: "Con pan con chicharrón y su lechita. Así se empieza el día.",
        media: null,
      },
      {
        id: "c9",
        username: "mami_de_4",
        rank: 3,
        amountCents: 62_000,
        text: "Crié a cuatro con esta leche. Aquí mi aporte.",
        media: null,
      },
    ],
  },
  {
    category: category("aguas"),
    product: { slug: "san-luis", name: "San Luis", company: "Lindley", imageUrl: null },
    totalCents: 964_000,
    rival: { name: "Cielo", gapCents: 41_000 },
    comments: [
      {
        id: "c10",
        username: "hidratado_pe",
        rank: 1,
        amountCents: 180_000,
        text: "Agua es agua, pero esta es la que está en la cima.",
        media: { type: "video", url: null, durationSeconds: 12 },
      },
      {
        id: "c11",
        username: "runner_miraflores",
        rank: 2,
        amountCents: 70_000,
        text: "Diez kilómetros por el malecón y una San Luis bien helada.",
        media: null,
      },
      {
        id: "c12",
        username: "gym_rat_lima",
        rank: 3,
        amountCents: 35_000,
        text: "Cielo, te faltan S/ 410. Suerte con eso.",
        media: null,
      },
    ],
  },
];

/*
 * Los perseguidores de cada categoría (del #2 hacia abajo), en céntimos.
 * El #1 de cada categoría es el de MOCK_CIMAS.
 */
const MOCK_CONTENDERS: Record<string, [name: string, company: string, totalCents: number][]> = {
  cervezas: [
    ["Cristal", "Backus", 4_712_000],
    ["Cusqueña", "Backus", 3_980_000],
    ["Arequipeña", "Backus", 1_240_000],
    ["Corona", "Backus", 890_000],
    ["San Juan", "Backus", 620_000],
  ],
  gaseosas: [
    ["Kola Real", "AJE", 3_842_000],
    ["Coca-Cola", "Lindley", 3_010_000],
    ["Guaraná", "Backus", 1_430_000],
    ["Concordia", "Backus", 780_000],
    ["Big Cola", "AJE", 540_000],
  ],
  lacteos: [
    ["Laive", "Laive", 2_126_000],
    ["Pura Vida", "Gloria", 1_190_000],
    ["Bella Holandesa", "Gloria", 630_000],
    ["Ideal", "Nestlé", 410_000],
  ],
  aguas: [
    ["Cielo", "AJE", 923_000],
    ["San Mateo", "Backus", 785_000],
    ["Socosani", "Backus", 230_000],
  ],
};

/** "Leche Gloria" → "leche-gloria" (sin tildes ni espacios, apto para URL) */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function mockContenders(categorySlug: string, leaderTotalCents: number): Contender[] {
  return (MOCK_CONTENDERS[categorySlug] ?? []).map(([name, company, totalCents], index) => ({
    // index 0 es el #2: el #1 es el líder
    position: index + 2,
    product: { slug: slugify(name), name, company, imageUrl: null },
    totalCents,
    // Para pasarlo no basta con igualarlo: hace falta S/ 1 más (100 céntimos)
    missingCents: leaderTotalCents - totalCents + 100,
  }));
}
