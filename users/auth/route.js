const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser, getUsers, getUser, logout } = require("./auth");
const { adminAuth } = require("../middleware/auth");
const { newpokemon } = require("../pokemon/newPokemon");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser)
router.route("/getusers").get(getUsers)
router.route("/getuser").get(getUser)
router.route("/newpokemon").post(newpokemon)
router.route("/logout").get(logout)
module.exports = router;
