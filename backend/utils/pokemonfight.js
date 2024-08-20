exports.convertedGameState = (game) => {
  let convertedData = { players: {} };

  Object.entries(game.players).forEach(([playerId, player]) => {
    convertedData.players[playerId] = {
      pokemon: {
        hp: player.pokemon.stats[0].stat,
        maxHp: player.pokemon.stats[6].stat,
        attack: player.pokemon.attack ? player.pokemon.attack : null,
        sprites: player.pokemon.sprites,
        name: player.pokemon.name,
      },
    };
  });
  return convertedData;
};
