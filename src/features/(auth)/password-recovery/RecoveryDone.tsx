import Link from "next/link";
import { CrownIcon } from "@/components/shared/icons";
import { routes } from "@/lib/routes";

/** Paso 3: confirmación de que la contraseña cambió */
export function RecoveryDone() {
  return (
    <div className="flex flex-col gap-5">
      {/* role="status": el lector de pantalla anuncia el éxito al aparecer */}
      <div role="status" className="flex flex-col items-center gap-3.5 py-2 text-center">
        <CrownIcon className="h-12 w-16 text-gold" />
        <span className="text-xs font-bold tracking-[0.08em] text-gold uppercase">Paso 3 de 3</span>
        <h1 className="font-display text-4xl leading-none font-extrabold tracking-[-0.03em]">
          Listo, a seguir subiendo
        </h1>
        <p className="text-[15px] text-lilac">Tu contraseña se cambió. Ya puedes ingresar.</p>
      </div>
      <Link
        href={routes.login}
        className="flex min-h-[54px] items-center justify-center rounded-[14px] bg-gold font-display text-[19px] font-extrabold text-ink transition-colors hover:bg-gold-light"
      >
        Ingresar
      </Link>
    </div>
  );
}
