import { gql } from '@apollo/client';
import type * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CategoryFilterInput = {
  q?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateRiskInput = {
  categoryId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: RiskStatusEnum;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createRisk: Risk;
  deleteCategory: Scalars['ID']['output'];
  deleteRisk: Scalars['ID']['output'];
  updateCategory: Category;
  updateRisk: Risk;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateRiskArgs = {
  input: CreateRiskInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRiskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateRiskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateRiskInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasMore: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginatedCategories = {
  __typename?: 'PaginatedCategories';
  items: Array<Category>;
  pageInfo: PageInfo;
};

export type PaginatedRisks = {
  __typename?: 'PaginatedRisks';
  items: Array<Risk>;
  pageInfo: PageInfo;
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  categories: PaginatedCategories;
  category?: Maybe<Category>;
  risk?: Maybe<Risk>;
  risks: PaginatedRisks;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRiskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRisksArgs = {
  filter?: InputMaybe<RiskFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type Risk = {
  __typename?: 'Risk';
  category?: Maybe<Category>;
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: RiskStatusEnum;
  updatedAt: Scalars['String']['output'];
};

export type RiskFilterInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RiskStatusEnum>;
};

export enum RiskStatusEnum {
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRiskInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RiskStatusEnum>;
};

export type GetCategoriesQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
  filter?: InputMaybe<CategoryFilterInput>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'PaginatedCategories', items: Array<{ __typename?: 'Category', id: string, name: string, description: string, createdBy: string, createdAt: string, updatedAt: string }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, pageSize: number, hasMore: boolean } } };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string, description: string, createdBy: string } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type GetRisksQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
  filter?: InputMaybe<RiskFilterInput>;
}>;


export type GetRisksQuery = { __typename?: 'Query', risks: { __typename?: 'PaginatedRisks', items: Array<{ __typename?: 'Risk', id: string, name: string, description: string, status: RiskStatusEnum, createdBy: string, category?: { __typename?: 'Category', id: string, name: string } | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, pageSize: number, hasMore: boolean } } };

export type CreateRiskMutationVariables = Exact<{
  input: CreateRiskInput;
}>;


export type CreateRiskMutation = { __typename?: 'Mutation', createRisk: { __typename?: 'Risk', id: string } };

export type UpdateRiskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateRiskInput;
}>;


export type UpdateRiskMutation = { __typename?: 'Mutation', updateRisk: { __typename?: 'Risk', id: string, status: RiskStatusEnum } };

export type DeleteRiskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRiskMutation = { __typename?: 'Mutation', deleteRisk: string };


export const GetCategoriesDocument = gql`
    query GetCategories($pagination: PaginationInput, $filter: CategoryFilterInput) {
  categories(pagination: $pagination, filter: $filter) {
    items {
      id
      name
      description
      createdBy
      createdAt
      updatedAt
    }
    pageInfo {
      total
      page
      pageSize
      hasMore
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
// @ts-ignore
export function useGetCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export function useGetCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetCategoriesQuery | undefined, GetCategoriesQueryVariables>;
export function useGetCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    name
    description
    createdBy
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetRisksDocument = gql`
    query GetRisks($pagination: PaginationInput, $filter: RiskFilterInput) {
  risks(pagination: $pagination, filter: $filter) {
    items {
      id
      name
      description
      status
      createdBy
      category {
        id
        name
      }
    }
    pageInfo {
      total
      page
      pageSize
      hasMore
    }
  }
}
    `;

/**
 * __useGetRisksQuery__
 *
 * To run a query within a React component, call `useGetRisksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRisksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRisksQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetRisksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRisksQuery, GetRisksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRisksQuery, GetRisksQueryVariables>(GetRisksDocument, options);
      }
export function useGetRisksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRisksQuery, GetRisksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRisksQuery, GetRisksQueryVariables>(GetRisksDocument, options);
        }
// @ts-ignore
export function useGetRisksSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetRisksQuery, GetRisksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetRisksQuery, GetRisksQueryVariables>;
export function useGetRisksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetRisksQuery, GetRisksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetRisksQuery | undefined, GetRisksQueryVariables>;
export function useGetRisksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetRisksQuery, GetRisksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetRisksQuery, GetRisksQueryVariables>(GetRisksDocument, options);
        }
export type GetRisksQueryHookResult = ReturnType<typeof useGetRisksQuery>;
export type GetRisksLazyQueryHookResult = ReturnType<typeof useGetRisksLazyQuery>;
export type GetRisksSuspenseQueryHookResult = ReturnType<typeof useGetRisksSuspenseQuery>;
export type GetRisksQueryResult = Apollo.QueryResult<GetRisksQuery, GetRisksQueryVariables>;
export const CreateRiskDocument = gql`
    mutation CreateRisk($input: CreateRiskInput!) {
  createRisk(input: $input) {
    id
  }
}
    `;
export type CreateRiskMutationFn = Apollo.MutationFunction<CreateRiskMutation, CreateRiskMutationVariables>;

/**
 * __useCreateRiskMutation__
 *
 * To run a mutation, you first call `useCreateRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRiskMutation, { data, loading, error }] = useCreateRiskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRiskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRiskMutation, CreateRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateRiskMutation, CreateRiskMutationVariables>(CreateRiskDocument, options);
      }
export type CreateRiskMutationHookResult = ReturnType<typeof useCreateRiskMutation>;
export type CreateRiskMutationResult = Apollo.MutationResult<CreateRiskMutation>;
export type CreateRiskMutationOptions = Apollo.BaseMutationOptions<CreateRiskMutation, CreateRiskMutationVariables>;
export const UpdateRiskDocument = gql`
    mutation UpdateRisk($id: ID!, $input: UpdateRiskInput!) {
  updateRisk(id: $id, input: $input) {
    id
    status
  }
}
    `;
export type UpdateRiskMutationFn = Apollo.MutationFunction<UpdateRiskMutation, UpdateRiskMutationVariables>;

/**
 * __useUpdateRiskMutation__
 *
 * To run a mutation, you first call `useUpdateRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRiskMutation, { data, loading, error }] = useUpdateRiskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRiskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRiskMutation, UpdateRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateRiskMutation, UpdateRiskMutationVariables>(UpdateRiskDocument, options);
      }
export type UpdateRiskMutationHookResult = ReturnType<typeof useUpdateRiskMutation>;
export type UpdateRiskMutationResult = Apollo.MutationResult<UpdateRiskMutation>;
export type UpdateRiskMutationOptions = Apollo.BaseMutationOptions<UpdateRiskMutation, UpdateRiskMutationVariables>;
export const DeleteRiskDocument = gql`
    mutation DeleteRisk($id: ID!) {
  deleteRisk(id: $id)
}
    `;
export type DeleteRiskMutationFn = Apollo.MutationFunction<DeleteRiskMutation, DeleteRiskMutationVariables>;

/**
 * __useDeleteRiskMutation__
 *
 * To run a mutation, you first call `useDeleteRiskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRiskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRiskMutation, { data, loading, error }] = useDeleteRiskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRiskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRiskMutation, DeleteRiskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteRiskMutation, DeleteRiskMutationVariables>(DeleteRiskDocument, options);
      }
export type DeleteRiskMutationHookResult = ReturnType<typeof useDeleteRiskMutation>;
export type DeleteRiskMutationResult = Apollo.MutationResult<DeleteRiskMutation>;
export type DeleteRiskMutationOptions = Apollo.BaseMutationOptions<DeleteRiskMutation, DeleteRiskMutationVariables>;