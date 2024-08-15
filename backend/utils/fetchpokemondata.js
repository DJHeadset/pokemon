const fetch = require("node-fetch");

exports.fetchPokemonData = async (pokemonId) => {
  try {
    // Fetch data for the main Pokémon
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    );
    const pokemonData = await pokemonResponse.json();

    // Fetch data for the Pokémon species
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();

    // Fetch data for the evolution chain
    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionChainData = await evolutionChainResponse.json();

    // Fetch data for the growth rate
    const growthRateResponse = await fetch(speciesData.growth_rate.url);
    const growthRateData = await growthRateResponse.json();

    //creating stats
    const stats = pokemonData.stats.map((apiStat) => ({
      name: apiStat.stat.name,
      base_stat: apiStat.base_stat,
      stat: apiStat.base_stat,
    }));
    stats.push({
      name: "maxHp",
      base_stat: pokemonData.stats[0].base_stat,
      stat: pokemonData.stats[0].base_stat,
    });

    //creating types
    const types = pokemonData.types.map((apiType) => ({
      name: apiType.type.name,
    }));

    const pokemonEntry = {
      name: pokemonData.name,
      pokeId: speciesData.id.toString(),
      hospital: {
        inHospital: false,
        startTime: Date.now(),
      },
      species: speciesData.name,
      base_experience: pokemonData.base_experience,
      sprites: {
        back_default: pokemonData.sprites.back_default,
        front_default: pokemonData.sprites.front_default,
      },
      stats: stats,
      types: types,
      capture_rate: speciesData.capture_rate,
      evolution_chain: speciesData.evolution_chain.url,
      levels: growthRateData.levels,
    };
    return pokemonEntry;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};
