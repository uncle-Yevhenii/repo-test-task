import fp from "fastify-plugin";
import sensible from "@fastify/sensible";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  void fastify.register(sensible);
};

export default fp(plugin, {
  name: "sensible_plugin",
  dependencies: ["env_plugin"],
});
