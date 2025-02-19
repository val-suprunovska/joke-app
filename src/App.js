import { JokeProvider } from "./JokeContext";
import JokeApp from "./JokeApp";

function App() {
  return (
    <JokeProvider>
      <JokeApp />
    </JokeProvider>
  );
}

export default App;
