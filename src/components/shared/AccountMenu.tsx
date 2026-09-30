"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { REDIRECT_PARAM } from "@/lib/safe-redirect";
import { useSession } from "@/providers/SessionProvider";

/** Estilo de "píldora" compartido por el botón Ingresar y el del @usuario */
const PILL =
  "flex min-h-11 items-center rounded-full border border-mist/30 bg-panel px-[18px] text-[15px] font-bold text-cream transition-colors hover:border-gold";

/**
 * Esquina derecha de la cabecera, según la sesión:
 * - cargando: un espacio vacío del mismo tamaño (evita el parpadeo
 *   "Ingresar" → "@usuario" mientras se consulta la cookie).
 * - sin sesión: "Ingresar", recordando la página actual para volver a ella.
 * - con sesión: el @usuario con un menú para cerrar sesión.
 */
export function AccountMenu() {
  const { session, signOut } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cierra el menú al hacer clic fuera o al pulsar Escape
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (session.status === "loading") {
    return <span aria-hidden="true" className="min-h-11 w-28" />;
  }

  if (session.status === "anonymous") {
    return (
      <Link href={`${routes.login}?${REDIRECT_PARAM}=${encodeURIComponent(pathname)}`} className={PILL}>
        Ingresar
      </Link>
    );
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`${PILL} gap-2`}
      >
        <span className="text-gold">@</span>
        {session.account.username}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-56 rounded-2xl border border-mist/14 bg-panel p-2 shadow-[6px_6px_0_var(--color-magenta)]"
        >
          <p className="truncate px-3 py-2 text-xs font-semibold text-lilac-soft">{session.account.email}</p>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-cream hover:bg-mist/8 disabled:opacity-60"
          >
            {signingOut ? "Cerrando sesión…" : "Cerrar sesión"}
          </button>
        </div>
      )}
    </div>
  );
}
