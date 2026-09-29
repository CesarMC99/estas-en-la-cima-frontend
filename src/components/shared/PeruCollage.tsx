import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

/*
 * Collage de fotos de la cultura peruana al pie de las páginas: cinco fotos
 * "impresas" (borde crema y sombra de color), un poco giradas y montadas unas
 * sobre otras, todas apoyadas en el borde inferior de la página.
 *
 * Las fotos se guardan en public/cordillera/ con el nombre de `file`. Mientras
 * una foto no exista se muestra una tarjeta de su color con el nombre del
 * tema, así el collage se ve completo desde el primer día.
 *
 * Alto, giro y capa de cada foto están aquí como datos (no repartidos en el
 * JSX) para poder reacomodar el collage tocando una sola tabla. Ninguna foto
 * es más alta que la franja reservada (h-collage): así nunca sobresalen y el
 * contenido de la página no las tapa.
 */
const PHOTOS = [
  {
    file: "cebiche.jpg",
    label: "Cebiche",
    // Tarjeta de respaldo y sombra: cada foto conserva un color del diseño
    color: "bg-magenta",
    shadow: "shadow-[6px_6px_0_var(--color-magenta)]",
    // Alto que crece con la pantalla, entre un mínimo (celular) y un máximo
    height: "h-[clamp(110px,17vw,210px)]",
    tilt: "-rotate-[4deg] z-[1]",
  },
  {
    file: "machu-picchu.jpg",
    label: "Machu Picchu",
    color: "bg-gold",
    shadow: "shadow-[6px_6px_0_var(--color-gold)]",
    // La más alta y la de más arriba: es la protagonista del collage.
    // Su alto ES el de la franja reservada (ver --spacing-collage)
    height: "h-collage",
    tilt: "rotate-[2deg] z-[5]",
  },
  {
    file: "lomo-saltado.jpg",
    label: "Lomo saltado",
    color: "bg-cyan",
    shadow: "shadow-[6px_6px_0_var(--color-cyan)]",
    height: "h-[clamp(100px,15vw,190px)]",
    tilt: "-rotate-[3deg] z-[2]",
  },
  {
    file: "danza-de-tijeras.jpg",
    label: "Danza de tijeras",
    color: "bg-green",
    shadow: "shadow-[6px_6px_0_var(--color-green)]",
    height: "h-[clamp(125px,20vw,240px)]",
    tilt: "rotate-[3deg] z-[4]",
  },
  {
    file: "retablo-ayacuchano.jpg",
    label: "Retablo ayacuchano",
    color: "bg-orange",
    shadow: "shadow-[6px_6px_0_var(--color-orange)]",
    height: "h-[clamp(105px,16vw,200px)]",
    tilt: "-rotate-[2deg] z-[3]",
  },
] as const;

/**
 * ¿Ya se subió la foto? Se revisa el disco en el servidor (este es un Server
 * Component, así que puede usar `fs`). En producción la carpeta public se
 * copia tal cual, por lo que la comprobación sigue siendo válida.
 */
function hasPhoto(file: string): boolean {
  return existsSync(path.join(process.cwd(), "public", "cordillera", file));
}

export function PeruCollage() {
  return (
    // items-end apoya todas las fotos en el piso. El -bottom-6 las hunde 24px
    // bajo el borde de la página: como están giradas, sin eso una esquina
    // quedaría "flotando". La parte que sobra se corta (overflow-hidden del fondo).
    <div className="absolute inset-x-0 -bottom-6 flex h-collage items-end">
      {PHOTOS.map((photo, index) => (
        <div
          key={photo.file}
          // basis-0 + grow: las 5 fotos se reparten el ancho de la pantalla;
          // el margen negativo las monta un poco sobre la anterior
          className={`relative min-w-0 grow basis-0 overflow-hidden border-[6px] border-b-0 border-cream ${index > 0 ? "-ml-[3%]" : ""} ${photo.color} ${photo.shadow} ${photo.height} ${photo.tilt}`}
        >
          {hasPhoto(photo.file) ? (
            <Image
              src={`/cordillera/${photo.file}`}
              // alt vacío: es decoración, el lector de pantalla no debe leerla
              alt=""
              fill
              // Cada foto ocupa ~1/5 del ancho: Next genera una versión de ese
              // tamaño en vez de enviar la foto original enorme
              sizes="25vw"
              // object-cover llena el marco y recorta lo que sobre de la foto
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center p-2 text-center font-display text-[clamp(12px,2vw,22px)] leading-none font-extrabold text-ink">
              {photo.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
