import { useLocation, useNavigate } from "react-router-dom";
import battle from "../resources/pic/Battle.png";
import { useEffect, useState } from "react";

function Battle() {
  const location = useLocation();
  const { ownPokemon, enemyPokemon } = location.state;
  const [enemyPokemonStats, setEnemyPokemonStats] = useState(null);
  const [ownPokemonStats, setOwnPokemonStats] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    ownPokemon &&
      setOwnPokemonStats({
        hp: ownPokemon.stats[0].stat,
        maxHp: ownPokemon.stats[6].base_stat,
        attack: ownPokemon.attack,
      });
  }, [ownPokemon]);

  useEffect(() => {
    enemyPokemon &&
      setEnemyPokemonStats({
        hp: enemyPokemon.stats[0].stat,
        maxHp: enemyPokemon.stats[6].stat,
        attack: enemyPokemon.attack,
      });
  }, [enemyPokemon]);

  function handleVictory() {
    navigate("/won");
  }

  function handleDefeat() {
    navigate("/lost");
  }

  async function handleAttack() {
    const response = await fetch(`/pokemon/battle/attack`);
    const data = await response.json();
    console.log(data);
    setEnemyPokemonStats({
      ...enemyPokemonStats,
      hp: data.enemy.hp,
      attack: data.enemy.attack,
    });
    setOwnPokemonStats({
      ...ownPokemonStats,
      hp: data.own.hp,
      attack: data.own.attack,
    });
    showAttackNumber();
    if (data.own.hp <= 0) {
      handleDefeat();
    } else if (data.enemy.hp <= 0) {
      handleVictory();
    }
  }

  function showAttackNumber() {
    const damageElement = document.getElementById("attackNumber");
    const enemyDamageElement = document.getElementById("enemyAttackNumber");
    damageElement.classList.add("animated");
    enemyDamageElement.classList.add("animated");
    setTimeout(() => {
      damageElement.classList.remove("animated");
      enemyDamageElement.classList.remove("animated");
    }, 1000);
  }

  const setupBattle = async () => {
    console.log(enemyPokemon);

    const response = await fetch(`/pokemon/battle/battlesetup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ enemy: enemyPokemon, own: ownPokemon }),
    });

    if (response.ok) {
      console.log("Battle setup completed successfully");
    } else {
      console.error("Error setting up the battle");
    }
  };

  useEffect(() => {
    setupBattle();
  }, []);

  if (ownPokemonStats && enemyPokemonStats) {
    return (
      <>
        <div className="card" style={{ backgroundImage: `url(${battle})` }}>
          <div className="battle-container">
            <div className="own-pokemon battlecards">
              <div className="damage" id="enemyAttackNumber">
                {ownPokemonStats.attack}
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
                {enemyPokemonStats.attack}
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
