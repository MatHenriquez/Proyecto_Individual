const { Pokemon, Type } = require('../db');
const getApiTypes = require('../utils/saveApiTypes');


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

    //Verifico que la tabla de types esté cargada, sino la crea.

    const typeCount = await Type.count();
        if (typeCount === 0) { //Verifico si ya está cargado el modelo.
            await getApiTypes();
        }
        
    // Asocia los tipos al pokemon.
    const tiposEncontrados = await Promise.all(
      tipos.map(async (tipo) => {
        const tipoEncontrado = await Type.findOne({ where: { Nombre: tipo } });
        if (!tipoEncontrado) {
          throw new Error(`Tipo de Pokemon ${tipo} no existe`);
        }
        return tipoEncontrado;
      })
    );
    await pokemon.addTypes(tiposEncontrados);
    
    res.status(201).json({
      Nombre,
      Imagen,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      Altura,
      Peso,
      Tipos: tiposEncontrados
    });
  } catch (error) {
    res.status(500).send('Hubo un error al crear el pokemon.');
  };
}

module.exports = createPokemon;