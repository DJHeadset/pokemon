const { fetchPokemonData } = require("./fetchpokemondata");

function getRandomLevel(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPercent() {
  return Math.floor(Math.random() * 100);
}

function sortAndRemoveDuplicates(randomPokemons) {
  randomPokemons.sort((a, b) => a.chance - b.chance);

  const uniquePokemons = [];
  const encounteredPokemons = new Set();

  randomPokemons.forEach((pokemon) => {
    const key = `${pokemon.name}-${pokemon.chance}`;
    if (!encounteredPokemons.has(key)) {
      uniquePokemons.push(pokemon);
      encounteredPokemons.add(key);
    }
  });

  return uniquePokemons;
}

function getSurfing(encounters) {
  const randomPokemons = [];
  encounters.forEach((encounter) => {
    encounter.version_details.forEach((version) => {
      version.encounter_details.forEach((detail) => {
        if (detail.method.name === "surf") {
          const min = detail.min_level;
          const max = detail.max_level;
          const pokemon = {
            name: encounter.pokemon.name,
            id: encounter.pokemon.url
              .split("/")
              .filter((segment) => segment !== "")
              .pop(),
            chance: detail.chance,
            level: getRandomLevel(min, max),
          };
          randomPokemons.push(pokemon);
        }
      });
    });
  });
  return sortAndRemoveDuplicates(randomPokemons);
}

function getFishing() {
  console.log("fishing");
}

function getPokemonSet(locationData, method) {
  const encounters = locationData.pokemon_encounters;

  switch (method) {
    case "surf":
      return getSurfing(encounters);
      break;

    case "fishing":
      return getFishing();
      break;

    default:
      break;
  }
}

function getRandomPokemon(pokeSet) {
  const random = getRandomPercent();
  console.log(random);
  const eligiblePokemons = pokeSet.filter(
    (pokemon) => pokemon.chance >= random
  );

  if (eligiblePokemons.length > 0) {
    const lowestChance = Math.min(
      ...eligiblePokemons.map((pokemon) => pokemon.chance)
    );
    const lowestChancePokemons = eligiblePokemons.filter(
      (pokemon) => pokemon.chance === lowestChance
    );
    const selectedPokemon =
      lowestChancePokemons[
        Math.floor(Math.random() * lowestChancePokemons.length)
      ];

    return selectedPokemon;
  }

  return null;
}

exports.randomPokemon = async (req, res, next) => {
  const id = req.params.id;
  const method = req.params.method;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/location-area/${id}`
    );
    const locationData = await response.json();

    const pokeSet = getPokemonSet(locationData, method);
    const selectedPokemon = getRandomPokemon(pokeSet);
    if (selectedPokemon !== null) {
      const response = await fetchPokemonData(selectedPokemon.id);
      response.level = selectedPokemon.level;
      res.send(response);
    } else {
      res.send({ message: "no pokemon found" });
    }
  } catch (error) {
    console.error("Error fetching random Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
