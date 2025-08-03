import { Slider } from "@mui/material";
/**
 * Example function for normalizing score
 * 
  const normalizeScore = (score: number): number => {
    return 90 * (score / highestScore);
  }
 */
interface ScoreProps {
  score: number;
  normalizedScore: () => number;
}

const Score = (props: ScoreProps) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <h3 style={{ marginRight: "20px" }}>{props.score}</h3>
      <Slider
        value={props.normalizedScore()}
        sx={{
          "& .MuiSlider-thumb:hover": {
            boxShadow: "none"
          },
          "& .MuiSlider-thumb.Mui-focusVisible": {
            boxShadow: "none"
          },
          // color: 'red'
        }}
      />
    </div>
  );
};

export default Score;
