import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

export default function JokeApp() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState({ "😂": 0, "👍": 0, "❤️": 0 });
  const [userVote, setUserVote] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    const { data } = await axios.get("https://official-joke-api.appspot.com/random_joke");
    setJoke(data);
    setLoading(false);
    setVotes({ "😂": 0, "👍": 0, "❤️": 0 });
    setUserVote(null);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const handleVote = (emoji) => {
    if (userVote) return; // disable re-voting

    setVotes((prevVotes) => ({
      ...prevVotes,
      [emoji]: prevVotes[emoji] + 1,
    }));
    setUserVote(emoji);
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <div className="joke-box">
        <h1 className="setup">{joke.setup}</h1>
        <p className="punchline">{joke.punchline}</p>

        <div className="reactions">
          {Object.keys(votes).map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleVote(emoji)}
              className="emoji-btn"
              disabled={userVote !== null} // blocking buttons after voting
            >
              {emoji} {votes[emoji]}
            </button>
          ))}
        </div>

        <button onClick={fetchJoke} className="next-btn">Next Joke</button>
      </div>
    </div>
  );
}
