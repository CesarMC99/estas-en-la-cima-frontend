import type { Metadata } from "next";
import { PasswordRecovery } from "@/features/(auth)/password-recovery/PasswordRecovery";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function RecoverPasswordPage() {
  return <PasswordRecovery />;
}
