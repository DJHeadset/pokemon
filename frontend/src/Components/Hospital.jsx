import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../service/userdata";
import Loading from "./Loading/Loading";

function Hospital() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadCounter, setReloadCounter] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/auth/logout");
    navigate("/");
  };

  async function updatePokemon(pokemon) {
    await fetch("/api/auth/hospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(pokemon),
    }).then(setReloadCounter(reloadCounter + 1));
  }

  function handleRelease(pokemon) {
    pokemon.hospital.inHospital = false;
    console.log(getHp(pokemon));
    pokemon.stats[0].stat = getHp(pokemon);
    updatePokemon(pokemon);
  }

  function handleSendToHospital(pokemon) {
    pokemon.hospital.inHospital = true;
    pokemon.hospital.startTime = new Date();
    updatePokemon(pokemon);
  }

  function getHp(pokemon) {
    const currentTime = Date.now();
    const startTime = pokemon.hospital.startTime
      ? new Date(pokemon.hospital.startTime).getTime()
      : currentTime;
    const elapsedTimeInMinutes = Math.floor(
      (currentTime - startTime) / (1000 * 60)
    );

    let newHp = pokemon.stats[0].stat + elapsedTimeInMinutes;
    if (newHp > pokemon.stats[6].stat) {
      newHp = pokemon.stats[6].stat;
    }

    return newHp;
  }

  const getUserData = async () => {
    const cookie = await fetchUserData();
    if (cookie === null) {
      window.alert("user is not logged in");
      navigate("/");
    } else {
      setLoading(false);
      setUser(cookie);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <Loading />;
  } else if (user) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <button className="pokemon-btn" onClick={() => handleLogout()}>
              Logout
            </button>
            <button className="pokemon-btn" onClick={() => navigate("/map")}>
              Map
            </button>
          </div>
        </div>
        <div>Hospital</div>
        <div>In hospital</div>
        <div style={{ display: "flex", flexWrap: "wrap", margin: "2em" }}>
          {user.pokemons.map((pokemon) =>
            pokemon.hospital.inHospital ? (
              <div className="cards" key={pokemon.id} id={pokemon.id}>
                <img alt="poke-Icon" src={pokemon.sprites.front_default} />
                <div className="Poke-Name">{pokemon.name}</div>
                <div className="Poke-Stats">
                  <p>
                    HP: {getHp(pokemon)}/{pokemon.stats[6].stat}
                  </p>
                </div>
                <button
                  className="pokemon-btn"
                  onClick={() => console.log(pokemon.name)}
                >
                  DETAILS
                </button>
                <button
                  className="pokemon-btn"
                  onClick={() => handleRelease(pokemon)}
                >
                  RELEASE
                </button>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div>Not in hospital</div>
        <div style={{ display: "flex", flexWrap: "wrap", margin: "2em" }}>
          {user.pokemons.map((pokemon) =>
            pokemon.hospital.inHospital ? (
              ""
            ) : (
              <div className="cards" key={pokemon.id} id={pokemon.id}>
                <img alt="poke-Icon" src={pokemon.sprites.front_default} />
                <div className="Poke-Name">{pokemon.name}</div>
                <div className="Poke-Stats">
                  <p>
                    HP: {pokemon.stats[0].stat}/{pokemon.stats[6].stat}
                  </p>
                </div>
                <button
                  className="pokemon-btn"
                  onClick={() => console.log(pokemon.name)}
                >
                  DETAILS
                </button>
                <button
                  className="pokemon-btn"
                  onClick={() => handleSendToHospital(pokemon)}
                >
                  Send to hospital
                </button>
              </div>
            )
          )}
        </div>
      </>
    );
  }
}

export default Hospital;
