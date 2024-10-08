import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import battle from "../resources/pic/Battle.png";
import Loading from "../components/Loading";
import VsPokemons from "../components/VsPokemons";
import decoder from "../utils/Decoder";
import { showAttackNumber } from "../services/animations";
import { useGameOutCome } from "../hooks/useGameOutcome";

function Pvp() {
  const location = useLocation();
  const { ownPokemonId } = location.state;
  const [ownPokemon, setOwnPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(null);
  const playerIdRef = useRef(null);
  const ws = useRef(null);
  const {handleVictory, handleDefeat} = useGameOutCome()

  useEffect(() => {
    const cookie = decoder();
    if (cookie) {
      playerIdRef.current = cookie.id;
    }
  }, []);

  const handleAttack = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: "ATTACK", gameId: gameId }));
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

        establishWebSocketConnection(player1.id);
        if (data.player2 === null) {
          console.log("WAITING");
          setWaiting(true);
        } else {
          const player2 = data.player2;
          setEnemyPokemon(player2.pokemon);

          setGameId(data.gameId);
          setCurrentTurn(data.player2.id);
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
        setGameId(message.gameId);
        setCurrentTurn(message.turn);
        setWaiting(false);
      } else if (message.type === "WAITING_FOR_PLAYER") {
        setWaiting(true);
      } else if (message.type === "GAME_STATE") {
        const gameState = message.state;
        setCurrentTurn(gameState.turn);
        const playerId = playerIdRef.current;
        const opponentId = gameState.opponent[playerId];
        setOwnPokemon(gameState.players[playerId].pokemon);
        setEnemyPokemon(gameState.players[opponentId].pokemon);

        if (gameState.players[playerId].pokemon.hp <= 0) {
          handleDefeat(gameState.players[playerId].pokemon, gameState.players[opponentId].pokemon,ws.current);
        } else if (gameState.players[opponentId].pokemon.hp <= 0) {
          handleVictory(gameState.players[playerId].pokemon, gameState.players[opponentId].pokemon,ws.current);
        } else {
          showAttackNumber();
        }
    
        console.log("Game state received:", gameState);
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

  const playerId = playerIdRef.current;
  let isMyTurn = currentTurn === playerId;

  if (!ownPokemon || (!enemyPokemon && !waiting)) {
    return <Loading />;
  }

  if (ownPokemon) {
    return (
      <>
        <div className="card" style={{ backgroundImage: `url(${battle})` }}>
          <div className="battle-container">
            <VsPokemons ownPokemon={ownPokemon} enemyPokemon={enemyPokemon} />
            {enemyPokemon ? (
              <button
                style={{
                  flexBasis: "10%",
                  opacity: isMyTurn ? 1 : 0.5,
                  pointerEvents: isMyTurn ? "auto" : "none",
                }}
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
