import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import battle from "../resources/pic/Battle.png";
import Loading from "./Loading/Loading";

function Pvp() {
  const location = useLocation();
  const { ownPokemonId } = location.state;
  const [ownPokemon, setOwnPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyPokemonStats, setEnemyPokemonStats] = useState(null);
  const [ownPokemonStats, setOwnPokemonStats] = useState(null);
  const [waiting, setWaiting] = useState(false);
  let ws = null;

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
    ws = new WebSocket(`ws://${window.location.host}/${uniqueId}`, ["binary"]);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
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

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
  };

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    return () => {
      if (ws) ws.close();
    };
  }, [ws]);

  if (!ownPokemon || (!enemyPokemon && !waiting)) {
    return <Loading />;
  }

  if (ownPokemon) {
    return (
      <>
        <div className="card" style={{ backgroundImage: `url(${battle})` }}>
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
            {enemyPokemonStats ? (
              <>
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
              </>
            ) : (
              <>
                <h2>Waiting for another player</h2>
                <Loading />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Pvp;
