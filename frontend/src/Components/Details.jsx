import Loading from "./Loading/Loading";
import usePokemonData from "../hooks/usePokemonData";

function Details() {
  const { loading, pokemon } = usePokemonData();

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="cards" key={pokemon.uniqueId} id={pokemon.uniqueId}>
          <img alt="poke-Icon" src={pokemon.sprites.front_default} />
          <div className="Poke-Name">{pokemon.name}</div>
          <div className="Poke-Stats">
            <p>Level: {pokemon.level}</p>
            <p>
              HP:{" "}
              {pokemon.hospital.inHospital
                ? "In hospital"
                : `${pokemon.stats[0].stat}/${pokemon.stats[6].stat}`}
            </p>
            <p>Attack: {pokemon.stats[1].stat}</p>
            <p>Defense: {pokemon.stats[2].stat}</p>
          </div>
          <div className="pokemon-types">
            {pokemon.types.map((type) => (
              <span key={type.name} className={`pokemon-type ${type.name}`}>
                {type.name}
              </span>
            ))}
          </div>
          <button
            className="pokemon-btn"
            onClick={() => console.log(pokemon.name)}
          >
            DETAILS
          </button>
        </div>
      </>
    );
  }
}

export default Details;
