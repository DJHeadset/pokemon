const express = require("express");
const router = express.Router();
const { pokedata } = require("../utils/fetchpokemon");
const { regions, location, city } = require("../utils/mapservice");
const { randomPokemon } = require("../utils/randompokemon");
const { battleSetup, attack } = require("../controllers/pve");
const { joingame } = require("../controllers/pvp");

router.route("/region").get(regions);
router.route("/city/:id").get(city);
router.route("/randompokemon/:id/:method").get(randomPokemon);
router.route("/location/:id").get(location);
router.route("/pokedata/:id").get(pokedata);
router.route("/battle/battlesetup").post(battleSetup);
router.route("/battle/:type").get(attack);
router.route("/pvp/joingame").post(joingame);

module.exports = router;
