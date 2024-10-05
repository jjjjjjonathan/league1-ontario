CREATE TABLE IF NOT EXISTS "competitions" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_appearances" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_id" integer NOT NULL,
	"match_date" timestamp NOT NULL,
	"competition_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"player_id" integer NOT NULL,
	"single_yellow" integer NOT NULL,
	"second_yellow" integer NOT NULL,
	"expulsions" integer NOT NULL,
	"goals" integer NOT NULL,
	"own_goals" integer NOT NULL,
	"minutes" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"date_of_birth" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_appearances" ADD CONSTRAINT "player_appearances_competition_id_competitions_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_appearances" ADD CONSTRAINT "player_appearances_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_appearances" ADD CONSTRAINT "player_appearances_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
