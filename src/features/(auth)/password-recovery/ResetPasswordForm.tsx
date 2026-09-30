"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/shared/form/TextField";
import { toUserMessage } from "@/lib/api-errors";
import { REQUEST_PASSWORD_RESET, RESET_PASSWORD } from "../shared/auth.graphql";
import { FormHeading } from "../shared/FormHeading";
import { FormServerError } from "../shared/FormServerError";
import { SubmitButton } from "../shared/SubmitButton";
import { resetPasswordSchema, type ResetPasswordValues } from "./password-recovery.schemas";

interface ResetPasswordFormProps {
  /** El correo o celular que se escribió en el paso 1 */
  emailOrPhone: string;
  onPasswordChanged: () => void;
  /** Volver al paso 1 si se equivocó de correo/celular */
  onChangeDestination: () => void;
}

/** Paso 2: el código de 6 dígitos y la contraseña nueva */
export function ResetPasswordForm({ emailOrPhone, onPasswordChanged, onChangeDestination }: ResetPasswordFormProps) {
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", newPassword: "" },
  });

  async function onSubmit(values: ResetPasswordValues) {
    setServerError(null);
    try {
      await resetPassword({ variables: { input: { emailOrPhone, ...values } } });
      onPasswordChanged();
    } catch (error) {
      setServerError(toUserMessage(error));
    }
  }

  async function resendCode() {
    setServerError(null);
    setResendState("sending");
    try {
      await requestPasswordReset({ variables: { input: { emailOrPhone } } });
      setResendState("sent");
    } catch (error) {
      setResendState("idle");
      setServerError(toUserMessage(error));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <FormHeading
        step="Paso 2 de 3"
        title="Revisa tu correo"
        // El código siempre va al CORREO de la cuenta, aunque se haya escrito
        // el celular (enviar SMS cuesta dinero por mensaje). Y no se afirma que
        // la cuenta exista: "si hay una cuenta…"
        subtitle="Si hay una cuenta con ese dato, te mandamos un código de 6 dígitos al correo registrado. Vence en 10 minutos."
      />

      <div className="flex flex-col gap-3.5">
        <TextField
          control={form.control}
          name="code"
          label="Código"
          variant="code"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          // Permite que el celular ofrezca el código con un toque
          autoComplete="one-time-code"
        />
        <TextField
          control={form.control}
          name="newPassword"
          label="Nueva contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
        />
      </div>

      <FormServerError message={serverError} />
      <SubmitButton isLoading={form.formState.isSubmitting} label="Cambiar contraseña" loadingLabel="Cambiando…" />

      <div className="flex flex-col items-center gap-2 text-[15px] text-lilac">
        <p className="flex flex-wrap justify-center gap-1.5">
          ¿No te llegó? Revisa también spam.
          {resendState === "sent" ? (
            <span className="font-bold text-green">Te lo reenviamos</span>
          ) : (
            <button
              type="button"
              onClick={resendCode}
              disabled={resendState === "sending"}
              className="font-bold text-gold hover:text-gold-light disabled:opacity-60"
            >
              {resendState === "sending" ? "Reenviando…" : "Reenviar código"}
            </button>
          )}
        </p>
        <button type="button" onClick={onChangeDestination} className="text-sm font-semibold text-lilac-soft hover:text-cream">
          Usar otro correo o celular
        </button>
      </div>
    </form>
  );
}
