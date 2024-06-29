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
  stat: {
    type: Number,
    required: true,
  },
  EV: {
    type: Number,
    default: 0,
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
  uniqueId: {
    type: Number,
    unique: true,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  unique: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  pokeId: {
    type: String,
    required: true,
  },
  hospital: {
    inHospital: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
    },
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
  levels: [LevelSchema],
});

const UserPokemon = Mongoose.model("userpokemon", PokemonSchema);
module.exports = UserPokemon;
