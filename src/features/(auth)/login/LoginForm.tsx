"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/shared/form/TextField";
import { toUserMessage } from "@/lib/api-errors";
import { routes } from "@/lib/routes";
import { REDIRECT_PARAM } from "@/lib/safe-redirect";
import { useSession } from "@/providers/SessionProvider";
import { LOGIN } from "../shared/auth.graphql";
import { FormHeading } from "../shared/FormHeading";
import { FormServerError } from "../shared/FormServerError";
import { SubmitButton } from "../shared/SubmitButton";
import { useRedirectIfAuthenticated } from "../shared/use-redirect-if-authenticated";
import { loginSchema, type LoginFormValues } from "./login.schema";

/**
 * "Vuelve a la pelea": inicio de sesión con correo o celular.
 *
 * Valida en el navegador con zod (respuesta inmediata) y luego llama a la
 * mutación `login`. Si sale bien, guarda la sesión y el hook
 * useRedirectIfAuthenticated lleva a la persona a donde iba.
 */
export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const { signIn } = useSession();
  const [login] = useMutation(LOGIN);
  const [serverError, setServerError] = useState<string | null>(null);
  useRedirectIfAuthenticated(redirectTo);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    try {
      const { data } = await login({ variables: { input: values } });
      // Con errorPolicy por defecto, si la API falla se salta al catch;
      // aquí la respuesta siempre trae la sesión
      const session = data?.login;
      if (session) signIn(session);
    } catch (error) {
      setServerError(toUserMessage(error));
    }
  }

  // El destino viaja también al registro: si la persona no tenía cuenta y la
  // crea, termina igual donde quería ir
  const registerHref = `${routes.register}?${REDIRECT_PARAM}=${encodeURIComponent(redirectTo)}`;

  return (
    // noValidate: desactiva los globos de error del navegador; los mensajes
    // los pone zod, en español y con el estilo del diseño
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <FormHeading title="Vuelve a la pelea" subtitle="Tu producto no se va a subir solito." />

      <div className="flex flex-col gap-3.5">
        <TextField
          control={form.control}
          name="emailOrPhone"
          label="Correo o celular"
          placeholder="tu@correo.com o 987 654 321"
          autoComplete="username"
        />
        <TextField
          control={form.control}
          name="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <Link
          href={routes.recoverPassword}
          className="self-end py-1 text-sm font-semibold text-gold hover:text-gold-light"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <FormServerError message={serverError} />
      <SubmitButton isLoading={form.formState.isSubmitting} label="Ingresar" loadingLabel="Ingresando…" />

      <p className="flex flex-wrap justify-center gap-1.5 text-[15px] text-lilac">
        ¿Primera vez por acá?
        <Link href={registerHref} className="font-bold text-gold hover:text-gold-light">
          Crea tu cuenta
        </Link>
      </p>
    </form>
  );
}
