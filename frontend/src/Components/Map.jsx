import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Map() {
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [areas, setAreas] = useState(null);

  const navigate = useNavigate();

  const handleSelectCity = async (e) => {
    const id = e.url
      .split("/")
      .filter((segment) => segment !== "")
      .pop();
    const response = await fetch(`pokemon/location/${id}`);
    const areaData = await response.json();
    setAreas(areaData);
  };

  const handleSelectArea = async (e) => {
    const id = e.url
      .split("/")
      .filter((segment) => segment !== "")
      .pop();
    navigate(`/city/${id}`);
  };

  const fetchRegions = async () => {
    const response = await fetch("pokemon/region");
    const regionData = await response.json();
    return regionData;
  };

  useEffect(() => {
    fetchRegions().then((regions) => {
      setLoading(false);
      setRegions(regions);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else if (regions && !selectedRegion) {
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>Regions</h2>
        <div className="location-name">
          {regions.map((region) => (
            <h2 key={region.id} onClick={() => setSelectedRegion(region)}>
              {region.name}
            </h2>
          ))}
        </div>
      </div>
    );
  } else if (selectedRegion && !areas) {
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Cities in {selectedRegion.name}
          <button
            className="pokemon-btn"
            onClick={() => setSelectedRegion(null)}
          >
            BACK
          </button>
        </h2>
        <div className="location-name">
          {selectedRegion.locations.map((city, i) => (
            <h2 key={i} onClick={() => handleSelectCity(city)}>
              {city.name}
            </h2>
          ))}
        </div>
      </div>
    );
  } else if (areas) {
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "space-between" }}>
          Areas in {areas.name}
          <button className="pokemon-btn" onClick={() => setAreas(null)}>
            BACK
          </button>
        </h2>
        <div className="location-name">
          {areas.areas.map((area, i) => (
            <h2 key={i} onClick={() => handleSelectArea(area)}>
              {area.name}
            </h2>
          ))}
        </div>
      </div>
    );
  }
}

export default Map;
