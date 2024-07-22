const express = require("express");
const router = express.Router();
const { pokedata } = require("../service/fetchpokemon");
const { regions, location, city } = require("../service/mapservice");
const { randomPokemon } = require("../service/randompokemon");
const { battleSetup, attack } = require("../fight/pve");
const { joingame } = require("../fight/pvp");

router.route("/region").get(regions);
router.route("/city/:id").get(city);
router.route("/randompokemon/:id/:method").get(randomPokemon);
router.route("/location/:id").get(location);
router.route("/pokedata/:id").get(pokedata);
router.route("/battle/battlesetup").post(battleSetup);
router.route("/battle/:type").get(attack);
router.route("/pvp/joingame").post(joingame);

module.exports = router;
