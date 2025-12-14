import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "node:path";

const typeDefs = loadFilesSync([
  path.join(process.cwd(), "src/modules/**/*.schema.ts"),
]);

const resolvers = loadFilesSync(
  path.join(process.cwd(), "src/modules/**/*.resolver.ts")
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
