import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading/Loading";
import fetchUserData from "../service/userdata";

function City() {
  const [methods, setMethods] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [ownPokemon, setOwnPokemon] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCity = async (id) => {
    const response = await fetch(`/pokemon/city/${id}`);
    const cityData = await response.json();
    return cityData;
  };

  const handleClick = async (method) => {
    console.log(method);
    const response = await fetch(`/pokemon/randompokemon/${id}/${method}`);
    const data = await response.json();
    if (data.pokemon) {
      window.alert(data.message);
      setEnemyPokemon(data.pokemon);
      const user = await fetchUserData();
      setOwnPokemon(user.pokemons);
    } else {
      window.alert(data.message);
    }
  };

  const handleFight = () => {
    console.log("fight");
  };

  useEffect(() => {
    fetchCity(id).then((methods) => {
      setLoading(false);
      setMethods(methods);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else if (!enemyPokemon) {
    return (
      <>
        <div>{methods.name}</div>
        {methods.encounters.map((method, index) => (
          <button key={index} onClick={() => handleClick(method)}>
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
        <button onClick={() => handleFight()}>FIGHT</button>
        <button onClick={() => setEnemyPokemon(null)}>BACK</button>
        <div className="Own-Pokemon-Name">
          <label className="label">
            Choose your pokemon:
            {ownPokemon.map((own) => (
              <button
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
                <img alt="Poke-Icon" src={own.sprites.front_default} />
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
