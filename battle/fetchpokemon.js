const express = require("express")

const app = express()
app.use(express.json({ limit: '25mb' }));
const PORT = 5001
app.listen(PORT, () =>
console.log(`Server Connected to port ${PORT}`)
)

app.get("/pokemon/pokedata/:id", async (req, res) => {

  const id = req.params.id
  try {
    const response = await fetchPokemonData(id);
    res.json(response);
  } catch (error) {
    console.error('Error in /welcome route:', error);
    res.status(500).send('Internal Server Error');
  }
});

const fetchPokemonData = async (pokemonId) => {
    try {
      // Fetch data for the main Pokémon
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
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
  
      const pokemonEntry = {
        name: pokemonData.name,
        pokeId: speciesData.id.toString(),
        species: speciesData.name,
        base_experience: pokemonData.base_experience,
        sprites: {
          back_default: pokemonData.sprites.back_default,
          front_default: pokemonData.sprites.front_default,
        },
        stats: pokemonData.stats,
        types: pokemonData.types,
        capture_rate: speciesData.capture_rate,
        evolution_chain: speciesData.evolution_chain.url,
        growth_rate: {
          name: growthRateData.name,
          url: speciesData.growth_rate.url,
        },
        levels: growthRateData.levels,
      };
      return(pokemonEntry)
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };
  