import { useNavigate } from "react-router-dom";
import starterpack from "../resources/starterpacks.json";
import { useState } from "react";
import Loading from "./Loading/Loading";

function StarterPack() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (event) => {
    setLoading(true);
    const id = event.target.id;

    try {
      for (
        let i = 0;
        i < starterpack.starterpacks[id - 1].pokemons.length;
        i++
      ) {
        const pokemonId = starterpack.starterpacks[id - 1].pokemons[i].id;

        const response = await fetch(`/pokemon/pokedata/${pokemonId}`);
        const data = await response.json();

        await fetch("/api/auth/newpokemon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(data),
        });
      }
      navigate("/user");
    } catch (error) {
      console.error("Error selecting starter pack:", error);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div>
          {starterpack.starterpacks.map((pack) => (
            <h2 key={pack.id}>
              <button className="selector" id={pack.id} onClick={handleSelect}>
                {pack.name}
              </button>
              <div style={{ display: "flex", margin: "2em" }}>
                {pack.pokemons.map((pokemon) => (
                  <div className="cards" key={pokemon.id} id={pokemon.id}>
                    <img alt="poke-Icon" src={pokemon.sprites.front_default} />
                    <div className="Poke-Name">{pokemon.name}</div>
                    <div className="Poke-Stats">
                      <p>HP: {pokemon.stats[0].base_stat}</p>
                      <p>Attack: {pokemon.stats[1].base_stat}</p>
                      <p>Defense: {pokemon.stats[2].base_stat}</p>
                    </div>
                    <div className="pokemon-types">
                      {pokemon.types.map((type) => (
                        <span
                          key={type.type.name}
                          className={`pokemon-type ${type.type.name}`}
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </h2>
          ))}
        </div>
      </>
    );
  }
}

export default StarterPack;
