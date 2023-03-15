const { Op } = require('sequelize');
const { Pokemon } = require('../../DataBase/db'); // Importar el modelo Pokemon


async function getPokemons_DB(req, res){

  const {name} = req.query;

  try {

    let pokemons = [];

    if(!name){
      //Obtengo todos los pokemons de la DB.
      pokemons = await Pokemon.findAll({
        attributes: ['ID', 'Nombre', 'Imagen', 'Vida', 'Ataque', 'Defensa', 'Velocidad', 'Altura', 'Peso']
      });
    } else{
      //Obtengo los pokemons que tengan el nombre solicitado.
      const foundedPokemons = await Pokemon.findAll({
        where: { Nombre: { [Op.iLike]: `%${name}%` } },
        attributes: ['ID', 'Nombre', 'Imagen', 'Vida', 'Ataque', 'Defensa', 'Velocidad', 'Altura', 'Peso']
    })

    if(foundedPokemons.length > 0){
      pokemons = [...foundedPokemons];
    } 
  }
  res.json(pokemons);

  } catch (error) {
    res.status(500).send('Internal server error.');
  };

}

module.exports = getPokemons_DB;