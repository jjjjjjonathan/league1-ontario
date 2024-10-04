import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from '../db';
import { and, eq, lte, sql } from 'drizzle-orm';
import { competitions, playerAppearances, players, teams } from '../db/schema';

export const playerAppearancesRouter = router({
  test: publicProcedure.query(async () => {
    const result = await db
      .select({ dateOfBirth: players.dateOfBirth })
      .from(players)
      .limit(1);

    return result;
  }),

  totalYouthMinutes: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        competitionId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const result = await db
        .select({
          u23Minutes: sql<number>`sum(case when ${
            players.dateOfBirth
          } > '2001-01-01'::date then ${
            playerAppearances.minutes
          } else ${0} end)`.mapWith(playerAppearances.minutes),

          u20Minutes: sql<number>`sum(case when ${
            players.dateOfBirth
          } > '2004-01-01'::date then ${
            playerAppearances.minutes
          } else ${0} end)`.mapWith(playerAppearances.minutes),
        })
        .from(playerAppearances)
        .innerJoin(players, eq(players.id, playerAppearances.playerId))
        .innerJoin(
          competitions,
          eq(competitions.id, playerAppearances.competitionId)
        )
        .innerJoin(teams, eq(teams.id, playerAppearances.teamId))
        .where(
          and(
            eq(playerAppearances.teamId, input.teamId),
            eq(playerAppearances.competitionId, input.competitionId)
          )
        );

      return result;
    }),
});
