const getApiPokemons = require('./getApiPokemons');
const getDbPokemons = require('./getDbPokemons');

async function searchOnePokemon(name){ //La uson en searchByName y en createPokemon (Para verificar si ya existe).

        const apiPokemons = await getApiPokemons();
        const dbPokemons = await getDbPokemons();

        const myPokemons = [...apiPokemons, ...dbPokemons];

        // Buscar los objetos en el arreglo myPokemons cuyo atributo Nombre incluya al valor de name que llega por query
        // const foundedPokemons = myPokemons.filter(pokemon => pokemon.Nombre.toLowerCase().includes(name.toLowerCase()));

        const foundedPokemons = myPokemons.filter(pokemon => pokemon.Nombre.toLowerCase() === name.toLowerCase());

        return(foundedPokemons);

        
}


module.exports = searchOnePokemon;
