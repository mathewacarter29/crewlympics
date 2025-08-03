import type { Team } from "../../api/getTeamData";
import classes from './Podium.module.css'

interface PodiumProps {
  // this should be a sorted list of the top 3 teams
  finalists: Team[];
}

const Podium = (props: PodiumProps) => {
  const { finalists } = props;
  return (
    <div className={classes.container}>
      <div className={[classes.second, classes.pedestal].join(" ")}></div>
      <div className={[classes.first, classes.pedestal].join(" ")}></div>
      <div className={[classes.third, classes.pedestal].join(" ")}></div>
    </div>
  );
};

export default Podium;
