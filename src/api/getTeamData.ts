import rawCSVData from "../public/crew-data.csv?raw";

export interface Team {
  name: string;
  score: number;
}

const getTeamData = (): Team[] => {
  // read a csv file
  const lines = rawCSVData.split("\n");
  const dataRaw = lines.map((line) => line.split(","));
  // first line is titles
  // [team name, score, score, score, ...]
  // get team name & total team score
  const teams = dataRaw
    .slice(1)
    .filter((row) => row.length > 2 && row[0] != "")
    .map((row) => {
      const teamName = row[0];
      let teamScore = 0;
      for (let i = 1; i < row.length; i++) {
        if (!isNaN(Number(row[i]))) {
          teamScore += Number(row[i]);
        }
      }
      return { name: teamName, score: teamScore };
    });
  return teams;
};

export default getTeamData;
