let ownPokemon, enemyPokemon, ownPokemonStats, enemyPokemonStats;

function setOwnPokemonStats() {
  ownPokemonStats = {
    hp: ownPokemon.stats[0].stat,
    att: ownPokemon.stats[1].stat,
    def: ownPokemon.stats[2].stat,
    maxHp: ownPokemon.stats[6].base_stat,
  };
}

function setEnemyPokemonStats() {
  enemyPokemonStats = {
    hp: enemyPokemon.stats[0].stat,
    att: enemyPokemon.stats[1].stat,
    def: enemyPokemon.stats[2].stat,
    maxHp: enemyPokemon.stats[6].stat,
  };
}

function handleAttack() {
  const hp = enemyPokemonStats.hp;
  const att = ownPokemonStats.att;
  const def = enemyPokemonStats.def;
  const rnd = Math.floor(Math.random() * 38) + 217;
  const attack = Math.floor(
    ((((2 / 5 + 2) * att * 60) / def / 50 + 2) * rnd) / 255
  );

  enemyPokemonStats.hp = hp - attack;
  enemyPokemonStats.attack = attack;
  handleAttackBack();
}

function handleAttackBack() {
  const hp = ownPokemonStats.hp;
  const att = enemyPokemonStats.att;
  const def = ownPokemonStats.def;
  const rnd = Math.floor(Math.random() * 38) + 217;
  const attack = Math.floor(
    ((((2 / 5 + 2) * att * 60) / def / 50 + 2) * rnd) / 255
  );

  ownPokemonStats.hp = hp - attack;
  ownPokemonStats.attack = attack;
}

exports.battleSetup = (req, res, next) => {
  ownPokemon = req.body.own;
  enemyPokemon = req.body.enemy;
  setOwnPokemonStats();
  setEnemyPokemonStats();
  res.sendStatus(200);
};

exports.attack = (req, res, next) => {
  const type = req.params.type;
  //console.log(type)
  if (type === "attack") {
    handleAttack();
    let response = {
      enemy: {
        hp: enemyPokemonStats.hp,
        attack: enemyPokemonStats.attack,
      },
      own: {
        hp: ownPokemonStats.hp,
        attack: ownPokemonStats.attack,
      },
    };
    res.send(response);
  } else {
    console.log("más");
  }
};
