import AutoLoad from "@fastify/autoload";
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server: FastifyInstance = Fastify({ logger: true });

void server.register(AutoLoad, {
  dir: join(__dirname, "plugins"),
  options: {},
});

server.get("/ping", async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ pong: "it worked!", host: request.host });
});

const start = async () => {
  try {
    await server.ready();
    await server.listen({ port: Number(process.env["SERVER_PORT"]) || 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
