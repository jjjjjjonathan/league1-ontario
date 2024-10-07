import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from '../db';
import {
  competitions,
  teams,
  competitionTeams,
  playerAppearances,
  players,
} from '../db/schema';
import { eq, sql } from 'drizzle-orm';

export const competitionsRouter = router({
  featuredCompetitions: publicProcedure.query(async () => {
    return await db.select().from(competitions);
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
          u23Minutes:
            sql<number>`sum(case when ${players.dateOfBirth} > '2001-01-01'::date then ${playerAppearances.minutes} else ${0} end)`.mapWith(
              playerAppearances.minutes
            ),
          u20Minutes:
            sql<number>`sum(case when ${players.dateOfBirth} > '2004-01-01'::date then ${playerAppearances.minutes} else ${0} end)`.mapWith(
              playerAppearances.minutes
            ),
        })
        .from(competitionTeams)
        .innerJoin(teams, eq(teams.id, competitionTeams.teamId))
        .innerJoin(
          playerAppearances,
          eq(playerAppearances.teamId, competitionTeams.teamId)
        )
        .innerJoin(players, eq(players.id, playerAppearances.playerId))
        .where(eq(competitionTeams.competitionId, input.competitionId))
        .groupBy(teams.id);

      return result;
    }),
});
