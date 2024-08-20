import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import battle from "../resources/pic/Battle.png";
import VsPokemons from "../components/VsPokemons";

function Battle() {
  const location = useLocation();
  const { ownPokemon, enemyPokemon } = location.state;
  const [enemyPokemonStats, setEnemyPokemonStats] = useState(null);
  const [ownPokemonStats, setOwnPokemonStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ownPokemon &&
      setOwnPokemonStats({
        hp: ownPokemon.stats[0].stat,
        maxHp: ownPokemon.stats[6].stat,
        attack: ownPokemon.attack ? ownPokemon.attack : 0,
      });
  }, [ownPokemon]);

  useEffect(() => {
    enemyPokemon &&
      setEnemyPokemonStats({
        hp: enemyPokemon.stats[6].stat,
        maxHp: enemyPokemon.stats[6].stat,
        attack: enemyPokemon.attack,
      });
  }, [enemyPokemon]);

  async function updateOwnPokemon(data) {
    const hp = data.own.hp - data.own.attack;
    ownPokemon.stats[0].stat = hp < 0 ? 0 : hp;
    const response = await fetch("/api/auth/updateownpokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        ownPokemon,
        enemyPokemon,
      }),
    });
    const newOwnPokemon = await response.json();
    return newOwnPokemon;
  }

  async function handleVictory(data) {
    const newOwnPokemon = await updateOwnPokemon(data);
    navigate("/won", {
      state: {
        ownPokemon: newOwnPokemon,
        enemyPokemon: enemyPokemon,
      },
    });
  }

  function handleDefeat(data) {
    updateOwnPokemon(data);
    navigate("/lost");
  }

  async function handleAttack() {
    const response = await fetch(`/pokemon/battle/attack`);
    const data = await response.json();
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
      handleDefeat(data);
    } else if (data.enemy.hp <= 0) {
      handleVictory(data);
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
            <VsPokemons
              ownPokemon={ownPokemon}
              ownPokemonStats={ownPokemonStats}
              enemyPokemon={enemyPokemon}
              enemyPokemonStats={enemyPokemonStats}
            />
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
