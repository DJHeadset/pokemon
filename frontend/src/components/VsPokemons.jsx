import Loading from "./Loading";

function VsPokemons({ ownPokemon, enemyPokemon }) {
  return (
    <>
      <div className="own-pokemon battlecards">
        {enemyPokemon ? (
          <div
            className="damage"
            id="enemyAttackNumber"
            style={{ visibility: enemyPokemon.attack ? "visible" : "hidden" }}
          >
            {enemyPokemon.attack}
          </div>
        ) : (
          <></>
        )}
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
            <div
              className="damage"
              id="attackNumber"
              style={{ visibility: ownPokemon.attack ? "visible" : "hidden" }}
            >
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
