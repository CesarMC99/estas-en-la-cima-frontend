"use client";

import { useApolloClient } from "@apollo/client/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOGOUT } from "@/features/(auth)/shared/auth.graphql";
import type { AccountFieldsFragment, SessionFieldsFragment } from "@/graphql/generated/graphql";
import { setAccessToken } from "@/lib/session/access-token";
import { refreshSession } from "@/lib/session/refresh-session";

/*
 * Estado de la sesión para toda la app: ¿quién está conectado?
 *
 * "loading" existe porque al abrir la página todavía no sabemos si hay sesión:
 * hay que preguntarle al backend con la cookie. Mientras tanto la cabecera no
 * muestra ni "Ingresar" ni el @usuario, para no parpadear entre uno y otro.
 */
type SessionState =
  | { status: "loading"; account: null }
  | { status: "anonymous"; account: null }
  | { status: "authenticated"; account: AccountFieldsFragment };

interface SessionContextValue {
  session: SessionState;
  /** Guarda la sesión que devolvió login, register o refresh */
  signIn: (session: SessionFieldsFragment) => void;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const client = useApolloClient();
  const [session, setSession] = useState<SessionState>({ status: "loading", account: null });

  const signIn = useCallback((result: SessionFieldsFragment) => {
    setAccessToken(result.accessToken);
    setSession({ status: "authenticated", account: result.account });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await client.mutate({ mutation: LOGOUT });
    } finally {
      // Aunque la API falle, en este navegador la sesión se cierra igual
      setAccessToken(null);
      setSession({ status: "anonymous", account: null });
      // Borra de la caché los datos privados de la cuenta que salió
      await client.clearStore();
    }
  }, [client]);

  // Al abrir la app: ¿hay una cookie de sesión válida? Si la hay, se recupera
  useEffect(() => {
    let cancelled = false;
    void refreshSession().then((restored) => {
      if (cancelled) return;
      setSession(
        restored
          ? { status: "authenticated", account: restored.account }
          : { status: "anonymous", account: null },
      );
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ session, signIn, signOut }), [session, signIn, signOut]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/** Acceso a la sesión desde cualquier componente de cliente */
export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession() debe usarse dentro de <SessionProvider>");
  return context;
}
