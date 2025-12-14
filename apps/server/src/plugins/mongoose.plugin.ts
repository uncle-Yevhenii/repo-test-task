import { FastifyInstance, FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import fp from "fastify-plugin";
import { models, DbModels } from "@models/all-model";

declare module "fastify" {
  interface FastifyInstance {
    db: DbModels;
  }
}

const dbPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.after();

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(fastify.config.MONGO_DATABASE_URL);

    fastify.log.info("MongoDB connected successfully.");

    fastify.decorate("db", models);
  } catch (err) {
    fastify.log.error(err, "Failed to connect to MongoDB");
    process.exit(1);
  }
};

export default fp(dbPlugin, {
  name: "db_plugin",
  dependencies: ["env_plugin"],
});
