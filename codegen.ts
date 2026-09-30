import type { CodegenConfig } from "@graphql-codegen/cli";

/*
 * GraphQL Codegen lee el esquema de la API y las consultas que escribimos
 * con graphql(`...`), y genera los tipos exactos de cada una. Así nunca se
 * escriben tipos de la API a mano: si el backend cambia un campo, `pnpm
 * codegen` hace que TypeScript marque en rojo cada lugar afectado.
 *
 * Requiere el backend encendido (lee el esquema desde la API).
 */
const config: CodegenConfig = {
  schema: process.env.GRAPHQL_SCHEMA_URL ?? "http://localhost:3100/graphql",
  documents: ["src/**/*.{ts,tsx}", "!src/graphql/generated/**"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/generated/": {
      // "client": genera la función graphql() tipada que usamos para escribir
      // consultas; cada consulta sale ya con el tipo de su resultado
      preset: "client",
      presetConfig: {
        // Sin "enmascarar" fragmentos: para este proyecto añade complejidad
        // sin beneficio claro
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        // Los enums de GraphQL como uniones de texto ('CONNECTED' | ...)
        enumsAsTypes: true,
        // Las fechas llegan por JSON como texto ISO
        scalars: { DateTime: "string" },
      },
    },
  },
};

export default config;
