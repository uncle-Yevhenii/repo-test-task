import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { ApolloServer, BaseContext } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
  // fastifyApolloHandler,
} from "@as-integrations/fastify";
import { schema } from "@graphql/schema";
import { createLoaders, Loaders } from "@graphql/dataloader";
import { DbModels } from "@models/all-model";

export interface MyContext extends BaseContext {
  db: DbModels;
  user: { username: string | null };
  loaders: Loaders;
}

const plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const apolo = new ApolloServer<MyContext>({
    schema,
    plugins: [
      fastifyApolloDrainPlugin(fastify),
      {
        async requestDidStart() {
          return {
            async didEncounterErrors(ctx) {
              fastify.log.error(ctx.errors, "GraphQL Error!");
            },
          };
        },
      },
    ],
    formatError(error) {
      return {
        message: error.message,
        code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
        path: error.path,
      };
    },
  });

  await apolo.start();

  await fastify.register(fastifyApollo(apolo), {
    context: async (request) => {
      const username =
        (request.headers["x-user-name"] as string) || "Anonymous";

      return {
        db: fastify.db,
        user: { username },
        loaders: createLoaders(),
      };
    },
  });
};

export default fp(plugin, {
  name: "apollo_plugin",
  dependencies: ["env_plugin", "db_plugin"],
});
