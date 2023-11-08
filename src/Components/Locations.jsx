import { Link } from "react-router-dom";
import "../App.css";

function Locations({ cityList, selectCity }) {
  return (
    <>
      <div className="location-title"> Locations: </div>
      <div className="location-name">
        {cityList.map((city, i) => (
          <h2 key={i}>
            <Link to={`/enemy/${i + 1}`}>{city}</Link>
          </h2>
        ))}
      </div>
    </>
  );
}

export default Locations;
