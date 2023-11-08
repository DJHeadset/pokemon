import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading/Loading";
import ownPokemons from "../resources/pokemons.json";
import battle from "../resources/pic/Battle.png";

function Battle() {
  const { own, enemy } = useParams();

  const [ownPokemon, setOwnPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enemyAttackNumber, setEnemyAttackNumber] = useState(0);
  const [attackNumber, setAttackNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [enemyPokemonStats, setEnemyPokemonStats] = useState(null);
  const [ownPokemonStats, setOwnPokemonStats] = useState(null);

  async function getOwnPokemon(own) {
    ownPokemons.pokemons.forEach((pokemon) => {
      if (pokemon.id === own * 1) {
        setOwnPokemon(pokemon);
      }
    });
  }

  async function getEnemyPokemon(enemy) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${enemy}`;
    const pokeResponse = await fetch(URL);
    const enemyPokemonData = await pokeResponse.json();
    setEnemyPokemon(enemyPokemonData);
  }

  useEffect(() => {
    ownPokemon &&
      setOwnPokemonStats({
        hp: ownPokemon.stats[0].base_stat,
        att: ownPokemon.stats[1].base_stat,
        def: ownPokemon.stats[2].base_stat,
      });
  }, [ownPokemon]);

  useEffect(() => {
    enemyPokemon &&
      setEnemyPokemonStats({
        hp: enemyPokemon.stats[0].base_stat,
        att: enemyPokemon.stats[1].base_stat,
        def: enemyPokemon.stats[2].base_stat,
      });
  }, [enemyPokemon]);

  useEffect(() => {
    getOwnPokemon(own).then(() => {
      getEnemyPokemon(enemy).then(() => {
        setLoading(false);
      });
    });
  }, [own, enemy]);

  function winnerPokemon() {
    if (enemyPokemonStats && enemyPokemonStats.hp <= 0) {
      console.log("win");
    } else if (ownPokemonStats && ownPokemonStats.hp <= 0) {
      console.log("loose");
    }
  }

  function handleAttack() {
    const hp = enemyPokemonStats.hp;
    const att = ownPokemonStats.att;
    const def = enemyPokemonStats.def;
    const rnd = Math.floor(Math.random() * 38) + 217;
    const attack = Math.floor(
      ((((2 / 5 + 2) * att * 60) / def / 50 + 2) * rnd) / 255
    );
    setEnemyPokemonStats({
      ...enemyPokemonStats,
      hp: hp - attack,
    });
    setAttackNumber(attack);
    handleAttackBack();
  }

  function handleAttackBack() {
    const hp = ownPokemonStats.hp;
    const att = enemyPokemonStats.att;
    const def = ownPokemonStats.def;
    const rnd = Math.floor(Math.random() * 38) + 217;
    const attack = Math.floor(
      ((((2 / 5 + 2) * att * 60) / def / 50 + 2) * rnd) / 255
    );

    setOwnPokemonStats({
      ...ownPokemonStats,
      hp: hp - attack,
    });
    setEnemyAttackNumber(attack);
    setTurn(turn + 1);
  }

  useEffect(() => {
    winnerPokemon();
  }, [enemyPokemonStats, ownPokemonStats]);

  useEffect(() => {
    if (turn > 0) {
      const damageElement = document.getElementById("attackNumber");
      const enemyDamageElement = document.getElementById("enemyAttackNumber");
      damageElement.classList.add("animated");
      enemyDamageElement.classList.add("animated");
      setTimeout(() => {
        damageElement.classList.remove("animated");
        enemyDamageElement.classList.remove("animated");
      }, 1000);
    }
  }, [turn]);

  if (loading) {
    return <Loading />;
  } else if (ownPokemonStats && enemyPokemonStats) {
    return (
      <>
        <div className="card" style={{ backgroundImage: `url(${battle})` }}>
          <div className="enemy-pokemon cards">
            <div className="damage" id="attackNumber">
              {attackNumber}
            </div>
            <div className="Poke-Name">{enemyPokemon.name}</div>
            <img
              className="img"
              alt="Poke-Icon"
              src={enemyPokemon.sprites.front_default}
            />
            <div className="Poke-Stats">
              <p>HP: {enemyPokemonStats.hp}</p>
              <p>Attack: {enemyPokemonStats.att}</p>
              <p>Defense: {enemyPokemonStats.def}</p>
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
          <div className="own-pokemon cards">
            <div className="damage" id="enemyAttackNumber">
              {enemyAttackNumber}
            </div>
            <div className="Poke-Name">{ownPokemon.name}</div>
            <img
              className="img"
              alt="Poke-Icon"
              src={ownPokemon.sprites.front_default}
            />
            <div className="Poke-Stats">
              <p>HP: {ownPokemonStats.hp}</p>
              <p>Attack: {ownPokemonStats.att}</p>
              <p>Defense: {ownPokemonStats.def}</p>
            </div>
            <div className="pokemon-types">
              {ownPokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`pokemon-type ${type.type.name}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
          <button className="pokemon-btn" onClick={handleAttack}>
            ATTACK
          </button>
        </div>
      </>
    );
  } else {
    return <div>Loading Pokémon data...</div>;
  }
}

export default Battle;
