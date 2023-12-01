const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = process.env;

exports.newpokemon = async (req, res, next) => {
  const newPokemon = req.body;
  const user = req.headers.cookie.substring(5, req.headers.cookie.length);

  if (user) {
    jwt.verify(user, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: err });
      } else {
        const response = await User.findByIdAndUpdate(
          { _id: decodedToken.id },
          { $push: { pokemons: newPokemon } },
          { new: true }
        );
        return res.json(response);
      }
    });
  }
};
