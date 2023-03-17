const getApiPokemons = require('../utils/getApiPokemons');
const getDbPokemons = require('../utils/getDbPokemons');

async function showAllPokemons() {
  
    const apiPokemons = await getApiPokemons();
    const dbPokemons = await getDbPokemons();

    const allPokemons = [...apiPokemons, ...dbPokemons];

    if(allPokemons) {
      return allPokemons;
    } else {
      throw new Error('Error obteniendo los pokemons.')
    }

  
}

module.exports = showAllPokemons;
