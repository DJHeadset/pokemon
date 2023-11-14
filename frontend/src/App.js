import { useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import Locations from "./Components/Locations";

function App() {
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }

  return <Locations cityList={cityList} />;
}

export default App;
