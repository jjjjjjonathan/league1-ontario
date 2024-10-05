import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import db from '../db';
import { and, countDistinct, desc, eq, gte, sql, sum } from 'drizzle-orm';
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
          minimumU23Minutes: competitions.minimumU23Minutes,
          minimumU20Minutes: competitions.minimumU20Minutes,
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
        )
        .groupBy(
          competitions.minimumU23Minutes,
          competitions.minimumU20Minutes
        );

      return result[0];
    }),

  squadStats: publicProcedure
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
        })
        .from(players)
        .innerJoin(
          playerAppearances,
          eq(players.id, playerAppearances.playerId)
        )
        .where(
          and(
            eq(playerAppearances.teamId, input.teamId),
            eq(playerAppearances.competitionId, input.competitionId),
            gte(playerAppearances.minutes, 1)
          )
        );
      return result[0];
    }),

  playerListByAgeGroup: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        competitionId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const sq = db.$with('sq').as(
        db
          .select({
            id: players.id,
            name: players.name,
            totalMinutes: sql<number>`sum(${playerAppearances.minutes})`
              .mapWith(playerAppearances.minutes)
              .as('total_minutes'),
            isU20: sql<boolean>`case when ${
              players.dateOfBirth
            } >= '2004-01-01'::date then ${true} else ${false} end`.as(
              'is_u20'
            ),
          })
          .from(playerAppearances)
          .innerJoin(players, eq(players.id, playerAppearances.playerId))
          .where(
            and(
              eq(playerAppearances.competitionId, input.competitionId),
              eq(playerAppearances.teamId, input.teamId),
              gte(players.dateOfBirth, '2001-01-01'),
              gte(playerAppearances.minutes, 1)
            )
          )
          .groupBy(players.id)
      );

      const result = await db
        .with(sq)
        .select({
          id: sq.id,
          name: sq.name,
          totalMinutes: sq.totalMinutes,
          isU20: sq.isU20,
        })
        .from(sq)
        .orderBy(desc(sq.totalMinutes));

      return result;
    }),
});
