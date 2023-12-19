import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading/Loading";

function City() {
  const [areas, setAreas] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchLocations = async (id) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/location-area/${id}`
    );
    const locationData = await response.json();
    //console.log(locationData);

    const formattedAreaData = {
      name: locationData.name,
      pokemons: locationData.pokemon_encounters.map((encounter) => {
        const encounterDetails =
          encounter.version_details[0].encounter_details.map((detail) => ({
            chance: detail.chance,
            min_level: detail.min_level,
            max_level: detail.max_level,
            method: detail.method.name,
          }));

        return {
          name: encounter.pokemon.name,
          encounter: encounterDetails,
        };
      }),
    };

    console.log(formattedAreaData);
    return formattedAreaData;
  };

  const displayEncounterMethod = (method) => {
    return method.toLowerCase().includes("rod") ? "fishing" : method;
  };

  const uniqueEncounterMethods = [
    ...new Set(
      areas?.pokemons.flatMap((pokemon) =>
        pokemon.encounter.map((detail) => detail.method.toLowerCase())
      )
    ),
  ];

  useEffect(() => {
    fetchLocations(id).then((location) => {
      setLoading(false);
      setAreas(location);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div>{areas.name}</div>
        {uniqueEncounterMethods.map((method, index) => (
          <button key={index}>{displayEncounterMethod(method)}</button>
        ))}
      </>
    );
  }
}

export default City;
