import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading/Loading";
import useUserData from "../hooks/useUserData";

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
    //console.log(cityData);
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
    } else {
      window.alert(data.message);
    }
    setLoadingCity(false);
  };

  const sortedPokemon = user?.pokemons
    ?.filter((own) => own.stats[0].stat > 0 && !own.hospital.inHospital)
    .sort((a, b) => {
      switch (sortCriteria) {
        case "name":
          return a.name - b.name;
        case "level":
          return b.level - a.level;
        case "hp":
          return a.stats[0].stat - b.stats[0].stat;
        case "attack":
          return a.stats[1].stat - b.stats[1].stat;
        default:
          return 0;
      }
    });

  useEffect(() => {
    fetchCity(id).then((methods) => {
      setMethods(methods);
      setLoadingCity(false);
    });
  }, [id]);

  if (loadingUser || loadingCity) {
    return <Loading />;
  } else if (!enemyPokemon) {
    return (
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
    );
  } else {
    return (
      <>
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
        <button className="pokemon-btn" onClick={() => setEnemyPokemon(null)}>
          BACK
        </button>
        <div className="Own-Pokemon-Name">
          <label className="label">
            Choose your pokemon:
            <select onChange={(e) => setSortCriteria(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="level">Sort by Level</option>
              <option value="hp">Sort by HP</option>
              <option value="attack">Sort by Attack</option>
            </select>
            {sortedPokemon?.map((own) => (
              <button
                key={own.uniqueId}
                onClick={() => {
                  navigate(`/battle`, {
                    state: {
                      ownPokemon: own,
                      enemyPokemon: enemyPokemon,
                    },
                  });
                }}
                className="options"
              >
                <div className="poke-info">
                  <div className="hp-bar-container">
                    <progress
                      className="hp-bar"
                      value={own.stats[0].stat}
                      max={own.stats[6].stat}
                    />
                  </div>
                  <img alt="Poke-Icon" src={own.sprites.front_default} />
                  <div className="pokemon-types">
                    {own.types.map((type) => (
                      <span
                        key={type.name}
                        className={`pokemon-type ${type.name}`}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="poke-info">
                  <p>Level: {own.level}</p>
                  <p>{own.name}</p>
                </div>
              </button>
            ))}
          </label>
        </div>
      </>
    );
  }
}

export default City;
