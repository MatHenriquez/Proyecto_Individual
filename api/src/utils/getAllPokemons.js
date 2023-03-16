const axios = require('axios');
const { Pokemon } = require('../db')

async function getAllPokemons() {
  try {
    let apiPokemons = [];
    let nextUrl = 'https://pokeapi.co/api/v2/pokemon';

    while (nextUrl && apiPokemons.length < 160) {
      const response = await axios.get(nextUrl);
      const pokemonsData = response.data.results;

      const pokemonPromises = pokemonsData.map(async (pokemonData) => {
        const pokemonDetails = await axios.get(pokemonData.url);
        const pokemon = pokemonDetails.data;

        return {
          ID: pokemon.id,
          Nombre: pokemon.name,
          Imagen: pokemon.sprites.front_default,
          Vida: pokemon.stats[0].base_stat,
          Ataque: pokemon.stats[1].base_stat,
          Defensa: pokemon.stats[2].base_stat,
          Velocidad: pokemon.stats[5].base_stat,
          Altura: pokemon.height,
          Peso: pokemon.weight,
        };
      });

      const pokemonsPage = await Promise.all(pokemonPromises);

      // Guardo de a 20 pokemons hasta los 160.
      apiPokemons.push(...pokemonsPage);
      nextUrl = response.data.next;
    }

    // Guardo sólo los primeros 151 pokemons.
    const kantoPokemons = apiPokemons.slice(0, 151);

    // Obtengo todos los pokemons de la DB, verificando primero que no esté vacía, así no lanza un error.
    let dbPokemons = [];
    if (typeof Pokemon !== 'undefined') {
      dbPokemons = await Pokemon.findAll({
        attributes: ['ID', 'Nombre', 'Imagen', 'Vida', 'Ataque', 'Defensa', 'Velocidad', 'Altura', 'Peso'],
      });
    }

    const allPokemons = [...kantoPokemons, ...dbPokemons];

    return allPokemons;

  } catch (error) {
    return error;
  }
}

module.exports = getAllPokemons;
