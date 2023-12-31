const Mongoose = require("mongoose");
const UserPokemon = require("./userpokemon");

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  gold: {
    type: Number,
    default: 0,
  },
  experience: {
    type: Number,
    default: 0,
  },
  pokemons: [UserPokemon.schema],
});

const User = Mongoose.model("user", UserSchema);
module.exports = User;
