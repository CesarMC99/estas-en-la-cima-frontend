import { PlayIcon } from "@/components/shared/icons";
import { formatSoles } from "@/lib/money";
import type { DonorComment, DonorMedia, DonorRank } from "../types";
import { ReportButton } from "./ReportButton";

/*
 * Comentario de uno de los 3 mayores donantes de un producto.
 *
 * Tiene dos tamaños porque el diseño los muestra distinto: "featured" en la
 * tarjeta grande del #1 (caja propia, monto grande) y "compact" en las
 * tarjetas chicas (filas separadas por una línea). La información es la misma;
 * solo cambia la presentación, por eso es un solo componente con variante y
 * no dos copias que se desincronizarían.
 */

/** Insignia y colores según el puesto del donante */
const RANK_STYLES: Record<DonorRank, { label: string; badge: string; border: string }> = {
  1: { label: "Mayor donante", badge: "bg-gold", border: "border-gold/45" },
  2: { label: "Donante #2", badge: "bg-cyan", border: "border-mist/10" },
  3: { label: "Donante #3", badge: "bg-orange", border: "border-mist/10" },
};

type Variant = "featured" | "compact";

export function DonorCommentCard({ comment, variant }: { comment: DonorComment; variant: Variant }) {
  const style = RANK_STYLES[comment.rank];
  const isFeatured = variant === "featured";

  const badge = (
    <span
      className={`rounded-md px-[7px] py-[3px] font-bold tracking-[0.05em] text-ink uppercase ${style.badge} ${isFeatured ? "text-[11px]" : "text-[10px]"}`}
    >
      {style.label}
    </span>
  );

  const amount = (
    <span className={`font-display leading-none font-extrabold text-gold ${isFeatured ? "text-[22px]" : "ml-auto text-base"}`}>
      S/ {formatSoles(comment.amountCents)}
    </span>
  );

  return (
    <article
      className={
        isFeatured
          ? `flex gap-3.5 rounded-2xl border bg-ink/60 p-3.5 ${style.border}`
          : "flex gap-3 border-b border-mist/8 py-3"
      }
    >
      {comment.media && <MediaPreview media={comment.media} size={variant} />}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-bold ${isFeatured ? "text-[15px]" : "text-sm"}`}>@{comment.username}</span>
          {badge}
          {/* En la variante compacta el monto va a la derecha de la misma fila */}
          {!isFeatured && amount}
        </div>
        {isFeatured && amount}
        <p className={`leading-[1.45] text-pretty text-comment ${isFeatured ? "text-[15px]" : "text-sm"}`}>
          {comment.text}
        </p>
        <div className="mt-auto">
          <ReportButton />
        </div>
      </div>
    </article>
  );
}

/**
 * Vista previa vertical (formato 9:16, como un TikTok) de la foto o video del
 * mayor donante. TEMPORAL: mientras no subamos archivos reales muestra el
 * relleno a rayas; luego aquí irá el <video> o la <img>.
 */
function MediaPreview({ media, size }: { media: DonorMedia; size: Variant }) {
  const isVideo = media.type === "video";
  const isFeatured = size === "featured";

  const label = isVideo
    ? `${isFeatured ? "video del mayor donante · " : ""}0:${String(media.durationSeconds ?? 0).padStart(2, "0")}`
    : isFeatured
      ? "foto del mayor donante"
      : "foto";

  return (
    <div
      className={`bg-stripes flex aspect-[9/16] shrink-0 flex-col items-center justify-center gap-2 text-center ${isFeatured ? "w-[clamp(96px,22vw,132px)] rounded-xl p-2" : "w-[72px] rounded-[10px] p-1"}`}
    >
      {isVideo && (
        <span
          className={`flex items-center justify-center rounded-full bg-cream/90 text-ink ${isFeatured ? "size-10" : "size-7"}`}
        >
          <PlayIcon className={isFeatured ? "h-4 w-3.5" : "h-3 w-2.5"} />
        </span>
      )}
      <span className={`font-mono leading-[1.35] text-lilac ${isFeatured ? "text-[10px]" : "text-[9px]"}`}>{label}</span>
    </div>
  );
}
