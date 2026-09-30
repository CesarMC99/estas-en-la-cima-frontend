import { graphql } from "@/graphql/generated";

/*
 * Operaciones de cuenta. graphql() es la función que genera Codegen: por cada
 * consulta de este archivo crea su tipo de resultado y de variables, así que
 * useMutation(LOGIN) ya sabe qué devuelve sin escribir ningún tipo a mano.
 *
 * Después de cambiar algo aquí (o en el backend) hay que correr `pnpm codegen`.
 */

/** Datos de la cuenta que usa la app (cabecera, perfil) */
export const ACCOUNT_FIELDS = graphql(`
  fragment AccountFields on Account {
    id
    username
    email
    phone
    roles
  }
`);

export const SESSION_FIELDS = graphql(`
  fragment SessionFields on AuthPayload {
    accessToken
    accessTokenExpiresIn
    account {
      ...AccountFields
    }
  }
`);

export const LOGIN = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...SessionFields
    }
  }
`);

export const REGISTER = graphql(`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...SessionFields
    }
  }
`);

export const REFRESH_SESSION = graphql(`
  mutation RefreshSession {
    refreshSession {
      ...SessionFields
    }
  }
`);

export const LOGOUT = graphql(`
  mutation Logout {
    logout
  }
`);

export const REQUEST_PASSWORD_RESET = graphql(`
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input)
  }
`);

export const RESET_PASSWORD = graphql(`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`);
