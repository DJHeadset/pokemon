import Loading from "./Loading/Loading";
import usePokemonData from "../hooks/usePokemonData";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LogoutButton from "./Buttons/LogoutButton";
import MapButton from "./Buttons/MapButton";

function Details() {
  const location = useLocation();
  const { loading, pokemon } = usePokemonData();
  const { maxPokemons } = location.state;
  const id = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    let previousId = id.id - 1;
    if (previousId === 0) {
      previousId = maxPokemons;
    }
    navigate(`/details/${previousId}`, {
      state: {
        maxPokemons: maxPokemons,
      },
    });
  };

  const handleForward = () => {
    let nextId = id.id * 1 + 1;
    if (nextId > maxPokemons) {
      nextId = 1;
    }
    navigate(`/details/${nextId}`, {
      state: {
        maxPokemons: maxPokemons,
      },
    });
  };

  if (loading) {
    return <Loading />;
  } else if (!pokemon) {
    return <div>No Pokémon data available.</div>;
  } else {
    const maxXp = pokemon.levels[pokemon.level].experience;
    return (
      <>
        <div className="header-buttons">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button className="pokemon-btn" onClick={() => handleBack()}>
              &#8592;
            </button>
            <div className="cards" key={pokemon.uniqueId} id={pokemon.uniqueId}>
              <img alt="poke-Icon" src={pokemon.sprites.front_default} />
              <div className="Poke-Name">{pokemon.name}</div>
              <div className="Poke-Stats">
                <p>Level: {pokemon.level}</p>
                <p>
                  XP: {pokemon.xp}/{maxXp}
                  <div className="hp-bar-container">
                    <progress
                      className="hp-bar"
                      value={pokemon.xp}
                      max={maxXp}
                    />
                  </div>
                </p>
                <p>
                  HP:{" "}
                  {pokemon.hospital.inHospital ? (
                    "In hospital"
                  ) : (
                    <>
                      {pokemon.stats[0].stat}/{pokemon.stats[6].stat}
                      <div className="hp-bar-container">
                        <progress
                          className="hp-bar"
                          value={pokemon.stats[0].stat}
                          max={pokemon.stats[6].stat}
                        />
                      </div>
                    </>
                  )}
                </p>
                <p>Attack: {pokemon.stats[1].stat}</p>
                <p>Defense: {pokemon.stats[2].stat}</p>
                <p>Speed: {pokemon.stats[5].stat}</p>
              </div>
              <div className="pokemon-types">
                {pokemon.types.map((type) => (
                  <span key={type.name} className={`pokemon-type ${type.name}`}>
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
            <button className="pokemon-btn" onClick={() => handleForward()}>
              &#8594;
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <LogoutButton />
            <MapButton />
          </div>
        </div>
      </>
    );
  }
}

export default Details;
