exports.calculateStats = (pokemon) => {
  let level = pokemon.level;
  level = 50
  if (level > 0) {
    for (let i = 0; i < pokemon.stats.length; i++) {
      const baseStat = pokemon.stats[i].base_stat;
      const EV = pokemon.stats[i].ev ? pokemon.stats[0].ev : 0;
      pokemon.stats[i].stat = Math.floor(
        baseStat + level * 0.045 + (EV / 4) * (level * 0.01)
      );
    }
  } else {
    console.log("level 0 pokemon");
  }
  return pokemon;
};
