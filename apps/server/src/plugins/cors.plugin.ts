import fp from "fastify-plugin";
import cors from "@fastify/cors";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  void fastify.register(cors, {
    origin: fastify.config.CLIENT_URL,
    credentials: true,
  });
};

export default fp(plugin, {
  name: "cors_plugin",
  dependencies: ["env_plugin"],
});
