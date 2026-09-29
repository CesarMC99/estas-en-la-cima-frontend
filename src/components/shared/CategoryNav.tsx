"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

interface CategoryNavProps {
  categories: { slug: string; name: string }[];
}

/**
 * Chips de navegación: "Las cimas" + una por categoría.
 *
 * Es Client Component solo por usePathname(): necesita saber en qué URL está
 * el usuario para pintar de dorado el chip activo. Se mantiene pequeño a
 * propósito: la cabecera y el resto de la página siguen siendo de servidor.
 *
 * Son <Link> y no botones (a diferencia del prototipo): cada categoría es una
 * página propia con su URL, que se puede compartir y abrir en otra pestaña.
 */
export function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  const items = [
    { href: routes.home, label: "Las cimas" },
    ...categories.map((c) => ({ href: routes.category(c.slug), label: c.name })),
  ];

  return (
    <nav
      aria-label="Categorías"
      // En celular las chips no caben: se desplazan de lado sin mostrar la barra
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-5 [scrollbar-width:none]"
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={
              "flex min-h-11 shrink-0 items-center rounded-full border px-[18px] text-[15px] font-semibold transition-colors " +
              (isActive
                ? "border-gold bg-gold text-ink"
                : "border-mist/30 bg-night/75 text-cream hover:border-gold")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
