import "./App.css";
import TeamTracker from "./components/TeamTracker/TeamTracker";
import "./App.css";

function App() {
  return (
    <div style={{ width: "40vw", minWidth: '320px' }}>
      <span style={{whiteSpace: 'nowrap'}}><h1>Crew-lympics</h1></span>
      <TeamTracker />
    </div>
  );
}

export default App;
