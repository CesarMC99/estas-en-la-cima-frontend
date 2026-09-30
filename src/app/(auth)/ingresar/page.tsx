import type { Metadata } from "next";
import { LoginForm } from "@/features/(auth)/login/LoginForm";
import { getSafeRedirect, REDIRECT_PARAM } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Ingresar" };

/*
 * El destino tras ingresar llega en la URL (?redirigir=/categoria/cervezas).
 * Se lee aquí en el servidor y se valida con getSafeRedirect antes de
 * pasárselo al formulario: nunca se redirige a un sitio externo.
 */
export default async function LoginPage({ searchParams }: PageProps<"/ingresar">) {
  const params = await searchParams;
  const redirect = params[REDIRECT_PARAM];
  return <LoginForm redirectTo={getSafeRedirect(typeof redirect === "string" ? redirect : null)} />;
}
