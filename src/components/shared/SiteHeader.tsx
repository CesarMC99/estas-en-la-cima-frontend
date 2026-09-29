import Link from "next/link";
import { routes } from "@/lib/routes";
import { LogoMark } from "./icons";

/**
 * Cabecera de las páginas del ranking: marca a la izquierda (vuelve al
 * inicio) y acceso a la cuenta a la derecha. Es un Server Component: no tiene
 * estado ni eventos, así que no envía JavaScript al navegador.
 */
export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pt-5 pb-4">
      <Link href={routes.home} className="flex items-center gap-3 text-cream">
        <LogoMark className="size-11 shrink-0" />
        <span className="flex flex-col gap-0.5">
          <span className="font-display text-2xl leading-none font-extrabold tracking-tight">
            Estás en la cima
          </span>
          <span className="text-[13px] font-semibold text-lilac">
            Paga, sube y quédate en la cima… si puedes.
          </span>
        </span>
      </Link>

      <Link
        href={routes.login}
        className="flex min-h-11 items-center rounded-full border border-mist/30 bg-panel px-[18px] text-[15px] font-bold text-cream transition-colors hover:border-gold"
      >
        Ingresar
      </Link>
    </header>
  );
}
