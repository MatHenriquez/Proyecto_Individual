const { Pokemon, Type } = require('../db');
const getApiTypes = require('./saveApiTypes');

async function getDbPokemons(){

    //Verifico que la tabla de types esté cargada, sino la crea.

    const typeCount = await Type.count();
    if (typeCount === 0) { //Verifico si ya está cargado el modelo.
        await getApiTypes();
    }

        // Obtengo todos los pokemons de la DB, verificando primero que no esté vacía, así no lanza un error.
        let dbPokemons = [];
        if (typeof Pokemon !== 'undefined') {
        dbPokemons = await Pokemon.findAll({
            attributes: ['ID', 'Nombre', 'Imagen', 'Vida', 'Ataque', 'Defensa', 'Velocidad', 'Altura', 'Peso'],
            include: {
                model: Type,
                attributes: ['Nombre'],
                through: {
                  attributes: [] // Este atributo se utiliza para evitar que se incluyan las columnas adicionales de la tabla intermedia
                }
            }
        });
        }

        

        //Añado a cada pokemon del arreglo dbPokemon, sus tipos correspondientes.

        return dbPokemons;
   

}

module.exports = getDbPokemons;