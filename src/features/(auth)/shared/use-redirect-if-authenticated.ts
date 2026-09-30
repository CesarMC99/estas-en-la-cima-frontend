"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/providers/SessionProvider";

/**
 * Las pantallas de acceso no tienen sentido con la sesión ya iniciada: si
 * alguien entra a /ingresar estando conectado (o acaba de ingresar), se le
 * manda a su destino. `replace` y no `push`: así "Atrás" no lo devuelve al
 * formulario de login.
 */
export function useRedirectIfAuthenticated(redirectTo: string): void {
  const router = useRouter();
  const { session } = useSession();

  useEffect(() => {
    if (session.status === "authenticated") router.replace(redirectTo);
  }, [session.status, redirectTo, router]);
}
