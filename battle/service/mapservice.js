const fetchRegionData = async (URL) => {
  try {
    const regionResponse = await fetch(URL);
    const data = await regionResponse.json();

    const { id, locations, name } = data;
    return { id, locations, name };
  } catch (error) {
    console.error("Error fetching region data:", error);
  }
};

const fetchAreaData = async (URL) => {
  try {
    const areaResponse = await fetch(URL);
    const data = await areaResponse.json();
    const areaData = {
      name: data.name,
      areas: data.areas,
    };
    return areaData;
  } catch (error) {
    console.error("Error fetching region data:", error);
  }
};

const encounterMethod = (method) => {
  return method.toLowerCase().includes("rod") ? "fishing" : method;
};

const uniqueEncounterMethods = (areas) => {
  const uniqueEncounterMethods = [
    ...new Set(
      areas?.pokemons.flatMap((pokemon) =>
        pokemon.encounter.map((detail) => encounterMethod(detail.method))
      )
    ),
  ];
  return uniqueEncounterMethods;
};

exports.regions = async (req, res, next) => {
  const regionData = [];
  for (let i = 1; i < 11; i++) {
    const URL = `https://pokeapi.co/api/v2/region/${i}/`;
    const response = await fetchRegionData(URL);
    regionData.push(response);
  }
  res.json(regionData);
};

exports.location = async (req, res, next) => {
  const URL = `https://pokeapi.co/api/v2/location/${req.params.id}/`;
  const data = await fetchAreaData(URL);
  res.json(data);
};

exports.city = async (req, res, next) => {
  const id = req.params.id;
  const response = await fetch(`https://pokeapi.co/api/v2/location-area/${id}`);
  const locationData = await response.json();

  const formattedAreaData = {
    pokemons: locationData.pokemon_encounters.map((encounter) => {
      const encounterDetails =
        encounter.version_details[0].encounter_details.map((detail) => ({
          method: detail.method.name,
        }));

      return {
        name: encounter.pokemon.name,
        encounter: encounterDetails,
      };
    }),
  };

  const data = {
    name: locationData.name,
    encounters: uniqueEncounterMethods(formattedAreaData),
  };

  res.send(data);
};
