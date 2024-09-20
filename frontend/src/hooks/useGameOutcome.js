import { useNavigate } from "react-router-dom"

export const useGameOutCome =()=>{
const navigate = useNavigate()

async function updateOwnPokemon(ownPokemon, enemyPokemon) {
    const newHp = ownPokemon.hp - enemyPokemon.attack;
    ownPokemon.hp = newHp < 0 ? 0 : newHp;

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

  async function handleDefeat(ownPokemon, enemyPokemon, ws) {
    console.log("lost");
    updateOwnPokemon(ownPokemon, enemyPokemon);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
      console.log("WebSocket connection closed after defeat");
    }
    navigate("/lost");
  }

  async function handleVictory(ownPokemon, enemyPokemon, ws) {
    console.log("won");
    const newOwnPokemon = await updateOwnPokemon(ownPokemon, enemyPokemon);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
      console.log("WebSocket connection closed after victory");
    }
    navigate("/won", {
      state: {
        ownPokemon: newOwnPokemon,
        enemyPokemon,
      },
    });
  }
  return { handleVictory, handleDefeat, updateOwnPokemon };
}
