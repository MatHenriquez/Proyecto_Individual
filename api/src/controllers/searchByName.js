const getAllPokemons = require('../utils/getAllPokemons')


async function searchByName(req, res){

  const {name} = req.query;

    try {
        if(!name) throw new Error('Debe ingresar un nombre.');

        const myPokemons = await getAllPokemons();

        // Buscar los objetos en el arreglo myPokemons cuyo atributo Nombre sea igual al valor de name que llega por query
        const foundPokemons = myPokemons.filter(pokemon => pokemon.Nombre.toLowerCase() === name.toLowerCase());

        res.json(foundPokemons);

        } catch (error) {
            res.send(error.message);
    };
}


module.exports = searchByName;

