import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import Loading from "./Loading/Loading";
import "../App.css";

function Hospital() {
  const { user, loading, getUserData } = useUserData();
  const [reloadCounter, setReloadCounter] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/auth/logout");
    navigate("/");
  };

  async function updatePokemon(pokemon) {
    await fetch("/api/auth/hospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(pokemon),
    });
    setReloadCounter((prevCounter) => prevCounter + 1);
  }

  function handleRelease(pokemon) {
    pokemon.hospital.inHospital = false;
    pokemon.stats[0].stat = getHp(pokemon);
    updatePokemon(pokemon);
  }

  function handleSendToHospital(pokemon) {
    pokemon.hospital.inHospital = true;
    pokemon.hospital.startTime = new Date();
    updatePokemon(pokemon);
  }

  function getHp(pokemon) {
    const currentTime = Date.now();
    const startTime = pokemon.hospital.startTime
      ? new Date(pokemon.hospital.startTime).getTime()
      : currentTime;
    const elapsedTimeInMinutes = Math.floor(
      (currentTime - startTime) / (1000 * 60)
    );

    let newHp = pokemon.stats[0].stat + elapsedTimeInMinutes;
    if (newHp > pokemon.stats[6].stat) {
      newHp = pokemon.stats[6].stat;
    }

    return newHp;
  }

  useEffect(() => {
    getUserData();
  }, [getUserData, reloadCounter]);

  if (loading) {
    return <Loading />;
  }

  const inHospitalPokemons = user.pokemons.filter(
    (pokemon) => pokemon.hospital.inHospital
  );
  const notInHospitalPokemons = user.pokemons.filter(
    (pokemon) => !pokemon.hospital.inHospital
  );

  const renderPokemonCard = (pokemon, isInHospital) => (
    <div className="cards" key={pokemon.uniqueId} id={pokemon.uniqueId}>
      <img alt="poke-Icon" src={pokemon.sprites.front_default} />
      <div className="Poke-Name">{pokemon.name}</div>
      <div className="Poke-Stats">
        <p>
          HP: {isInHospital ? getHp(pokemon) : pokemon.stats[0].stat}/
          {pokemon.stats[6].stat}
        </p>
      </div>
      <button className="pokemon-btn" onClick={() => console.log(pokemon.name)}>
        DETAILS
      </button>
      {isInHospital ? (
        <button className="pokemon-btn" onClick={() => handleRelease(pokemon)}>
          RELEASE
        </button>
      ) : (
        <button
          className="pokemon-btn"
          onClick={() => handleSendToHospital(pokemon)}
        >
          Send to hospital
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="header-buttons">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Hospital</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className="pokemon-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="pokemon-btn" onClick={() => navigate("/map")}>
            Map
          </button>
        </div>
      </div>
      <div>In hospital</div>
      <div className="pokemon-container">
        {inHospitalPokemons.map((pokemon) => renderPokemonCard(pokemon, true))}
      </div>
      <div>Not in hospital</div>
      <div className="pokemon-container">
        {notInHospitalPokemons.map((pokemon) =>
          renderPokemonCard(pokemon, false)
        )}
      </div>
    </>
  );
}

export default Hospital;
