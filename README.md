# Estás en la cima · Frontend

Ranking peruano donde los fans donan para llevar a su producto favorito al primer lugar de su categoría. *Paga, sube y quédate en la cima… si puedes.*

Este repositorio es el **frontend**. La API está en [estas-en-la-cima-backend](https://github.com/CesarMC99/estas-en-la-cima-backend).

> **Estado:** en desarrollo. Las cuentas y el ranking ya funcionan con datos reales de la API; los pagos todavía no existen y los totales que se ven son de demostración.

## Stack

- **Next.js 16** (App Router, Server Components, React Compiler) + **React 19**
- **TypeScript 7** y **Tailwind CSS 4**
- **Apollo Client 4** + **GraphQL Codegen** (`client-preset`): operaciones tipadas, sin tipos escritos a mano
- **react-hook-form** + **zod** para formularios
- Node 24 y pnpm

## Cómo correrlo

Necesita el backend encendido en `http://localhost:3100`.

```bash
cp .env.example .env.local
pnpm install
pnpm dev          # http://localhost:4100
```

Otros comandos:

```bash
pnpm build        # compilación de producción
pnpm codegen      # regenera los tipos GraphQL (backend encendido)
npx tsc --noEmit  # revisión de tipos
```

## Qué hay construido

| Pantalla | Ruta | Estado |
|---|---|---|
| Las cimas (el #1 de cada categoría) | `/` | ✅ Datos reales |
| Ranking de una categoría | `/categoria/[slug]` | ✅ Datos reales |
| Ingresar | `/ingresar` | ✅ Conectado a la API |
| Crear cuenta | `/registro` | ✅ Conectado a la API |
| Recuperar contraseña (3 pasos) | `/recuperar` | ✅ Conectado a la API |
| Donar | — | ⏳ Pendiente |
| Comentarios, fotos y videos de donantes | — | ⏳ Pendiente |
| Proponer producto y panel de administración | — | ⏳ Pendiente |

## Cómo está organizado

```
src/
├── app/                  Rutas (App Router)
│   ├── (ranking)/        Las cimas y categorías: layout con cabecera, chips y collage
│   └── (auth)/           Ingresar, registro y recuperar: layout propio
├── features/             Lógica y componentes de cada área
│   ├── (ranking)/        Tarjetas del ranking, consultas GraphQL, acceso a datos
│   └── (auth)/           Formularios, esquemas zod, operaciones de cuenta
├── components/shared/    Piezas reutilizables (cabecera, campos de formulario, íconos)
├── providers/            ApolloProvider y SessionProvider
├── lib/                  Cliente Apollo, sesión, rutas, formato de montos
└── graphql/generated/    Tipos generados por Codegen (no editar a mano)
```

## Decisiones técnicas

- **El ranking se renderiza en el servidor** (Server Components con un cliente de Apollo por petición y sin caché): el HTML llega con los datos, bueno para SEO y para celulares.
- **Sesión segura:** el token de acceso vive solo en memoria (nunca en `localStorage`) y la sesión se recupera con una cookie `httpOnly` que JavaScript no puede leer. Si el token vence, Apollo renueva la sesión y reintenta la consulta sin que el usuario lo note.
- **Montos en céntimos enteros** de punta a punta; solo se dividen entre 100 al mostrarlos. El frontend nunca calcula totales.
- **Redirección tras ingresar** (`?redirigir=`) limitada a rutas internas, para evitar redireccionamientos a sitios externos.
- **Responsive sin media queries** en lo posible: `flex-wrap`, grillas `auto-fill` y `clamp()`.
- **Si la API cae**, el ranking muestra una pantalla de error con "Reintentar" en vez de romperse.

## Diseño

El diseño se hizo en Claude Design; la exportación está en `design/` como referencia. Las fotos del collage del pie van en `public/cordillera/` (ver su `LEEME.md`); mientras falten, se muestran tarjetas de color.

## Bitácora

### 29 de septiembre de 2026

- Proyecto creado con Next.js 16 y el diseño pasado a código: paleta, tipografías y fondo decorativo.
- Página **Las cimas** y página de **categoría** con "La cola para la cima", responsive en celular, tablet y escritorio.
- Collage de fotos del Perú al pie de las páginas.
- Pantallas de **ingresar**, **crear cuenta** y **recuperar contraseña** con validación.
- Conexión con la API: Apollo Client 4, Codegen, sesión con cookie, menú de cuenta en la cabecera y cierre de sesión.
- Ranking leyendo datos reales; se eliminaron los datos de ejemplo.
- Actualización a React 19.3, TypeScript 7 y Node 24.
