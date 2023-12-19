const express = require("express");
const router = express.Router();
const { pokedata } = require("./service/fetchpokemon");
const { regions, location } = require("./service/mapservice");

router.route("/region").get(regions);
router.route("/location/:id").get(location)
router.route("/pokedata/:id").get(pokedata);

module.exports = router;
