import { Slider } from "@mui/material";
interface ScoreProps {
  score: number;
}

const Score = (props: ScoreProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <h3 style={{ marginRight: "20px" }}>{props.score}</h3>
      <Slider
        value={props.score}
        sx={{
          "& .MuiSlider-thumb:hover": {
            boxShadow: 0
          },
        }}
      />
    </div>
  );
};

export default Score;
