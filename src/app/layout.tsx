import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import "./globals.css";

/*
 * Las tres fuentes del diseño. next/font las descarga en el build y las sirve
 * desde nuestro dominio: el navegador no llama a Google (más rápido y sin
 * rastreo) y no hay "salto" de texto al cargar. Cada una expone una variable
 * CSS que globals.css convierte en font-sans / font-display / font-mono.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Estás en la cima",
    // Las páginas internas solo definen su parte: "Cervezas · Estás en la cima"
    template: "%s · Estás en la cima",
  },
  description:
    "El ranking donde los fans ponen plata para llevar a su producto favorito a la cima. Paga, sube y quédate en la cima… si puedes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen font-sans">
        {/* Apollo primero: SessionProvider lo usa para cerrar sesión */}
        <ApolloProvider>
          <SessionProvider>{children}</SessionProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
