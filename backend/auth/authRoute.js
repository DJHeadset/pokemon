const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  deleteUser,
  getUsers,
  getUser,
  getPokemon,
  logout,
} = require("./auth");
const { adminAuth } = require("../middleware/auth");
const { newpokemon } = require("../pokemon/newPokemon");
const {
  updateOwnPokemon,
  pokmemonHospital,
} = require("../pokemon/updatePokemon");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/getusers").get(getUsers);
router.route("/getuser").get(getUser);
router.route("/getpokemon/:id").get(getPokemon);
router.route("/newpokemon").post(newpokemon);
router.route("/updateownpokemon").post(updateOwnPokemon);
router.route("/hospital").post(pokmemonHospital);
router.route("/logout").delete(logout);
module.exports = router;
