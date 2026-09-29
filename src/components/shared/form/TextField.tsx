"use client";

import { useState, type HTMLInputTypeAttribute, type ReactNode } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  /** Pista de autocompletado del navegador ("email", "current-password"…) */
  autoComplete?: string;
  /** Teclado que muestra el celular: "numeric" para códigos, "tel" para teléfonos */
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
  /** Texto fijo antes del campo, como "@" en el usuario o "+51" en el celular */
  prefix?: ReactNode;
  /** Ayuda permanente bajo el campo ("Así te verán en los comentarios…") */
  hint?: string;
  /** "code": campo grande y centrado para el código de 6 dígitos */
  variant?: "default" | "code";
  disabled?: boolean;
}

/**
 * Campo de texto del diseño conectado a react-hook-form.
 *
 * Usa <Controller> para que el formulario controle el valor y los errores:
 * este componente solo sabe DIBUJAR (etiqueta, campo, prefijo, error), y cada
 * formulario decide las reglas con su esquema zod. Así los 5 formularios de
 * acceso comparten el mismo aspecto sin repetir 30 líneas de estilos.
 *
 * Es genérico (<T>) para que `name` solo acepte campos que existen en el
 * formulario: escribir name="corro" daría error de TypeScript.
 */
export function TextField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  prefix,
  hint,
  variant = "default",
  disabled,
}: TextFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorId = `${field.name}-error`;
        const hintId = `${field.name}-hint`;
        const hasError = Boolean(fieldState.error);

        return (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={field.name} className="text-sm font-semibold">
                {label}
              </label>
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-xs font-semibold text-gold hover:text-gold-light"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              )}
            </div>

            {/*
              El borde va en el contenedor y no en el <input> para que el
              prefijo quede DENTRO del recuadro. has-[:focus] pinta el borde
              dorado cuando el input de adentro tiene el foco.
            */}
            <div
              className={`flex items-center rounded-xl border bg-night transition-colors has-[:focus]:border-gold ${hasError ? "border-pink" : "border-mist/22"} ${variant === "code" ? "min-h-16" : "min-h-13"}`}
            >
              {prefix && <span className="shrink-0 pl-3.5 font-semibold">{prefix}</span>}
              <input
                {...field}
                // El valor nunca debe ser undefined: React se quejaría de pasar
                // de "no controlado" a "controlado"
                value={field.value ?? ""}
                id={field.name}
                type={isPassword && showPassword ? "text" : type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode}
                maxLength={maxLength}
                disabled={disabled}
                aria-invalid={hasError}
                // Conecta el campo con su error y su ayuda para los lectores de pantalla
                aria-describedby={[hasError ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined}
                className={
                  "min-w-0 flex-1 bg-transparent px-3.5 outline-none placeholder:text-lilac-faint disabled:opacity-60 " +
                  (variant === "code"
                    ? "text-center font-display text-3xl font-extrabold tracking-[0.4em] text-gold"
                    : "text-base font-medium text-cream")
                }
              />
            </div>

            {hint && !hasError && (
              <span id={hintId} className="text-xs font-medium text-lilac-soft">
                {hint}
              </span>
            )}
            {hasError && (
              <span id={errorId} role="alert" className="text-[13px] font-semibold text-pink">
                {fieldState.error?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
