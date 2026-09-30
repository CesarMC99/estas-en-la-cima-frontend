"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/shared/form/TextField";
import { toUserMessage } from "@/lib/api-errors";
import { routes } from "@/lib/routes";
import { REQUEST_PASSWORD_RESET } from "../shared/auth.graphql";
import { FormHeading } from "../shared/FormHeading";
import { FormServerError } from "../shared/FormServerError";
import { SubmitButton } from "../shared/SubmitButton";
import { requestCodeSchema, type RequestCodeValues } from "./password-recovery.schemas";

/** Paso 1: el usuario dice cuál es su cuenta (correo o celular) */
export function RequestCodeForm({ onCodeSent }: { onCodeSent: (emailOrPhone: string) => void }) {
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RequestCodeValues>({
    resolver: zodResolver(requestCodeSchema),
    defaultValues: { emailOrPhone: "" },
  });

  async function onSubmit(values: RequestCodeValues) {
    setServerError(null);
    try {
      /*
       * La API responde igual exista o no la cuenta. Si dijera "ese correo
       * no está registrado", cualquiera podría averiguar quién tiene cuenta
       * probando correos (se llama "enumeración de usuarios").
       */
      await requestPasswordReset({ variables: { input: values } });
      onCodeSent(values.emailOrPhone);
    } catch (error) {
      setServerError(toUserMessage(error));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <FormHeading
        step="Paso 1 de 3"
        title="¿Se te olvidó? Tranqui"
        subtitle="Escribe el correo o celular de tu cuenta y te mandamos un código a tu correo."
      />
      <TextField
        control={form.control}
        name="emailOrPhone"
        label="Correo o celular"
        placeholder="tu@correo.com o 987 654 321"
        autoComplete="username"
      />
      <FormServerError message={serverError} />
      <SubmitButton isLoading={form.formState.isSubmitting} label="Enviar código" loadingLabel="Enviando…" />
      <Link href={routes.login} className="self-center py-1 text-[15px] font-bold text-gold hover:text-gold-light">
        Volver a ingresar
      </Link>
    </form>
  );
}
