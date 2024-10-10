import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from '../db';
import {
  competitions,
  playerAppearances,
  players,
  teams,
  competitionTeams,
} from '../db/schema';
import { countDistinct, sql, and, eq, gte } from 'drizzle-orm';

export const teamsRouter = router({
  getTeamInfo: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        competitionId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const result = await db
        .select({
          teamName: teams.name,
          competitionName: competitions.name,
        })
        .from(competitionTeams)
        .innerJoin(teams, eq(teams.id, competitionTeams.teamId))
        .innerJoin(
          competitions,
          eq(competitions.id, competitionTeams.competitionId)
        )
        .where(
          and(
            eq(teams.id, input.teamId),
            eq(competitions.id, input.competitionId)
          )
        );

      return result[0];
    }),

  getSquadOverview: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        competitionId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const result = await db
        .select({
          squadSize: countDistinct(playerAppearances.playerId),
          averageAge:
            sql<number>`ROUND(CAST(avg(date_part('year', age(${players.dateOfBirth}))) AS numeric), 1)`.mapWith(
              Number
            ),
          averageAgeByMinute:
            sql<number>`ROUND(CAST(sum(date_part('year', age(${players.dateOfBirth})) * ${playerAppearances.minutes}) / sum(${playerAppearances.minutes}) AS numeric), 1)`.mapWith(
              Number
            ),
          u23SquadSize:
            sql<number>`count(distinct ${playerAppearances.playerId}) FILTER (WHERE ${players.dateOfBirth} >= '2001-01-01'::date AND ${players.dateOfBirth} < '2004-01-01'::date)`.mapWith(
              Number
            ),
          u20SquadSize:
            sql<number>`count(distinct ${playerAppearances.playerId}) FILTER (WHERE ${players.dateOfBirth} >= '2004-01-01'::date)`.mapWith(
              Number
            ),
          seniorSquadSize:
            sql<number>`count(distinct ${playerAppearances.playerId}) FILTER (WHERE ${players.dateOfBirth} < '2001-01-01'::date)`.mapWith(
              Number
            ),
          averageAgeByU23Minutes: sql<number>`round(cast(sum(case when ${
            players.dateOfBirth
          } > '2001-01-01'::date then date_part('year', age(${players.dateOfBirth})) * ${playerAppearances.minutes} else ${0} end) / sum(case when ${
            players.dateOfBirth
          } > '2001-01-01'::date then ${
            playerAppearances.minutes
          } else ${0} end) as numeric), 1)`.mapWith(Number),

          averageAgeByU20Minutes: sql<number>`round(cast(sum(case when ${
            players.dateOfBirth
          } > '2004-01-01'::date then date_part('year', age(${players.dateOfBirth})) * ${playerAppearances.minutes} else ${0} end) / sum(case when ${
            players.dateOfBirth
          } > '2004-01-01'::date then ${
            playerAppearances.minutes
          } else ${0} end) as numeric), 1)`.mapWith(Number),

          averageSqaudAgeNoU23: sql<number>`round(cast(AVG(date_part('year', age(${players.dateOfBirth}))) FILTER (WHERE ${players.dateOfBirth} <= '2001-01-01'::date)as numeric), 1)`,

          averageSqaudAgeNoU20: sql<number>`round(cast(AVG(date_part('year', age(${players.dateOfBirth}))) FILTER (WHERE ${players.dateOfBirth} <= '2004-01-01'::date)as numeric), 1)`,

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

          minimumU23Minutes: competitions.minimumU23Minutes,

          minimumU20Minutes: competitions.minimumU20Minutes,
        })
        .from(players)
        .innerJoin(
          playerAppearances,
          eq(players.id, playerAppearances.playerId)
        )
        .innerJoin(
          competitions,
          eq(competitions.id, playerAppearances.competitionId)
        )
        .where(
          and(
            eq(playerAppearances.teamId, input.teamId),
            eq(playerAppearances.competitionId, input.competitionId),
            gte(playerAppearances.minutes, 1)
          )
        )
        .groupBy(
          competitions.minimumU23Minutes,
          competitions.minimumU20Minutes
        );
      return result[0];
    }),

  getMinutesByMatch: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        competitionId: z.number(),
        youthCutoff: z.string().date(),
      })
    )
    .query(async ({ input }) => {
      const result = await db
        .select({
          date: playerAppearances.matchDate,
          totalMinutes:
            sql<number>`sum(case when ${players.dateOfBirth} >= ${input.youthCutoff} then ${playerAppearances.minutes} else ${0} end)`.mapWith(
              playerAppearances.minutes
            ),
        })
        .from(playerAppearances)
        .innerJoin(players, eq(players.id, playerAppearances.playerId))
        .where(
          and(
            eq(playerAppearances.teamId, input.teamId),
            eq(playerAppearances.competitionId, input.competitionId)
          )
        )
        .groupBy(playerAppearances.matchDate)
        .orderBy(playerAppearances.matchDate);

      return result;
    }),
});
