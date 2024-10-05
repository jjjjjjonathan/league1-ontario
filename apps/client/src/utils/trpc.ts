import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@league1-ontario/server/src';

export const trpc = createTRPCReact<AppRouter>();
