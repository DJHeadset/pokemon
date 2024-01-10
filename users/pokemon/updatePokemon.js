const { calculateStats } = require("../../battle/service/calculatestats");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = process.env;

function updateEv(own, enemy) {
  let highestEV = 0;
  for (let i = 0; i < enemy.stats.length; i++) {
    if (enemy.stats[i].base_stat > enemy.stats[highestEV].base_stat) {
      highestEV = i;
    }
  }
  own.stats[highestEV].EV = enemy.stats[highestEV].base_stat;
  if (own.stats[highestEV].EV > 255) {
    own.stats[highestEV].EV = 255;
  }
}

async function savePokemon(user, own) {
  const data = await User.findById(user.id);
  data.pokemons[own.uniqueId - 1] = own;
  await data.save();
  console.log("pokemon updated");
}

exports.updateOwnPokemon = async (req, res, next) => {
  const data = req.body;
  let own = data.ownPokemon;
  let enemy = data.enemyPokemon;
  const user = req.headers.cookie.substring(5, req.headers.cookie.length);

  if (user) {
    jwt.verify(user, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: err });
      } else {
        if (own.stats[0].stat > 0) {
          console.log("you won");
          XP = Math.floor((enemy.base_experience * enemy.level) / 7);
          own.xp += XP;
          updateEv(own, enemy);
          own = calculateStats(own);
        } else {
          console.log("you lost");
        }
        savePokemon(decodedToken, own);
        res.json(own);
      }
    });
  }
};

exports.pokmemonHospital = async (req, res, next) => {
  const data = req.body;
  const user = req.headers.cookie.substring(5, req.headers.cookie.length);

  if (user) {
    jwt.verify(user, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: err });
      } else {
        savePokemon(decodedToken, data);
        res.json(data);
      }
    });
  }
};
