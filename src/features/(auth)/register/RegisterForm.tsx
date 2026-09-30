"use client";

import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckboxField } from "@/components/shared/form/CheckboxField";
import { TextField } from "@/components/shared/form/TextField";
import { errorCode, toUserMessage } from "@/lib/api-errors";
import { routes } from "@/lib/routes";
import { REDIRECT_PARAM } from "@/lib/safe-redirect";
import { useSession } from "@/providers/SessionProvider";
import { REGISTER } from "../shared/auth.graphql";
import { FormHeading } from "../shared/FormHeading";
import { FormServerError } from "../shared/FormServerError";
import { SubmitButton } from "../shared/SubmitButton";
import { useRedirectIfAuthenticated } from "../shared/use-redirect-if-authenticated";
import { registerSchema, type RegisterFormInput, type RegisterFormValues } from "./register.schema";

/**
 * "Únete a la mancha": creación de cuenta. La cuenta es obligatoria para
 * donar y comentar, porque cada donación y cada comentario necesitan un
 * dueño (@usuario) visible en el ranking.
 */
export function RegisterForm({ redirectTo }: { redirectTo: string }) {
  const { signIn } = useSession();
  const [register] = useMutation(REGISTER);
  const [serverError, setServerError] = useState<string | null>(null);
  useRedirectIfAuthenticated(redirectTo);

  // useForm<entrada, contexto, salida>: los campos se escriben con el tipo de
  // ENTRADA y onSubmit recibe los datos ya TRANSFORMADOS por zod
  const form = useForm<RegisterFormInput, unknown, RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", phone: "", password: "", acceptTerms: false },
  });

  async function onSubmit({ acceptTerms, ...account }: RegisterFormValues) {
    // acceptTerms solo sirve para validar aquí; al servidor no se envía
    void acceptTerms;
    setServerError(null);
    try {
      const { data } = await register({ variables: { input: account } });
      // La cuenta queda con la sesión iniciada: useRedirectIfAuthenticated
      // lleva a la persona a donde iba
      const session = data?.register;
      if (session) signIn(session);
    } catch (error) {
      // "Ese correo ya existe": el mensaje va DEBAJO del campo que chocó
      const field = conflictField(error);
      if (errorCode(error) === "CONFLICT" && field) {
        form.setError(field, { message: toUserMessage(error) }, { shouldFocus: true });
      } else {
        setServerError(toUserMessage(error));
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <FormHeading title="Únete a la mancha" subtitle="Crea tu cuenta para donar y comentar." />

      <div className="flex flex-col gap-3.5">
        <TextField
          control={form.control}
          name="username"
          label="Usuario"
          prefix={<span className="text-gold">@</span>}
          placeholder="chalaco_de_ley"
          autoComplete="username"
          maxLength={20}
          hint="Así te verán en los comentarios del ranking."
        />
        <TextField
          control={form.control}
          name="email"
          label="Correo"
          type="email"
          inputMode="email"
          placeholder="tu@correo.com"
          autoComplete="email"
        />
        <TextField
          control={form.control}
          name="phone"
          label="Celular"
          type="tel"
          inputMode="tel"
          prefix={<span className="border-r border-mist/22 pr-2.5 text-lilac">+51</span>}
          placeholder="987 654 321"
          autoComplete="tel-national"
          maxLength={11}
        />
        <TextField
          control={form.control}
          name="password"
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
        />
        <CheckboxField
          control={form.control}
          name="acceptTerms"
          label={
            <>
              Acepto los{" "}
              <Link href={routes.terms} className="font-semibold text-gold hover:underline">
                términos
              </Link>{" "}
              y las{" "}
              <Link href={routes.communityRules} className="font-semibold text-gold hover:underline">
                reglas de la comunidad
              </Link>
              .
            </>
          }
        />
      </div>

      <FormServerError message={serverError} />
      <SubmitButton isLoading={form.formState.isSubmitting} label="Crear cuenta" loadingLabel="Creando tu cuenta…" />

      <p className="flex flex-wrap justify-center gap-1.5 text-[15px] text-lilac">
        ¿Ya tienes cuenta?
        <Link
          href={`${routes.login}?${REDIRECT_PARAM}=${encodeURIComponent(redirectTo)}`}
          className="font-bold text-gold hover:text-gold-light"
        >
          Ingresa
        </Link>
      </p>
    </form>
  );
}

/** Campo que ya estaba registrado, según lo que indica la API en el error */
function conflictField(error: unknown): "username" | "email" | "phone" | null {
  if (!CombinedGraphQLErrors.is(error)) return null;
  const field = error.errors[0]?.extensions?.field;
  return field === "username" || field === "email" || field === "phone" ? field : null;
}
