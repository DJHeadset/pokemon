import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import battle from "../resources/pic/Battle.png";
import Loading from "./Layout/Loading";
import VsPokemons from "./Layout/VsPokemons";

function Pvp() {
  const location = useLocation();
  const { ownPokemonId } = location.state;
  const [ownPokemon, setOwnPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyPokemonStats, setEnemyPokemonStats] = useState(null);
  const [ownPokemonStats, setOwnPokemonStats] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const ws = useRef(null);

  const handleAttack = () => {
    console.log("attack");
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: "ATTACK", gameId: 2 }));
    }
  };

  const setupGame = async () => {
    try {
      const response = await fetch(`/pokemon/pvp/joingame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ own: ownPokemonId }),
      });

      if (response.ok) {
        const data = await response.json();
        const player1 = data.player1;
        setOwnPokemon(player1.pokemon);
        setOwnPokemonStats({
          hp: player1.pokemon.stats[0].stat,
          att: player1.pokemon.stats[1].stat,
          def: player1.pokemon.stats[2].stat,
          maxHp: player1.pokemon.stats[6].stat
            ? player1.pokemon.stats[6].stat
            : player1.pokemon.stats[6].base_stat,
        });

        establishWebSocketConnection(player1.id);
        if (data.player2 === null) {
          console.log("WAITING");
          setWaiting(true);
        } else {
          const player2 = data.player2;
          setEnemyPokemon(player2.pokemon);
          setEnemyPokemonStats({
            hp: player2.pokemon.stats[0].stat,
            att: player2.pokemon.stats[1].stat,
            def: player2.pokemon.stats[2].stat,
            maxHp: player2.pokemon.stats[6].stat,
          });
        }
      } else {
        console.error("Error setting up the battle");
      }
    } catch (error) {
      console.error("Error setting up the battle:", error);
    }
  };

  const establishWebSocketConnection = (uniqueId) => {
    ws.current = new WebSocket(`ws://${window.location.host}/${uniqueId}`, [
      "binary",
    ]);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "PLAYER_JOINED") {
        console.log("PLAYER_JOINED");
        setEnemyPokemon(message.opponent.pokemon);
        setEnemyPokemonStats({
          hp: message.opponent.pokemon.stats[0].stat,
          att: message.opponent.pokemon.stats[1].stat,
          def: message.opponent.pokemon.stats[2].stat,
          maxHp: message.opponent.pokemon.stats[6].stat,
        });
        setWaiting(false);
      } else if (message.type === "WAITING_FOR_PLAYER") {
        setWaiting(true);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };
  };

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  let isMyTurn;

  if (!ownPokemon || (!enemyPokemon && !waiting)) {
    return <Loading />;
  }

  if (ownPokemon) {
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
            {enemyPokemonStats ? (
              <button
                style={{ flexBasis: "10%" }}
                className="pokemon-btn"
                onClick={handleAttack}
              >
                ATTACK
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Pvp;
