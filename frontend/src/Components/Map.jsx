import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import "../App.css";

function Map() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (city) => {
    console.log(city);
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
  } else if (regions) {
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>Regions</h2>
        <div className="location-name">
          {regions.map((region) => (
            <h2 key={region.id} onClick={() => handleClick(region)}>
              {region.name}
            </h2>
          ))}
        </div>
      </div>
    );
  }
}

export default Map;
