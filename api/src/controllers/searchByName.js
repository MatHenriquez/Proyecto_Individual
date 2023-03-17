const getApiPokemons = require('../utils/getApiPokemons');
const getDbPokemons = require('../utils/getDbPokemons');

async function searchByName(name){

    
        if(!name) throw new Error('Debe ingresar un nombre.');

        const apiPokemons = await getApiPokemons();
        const dbPokemons = await getDbPokemons();

        const myPokemons = [...apiPokemons, ...dbPokemons];

        // Buscar los objetos en el arreglo myPokemons cuyo atributo Nombre incluya al valor de name que llega por query
        const foundedPokemons = myPokemons.filter(pokemon => pokemon.Nombre.toLowerCase().includes(name.toLowerCase()));

        if(!foundedPokemons) throw new Error(`El pokemon ${name} no existe.`)
        return(foundedPokemons);

        
}


module.exports = searchByName;

