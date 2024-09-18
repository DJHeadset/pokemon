import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import battle from "../resources/pic/Battle.png";
import VsPokemons from "../components/VsPokemons";
import { showAttackNumber } from "../services/animations";

function Battle() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ownPokemon, setOwnPokemon] = useState(location.state.ownPokemon);
  const [enemyPokemon, setEnemyPokemon] = useState(location.state.enemyPokemon);

  async function updateOwnPokemon(data) {
    const newHp = data.hp - data.attack;
    data.hp = newHp < 0 ? 0 : newHp;
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
    console.log("won");
    const newOwnPokemon = await updateOwnPokemon(data.players.own.pokemon);
    navigate("/won", {
      state: {
        ownPokemon: newOwnPokemon,
        enemyPokemon: enemyPokemon,
      },
    });
  }

  async function handleDefeat(data) {
    console.log("lost");
    updateOwnPokemon(data.players.own.pokemon);
    navigate("/lost");
  }

  async function handleAttack() {
    const response = await fetch(`/pokemon/battle/attack`);
    const data = await response.json();

    setEnemyPokemon(data.players.enemy.pokemon);

    setOwnPokemon(data.players.own.pokemon);

    showAttackNumber();
    if (data.players.own.pokemon.hp <= 0) {
      handleDefeat(data);
    } else if (data.players.enemy.pokemon.hp <= 0) {
      handleVictory(data);
    }
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

  if (ownPokemon && enemyPokemon) {
    return (
      <>
        <div className="card" style={{ backgroundImage: `url(${battle})` }}>
          <div className="battle-container">
            <VsPokemons ownPokemon={ownPokemon} enemyPokemon={enemyPokemon} />
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
