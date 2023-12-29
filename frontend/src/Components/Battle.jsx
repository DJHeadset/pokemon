import { useLocation } from "react-router-dom";
import battle from "../resources/pic/Battle.png";
import { useEffect, useState } from "react";

function Battle() {
  const location = useLocation();
  const { ownPokemon, enemyPokemon } = location.state;
  //console.log(enemyPokemon.stats);
  const [enemyPokemonStats, setEnemyPokemonStats] = useState(null);
  const [ownPokemonStats, setOwnPokemonStats] = useState(null);
  const [enemyAttackNumber, setEnemyAttackNumber] = useState(0);
  const [attackNumber, setAttackNumber] = useState(0);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    ownPokemon &&
      setOwnPokemonStats({
        hp: ownPokemon.stats[0].stat,
        att: ownPokemon.stats[1].stat,
        def: ownPokemon.stats[2].stat,
        maxHp: ownPokemon.stats[6].base_stat,
      });
  }, [ownPokemon]);

  useEffect(() => {
    enemyPokemon &&
      setEnemyPokemonStats({
        hp: enemyPokemon.stats[0].stat,
        att: enemyPokemon.stats[1].stat,
        def: enemyPokemon.stats[2].stat,
        maxHp: enemyPokemon.stats[6].stat,
      });
  }, [enemyPokemon]);

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

  if (ownPokemonStats && enemyPokemonStats) {
    return (
      <>
        <div className="card" style={{ backgroundImage: `url(${battle})` }}>
          <div className="battle-container">
            <div className="own-pokemon battlecards">
              <div className="damage" id="enemyAttackNumber">
                {enemyAttackNumber}
              </div>
              <div className="hp-bar-container">
                <progress
                  className="hp-bar"
                  value={ownPokemonStats.hp}
                  max={ownPokemonStats.maxHp}
                />
              </div>
              <img
                className="img"
                alt="Poke-Icon"
                src={ownPokemon.sprites.back_default}
              />
              <div className="Poke-Name">{ownPokemon.name}</div>
            </div>
            <div className="enemy-pokemon battlecards">
              <div className="damage" id="attackNumber">
                {attackNumber}
              </div>
              <div className="hp-bar-container">
                <progress
                  className="hp-bar"
                  value={enemyPokemonStats.hp}
                  max={enemyPokemonStats.maxHp}
                />
              </div>
              <img
                className="img"
                alt="Poke-Icon"
                src={enemyPokemon.sprites.front_default}
              />
              <div className="Poke-Name">{enemyPokemon.name}</div>
            </div>
            <button
              style={{ flexBasis: "10%" }}
              className="pokemon-btn"
              onClick={handleAttack}
            >
              ATTACK
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Battle;
