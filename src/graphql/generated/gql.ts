/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment AccountFields on Account {\n    id\n    username\n    email\n    phone\n    roles\n  }\n": typeof types.AccountFieldsFragmentDoc,
    "\n  fragment SessionFields on AuthPayload {\n    accessToken\n    accessTokenExpiresIn\n    account {\n      ...AccountFields\n    }\n  }\n": typeof types.SessionFieldsFragmentDoc,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      ...SessionFields\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      ...SessionFields\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation RefreshSession {\n    refreshSession {\n      ...SessionFields\n    }\n  }\n": typeof types.RefreshSessionDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input)\n  }\n": typeof types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input)\n  }\n": typeof types.ResetPasswordDocument,
    "\n  fragment CategoryFields on Category {\n    id\n    slug\n    name\n    crownTitle\n  }\n": typeof types.CategoryFieldsFragmentDoc,
    "\n  fragment ProductFields on Product {\n    id\n    slug\n    name\n    company\n    imageUrl\n  }\n": typeof types.ProductFieldsFragmentDoc,
    "\n  fragment DonorCommentFields on DonorComment {\n    id\n    username\n    rank\n    amountCents\n    text\n    media {\n      kind\n      url\n      durationSeconds\n    }\n  }\n": typeof types.DonorCommentFieldsFragmentDoc,
    "\n  fragment CimaFields on Cima {\n    category {\n      ...CategoryFields\n    }\n    product {\n      ...ProductFields\n    }\n    totalCents\n    rival {\n      name\n      gapCents\n    }\n    comments {\n      ...DonorCommentFields\n    }\n  }\n": typeof types.CimaFieldsFragmentDoc,
    "\n  fragment ContenderFields on Contender {\n    position\n    totalCents\n    missingCents\n    product {\n      ...ProductFields\n    }\n  }\n": typeof types.ContenderFieldsFragmentDoc,
    "\n  query Categories {\n    categories {\n      ...CategoryFields\n    }\n  }\n": typeof types.CategoriesDocument,
    "\n  query Cimas {\n    cimas {\n      ...CimaFields\n    }\n  }\n": typeof types.CimasDocument,
    "\n  query CategoryRanking($slug: String!) {\n    categoryRanking(slug: $slug) {\n      category {\n        ...CategoryFields\n      }\n      leader {\n        ...CimaFields\n      }\n      contenders {\n        ...ContenderFields\n      }\n    }\n  }\n": typeof types.CategoryRankingDocument,
};
const documents: Documents = {
    "\n  fragment AccountFields on Account {\n    id\n    username\n    email\n    phone\n    roles\n  }\n": types.AccountFieldsFragmentDoc,
    "\n  fragment SessionFields on AuthPayload {\n    accessToken\n    accessTokenExpiresIn\n    account {\n      ...AccountFields\n    }\n  }\n": types.SessionFieldsFragmentDoc,
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      ...SessionFields\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      ...SessionFields\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation RefreshSession {\n    refreshSession {\n      ...SessionFields\n    }\n  }\n": types.RefreshSessionDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input)\n  }\n": types.RequestPasswordResetDocument,
    "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input)\n  }\n": types.ResetPasswordDocument,
    "\n  fragment CategoryFields on Category {\n    id\n    slug\n    name\n    crownTitle\n  }\n": types.CategoryFieldsFragmentDoc,
    "\n  fragment ProductFields on Product {\n    id\n    slug\n    name\n    company\n    imageUrl\n  }\n": types.ProductFieldsFragmentDoc,
    "\n  fragment DonorCommentFields on DonorComment {\n    id\n    username\n    rank\n    amountCents\n    text\n    media {\n      kind\n      url\n      durationSeconds\n    }\n  }\n": types.DonorCommentFieldsFragmentDoc,
    "\n  fragment CimaFields on Cima {\n    category {\n      ...CategoryFields\n    }\n    product {\n      ...ProductFields\n    }\n    totalCents\n    rival {\n      name\n      gapCents\n    }\n    comments {\n      ...DonorCommentFields\n    }\n  }\n": types.CimaFieldsFragmentDoc,
    "\n  fragment ContenderFields on Contender {\n    position\n    totalCents\n    missingCents\n    product {\n      ...ProductFields\n    }\n  }\n": types.ContenderFieldsFragmentDoc,
    "\n  query Categories {\n    categories {\n      ...CategoryFields\n    }\n  }\n": types.CategoriesDocument,
    "\n  query Cimas {\n    cimas {\n      ...CimaFields\n    }\n  }\n": types.CimasDocument,
    "\n  query CategoryRanking($slug: String!) {\n    categoryRanking(slug: $slug) {\n      category {\n        ...CategoryFields\n      }\n      leader {\n        ...CimaFields\n      }\n      contenders {\n        ...ContenderFields\n      }\n    }\n  }\n": types.CategoryRankingDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AccountFields on Account {\n    id\n    username\n    email\n    phone\n    roles\n  }\n"): (typeof documents)["\n  fragment AccountFields on Account {\n    id\n    username\n    email\n    phone\n    roles\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SessionFields on AuthPayload {\n    accessToken\n    accessTokenExpiresIn\n    account {\n      ...AccountFields\n    }\n  }\n"): (typeof documents)["\n  fragment SessionFields on AuthPayload {\n    accessToken\n    accessTokenExpiresIn\n    account {\n      ...AccountFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      ...SessionFields\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      ...SessionFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      ...SessionFields\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input) {\n      ...SessionFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshSession {\n    refreshSession {\n      ...SessionFields\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshSession {\n    refreshSession {\n      ...SessionFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input)\n  }\n"): (typeof documents)["\n  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {\n    requestPasswordReset(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($input: ResetPasswordInput!) {\n    resetPassword(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryFields on Category {\n    id\n    slug\n    name\n    crownTitle\n  }\n"): (typeof documents)["\n  fragment CategoryFields on Category {\n    id\n    slug\n    name\n    crownTitle\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductFields on Product {\n    id\n    slug\n    name\n    company\n    imageUrl\n  }\n"): (typeof documents)["\n  fragment ProductFields on Product {\n    id\n    slug\n    name\n    company\n    imageUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DonorCommentFields on DonorComment {\n    id\n    username\n    rank\n    amountCents\n    text\n    media {\n      kind\n      url\n      durationSeconds\n    }\n  }\n"): (typeof documents)["\n  fragment DonorCommentFields on DonorComment {\n    id\n    username\n    rank\n    amountCents\n    text\n    media {\n      kind\n      url\n      durationSeconds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CimaFields on Cima {\n    category {\n      ...CategoryFields\n    }\n    product {\n      ...ProductFields\n    }\n    totalCents\n    rival {\n      name\n      gapCents\n    }\n    comments {\n      ...DonorCommentFields\n    }\n  }\n"): (typeof documents)["\n  fragment CimaFields on Cima {\n    category {\n      ...CategoryFields\n    }\n    product {\n      ...ProductFields\n    }\n    totalCents\n    rival {\n      name\n      gapCents\n    }\n    comments {\n      ...DonorCommentFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContenderFields on Contender {\n    position\n    totalCents\n    missingCents\n    product {\n      ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  fragment ContenderFields on Contender {\n    position\n    totalCents\n    missingCents\n    product {\n      ...ProductFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories {\n    categories {\n      ...CategoryFields\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n      ...CategoryFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cimas {\n    cimas {\n      ...CimaFields\n    }\n  }\n"): (typeof documents)["\n  query Cimas {\n    cimas {\n      ...CimaFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CategoryRanking($slug: String!) {\n    categoryRanking(slug: $slug) {\n      category {\n        ...CategoryFields\n      }\n      leader {\n        ...CimaFields\n      }\n      contenders {\n        ...ContenderFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query CategoryRanking($slug: String!) {\n    categoryRanking(slug: $slug) {\n      category {\n        ...CategoryFields\n      }\n      leader {\n        ...CimaFields\n      }\n      contenders {\n        ...ContenderFields\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;