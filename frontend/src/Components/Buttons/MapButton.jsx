import { useNavigate } from "react-router-dom";

function MapButton() {
  const navigate = useNavigate();

  return (
    <button className="pokemon-btn" onClick={() => navigate("/map")}>
      Map
    </button>
  );
}

export default MapButton;
