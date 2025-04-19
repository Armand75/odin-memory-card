import "./styles/App.css";
import { useEffect, useState } from "react";
import Pokemons from "./components/Pokemon";

function App() {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [choosen, setChoosen] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=16&offset=0"
        );
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  function loadingDiv() {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleChoice(choice) {
    if (choosen.includes(choice)) {
      if (bestScore < score) {
        setBestScore(score);
      }
      setChoosen([]);
      setScore(0);
    } else {
      setChoosen(prev => [...prev, choice]);
      setScore((prev) => prev + 1);
    }

    setPokemons(shuffleArray(pokemons));
  }

  return (
    <div className="pokemon-root">
      <h1>Memory Card</h1>
      <p>Let's test ur brain with pokemons</p>
      <div className="score">
        <p><span>Score: {score}</span><span>Best Score: {bestScore}</span></p>

      </div>
      <hr /> <hr />
      {loading && loadingDiv()}
 
        {!loading && <Pokemons handleChoice={handleChoice} pokemons={pokemons} />}

    </div>
  );
}

export default App;
