import { useEffect, useState } from "react"


function PokemonData() {

    const [pokemonData, setPokemonData] = useState(null)

    if(pokemonData){
        console.log(pokemonData)
    }

    useEffect(() => {
        fetch("/pokemon/pokedata/")
        .then((res) => res.json())
        .then((data) => setPokemonData(data))
    }, [])

    return (
        pokemonData && (
        <>
        <div>DATA</div>
        <div>{pokemonData.name}</div>
        </>
        )
    )
}

export default PokemonData