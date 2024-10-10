import fs from 'fs';
import csv from 'csv-parser';
import db from '../src/db';
import { players } from '../src/db/schema';
import { eq } from 'drizzle-orm';

type CSVData = {
  playerId: number;
  name: string;
  dateOfBirth: string;
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

const filePath = 'players.csv';

readCSVFile(filePath)
  .then(async (data) => {
    const mappedPlayers = data.map((player) => ({
      id: player.playerId,
      name: player.name,
      dateOfBirth: player.dateOfBirth,
    }));

    const newPlayerIds = await db
      .insert(players)
      .values(mappedPlayers)
      .onConflictDoNothing({ target: players.id })
      .returning({ id: players.id });

    const playersToUpdate = mappedPlayers.filter(
      (player) =>
        !newPlayerIds.map((newPlayer) => newPlayer.id).includes(player.id)
    );

    const mappedPlayersToUpdate = playersToUpdate.map(async (player) => {
      const updateResult = await db
        .update(players)
        .set({ name: player.name })
        .where(eq(players.id, player.id))
        .returning();
      return updateResult[0];
    });

    const updatedResults = await Promise.all(mappedPlayersToUpdate);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
