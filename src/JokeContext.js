import { createContext, useContext, useState } from "react";

const JokeContext = createContext();

export function JokeProvider({ children }) {
  const [jokes, setJokes] = useState([]);

  const addJoke = (joke) => {
    setJokes((prevJokes) => {
      if (!prevJokes.find(j => j.id === joke.id)) {
        return [...prevJokes, { ...joke, votes: { "😂": 0, "👍": 0, "❤️": 0 } }];
      }
      return prevJokes;
    });
  };

  const voteJoke = (jokeId, emoji) => {
    setJokes((prevJokes) =>
      prevJokes.map(j =>
        j.id === jokeId
          ? { ...j, votes: { ...j.votes, [emoji]: j.votes[emoji] + 1 } }
          : j
      )
    );
  };

  return (
    <JokeContext.Provider value={{ jokes, addJoke, voteJoke }}>
      {children}
    </JokeContext.Provider>
  );
}

export function useJokes() {
  return useContext(JokeContext);
}
