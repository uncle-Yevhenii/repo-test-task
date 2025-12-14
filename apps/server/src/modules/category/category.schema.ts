import gql from "graphql-tag";

export const typeDefs = gql`
  # --- PAYLOADS ---
  type Category {
    id: ID!
    name: String!
    description: String!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
  }

  type PageInfo {
    total: Int!
    page: Int!
    pageSize: Int!
    hasMore: Boolean!
  }

  type PaginatedCategories {
    items: [Category!]!
    pageInfo: PageInfo!
  }

  # --- INPUTS ---
  input PaginationInput {
    page: Int
    pageSize: Int
  }

  input CategoryFilterInput {
    q: String
  }

  input CreateCategoryInput {
    name: String!
    description: String!
  }

  input UpdateCategoryInput {
    name: String
    description: String
  }

  # --- QUERIES ---
  type Query {
    categories(
      pagination: PaginationInput
      filter: CategoryFilterInput
    ): PaginatedCategories!
    category(id: ID!): Category
  }

  # --- MUTATIONS ---
  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): ID!
  }
`;
