function calculateLevel(pokemon) {
  for (let i = 0; i < pokemon.levels.length; i++) {
    if (pokemon.xp < pokemon.levels[i].experience) {
      console.log(pokemon.levels[i - 1].level);
      return pokemon.levels[i - 1].level;
    }
  }
}

exports.calculateStats = (pokemon) => {
  let level = pokemon.level;
  let xp = pokemon.xp ? pokemon.xp : 0;
  const currentLevel = level;
  const currentHp = pokemon.stats[0].stat;

  if (xp > 0) {
    level = calculateLevel(pokemon);
    pokemon.level = level;
  }

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

  if (pokemon.level !== currentLevel) {
    console.log("pokemon levelled up");
    pokemon.stats[6].stat = pokemon.stats[0].stat;
  } else {
    console.log("same level");
    pokemon.stats[0].stat = currentHp;
  }

  return pokemon;
};
