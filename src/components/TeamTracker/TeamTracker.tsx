import { useEffect, useState } from "react";
import classes from "./TeamTracker.module.css";
import { Grid } from "@mui/material";
import Score from "../Score/Score";
import getTeamData from "../../api/getTeamData";
import type { Team } from "../../api/getTeamData";

const TeamTracker = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [highestScore, setHighestScore] = useState<number>(1);
  const PLACE_GRID_SIZE = 2;
  const TEAM_NAME_GRID_SIZE = 4;
  const TEAM_SCORE_GRID_SIZE = 6;
  useEffect(() => {
    // 1. get team data (name and score)
    let teamsData = getTeamData()
    // 2. sort data by score
    teamsData.sort((a, b) => b.score - a.score);
    setTeams(teamsData);
    // account for the highest score possibly being 0
    setHighestScore((prevState) => Math.max(prevState, teamsData[0].score));
  }, []);

  // normalize the scores so they cant be greater than 100
  const normalizeScore = (score: number): number => {
    return 90 * (score / highestScore);
  }

  return (
    <div>
      <h2>Crew Rankings</h2>
      <div style={{ width: "500px" }}>
        <Grid container spacing={2}>
          <Grid size={PLACE_GRID_SIZE}>
            <h3>Place</h3>
          </Grid>
          <Grid size={TEAM_NAME_GRID_SIZE}>
            <h3>Team Name</h3>
          </Grid>
          <Grid size={TEAM_SCORE_GRID_SIZE}>
            <h3>Score</h3>
          </Grid>
        </Grid>
        {teams.map((team, index) => {
          let rowColor = "gold";
          switch (index) {
            case 0:
              rowColor = "gold";
              break;
            case 1:
              rowColor = "silver";
              break;
            case 2:
              rowColor = "#CD7F32";
              break;
            default:
              rowColor = "inherit";
              break;
          }
          return (
            <Grid
              container
              spacing={2}
              style={{ backgroundColor: rowColor, marginBottom: "10px" }}
              className={classes.teamRow}
              alignItems={"center"}
              key={index}
            >
              <Grid size={PLACE_GRID_SIZE}>
                <h3>{index + 1}</h3>
              </Grid>
              <Grid size={TEAM_NAME_GRID_SIZE}>
                <h3>{team.name}</h3>
              </Grid>
              <Grid size={TEAM_SCORE_GRID_SIZE}>
                <div style={{ width: "90%" }}>
                  <Score score={team.score} normalizedScore={normalizeScore(team.score)} />
                </div>
              </Grid>
            </Grid>
          );
        })}
      </div>
    </div>
  );
};

export default TeamTracker;
