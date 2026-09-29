"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/shared/form/TextField";
import { routes } from "@/lib/routes";
import { requestRecoveryCode, toUserMessage } from "../shared/auth-service";
import { FormHeading } from "../shared/FormHeading";
import { FormServerError } from "../shared/FormServerError";
import { SubmitButton } from "../shared/SubmitButton";
import { requestCodeSchema, type RequestCodeValues } from "./password-recovery.schemas";

/** Paso 1: el usuario dice a qué correo o celular le mandamos el código */
export function RequestCodeForm({ onCodeSent }: { onCodeSent: (emailOrPhone: string) => void }) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RequestCodeValues>({
    resolver: zodResolver(requestCodeSchema),
    defaultValues: { emailOrPhone: "" },
  });

  async function onSubmit(values: RequestCodeValues) {
    setServerError(null);
    try {
      /*
       * El backend responderá igual exista o no la cuenta. Si dijera "ese
       * correo no está registrado", cualquiera podría averiguar quién tiene
       * cuenta probando correos: se llama "enumeración de usuarios".
       */
      await requestRecoveryCode(values);
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
        subtitle="Escribe tu correo o celular y te mandamos un código."
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
