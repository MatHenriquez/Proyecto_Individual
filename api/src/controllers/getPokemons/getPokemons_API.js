const axios = require('axios');

async function getAllPokemons_API(req, res){

  const {name} = req.query;
    // Ruta para obtener los pokemons desde la API
    try {
      if(!name)
      {
      let pokemons = [];
      let nextUrl = 'https://pokeapi.co/api/v2/pokemon';

      while(nextUrl){
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
        pokemons.push(...pokemonsPage);
        nextUrl = response.data.next;
      }
      
      res.json(pokemons);
    } else {
      //Busco el pokemon en la API.
      const nombre = name? name.trim().toLowerCase() : null;
      let foundedPokemon;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    foundedPokemon = {
      ID: response.data.id,
      Nombre: response.data.name,
      Imagen: response.data.sprites.front_default,
      Vida: response.data.stats[0].base_stat,
      Ataque: response.data.stats[1].base_stat,
      Defensa: response.data.stats[2].base_stat,
      Velocidad: response.data.stats[5].base_stat,
      Altura: response.data.height,
      Peso: response.data.weight
    };
    res.json(foundedPokemon);
    }
    } catch (error) {
      console.error(error);
      res.status(404).send('Pokemon not found.');
    };
}

module.exports = getAllPokemons_API;

