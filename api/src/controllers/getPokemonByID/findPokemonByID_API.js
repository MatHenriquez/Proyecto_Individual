const axios = require('axios');

async function getPokemonById(req, res){

  const { idPokemon } = req.params;
  const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

  try {
      const response = await axios.get(urlPokemon);
      const apiPokemon = response.data;
      const pokemon = {
        ID: apiPokemon.id,
        Nombre: apiPokemon.name,
        Imagen: apiPokemon.sprites.front_default,
        Altura: apiPokemon.height,
        Peso: apiPokemon.weight,
        Vida: apiPokemon.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        Ataque: apiPokemon.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        Defensa: apiPokemon.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        Velocidad: apiPokemon.stats.find((stat) => stat.stat.name === 'speed').base_stat,
      };
      
        // Si el pokemon fue encontrado, devolver sus datos en un objeto JSON.
        res.json(pokemon);
    
    }
    catch (error) {
      
    res.json({ message: 'Pokemon not found' });
  }
}

module.exports = getPokemonById;
