const Mongoose = require("mongoose");

const StatSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  base_stat: {
    type: Number,
    required: true,
  },
});

const TypeSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const LevelSchema = new Mongoose.Schema({
  experience: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const PokemonSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pokeId: {
    //pokemon's species ID
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  base_experience: {
    type: Number,
    required: true,
  },
  sprites: {
    back_default: {
      type: String,
      required: true,
    },
    front_default: {
      type: String,
      required: true,
    },
  },
  stats: [StatSchema],
  types: [TypeSchema],
  capture_rate: {
    type: Number,
    required: true,
  },
  evolution_chain: {
    type: String,
    required: true,
  },
  growth_rate: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  levels: [LevelSchema],
});



const UserPokemon = Mongoose.model("userpokemon", PokemonSchema);
module.exports = UserPokemon;
