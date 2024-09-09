const fetch = require("node-fetch");

const { calculateStats } = require("./calculatestats");
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

function getPokemonByMethod(encounters, method) {
  const randomPokemons = [];
  encounters.forEach((encounter) => {
    encounter.version_details.forEach((version) => {
      version.encounter_details.forEach((detail) => {
        if (detail.method.name === method) {
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
  return randomPokemons;
}

function getWater(encounters) {
  const pokeSet = [];
  pokeSet.push(...getPokemonByMethod(encounters, "surf"));
  pokeSet.push(...getPokemonByMethod(encounters, "surf-spots"));
  pokeSet.push(...getPokemonByMethod(encounters, "seaweed"));
  pokeSet.push(...getPokemonByMethod(encounters, "roaming-water"));
  return pokeSet;
}

function getWalk(encounters) {
  const pokeSet = [];
  pokeSet.push(...getPokemonByMethod(encounters, "walk"));
  pokeSet.push(...getPokemonByMethod(encounters, "dark-grass"));
  pokeSet.push(...getPokemonByMethod(encounters, "grass-spots"));
  pokeSet.push(...getPokemonByMethod(encounters, "cave-spots"));
  pokeSet.push(...getPokemonByMethod(encounters, "bridge-spots"));
  pokeSet.push(...getPokemonByMethod(encounters, "yellow-flowers"));
  pokeSet.push(...getPokemonByMethod(encounters, "purple-flowers"));
  pokeSet.push(...getPokemonByMethod(encounters, "red-flowers"));
  pokeSet.push(...getPokemonByMethod(encounters, "rough-terrain"));
  pokeSet.push(...getPokemonByMethod(encounters, "roaming-grass"));
  return pokeSet;
}

function getHeadbutt(encounters) {
  const pokeSet = [];
  pokeSet.push(...getPokemonByMethod(encounters, "headbutt"));
  pokeSet.push(...getPokemonByMethod(encounters, "headbutt-low"));
  pokeSet.push(...getPokemonByMethod(encounters, "headbutt-normal"));
  pokeSet.push(...getPokemonByMethod(encounters, "headbutt-high"));
  return pokeSet;
}

function getFishing(encounters) {
  const pokeSet = [];
  pokeSet.push(...getPokemonByMethod(encounters, "super-rod"));
  pokeSet.push(...getPokemonByMethod(encounters, "good-rod"));
  pokeSet.push(...getPokemonByMethod(encounters, "old-rod"));
  pokeSet.push(...getPokemonByMethod(encounters, "super-rod-spots"));
  pokeSet.push(...getPokemonByMethod(encounters, "feebas-tile-fishing"));
  return pokeSet;
}

function getGift(encounters) {
  const pokeSet = [];
  pokeSet.push(...getPokemonByMethod(encounters, "gift"));
  pokeSet.push(...getPokemonByMethod(encounters, "gift-egg"));
  pokeSet.push(...getPokemonByMethod(encounters, "only-one"));
  const pokeSetWithUnique = pokeSet.map((pokemon) => ({
    ...pokemon,
    unique: true,
  }));

  return pokeSetWithUnique;
}

function getSudowoodo(encounters) {
  const pokeSet = [];
  pokeSet.push(...getPokemonByMethod(encounters, "squirt-bottle"));
  pokeSet.push(...getPokemonByMethod(encounters, "wailmer-pail"));
  return pokeSet;
}

const methodFunctions = {
  water: getWater,
  walk: getWalk,
  headbutt: getHeadbutt,
  fishing: getFishing,
  gift: getGift,
  Sudowoodo: getSudowoodo,
};

function getPokemonSet(encounters, method) {
  const methodFunction = methodFunctions[method] || getPokemonByMethod;
  return methodFunction(encounters, method);
}

function getRandomPokemon(pokeSet) {
  const random = getRandomPercent();
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
  if (method === "Hospital" || method === "PVP") {
    res.send({ message: method });
  } else {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/location-area/${id}`
      );
      const locationData = await response.json();

      const pokeSet = getPokemonSet(locationData.pokemon_encounters, method);
      const sortedPokeSet = sortAndRemoveDuplicates(pokeSet);
      const selectedPokemon = getRandomPokemon(sortedPokeSet);
      if (selectedPokemon !== null) {
        const response = await fetchPokemonData(selectedPokemon.id);
        response.level = selectedPokemon.level;
        response.unique = selectedPokemon.unique;
        const levelledUpPokemon = calculateStats(response);
        res.send({
          message: `A wild ${response.name} appeared`,
          pokemon: levelledUpPokemon,
        });
      } else {
        res.send({ message: "no pokemon found" });
      }
    } catch (error) {
      console.error("Error fetching random Pokemon:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
