/**
 * URL de la API GraphQL.
 *
 * En local el navegador llama directo al backend (localhost:3100). En
 * producción se configurará un "proxy" en el mismo dominio del sitio para que
 * la cookie de sesión no sea de un dominio ajeno (los navegadores bloquean
 * cada vez más esas cookies "de terceros").
 */
export const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:3100/graphql";
