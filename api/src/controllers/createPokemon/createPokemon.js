const { Pokemon, Type } = require('../../DataBase/db');

async function createPokemon(req, res){

  const { Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, tipos } = req.body;
  
  try {
    // Crea el pokemon
    const pokemon = await Pokemon.create({
      Nombre,
      Imagen,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      Altura,
      Peso
    });
    
    // Asocia los tipos al pokemon
    // const tiposEncontrados = await Type.findAll({
    //   where: { Nombre: tipos }
    // });
    // await pokemon.addTypes(tiposEncontrados);
    
    res.status(201).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al crear el pokemon.');
  };
}

module.exports = createPokemon;