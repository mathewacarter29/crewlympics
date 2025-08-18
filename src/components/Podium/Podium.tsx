import type { Team } from "../../api/getTeamData";
import classes from "./Podium.module.css";
import trophy from '../../public/trophy.png'; 

interface PodiumProps {
  // this should be a sorted list of the top 3 teams
  finalists: Team[];
}

const Podium = (props: PodiumProps) => {
  const { finalists } = props;
  return finalists.length === 3 ? (
    <div className={classes.container}>
      <div className={classes.pedestal}>
        <h4>{finalists[1].name}</h4>
        <div className={classes.second}>
          <h3>2</h3>
        </div>
      </div>
      <div className={classes.pedestal}>
        <img src={trophy} alt="trophy-image" style={{width: '50%'}}/>
        <h4 style={{marginTop: '0px'}}>{finalists[0].name}</h4>
        <div className={classes.first}>
          <h3>1</h3>
        </div>
      </div>
      <div className={classes.pedestal}>
        <h4>{finalists[2].name}</h4>
        <div className={classes.third}>
          <h3>3</h3>
        </div>
      </div>
    </div>
  ) : null;
};

export default Podium;
