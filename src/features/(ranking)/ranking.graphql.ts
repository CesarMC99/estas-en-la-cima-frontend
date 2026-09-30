import { graphql } from "@/graphql/generated";

/*
 * Consultas del ranking (públicas: no necesitan sesión). Los fragmentos
 * definen qué datos usa cada componente; Codegen genera su tipo y los
 * componentes lo reciben por props, sin tipos escritos a mano.
 */

export const CATEGORY_FIELDS = graphql(`
  fragment CategoryFields on Category {
    id
    slug
    name
    crownTitle
  }
`);

export const PRODUCT_FIELDS = graphql(`
  fragment ProductFields on Product {
    id
    slug
    name
    company
    imageUrl
  }
`);

export const DONOR_COMMENT_FIELDS = graphql(`
  fragment DonorCommentFields on DonorComment {
    id
    username
    rank
    amountCents
    text
    media {
      kind
      url
      durationSeconds
    }
  }
`);

export const CIMA_FIELDS = graphql(`
  fragment CimaFields on Cima {
    category {
      ...CategoryFields
    }
    product {
      ...ProductFields
    }
    totalCents
    rival {
      name
      gapCents
    }
    comments {
      ...DonorCommentFields
    }
  }
`);

export const CONTENDER_FIELDS = graphql(`
  fragment ContenderFields on Contender {
    position
    totalCents
    missingCents
    product {
      ...ProductFields
    }
  }
`);

export const CATEGORIES_QUERY = graphql(`
  query Categories {
    categories {
      ...CategoryFields
    }
  }
`);

export const CIMAS_QUERY = graphql(`
  query Cimas {
    cimas {
      ...CimaFields
    }
  }
`);

export const CATEGORY_RANKING_QUERY = graphql(`
  query CategoryRanking($slug: String!) {
    categoryRanking(slug: $slug) {
      category {
        ...CategoryFields
      }
      leader {
        ...CimaFields
      }
      contenders {
        ...ContenderFields
      }
    }
  }
`);
