const getApiTypes = require('../utils/saveApiTypes');
const { Type } = require('../db');

async function getTypes (){
    
        //Verifico que la tabla de types esté cargada, sino la crea.

        const typeCount = await Type.count();
        if (typeCount === 0) { //Verifico si ya está cargado el modelo.
            await getApiTypes();
        }
        
        const types = await Type.findAll({
            attributes: ['ID', 'Nombre'],
        });

        if(!types) throw new Error('Error obteniendo los tipos de pokemons.')

        return(types);

   
}

module.exports = getTypes;
