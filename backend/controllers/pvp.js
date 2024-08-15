const WebSocket = require("ws");
const { getUserFromToken } = require("../utils/getusersfromtoken");

let games = {};
let players = {};
let waitingPlayer = null;
let currentPlayer = null;

exports.initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const playerId = req.url.substring(1);
    players[playerId] = ws;

    console.log(`Player connected: ${playerId}`);

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        const gameId = data.gameId;
        console.log(data);

        if (data.type === "ATTACK") {
          handleAttack(gameId, playerId);
          //console.log(`ATTACK`);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    ws.on("close", () => {
      console.log(`Player disconnected: ${playerId}`);
      delete players[playerId];
    });

    ws.onerror = (error) => {
      console.error(`WebSocket error for player ${playerId}:`, error);
    };
  });
};

exports.joingame = async (req, res, next) => {
  pokeId = req.body.own;
  token = req.headers.cookie.substring(5, req.headers.cookie.length);

  if (token) {
    const user = await getUserFromToken(token);
    const pokemon = user.pokemons[pokeId - 1];
    if (waitingPlayer && waitingPlayer.id !== user.id && !currentPlayer) {
      console.log("player 2");
      const gameId = generateGameId();
      currentPlayer = { id: user.id, pokemon };
      games[gameId] = {
        players: {
          [waitingPlayer.id]: { pokemon: waitingPlayer.pokemon },
          [currentPlayer.id]: { pokemon: currentPlayer.pokemon },
        },
        turn: waitingPlayer.id,
        opponent: {
          [waitingPlayer.id]: currentPlayer.id,
          [currentPlayer.id]: waitingPlayer.id,
        },
      };
      if (players[waitingPlayer.id]) {
        players[waitingPlayer.id].send(
          JSON.stringify({
            type: "PLAYER_JOINED",
            player: waitingPlayer,
            opponent: currentPlayer,
            gameId,
            turn: waitingPlayer.id,
          })
        );
      }
      if (players[currentPlayer.id]) {
        players[currentPlayer.id].send(
          JSON.stringify({
            type: "PLAYER_JOINED",
            player: currentPlayer,
            opponent: waitingPlayer,
            gameId,
            turn: waitingPlayer.id,
          })
        );
      }
      return res.status(200).json({
        gameId: gameId,
        player1: currentPlayer,
        player2: waitingPlayer,
      });
    } else {
      console.log("player 1");
      waitingPlayer = { id: user.id, pokemon };
      return res.status(200).json({ player1: waitingPlayer, player2: null });
    }
  }
};

function generateGameId() {
  return Math.random().toString(36).substr(2, 9);
}

function handleAttack(gameId, playerId) {
  console.log(`ATTACK GAME ${gameId} PLAYER ${playerId}`);
  const game = games[gameId];
  const attackingPlayer = game.players[playerId];
  const defendingPlayer = game.players[game.opponent[playerId]];
  const hp = defendingPlayer.pokemon.stats[0].stat;
  console.log(`hp ${hp}`);
  const att = attackingPlayer.pokemon.stats[1].stat;
  const def = defendingPlayer.pokemon.stats[2].stat;
  const rnd = Math.floor(Math.random() * 38) + 217;
  const attack = Math.floor(
    ((((2 / 5 + 2) * att * 60) / def / 50 + 2) * rnd) / 255
  );
  defendingPlayer.pokemon.stats[0].stat = hp - attack;

  console.log(
    `${attackingPlayer.pokemon.name} attacks ${defendingPlayer.pokemon.name} for ${attack}`
  );
  game.turn = game.opponent[playerId];
  sendGameState(gameId);
}

function sendGameState(gameId) {
  const game = games[gameId];
  Object.keys(game.players).forEach((playerId) => {
    const ws = players[playerId];
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "GAME_STATE", state: game }));
    }
  });
}
