const {
  calculateAttack,
  convertedGameState,
} = require("../utils/pokemonfight");

let ownPokemon, enemyPokemon, ownPokemonStats, enemyPokemonStats, user;

function setOwnPokemonStats() {
  ownPokemonStats = {
    hp: ownPokemon.stats[0].stat,
    att: ownPokemon.stats[1].stat,
    def: ownPokemon.stats[2].stat,
    maxHp: ownPokemon.stats[6].stat
      ? ownPokemon.stats[6].stat
      : ownPokemon.stats[6].base_stat,
  };
}

function setEnemyPokemonStats() {
  enemyPokemonStats = {
    hp: enemyPokemon.stats[6].stat,
    att: enemyPokemon.stats[1].stat,
    def: enemyPokemon.stats[2].stat,
    maxHp: enemyPokemon.stats[6].stat,
  };
}

function handleAttack() {
  const attack = calculateAttack(ownPokemon, enemyPokemon);
  enemyPokemon.stats[0].stat = enemyPokemon.stats[0].stat - attack;
  enemyPokemon.attack = attack;
}

function handleAttackBack() {
  const attack = calculateAttack(enemyPokemon, ownPokemon);
  ownPokemon.stats[0].stat = ownPokemon.stats[0].stat - attack;
  ownPokemon.attack = attack;
}

exports.battleSetup = (req, res, next) => {
  user = req.headers.cookie.substring(5, req.headers.cookie.length);
  ownPokemon = req.body.own;
  enemyPokemon = req.body.enemy;
  setOwnPokemonStats();
  setEnemyPokemonStats();
  res.sendStatus(200);
};

exports.attack = (req, res, next) => {
  const type = req.params.type;
  if (type === "attack") {
    handleAttack();
    handleAttackBack();
    const gameState = {
      players: {
        own: { pokemon: ownPokemon },
        enemy: { pokemon: enemyPokemon },
      },
    };
    const response = convertedGameState(gameState);
    res.send(response);
  } else {
    console.log("más");
  }
};
