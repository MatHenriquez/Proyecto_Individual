const { Pokemon, Type} = require('../../DataBase/db'); 
async function getPokemonById(req, res){

    const { idPokemon } = req.params;
  
    try {
      
        const pokemon = await Pokemon.findByPk(idPokemon, {
          include: {
            model: Type,
            attributes: ['ID', 'Nombre'],
            through: { attributes: [] } // Para excluir la tabla intermedia "pokemonType".
          }
        })
        res.json(pokemon)
    }
      catch (error) {
        
      res.json({ message: 'Pokemon not found' });
    }
  }
  
  module.exports = getPokemonById;
  