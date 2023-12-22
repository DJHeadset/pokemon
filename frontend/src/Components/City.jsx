import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading/Loading";

function City() {
  const [methods, setMethods] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchCity = async (id) => {
    console.log(id);
    const response = await fetch(`/pokemon/city/${id}`);
    const cityData = await response.json();
    return cityData;
  };

  const handleClick = (method) => {
    console.log(method);
  };

  useEffect(() => {
    fetchCity(id).then((methods) => {
      setLoading(false);
      setMethods(methods);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div>{methods.name}</div>
        {methods.encounters.map((method, index) => (
          <button key={index} onClick={() => handleClick(method)}>
            {method}
          </button>
        ))}
      </>
    );
  }
}

export default City;
