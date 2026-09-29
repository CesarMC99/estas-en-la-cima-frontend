import type { Metadata } from "next";
import { RegisterForm } from "@/features/(auth)/register/RegisterForm";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegisterPage() {
  return <RegisterForm />;
}
