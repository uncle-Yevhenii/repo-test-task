import env from "@fastify/env";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { join } from "node:path";

const schema = {
  type: "object",
  required: ["MONGO_DATABASE_URL"],
  properties: {
    NODE_ENV: { type: "string", default: "development" },
    SERVER_PORT: { type: "number", default: 3001 },
    MONGO_DATABASE_URL: { type: "string" },
    CLIENT_URL: { type: "string", default: "http://localhost:5173" },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      NODE_ENV: string;
      SERVER_PORT: number;
      MONGO_DATABASE_URL: string;
      CLIENT_URL: string;
    };
  }
}

const envPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(env, {
    dotenv: {
      path: join(__dirname, "../../.env.development.local"),
    },
    schema: schema,
  });
};

export default fp(envPlugin, { name: "env_plugin" });
