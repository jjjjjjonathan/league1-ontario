import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const competitionsRouter = router({
  competitionList: publicProcedure.query(() => {
    return 'this will be list of competitions';
  }),
});
