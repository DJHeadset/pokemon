import Loading from "./Loading";

function VsPokemons({ ownPokemon, enemyPokemon }) {
  return (
    <>
      <div className="own-pokemon battlecards">
        <div className="damage" id="enemyAttackNumber">
          {enemyPokemon.attack}
        </div>
        <div className="hp-bar-container">
          <progress
            className="hp-bar"
            value={ownPokemon.hp}
            max={ownPokemon.maxHp}
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
        {enemyPokemon ? (
          <>
            <div className="damage" id="attackNumber">
              {ownPokemon.attack}
            </div>
            <div className="hp-bar-container">
              <progress
                className="hp-bar"
                value={enemyPokemon.hp}
                max={enemyPokemon.maxHp}
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
