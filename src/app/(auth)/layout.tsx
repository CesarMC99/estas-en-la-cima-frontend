import Link from "next/link";
import { CrownIcon, LogoMark } from "@/components/shared/icons";
import { AuthBackground } from "@/features/(auth)/shared/AuthBackground";
import { routes } from "@/lib/routes";

/**
 * Marco de las pantallas de acceso (ingresar, registro, recuperar):
 * a la izquierda la marca con su lema, a la derecha la tarjeta del formulario.
 *
 * Cambio respecto al diseño: allí la columna de la marca ocupa toda la
 * pantalla también en celular, y el formulario queda "escondido" debajo.
 * Aquí, en celular, la marca se reduce a un encabezado compacto para que el
 * formulario se vea sin tener que desplazarse.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex min-h-screen flex-wrap overflow-hidden">
      <AuthBackground />

      <section className="relative z-10 flex flex-[1_1_420px] flex-col p-[clamp(20px,5vw,56px)] md:min-h-screen">
        <Link href={routes.home} aria-label="Volver al inicio" className="self-start">
          <LogoMark className="size-11" />
        </Link>

        <div className="flex max-w-[860px] flex-col gap-[clamp(12px,2vw,28px)] pt-6 md:my-auto md:pt-12 md:pb-55">
          <CrownIcon className="h-[clamp(30px,4vw,52px)] w-[clamp(42px,5.5vw,72px)] text-gold" />
          <p className="font-display text-[clamp(44px,7.6vw,136px)] leading-[0.88] font-extrabold tracking-[-0.045em] uppercase">
            Estás en la
            <br />
            <span className="text-gold">cima</span>
          </p>
          <p className="flex flex-col gap-[clamp(6px,1.4vw,22px)] font-display text-[clamp(22px,3.6vw,60px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-balance">
            <span className="text-pink underline decoration-gold decoration-wavy decoration-[3px] underline-offset-8">
              El que pone, manda.
            </span>
            <span>El que no, mira desde abajo.</span>
          </p>
        </div>
      </section>

      <section className="relative z-10 flex flex-[1_1_420px] items-center justify-center px-[clamp(16px,5vw,56px)] pt-2 pb-[clamp(32px,6vw,72px)] md:min-h-screen md:pt-[clamp(32px,6vw,72px)]">
        <div className="w-full max-w-[460px] rounded-3xl bg-panel/92 p-[clamp(24px,4vw,36px)]">{children}</div>
      </section>
    </div>
  );
}
