const getAllPokemons = require('../utils/getAllPokemons');

async function showAllPokemons(req, res) {
  try {
    const allPokemons = await getAllPokemons();
    res.json(allPokemons);
  } catch (error) {
    res.status(500).send('Error obteniendo los pokemons.');
  }
}

module.exports = showAllPokemons;
