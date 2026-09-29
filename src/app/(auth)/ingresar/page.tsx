import type { Metadata } from "next";
import { LoginForm } from "@/features/(auth)/login/LoginForm";

export const metadata: Metadata = { title: "Ingresar" };

export default function LoginPage() {
  return <LoginForm />;
}
