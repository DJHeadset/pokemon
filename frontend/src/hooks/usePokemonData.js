import { useCallback, useEffect, useState } from "react";
import decoder from "../service/Decoder";
import { useNavigate, useParams } from "react-router-dom";

const usePokemonData = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const fetchPokemonData = useCallback(async () => {
    const cookie = decoder();
    if (!cookie) {
      return null;
    } else {
      const response = await fetch(`/api/auth/getpokemon/${id}`);
      return response.json();
    }
  }, [id]);

  const getPokemonData = useCallback(async () => {
    setLoading(true);
    const pokemonData = await fetchPokemonData();
    if (!pokemonData) {
      window.alert("User is not logged in");
      navigate("/");
    } else {
      setPokemon(pokemonData);
      setLoading(false);
    }
  }, [fetchPokemonData, navigate]);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  return { loading, pokemon };
};

export default usePokemonData;
