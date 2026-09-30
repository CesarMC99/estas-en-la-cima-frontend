import { PlayIcon } from "@/components/shared/icons";
import type { DonorCommentFieldsFragment } from "@/graphql/generated/graphql";
import { formatSoles } from "@/lib/money";
import { ReportButton } from "./ReportButton";

type DonorMedia = NonNullable<DonorCommentFieldsFragment["media"]>;

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
const RANK_STYLES: Record<1 | 2 | 3, { label: string; badge: string; border: string }> = {
  1: { label: "Mayor donante", badge: "bg-gold", border: "border-gold/45" },
  2: { label: "Donante #2", badge: "bg-cyan", border: "border-mist/10" },
  3: { label: "Donante #3", badge: "bg-orange", border: "border-mist/10" },
};

type Variant = "featured" | "compact";

export function DonorCommentCard({ comment, variant }: { comment: DonorCommentFieldsFragment; variant: Variant }) {
  // La API solo manda los puestos 1, 2 y 3; ante cualquier otro valor se usa el estilo del #3
  const style = RANK_STYLES[comment.rank === 1 || comment.rank === 2 ? comment.rank : 3];
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
  const isVideo = media.kind === "VIDEO";
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

/**
 * Mientras nadie comenta: invita a donar. Los 3 mayores donantes de cada #1
 * se ganan un espacio aquí.
 */
export function NoCommentsYet({ productName, compact = false }: { productName: string; compact?: boolean }) {
  return (
    <p
      className={
        compact
          ? "py-3 text-sm text-lilac"
          : "rounded-2xl border border-dashed border-mist/22 p-5 text-[15px] leading-relaxed text-lilac"
      }
    >
      Todavía no hay comentarios. Los 3 mayores donantes de {productName} se ganan un espacio aquí
      {compact ? "." : "; el primero, además, con foto o video."}
    </p>
  );
}
