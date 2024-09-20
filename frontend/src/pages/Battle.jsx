import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import battle from "../resources/pic/Battle.png";
import VsPokemons from "../components/VsPokemons";
import { showAttackNumber } from "../services/animations";
import { useGameOutCome } from "../hooks/useGameOutcome";

function Battle() {
  const location = useLocation();
  const { handleVictory, handleDefeat } = useGameOutCome();
  const [ownPokemon, setOwnPokemon] = useState(location.state.ownPokemon);
  const [enemyPokemon, setEnemyPokemon] = useState(location.state.enemyPokemon);

  async function handleAttack() {
    const response = await fetch(`/pokemon/battle/attack`);
    const data = await response.json();

    setEnemyPokemon(data.players.enemy.pokemon);

    setOwnPokemon(data.players.own.pokemon);

    showAttackNumber();
    if (data.players.own.pokemon.hp <= 0) {
      handleDefeat(data.players.own.pokemon, data.players.enemy.pokemon);
    } else if (data.players.enemy.pokemon.hp <= 0) {
      handleVictory(data.players.own.pokemon, data.players.enemy.pokemon);
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
