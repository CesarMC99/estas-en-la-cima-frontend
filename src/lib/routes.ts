/*
 * Único lugar donde se escriben las URLs de la app. Si una ruta cambia
 * (por ejemplo /categoria/x pasa a /c/x), se cambia aquí y todos los enlaces
 * se actualizan solos, en vez de buscar strings sueltos por el proyecto.
 */
export const routes = {
  home: "/",
  login: "/ingresar",
  category: (slug: string) => `/categoria/${slug}`,
} as const;
