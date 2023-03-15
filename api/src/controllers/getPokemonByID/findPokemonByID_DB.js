const { Pokemon, Type } = require('../../DataBase/db'); 
async function getPokemonById(req, res){

    const { idPokemon } = req.params;
  
    try {
      
        const pokemon = await Pokemon.findByPk(idPokemon, {
        include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [] } // Para excluir la tabla intermedia "pokemon_types".
        }
        })
        res.json(pokemon)
    }
      catch (error) {
        
      res.status(404).json({ message: 'Pokemon not found' });
    }
  }
  
  module.exports = getPokemonById;
  