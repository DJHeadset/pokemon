const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = process.env;

exports.newpokemon = async (req, res, next) => {
  const newPokemon = req.body;

  try {
    let basicEnemy = await fetchPokemonData(newPokemon.id);
    basicEnemy.level = newPokemon.level;
    const enemy = await calculateStats(basicEnemy);
    const user = req.headers.cookie.substring(5, req.headers.cookie.length);

    if (user) {
      jwt.verify(user, jwtSecret, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: err });
        } else {
          const userId = decodedToken.id;
          const userDoc = await User.findById(userId);
          const curentLength = userDoc.pokemons.length;
          enemy.uniqueId = curentLength + 1;

          const response = await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { pokemons: enemy } },
            { new: true }
          );
          return res.json(response);
        }
      });
    }
  } catch (error) {}
};
