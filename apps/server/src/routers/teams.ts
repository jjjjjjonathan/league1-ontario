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
import { countDistinct, sql, and, eq, gte, desc } from 'drizzle-orm';

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
          minimumU23Minutes: competitions.minimumU23Minutes,
          minimumU20Minutes: competitions.minimumU20Minutes,
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
            sql<number>`count(distinct ${playerAppearances.playerId}) FILTER (WHERE ${players.dateOfBirth} >= ${competitions.referenceDate}::date - INTERVAL '23 years' AND ${players.dateOfBirth} < ${competitions.referenceDate}::date - INTERVAL '20 years')`.mapWith(
              Number
            ),
          u20SquadSize:
            sql<number>`count(distinct ${playerAppearances.playerId}) FILTER (WHERE ${players.dateOfBirth} >= ${competitions.referenceDate}::date - INTERVAL '20 years')`.mapWith(
              Number
            ),
          seniorSquadSize:
            sql<number>`count(distinct ${playerAppearances.playerId}) FILTER (WHERE ${players.dateOfBirth} < ${competitions.referenceDate}::date - INTERVAL '23 years')`.mapWith(
              Number
            ),
          averageAgeByU23Minutes: sql<number>`round(cast(sum(case when ${
            players.dateOfBirth
          } > ${competitions.referenceDate}::date - INTERVAL '23 years' then date_part('year', age(${players.dateOfBirth})) * ${playerAppearances.minutes} else ${0} end) / sum(case when ${
            players.dateOfBirth
          } > ${competitions.referenceDate}::date - INTERVAL '23 years' then ${
            playerAppearances.minutes
          } else ${0} end) as numeric), 1)`.mapWith(Number),

          averageAgeByU20Minutes: sql<number>`round(cast(sum(case when ${
            players.dateOfBirth
          } > ${competitions.referenceDate}::date - INTERVAL '20 years' then date_part('year', age(${players.dateOfBirth})) * ${playerAppearances.minutes} else ${0} end) / sum(case when ${
            players.dateOfBirth
          } > ${competitions.referenceDate}::date - INTERVAL '20 years' then ${
            playerAppearances.minutes
          } else ${0} end) as numeric), 1)`.mapWith(Number),

          averageSqaudAgeNoU23: sql<number>`round(cast(AVG(date_part('year', age(${players.dateOfBirth}))) FILTER (WHERE ${players.dateOfBirth} <= ${competitions.referenceDate}::date - INTERVAL '23 years')as numeric), 1)`,

          averageSqaudAgeNoU20: sql<number>`round(cast(AVG(date_part('year', age(${players.dateOfBirth}))) FILTER (WHERE ${players.dateOfBirth} <= ${competitions.referenceDate}::date - INTERVAL '20 years')as numeric), 1)`,

          u23Minutes: sql<number>`sum(case when ${
            players.dateOfBirth
          } > ${competitions.referenceDate}::date - INTERVAL '23 years' then ${
            playerAppearances.minutes
          } else ${0} end)`.mapWith(playerAppearances.minutes),

          u20Minutes: sql<number>`sum(case when ${
            players.dateOfBirth
          } > ${competitions.referenceDate}::date - INTERVAL '20 years' then ${
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

  getAgeGroupOverview: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        competitionId: z.number(),
        youthCutoff: z.number(),
      })
    )
    .query(async ({ input }) => {
      const minutesSq = db.$with('sq').as(
        db
          .select({
            date: playerAppearances.matchDate,
            totalMinutes:
              sql<number>`sum(case when ${players.dateOfBirth} >= ${competitions.referenceDate}::date - INTERVAL ${sql.raw(`'${input.youthCutoff} years'`)} then ${playerAppearances.minutes} else ${0} end)`
                .mapWith(playerAppearances.minutes)
                .as('total_minutes'),
          })
          .from(playerAppearances)
          .innerJoin(players, eq(players.id, playerAppearances.playerId))
          .innerJoin(
            competitions,
            eq(competitions.id, playerAppearances.competitionId)
          )
          .where(
            and(
              eq(playerAppearances.teamId, input.teamId),
              eq(playerAppearances.competitionId, input.competitionId)
            )
          )
          .groupBy(playerAppearances.matchDate)
          .orderBy(playerAppearances.matchDate)
      );

      const minutesQuery = db
        .with(minutesSq)
        .select({
          date: minutesSq.date,
          minutes: minutesSq.totalMinutes,
          runningTotalMinutes:
            sql<number>`sum(${minutesSq.totalMinutes}) OVER (ORDER BY ${minutesSq.date})`.mapWith(
              playerAppearances.minutes
            ),
        })
        .from(minutesSq);

      const playersQuery = db
        .select({
          id: players.id,
          name: players.name,
          totalMinutes: sql<number>`sum(${playerAppearances.minutes})`
            .mapWith(playerAppearances.minutes)
            .as('total_minutes'),
        })
        .from(playerAppearances)
        .innerJoin(players, eq(players.id, playerAppearances.playerId))
        .innerJoin(
          competitions,
          eq(competitions.id, playerAppearances.competitionId)
        )
        .where(
          and(
            eq(playerAppearances.competitionId, input.competitionId),
            eq(playerAppearances.teamId, input.teamId),
            gte(
              players.dateOfBirth,
              sql`${competitions.referenceDate}::date - INTERVAL ${sql.raw(`'${input.youthCutoff} years'`)}`
            ),
            gte(playerAppearances.minutes, 1)
          )
        )
        .groupBy(players.id)
        .orderBy(sql`total_minutes DESC`);

      const minimumMinutesQuery = db
        .select({
          minimumU20Minutes: competitions.minimumU20Minutes,
          minimumU23Minutes: competitions.minimumU23Minutes,
        })
        .from(competitions)
        .where(eq(competitions.id, input.competitionId));

      const [minutes, playerList, minimumMinutes] = await Promise.all([
        minutesQuery,
        playersQuery,
        minimumMinutesQuery,
      ]);

      const minimumU20Minutes = minimumMinutes[0].minimumU20Minutes;

      const minimumU23Minutes = minimumMinutes[0].minimumU23Minutes;

      return { minutes, playerList, minimumU20Minutes, minimumU23Minutes };
    }),
});
