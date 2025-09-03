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
    let teamsData = getTeamData();
    // 2. sort data by score
    teamsData.sort((a, b) => b.score - a.score);
    setTeams(teamsData);
  }, []);

  const getFinalists = (teamsList: Team[]): Team[] =>  {
    if (!teamsList || teamsList.length < 3) {
      return [];
    }
    let results: Team[] = [];
    let currFinalist: Team = JSON.parse(JSON.stringify(teamsList[0]));
    for (let i = 1; i < teamsList.length && results.length < 3; i++) {
      if (currFinalist.score !== teamsList[i].score) {
        results.push(currFinalist);
        currFinalist = JSON.parse(JSON.stringify(teamsList[i]));
      } else {
        currFinalist.name += ', ' + teamsList[i].name;
      }
    }
    return results;
  }

  const getLeaderboard = (allTeams: Team[]): Team[] => {
    if (!allTeams || allTeams.length < 1) {
      return [];
    }
    let results: Team[] = [];
    let currFinalist: Team = JSON.parse(JSON.stringify(allTeams[0]));
    for (let i = 1; i < allTeams.length; i++) {
      if (currFinalist.score !== allTeams[i].score) {
        results.push(currFinalist);
        currFinalist = JSON.parse(JSON.stringify(allTeams[i]));
      } else {
        currFinalist.name += ', ' + allTeams[i].name;
      }
    }
    console.log(results)
    return results;
  }

  return (
    <div>
      <div style={{ marginBottom: "3vw" }}>
        <Podium finalists={getFinalists(teams)} />
      </div>
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
        {getLeaderboard(teams).map((team, index) => {
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
