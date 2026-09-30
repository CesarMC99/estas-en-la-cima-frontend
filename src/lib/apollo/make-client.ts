import { ApolloLink, CombinedGraphQLErrors, HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { from, switchMap } from "rxjs";
import { GRAPHQL_URL } from "@/lib/graphql-endpoint";
import { getAccessToken } from "@/lib/session/access-token";
import { refreshSession } from "@/lib/session/refresh-session";

/*
 * Cliente de Apollo para el navegador. Cada petición pasa por una cadena de
 * "links", como una línea de montaje:
 *
 *   errorLink → authLink → httpLink
 *
 * 1. authLink agrega el token de acceso a la cabecera.
 * 2. httpLink hace la petición (con cookies: credentials "include").
 * 3. Si la respuesta dice UNAUTHENTICATED y habíamos enviado un token,
 *    errorLink renueva la sesión con la cookie y REINTENTA la consulta una
 *    vez. Para el usuario es invisible: su token venció a los 15 min, pero
 *    la página sigue funcionando.
 */

const authLink = new SetContextLink((prevContext) => {
  const token = getAccessToken();
  if (!token) return {};
  return {
    headers: { ...prevContext.headers, authorization: `Bearer ${token}` },
  };
});

const refreshOnExpiredLink = new ErrorLink(({ error, operation, forward }) => {
  const isUnauthenticated =
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((e) => e.extensions?.code === "UNAUTHENTICATED");

  // Solo si la consulta llevaba token: un login con clave incorrecta también
  // responde UNAUTHENTICATED y ahí NO hay que renovar ni reintentar
  const sentToken = Boolean(operation.getContext().headers?.authorization);
  const alreadyRetried = operation.getContext().retriedAfterRefresh === true;
  if (!isUnauthenticated || !sentToken || alreadyRetried) return;

  // from(promesa) → Observable: Apollo 4 trabaja con Observables de rxjs
  return from(refreshSession()).pipe(
    switchMap(() => {
      operation.setContext({ retriedAfterRefresh: true });
      return forward(operation);
    }),
  );
});

export function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    // Envía y recibe la cookie de sesión aunque la API esté en otro puerto
    credentials: "include",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([refreshOnExpiredLink, authLink, httpLink]),
  });
}
