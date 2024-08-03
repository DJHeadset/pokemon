const WebSocket = require("ws");
const { getUserFromToken } = require("../utils/getusersfromtoken");

let games = {};
let players = {};
let waitingPlayer = null;

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
        console.log(data)

        if (data.type === "ATTACK") {
          //handleAttack(gameId, playerId);
          console.log(`ATTACK`);
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
  ownPokemon = req.body.own;
  token = req.headers.cookie.substring(5, req.headers.cookie.length);

  if (token) {
    const user = await getUserFromToken(token);
    const pokemon = user.pokemons[ownPokemon - 1];
    if (waitingPlayer && waitingPlayer.id !== user.id) {
      console.log("player 2");
      currentPlayer = { id: user.id, pokemon };
      if (players[waitingPlayer.id]) {
        players[waitingPlayer.id].send(
          JSON.stringify({ type: "PLAYER_JOINED", opponent: currentPlayer })
        );
      }
      return res
        .status(200)
        .json({ player1: currentPlayer, player2: waitingPlayer });
    } else {
      console.log("player 1");
      waitingPlayer = { id: user.id, pokemon };
      return res.status(200).json({ player1: waitingPlayer, player2: null });
    }
  }
};
