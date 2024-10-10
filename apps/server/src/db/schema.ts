import {
  pgTable,
  integer,
  varchar,
  date,
  serial,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const competitions = pgTable('competitions', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  year: integer('year').notNull(),
  minimumU23Minutes: integer('minimum_u23_minutes').notNull().default(0),
  minimumU20Minutes: integer('minimum_u20_minutes').notNull().default(0),
});

export const teams = pgTable('teams', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
});

export const competitionTeams = pgTable('competition_teams', {
  id: serial('id').primaryKey(),
  competitionId: integer('competition_id')
    .notNull()
    .references(() => competitions.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
});

export const players = pgTable('players', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
});

export const playerAppearances = pgTable('player_appearances', {
  id: serial('id').primaryKey(),
  matchId: integer('match_id').notNull(),
  matchDate: date('match_date').notNull(),
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
  played: boolean('played').notNull(),
  starter: boolean('starter').notNull(),
});
