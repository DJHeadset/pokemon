exports.regions = async (req, res, next) => {
  const regionData = [];
  for (let i = 1; i < 11; i++) {
    const URL = `https://pokeapi.co/api/v2/region/${i}/`;
    const response = await fetchRegionData(URL);
    regionData.push(response);
  }
  res.json(regionData);
};

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
