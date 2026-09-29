"use client";

import { useState } from "react";
import { FlagIcon } from "@/components/shared/icons";

/**
 * Botón "Reportar" de cada comentario.
 *
 * TEMPORAL: por ahora solo cambia su aspecto en el navegador. Cuando exista el
 * backend enviará la denuncia con una mutación GraphQL (y pedirá sesión).
 * Está aislado en su propio Client Component para que el comentario completo
 * siga renderizándose en el servidor: solo este botón necesita estado.
 */
export function ReportButton() {
  const [reported, setReported] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={reported}
      onClick={() => setReported((value) => !value)}
      className={
        "flex items-center gap-1.5 self-start py-1 text-xs font-semibold transition-colors " +
        (reported ? "text-pink" : "text-lilac-muted hover:text-cream")
      }
    >
      <FlagIcon className="h-3 w-2.5" />
      {reported ? "Reportado" : "Reportar"}
    </button>
  );
}
