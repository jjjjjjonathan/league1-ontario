import fs from 'fs';
import csv from 'csv-parser';
import db from '../src/db';
import { players, playerAppearances } from '../src/db/schema';

type CSVData = {
  competitionId: number;
  matchId: number;
  matchDate: string;
  played: number;
  teamId: number;
  name: string;
  dateOfBirth: string;
  playerId: number;
  singleYellow: number;
  secondYellow: number;
  expulsions: number;
  goals: number;
  ownGoals: number;
  minutes: number;
};

type Player = {
  id: number;
  name: string;
  dateOfBirth: string;
};

type PlayerAppearance = {
  competitionId: number;
  matchId: number;
  matchDate: string;
  played: number;
  teamId: number;
  playerId: number;
  singleYellow: number;
  secondYellow: number;
  expulsions: number;
  goals: number;
  ownGoals: number;
  minutes: number;
};

const readCSVFile = (filePath: string): Promise<CSVData[]> => {
  const results: CSVData[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const filePath = 'reports.competitions.playerAppearances1724271963537.csv';

readCSVFile(filePath)
  .then(async (data) => {
    const mappedPlayers = data.map(
      (player): Player => ({
        id: player.playerId,
        name: player.name,
        dateOfBirth: player.dateOfBirth,
      })
    );

    await db
      .insert(players)
      .values(mappedPlayers)
      .onConflictDoNothing({ target: players.id });

    const mappedPlayerAppearances = data.map(
      (playerAppearance): PlayerAppearance => ({
        competitionId: playerAppearance.competitionId,
        matchId: playerAppearance.matchId,
        matchDate: playerAppearance.matchDate,
        played: playerAppearance.played,
        teamId: playerAppearance.teamId,
        playerId: playerAppearance.playerId,
        singleYellow: playerAppearance.singleYellow,
        secondYellow: playerAppearance.secondYellow,
        expulsions: playerAppearance.expulsions,
        goals: playerAppearance.goals,
        ownGoals: playerAppearance.ownGoals,
        minutes: playerAppearance.minutes,
      })
    );

    const filteredAppearances = mappedPlayerAppearances.filter(
      (playerAppearance) => playerAppearance.played === 1
    );

    await db.insert(playerAppearances).values(mappedPlayerAppearances);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
