import { useEffect, useState } from "react";
import classes from "./TeamTracker.module.css";
import { Grid } from "@mui/material";
import getTeamData from "../../api/getTeamData";
import type { Team } from "../../api/getTeamData";
import Podium from "../Podium/Podium";

const TeamTracker = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const PLACE_GRID_SIZE = 4;
  const TEAM_NAME_GRID_SIZE = 4;
  const TEAM_SCORE_GRID_SIZE = 4;
  useEffect(() => {
    // 1. get team data (name and score)
    let teamsData = getTeamData()
    // 2. sort data by score
    teamsData.sort((a, b) => b.score - a.score);
    setTeams(teamsData);
  }, []);

  return (
    <div>
      <h2>Podium</h2>
      <Podium finalists={teams.slice(0, 3)}/>
      <h2>Crew Rankings</h2>
      <div>
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
                <h3>{team.score}</h3>
              </Grid>
            </Grid>
          );
        })}
      </div>
    </div>
  );
};

export default TeamTracker;
