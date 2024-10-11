import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/react-query';
import { createTRPCQueryUtils, createTRPCReact } from '@trpc/react-query';
import { routeTree } from './routeTree.gen';
import type { AppRouter } from '@league1-ontario/server/src';

export const queryClient = new QueryClient();

export const trpc = createTRPCReact<AppRouter>({});

export const trpcClient = trpc.createClient({
  links: [httpBatchLink({ url: 'http://localhost:8080/trpc/' })],
});

export const trpcQueryUtils = createTRPCQueryUtils({
  queryClient,
  client: trpcClient,
});

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: false,
    defaultPendingComponent: () => <p>Loading...</p>,
    Wrap: function WrapComponent({ children }) {
      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      );
    },
    context: { trpcQueryUtils },
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
