import AutoLoad from "@fastify/autoload";
import Fastify, { FastifyInstance } from "fastify";
import { join } from "node:path";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true });

  void app.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: {},
  });

  app.get("/ping", async (request, reply) => {
    return reply.code(200).send({ pong: "it worked!", host: request.host });
  });

  return app;
}

async function start() {
  const server = await buildApp();
  try {
    await server.ready();
    await server.listen({
      port: Number(process.env["SERVER_PORT"]) || 4000,
      host: "0.0.0.0",
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Only start the server if this file is run directly
if (require.main === module) {
  void start();
}
