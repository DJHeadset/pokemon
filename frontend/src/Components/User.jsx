import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../service/userdata";

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokeActive, setPokeActive] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/auth/logout");
    navigate("/");
  };

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
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Username: {user.username}</label>
            <label>Gold: {user.gold}</label>
            <label>Experience: {user.experience}</label>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {user.role === "admin" && (
              <button
                className="pokemon-btn"
                onClick={() => navigate("/admin")}
              >
                ADMIN PAGE
              </button>
            )}
            <button className="pokemon-btn" onClick={() => handleLogout()}>
              Logout
            </button>
            <button className="pokemon-btn" onClick={() => navigate("/map")}>
              Map
            </button>
            <button
              className="pokemon-btn"
              onClick={() => setPokeActive(!pokeActive)}
            >
              Pokemons
            </button>
          </div>
        </div>
        <div>
          {pokeActive ? (
            <div style={{ display: "flex", flexWrap: "wrap", margin: "2em" }}>
              {user.pokemons.map((pokemon) => (
                <div className="cards" key={pokemon.id} id={pokemon.id}>
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
                      <span
                        key={type.name}
                        className={`pokemon-type ${type.name}`}
                      >
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
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default User;
