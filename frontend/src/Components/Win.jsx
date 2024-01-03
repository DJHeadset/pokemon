import { Link } from "react-router-dom";
import win from "../resources/pic/Win.jpg";

function Won({ goBack }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${win})` }}>
      <h1>YOU WON!!!</h1>
      <Link to={"/map"}>
        <button className="pokemon-btn" onClick={goBack}>
          BACK
        </button>
      </Link>
    </div>
  );
}

export default Won;
