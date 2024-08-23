import {
  pgTable,
  integer,
  varchar,
  date,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';

export const competitions = pgTable('competitions', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
});

export const teams = pgTable('teams', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
});

export const players = pgTable('players', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
});

export const playerAppearances = pgTable('player_appearances', {
  id: serial('id').primaryKey(),
  matchId: integer('match_id').notNull(),
  matchDate: timestamp('match_date').notNull(),
  competitionId: integer('competition_id')
    .notNull()
    .references(() => competitions.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  playerId: integer('player_id')
    .notNull()
    .references(() => players.id),
  singleYellow: integer('single_yellow').notNull(),
  secondYellow: integer('second_yellow').notNull(),
  expulsions: integer('expulsions').notNull(),
  goals: integer('goals').notNull(),
  ownGoals: integer('own_goals').notNull(),
  minutes: integer('minutes').notNull(),
});
