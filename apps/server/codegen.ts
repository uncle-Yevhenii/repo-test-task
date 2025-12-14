import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/modules/**/*.schema.ts",
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../plugins/apollo.plugin#MyContext",
        mappers: {
          Risk: "../models/risk.model#IRiskDocument",
          Category: "../models/category.model#ICategoryDocument",
        },
        useIndexSignature: true,
        enumValues: {
          RiskStatusEnum: "@repo/interfaces#RiskStatusEnum",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
