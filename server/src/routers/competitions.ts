import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from '../db';
import { competitions } from '../db/schema';
import { eq } from 'drizzle-orm';

export const competitionsRouter = router({
  competitionList: publicProcedure.query(() => {
    return 'this will be list of competitions';
  }),

  competitionYears: publicProcedure.query(async () => {
    const result = await db
      .selectDistinct({ year: competitions.year })
      .from(competitions);

    return result.map((item) => item.year);
  }),

  competitionsByYear: publicProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: competitions.id,
          name: competitions.name,
        })
        .from(competitions)
        .where(eq(competitions.year, input.year));

      return result;
    }),
});
