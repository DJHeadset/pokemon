const { calculateStats } = require("../utils/calculatestats");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { fetchPokemonData } = require("../utils/fetchpokemondata");
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

async function savePokemon(userId, own) {
  try {
    const updatedPokemon = await User.findOneAndUpdate(
      { _id: userId, "pokemons.uniqueId": own.uniqueId },
      {
        $set: {
          "pokemons.$.level": own.level,
          "pokemons.$.hospital": own.hospital,
          "pokemons.$.stats": own.stats,
          "pokemons.$.xp": own.xp,
        },
      },
      { new: true }
    );
    if (!updatedPokemon) {
      throw new Error("Pokemon not found in user's data");
    }
    return updatedPokemon;
  } catch (error) {
    console.error("Error saving Pokémon:", error);
    throw error;
  }
}

exports.updateOwnPokemon = async (req, res, next) => {
  const { ownPokemon, enemyPokemon } = req.body;
  const userToken = req.headers.cookie?.substring(5);

  try {
    let basicEnemy = await fetchPokemonData(enemyPokemon.id);
    basicEnemy.level = ownPokemon.level;
    const enemy = await calculateStats(basicEnemy);

    if (userToken) {
      jwt.verify(userToken, jwtSecret, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "user not found ", err });
        }
        try {
          const user = await User.findById(decodedToken.id).select("pokemons");
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          let existingPokemon = user.pokemons[ownPokemon.uniqueId - 1];
          if (ownPokemon.hp > 0) {
            XP = Math.floor((enemy.base_experience * enemy.level) / 7);
            existingPokemon.xp += XP;
            existingPokemon.stats[0].stat = ownPokemon.hp;
            updateEv(existingPokemon, enemy);
            existingPokemon = calculateStats(existingPokemon);
          } else {
            existingPokemon.stats[0].stat = 0;
          }
          savePokemon(decodedToken.id, existingPokemon);
          res.json(existingPokemon);
        } catch (error) {
          console.error("Error processing Pokemon update", error);
          res.status(500);
        }
      });
    }
  } catch (error) {
    console.error(error);
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
        savePokemon(decodedToken.id, data);
        res.json(data);
      }
    });
  }
};
