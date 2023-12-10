import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";


function Map() {
  const [cityList, setCityList] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchCityData = () => {
    return fetch("https://pokeapi.co/api/v2/location")
    .then((res) => res.json()
    .then((names) => names.results.map((e) => {return e.name}))
    );
  };

  useEffect(() => {
    fetchCityData().then((cities) => {
      setLoading(false);
      setCityList(cities);
    });
  }, []);
  
  if (loading) {
    return <Loading />;
  } else if (cityList) {
    return (
    <>
      <div className="location-name">
        {cityList.map((city, i) => (
          <h2 key={i}>
            <div>{city}</div>
          </h2>
        ))}
      </div>
    </>
  );
    }
}

export default Map;
