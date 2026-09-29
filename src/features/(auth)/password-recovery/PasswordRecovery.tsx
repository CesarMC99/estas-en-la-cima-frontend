"use client";

import { useState } from "react";
import { RecoveryDone } from "./RecoveryDone";
import { RequestCodeForm } from "./RequestCodeForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

/*
 * Recuperar contraseña en 3 pasos: pedir código → código + contraseña nueva →
 * listo.
 *
 * Los pasos viven en UNA sola página con estado (y no en 3 URLs) porque el
 * paso 2 necesita saber a qué correo/celular se mandó el código. Pasarlo por
 * la URL (?correo=…) lo dejaría en el historial del navegador y en los
 * registros del servidor: un dato personal no debe viajar ahí.
 */
type RecoveryStep =
  | { name: "request" }
  | { name: "reset"; emailOrPhone: string }
  | { name: "done" };

export function PasswordRecovery() {
  const [step, setStep] = useState<RecoveryStep>({ name: "request" });

  switch (step.name) {
    case "request":
      return <RequestCodeForm onCodeSent={(emailOrPhone) => setStep({ name: "reset", emailOrPhone })} />;
    case "reset":
      return (
        <ResetPasswordForm
          emailOrPhone={step.emailOrPhone}
          onPasswordChanged={() => setStep({ name: "done" })}
          onChangeDestination={() => setStep({ name: "request" })}
        />
      );
    case "done":
      return <RecoveryDone />;
  }
}
