const express = require("express");
const router = express.Router();
const { pokedata } = require("./service/fetchpokemon");
const { regions, location, city } = require("./service/mapservice");

router.route("/region").get(regions);
router.route("/city/:id").get(city)
router.route("/location/:id").get(location)
router.route("/pokedata/:id").get(pokedata);

module.exports = router;
