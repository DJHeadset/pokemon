import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Layout/Loading";
import useUserData from "../hooks/useUserData";
import PokemonList from "./Layout/PokemonList";

function City() {
  const [methods, setMethods] = useState(null);
  const [loadingCity, setLoadingCity] = useState(true);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("level");
  const { user, loading: loadingUser, fetchUserData } = useUserData();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCity = async (id) => {
    const response = await fetch(`/pokemon/city/${id}`);
    const cityData = await response.json();
    return cityData;
  };

  const handleClick = async (method) => {
    setLoadingCity(true);

    const response = await fetch(`/pokemon/randompokemon/${id}/${method}`);
    const data = await response.json();

    if (data.pokemon) {
      window.alert(data.message);
      setEnemyPokemon(data.pokemon);
      await fetchUserData();
    } else if (data.message === "Hospital") {
      navigate("/hospital");
    } else if (data.message === "PVP") {
      navigate("/lobby");
    } else {
      window.alert(data.message);
    }
    setLoadingCity(false);
  };

  useEffect(() => {
    fetchCity(id).then((methods) => {
      setMethods(methods);
      setLoadingCity(false);
    });
  }, [id]);

  if (loadingUser || loadingCity) return <Loading />;

  return (
    <>
      {!enemyPokemon ? (
        <>
          <h2>{methods.name}</h2>
          {methods.encounters.map((method, index) => (
            <button
              className="pokemon-btn"
              key={index}
              onClick={() => handleClick(method)}
            >
              {method}
            </button>
          ))}
        </>
      ) : (
        <>
          <button
            className="pokemon-btn"
            style={{ position: "absolute", right: "10px" }}
            onClick={() => setEnemyPokemon(null)}
          >
            BACK
          </button>
          <div className="enemy-pokemon cards">
            <div className="Poke-Name">{enemyPokemon.name}</div>
            <img alt="Poke-Icon" src={enemyPokemon.sprites.front_default} />
            <div className="Poke-Stats">
              Level: {enemyPokemon.level}
              {enemyPokemon.stats.slice(0, 3).map((e, i) => (
                <p key={i}>
                  {e.name}: {e.stat}
                </p>
              ))}
            </div>
            <div className="pokemon-types">
              {enemyPokemon.types.map((type) => (
                <span key={type.name} className={`pokemon-type ${type.name}`}>
                  {type.name}
                </span>
              ))}
            </div>
          </div>
          <PokemonList
            pokemons={user?.pokemons}
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
            onPokemonClick={(own) =>
              navigate(`/battle`, {
                state: { ownPokemon: own, enemyPokemon: enemyPokemon },
              })
            }
          />
        </>
      )}
    </>
  );
}

export default City;
