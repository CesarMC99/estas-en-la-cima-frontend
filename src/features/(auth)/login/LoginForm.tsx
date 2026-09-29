"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/shared/form/TextField";
import { routes } from "@/lib/routes";
import { login, toUserMessage } from "../shared/auth-service";
import { FormHeading } from "../shared/FormHeading";
import { FormServerError } from "../shared/FormServerError";
import { SubmitButton } from "../shared/SubmitButton";
import { loginSchema, type LoginFormValues } from "./login.schema";

/**
 * "Vuelve a la pelea": inicio de sesión con correo o celular.
 *
 * El formulario valida en el navegador con el esquema zod (respuesta
 * inmediata) y luego llama al servicio de cuenta. Si el servidor responde con
 * un error ("contraseña incorrecta"), se muestra arriba del botón.
 */
export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    try {
      await login(values);
      // TEMPORAL: sin backend no hay sesión real; volvemos al inicio.
      // Luego volverá a la página desde donde se pidió iniciar sesión
      router.push(routes.home);
    } catch (error) {
      setServerError(toUserMessage(error));
    }
  }

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
        <Link href={routes.register} className="font-bold text-gold hover:text-gold-light">
          Crea tu cuenta
        </Link>
      </p>
    </form>
  );
}
