const getAllPokemons = require('../utils/getAllPokemons');

async function getPokemonById(req, res){

  const { idPokemon } = req.params;

  try {

    if(!idPokemon) throw new Error('ID inválido.');

    const pokemons = await getAllPokemons();

    const foundedPokemon = pokemons.filter(pokemon => pokemon.ID == idPokemon);

    if(foundedPokemon.length === 0) throw new Error('Pokemon not found.');
    // Si el pokemon fue encontrado, devolver sus datos en un objeto JSON.
    res.json(foundedPokemon);
    
    }
  catch (error) {
      
    res.json(error.message);
  }
}

module.exports = getPokemonById;
