import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { GRAPHQL_URL } from "@/lib/graphql-endpoint";

/*
 * Cliente de Apollo para Server Components (páginas que se arman en el
 * servidor). registerApolloClient crea UNO POR PETICIÓN: los datos de un
 * visitante nunca se mezclan con los de otro.
 *
 * Solo para datos PÚBLICOS (el ranking): en el servidor no existe el token
 * de la sesión, que vive en la memoria del navegador.
 */
export const { query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_URL,
      // Sin caché: el ranking cambia con cada donación y debe verse al día
      fetchOptions: { cache: "no-store" },
    }),
  });
});
