import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from '../db';
import { competitions, teams, competitionTeams } from '../db/schema';
import { eq } from 'drizzle-orm';

export const competitionsRouter = router({
  featuredCompetitions: publicProcedure.query(async () => {
    const result = await db.select().from(competitions);

    return result;
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

  teamsInCompetition: publicProcedure
    .input(z.object({ competitionId: z.number() }))
    .query(async ({ input }) => {
      const result = await db
        .select({
          id: teams.id,
          name: teams.name,
        })
        .from(competitionTeams)
        .innerJoin(teams, eq(teams.id, competitionTeams.teamId))
        .where(eq(competitionTeams.competitionId, input.competitionId));

      return result;
    }),
});
