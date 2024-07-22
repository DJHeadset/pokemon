function PokemonList({
  pokemons,
  sortCriteria,
  setSortCriteria,
  onPokemonClick,
}) {
  const sortedPokemon = pokemons
    ?.filter((own) => own.stats[0].stat > 0 && !own.hospital.inHospital)
    .sort((a, b) => {
      switch (sortCriteria) {
        case "name":
          return a.name - b.name;
        case "level":
          return b.level - a.level;
        case "hp":
          return a.stats[0].stat - b.stats[0].stat;
        case "attack":
          return a.stats[1].stat - b.stats[1].stat;
        default:
          return 0;
      }
    });
  return (
    <div className="Own-Pokemon-Name">
      <label className="label">
        Choose your pokemon:
        <select onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="level">Sort by Level</option>
          <option value="hp">Sort by HP</option>
          <option value="attack">Sort by Attack</option>
        </select>
        {sortedPokemon?.map((own) => (
          <button
            key={own.uniqueId}
            onClick={() => onPokemonClick(own)}
            className="options"
          >
            <div className="poke-info">
              <div className="hp-bar-container">
                <progress
                  className="hp-bar"
                  value={own.stats[0].stat}
                  max={own.stats[6].stat}
                />
              </div>
              <img alt="Poke-Icon" src={own.sprites.front_default} />
              <div className="pokemon-types">
                {own.types.map((type) => (
                  <span key={type.name} className={`pokemon-type ${type.name}`}>
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="poke-info">
              <p>{own.name}</p>
              <p>Level: {own.level}</p>
              <p>Attack: {own.stats[1].stat}</p>
            </div>
          </button>
        ))}
      </label>
    </div>
  );
}

export default PokemonList;
