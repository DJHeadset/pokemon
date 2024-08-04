import { Link } from "react-router-dom";
import lost from "../resources/pic/Lost.jpeg";

function Lost({ goBack }) {
  return (
    <div className="card" style={{ backgroundImage: `url(${lost})` }}>
      <h1>YOU LOST!!!</h1>
      <Link to={"/map"}>
        <button className="pokemon-btn" onClick={goBack}>
          BACK
        </button>
      </Link>
    </div>
  );
}

export default Lost;
