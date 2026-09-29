interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

/**
 * Botón dorado de envío con estado de carga. Se desactiva mientras se envía
 * para evitar el doble clic que mandaría DOS peticiones (dos cuentas, dos
 * correos de recuperación…).
 */
export function SubmitButton({ isLoading, label, loadingLabel }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      // aria-busy avisa a los lectores de pantalla que está trabajando
      aria-busy={isLoading}
      className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-[14px] bg-gold font-display text-[19px] font-extrabold text-ink transition-colors hover:bg-gold-light disabled:cursor-wait disabled:opacity-80"
    >
      {isLoading && (
        <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
      )}
      {isLoading ? loadingLabel : label}
    </button>
  );
}
