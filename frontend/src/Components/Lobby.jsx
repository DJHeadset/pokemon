import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserData from "../hooks/useUserData";
import PokemonList from "./Layout/PokemonList";

function Lobby() {
  const [sortCriteria, setSortCriteria] = useState("level");
  const { user } = useUserData();
  const navigate = useNavigate();

  return (
    <>
      <button
        className="pokemon-btn"
        style={{ position: "absolute", right: "10px" }}
      >
        BACK
      </button>
      <PokemonList
        pokemons={user?.pokemons}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        onPokemonClick={(own) =>
          navigate(`/pvp`, {
            state: { ownPokemonId: own.uniqueId },
          })
        }
      />
    </>
  );
}

export default Lobby;
