import fastify from 'fastify';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { createContext } from './context';
import { competitionsRouter } from './routers/competitions';
import { router } from './trpc';

const appRouter = router({
  competitions: competitionsRouter,
});

type AppRouter = typeof appRouter;

const server = fastify();

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

server.get('/', async (request, reply) => {
  return 'Hello world';
});

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
