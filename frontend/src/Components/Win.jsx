import { Link, useLocation, useNavigate } from "react-router-dom";
import win from "../resources/pic/Win.jpg";

function Won({ goBack }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { ownPokemon, enemyPokemon } = location.state;

  function findXPBasedOnLevel() {
    const level = enemyPokemon.level;
    const levelsArray = enemyPokemon.levels;
    for (let i = 0; i < levelsArray.length; i++) {
      if (levelsArray[i].level === level) {
        return levelsArray[i].experience;
      }
    }
    return 0;
  }

  const handleCapture = async () => {
    const pokemonLevelDifference = enemyPokemon.level - ownPokemon.level;
    const adjustedCaptureRate =
      enemyPokemon.capture_rate * (1 + 0.1 * pokemonLevelDifference);
    const randomNumber = Math.floor(Math.random() * 100);
    console.log("Random: " + randomNumber);
    console.log("Capture: " + adjustedCaptureRate);

    if (randomNumber >= adjustedCaptureRate) {
      window.alert("You have captured " + enemyPokemon.name);
      enemyPokemon.xp = findXPBasedOnLevel();
      await fetch("/api/auth/newpokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(enemyPokemon),
      });
      navigate("/map");
    } else {
      window.alert(enemyPokemon.name + " escaped");
      navigate("/map");
    }
  };

  return (
    <div className="card" style={{ backgroundImage: `url(${win})` }}>
      <h1>YOU WON!!!</h1>
      <button className="pokemon-btn" onClick={() => handleCapture()}>
        Capture {enemyPokemon.name}
      </button>
      <Link to={"/map"}>
        <button className="pokemon-btn" onClick={goBack}>
          BACK
        </button>
      </Link>
    </div>
  );
}

export default Won;
