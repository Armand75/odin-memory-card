function Pokemons({pokemons, handleChoice}){
    return(
        <div className="pokemons">
            {pokemons.map(pokemon => {
                return(
                    <div key={pokemon.id} className="pokemon" onClick={() => handleChoice(pokemon.name)} >
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <div className="pokemon-name">
                        <p >{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        </div>

                    </div>
                )
            })}
        </div>
    )

}

export default Pokemons