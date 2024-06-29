const { fetchPokemonData } = require("./fetchpokemondata");

exports.pokedata = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await fetchPokemonData(id);
    res.json(response);
  } catch (error) {
    console.error("Error in /welcome route:", error);
    res.status(500).send("Internal Server Error");
  }
};
