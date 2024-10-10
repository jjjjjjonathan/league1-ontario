import fastify from 'fastify';
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { createContext } from './context';
import { competitionsRouter } from './routers/competitions';
import { playerAppearancesRouter } from './routers/playerApperances';
import { teamsRouter } from './routers/teams';
import { router } from './trpc';
import cors from '@fastify/cors';

const appRouter = router({
  competitions: competitionsRouter,
  teams: teamsRouter,
  playerAppearances: playerAppearancesRouter,
});

export type AppRouter = typeof appRouter;

const server = fastify();

server.register(cors, {
  origin: 'http://localhost:3001',
});

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
