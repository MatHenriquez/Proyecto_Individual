const { Pokemon, Type } = require('../db');
const getApiTypes = require('../utils/saveApiTypes');


async function createPokemon(Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, tipos){



    if(!Nombre || !Imagen || !Vida || !Ataque || !Defensa || tipos.length === 0)  {
      throw new Error ('Datos faltantes.');
    } else {
      const pokemonExists = await Pokemon.findOne({ where: { Nombre: Nombre } });

      if (pokemonExists) {
        // Si el nombre de ese Pokemon ya existe, lanzamos un error.
        throw new Error('Ya existe un Pokemon con este nombre');
      }
    }
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

    const createdPokemon = {
      Nombre,
      Imagen,
      Vida,
      Ataque,
      Defensa,
      Velocidad,
      Altura,
      Peso,
      Tipos: tiposEncontrados
    }
    
    if(!createdPokemon){
      throw new Error('Error al crear el pokemon.')
    }

    return createdPokemon;

 
}

module.exports = createPokemon;