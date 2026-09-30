import type { Metadata } from "next";
import { RegisterForm } from "@/features/(auth)/register/RegisterForm";
import { getSafeRedirect, REDIRECT_PARAM } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Crear cuenta" };

/** Igual que en /ingresar: el destino tras crear la cuenta viene validado */
export default async function RegisterPage({ searchParams }: PageProps<"/registro">) {
  const params = await searchParams;
  const redirect = params[REDIRECT_PARAM];
  return <RegisterForm redirectTo={getSafeRedirect(typeof redirect === "string" ? redirect : null)} />;
}
