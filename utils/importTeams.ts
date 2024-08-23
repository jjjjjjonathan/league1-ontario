import fs from 'fs';
import csv from 'csv-parser';
import db from '../src/db';
import { teams, competitionTeams } from '../src/db/schema';

type CSVData = {
  competitionId: number;
  teamId: number;
  name: string;
};

type Team = {
  id: number;
  name: string;
};

type CompetitionTeam = {
  competitionId: number;
  teamId: number;
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

const filePath =
  'CompetitionTeams_b4fd5f7f-2575-4911-99a3-2c464103b4561724434217631.csv';

readCSVFile(filePath)
  .then(async (data) => {
    const mappedTeams = data.map(
      (team): Team => ({
        id: team.teamId,
        name: team.name,
      })
    );

    await db.insert(teams).values(mappedTeams);

    const mappedCompetitionTeams = data.map(
      (competitionTeam): CompetitionTeam => ({
        competitionId: competitionTeam.competitionId,
        teamId: competitionTeam.teamId,
      })
    );

    await db.insert(competitionTeams).values(mappedCompetitionTeams);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
