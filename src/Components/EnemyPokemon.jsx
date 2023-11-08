import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ownPokemons from "../resources/pokemons.json";
import battle from "../resources/pic/Battle.png";
import Loading from "./Loading/Loading";

function randomPokemon(pokeList) {
  return Math.floor(Math.random() * pokeList.length);
}

async function getRandomPokemon(num) {
  const URL = `https://pokeapi.co/api/v2/location-area/${num}`;
  const response = await fetch(URL);
  const pokeData = await response.json();
  const pokeList = pokeData.pokemon_encounters.map((e) => {
    return e.pokemon;
  });
  let pokemonURL = pokeList[randomPokemon(pokeList)].url;
  const pokeResponse = await fetch(pokemonURL);
  const randomPokemonData = await pokeResponse.json();
  return randomPokemonData;
}

function EnemyPokemon() {
  const { num } = useParams();

  const [ownPokemon, setOwnPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState();
  const [loading, setLoading] = useState(true);

  const handleSelect = event => {
    console.log(event.target.id)
    //selectOwn(event.target.id)
  };

  function getOwnPokemon() {
    const ownPokeNames = ownPokemons.pokemons.map((e) => {
      return e;
    });
    setOwnPokemon(ownPokeNames);
  }

  useEffect(() => {
    getOwnPokemon();
    getRandomPokemon(num).then((randomPokemon) => {
      setEnemyPokemon(randomPokemon);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="card" style={{ backgroundImage: `url(${battle})` }}>
        <div className="enemy-pokemon cards">
          <div className="Poke-Name">{enemyPokemon.name}</div>
          <img
            alt="Poke-Icon"
            src={enemyPokemon.sprites.front_default.slice(57)}
          />
          <div className="Poke-Stats">
            {enemyPokemon.stats.slice(0, 3).map((e, i) => (
              <p key={i}>
                {e.stat.name}: {e.base_stat}
              </p>
            ))}
          </div>
          <div className="pokemon-types">
            {enemyPokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`pokemon-type ${type.type.name}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="Own-Pokemon-Name">
          <label className="label">
            {" "}
            Choose your pokemon:
            {ownPokemon.map((own) => (
              <p key={own.name} id={own.id} className="options" onClick={handleSelect}>
                <img alt="Poke-Icon" src={own.sprites.front_default} />
                {own.name}
              </p>
            ))}
          </label>
        </div>
      </div>
    </>
  );
}

export default EnemyPokemon;
