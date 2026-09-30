import Link from "next/link";
import { routes } from "@/lib/routes";
import { AccountMenu } from "./AccountMenu";
import { LogoMark } from "./icons";

/**
 * Cabecera de las páginas del ranking: marca a la izquierda (vuelve al
 * inicio) y la cuenta a la derecha.
 *
 * Sigue siendo un Server Component: solo la parte que depende de la sesión
 * (AccountMenu) es de cliente. Así la marca se envía como HTML ya listo.
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

      <AccountMenu />
    </header>
  );
}
