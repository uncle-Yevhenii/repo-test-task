import { CodegenConfig } from "@graphql-codegen/cli";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env.development.local") });

const graphqlUri = process.env.VITE_GRAPHQL_API_URL || "http://localhost:3001";

const config: CodegenConfig = {
  schema: `${graphqlUri}/graphql`,
  documents: ["src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        useTypeImports: true,
        apolloReactHooksImportFrom: "@apollo/client/react",
      },
    },
  },
};

export default config;
