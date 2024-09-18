exports.convertedGameState = (game) => {
  let convertedData = { players: {} };

  Object.entries(game.players).forEach(([playerId, player]) => {
    convertedData.players[playerId] = {
      pokemon: {
        uniqueId: player.pokemon.uniqueId,
        level: player.pokemon.level,
        id: player.pokemon.pokeId,
        hp: player.pokemon.stats[0].stat,
        maxHp: player.pokemon.stats[6].stat,
        attack: player.pokemon.attack ? player.pokemon.attack : 0,
        sprites: player.pokemon.sprites,
        name: player.pokemon.name,
      },
    };
  });
  return convertedData;
};

exports.calculateAttack = (defender, attacker) => {
  const att = attacker.stats[1].stat;
  const def = defender.stats[2].stat;
  const rnd = Math.floor(Math.random() * 38) + 217;

  return Math.floor(((((2 / 5 + 2) * att * 60) / def / 50 + 2) * rnd) / 255);
};
