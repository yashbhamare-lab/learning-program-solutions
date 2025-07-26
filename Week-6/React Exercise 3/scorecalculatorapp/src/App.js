import logo from './logo.svg';
import './App.css';
import { CalculateScore } from './Components/CalculateScore';

function App() {
  return (
    <div>
      <CalculateScore Name={"Arjun"}
      School={"St. Xavier's"}
      total={284}
      goal={300} />
    </div>
  );
}

export default App;
