const getApiPokemons = require('../utils/getApiPokemons');
const getDbPokemons = require('../utils/getDbPokemons');

async function getPokemonById(idPokemon){

      if(!idPokemon) throw new Error('No se ingresó un id.');

      const apiPokemons = await getApiPokemons();
      const dbPokemons = await getDbPokemons();

      const foundedApiPokemon = apiPokemons.filter(pokemon => pokemon.ID == idPokemon);
      const foundedDbPokemon = dbPokemons.filter(pokemon => pokemon.ID == idPokemon);


        // Verificamos si encontramos algún Pokémon
      if(foundedApiPokemon.length > 0){
        return foundedApiPokemon;
      } else if(foundedDbPokemon.length > 0){
        return foundedDbPokemon;
      } else {
        throw new Error(`El pokemon con id ${idPokemon} no fue encontrado.`)
      }
      
  }

  


module.exports = getPokemonById;
