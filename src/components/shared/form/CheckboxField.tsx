"use client";

import type { ReactNode } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  /** Puede llevar enlaces, por eso es ReactNode y no solo texto */
  label: ReactNode;
}

/** Casilla de verificación del diseño (dorada) conectada a react-hook-form */
export function CheckboxField<T extends FieldValues>({ name, control, label }: CheckboxFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-[1.4] text-lilac">
            <input
              type="checkbox"
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              // Un checkbox trabaja con `checked`, no con `value`: por eso no se
              // puede esparcir {...field} como en los campos de texto
              checked={Boolean(field.value)}
              onChange={(event) => field.onChange(event.target.checked)}
              aria-invalid={Boolean(fieldState.error)}
              className="mt-px size-5 shrink-0 accent-gold"
            />
            <span>{label}</span>
          </label>
          {fieldState.error && (
            <span role="alert" className="text-[13px] font-semibold text-pink">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
