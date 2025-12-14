import gql from "graphql-tag";

export const typeDefs = gql`
  # --- ENUMS ---
  enum RiskStatusEnum {
    RESOLVED
    UNRESOLVED
  }

  # --- PAYLOADS ---
  type Risk {
    id: ID!
    name: String!
    description: String!
    status: RiskStatusEnum!
    category: Category!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedRisks {
    items: [Risk!]!
    pageInfo: PageInfo!
  }

  # --- INPUTS ---
  input PaginationInput {
    page: Int
    pageSize: Int
  }

  input RiskFilterInput {
    status: RiskStatusEnum
    categoryId: ID
    q: String
  }

  input CreateRiskInput {
    name: String!
    description: String!
    categoryId: ID!
    status: RiskStatusEnum!
  }

  input UpdateRiskInput {
    name: String
    description: String
    categoryId: ID
    status: RiskStatusEnum
  }

  # --- QUERIES ---
  extend type Query {
    risks(pagination: PaginationInput, filter: RiskFilterInput): PaginatedRisks!
    risk(id: ID!): Risk
  }

  # --- MUTATIONS ---
  extend type Mutation {
    createRisk(input: CreateRiskInput!): Risk!
    updateRisk(id: ID!, input: UpdateRiskInput!): Risk!
    deleteRisk(id: ID!): ID!
  }
`;
