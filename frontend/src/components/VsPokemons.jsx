import Loading from "./Loading";

function VsPokemons({
  ownPokemon,
  ownPokemonStats,
  enemyPokemon,
  enemyPokemonStats,
}) {
  return (
    <>
      <div className="own-pokemon battlecards">
        <div className="damage" id="enemyAttackNumber">
          {ownPokemonStats.attack}
        </div>
        <div className="hp-bar-container">
          <progress
            className="hp-bar"
            value={ownPokemonStats.hp}
            max={ownPokemonStats.maxHp}
          />
        </div>
        <img
          className="img"
          alt="Poke-Icon"
          src={ownPokemon.sprites.back_default}
        />
        <div className="Poke-Name">{ownPokemon.name}</div>
      </div>
      <div className="enemy-pokemon battlecards">
        {enemyPokemonStats ? (
          <>
            <div className="damage" id="attackNumber">
              {enemyPokemonStats.attack}
            </div>
            <div className="hp-bar-container">
              <progress
                className="hp-bar"
                value={enemyPokemonStats.hp}
                max={enemyPokemonStats.maxHp}
              />
            </div>
            <img
              className="img"
              alt="Poke-Icon"
              src={enemyPokemon.sprites.front_default}
            />
            <div className="Poke-Name">{enemyPokemon.name}</div>
          </>
        ) : (
          <>
            <h2>Waiting for another player</h2>
            <Loading />
          </>
        )}
      </div>
    </>
  );
}

export default VsPokemons;
