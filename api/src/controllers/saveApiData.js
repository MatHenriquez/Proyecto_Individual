const axios = require('axios');
const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon';

async function getApiData(){
    // Obtener los primeros 120 pokemons.
try {
    let URL = apiEndpoint;
    let pokemons = [];

    //Hay 20 por página, asique itero las primeras 6 páginas.
    for (let i = 1; i < 6; i++) {
        const result = await axios(URL);
        const data = result.data;
        const pokemonsData = data.results;
        pokemons.push(...pokemonsData);
        URL = data.next;
      }
  
      const PokeInfo = await Promise.all(

        pokemons.map(async (pokemon) => {

          //La API devuelve el name y una URL con el resto de datos de cada pokemon.
          const pokemonDetails = await axios(pokemon.url);
          const data = pokemonDetails.data;
          const stats = data.stats;
          // Obtener el id del final de la URL.
          const id = parseInt(pokemon.url.match(/\/([0-9]*)\/$/)[1]); 

          return {
            id,
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type) => type.type.name),
            hp: stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack: stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defense: stats.find((stat) => stat.stat.name === 'defense').base_stat,
            speed: stats.find((stat) => stat.stat.name === 'speed').base_stat,
          };
        })
      );
  
      return PokeInfo;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { getApiData };