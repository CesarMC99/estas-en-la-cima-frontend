"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import type { ReactNode } from "react";
import { makeClient } from "@/lib/apollo/make-client";

/**
 * Pone el cliente de Apollo a disposición de los componentes de cliente
 * (useQuery, useMutation). ApolloNextAppProvider (de la integración oficial
 * con Next) crea un cliente por petición en el servidor y uno solo en el
 * navegador, para que los datos de un visitante no se mezclen con los de otro.
 */
export function ApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
