import { useState } from "react";
import starterpack from "../resources/starterpacks.json";

function StarterPack() {
  const handleClick = () => {
    fetch("/pokemon/pokedata/17")
      .then((res) => res.json())
      .then((data) =>
        fetch("/api/auth/newpokemon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(data),
        })
      );
  };

  return (
    <>
      <div>
        {starterpack.starterpacks.map((pack) => (
          <h2>
            {pack.name}
            <div style={{display: "flex", margin:"2em"}}>
              {pack.pokemons.map((pokemon) => (
                <div className="cards">
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

export default StarterPack;
