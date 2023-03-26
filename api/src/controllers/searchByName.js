const searchOnePokemon = require('../utils/searchOnePokemon');

async function searchByName(name){

    
        if(!name) throw new Error('Debe ingresar un nombre.');

        const foundedPokemon = await searchOnePokemon(name);

        if(foundedPokemon[0])
        {
                return foundedPokemon[0];
        } else {
                throw new Error(`El pokemon ${name} no existe.`)
        }
}


module.exports = searchByName;

