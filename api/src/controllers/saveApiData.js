const axios = require('axios');
const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon';

async function getApiData(){
    // Obtener los primeros 120 pokemons
try {
    let URL = apiEndpoint;
    let pokemons = [];

    //Hay 20 por página, asique itero las primeras 20 páginas.
    for (let i = 1; i < 10; i++) {

        const result = await axios(URL);
        const data = result.data;
        const pokemones = data.results;

        pokemons.push(...pokemones);
        URL = data.next;
      }

      const format = pokemons.map((poke) => {

        return {
            
            name: poke.name,
            URL: poke.url

            // ID: poke.id,
            // Nombre: poke.name,
            // Imagen: poke.,
            // Vida: poke.,
            // Ataque: poke.,
            // Defensa: poke.,
            // Velocidad: poke.,
            // Altura: poke.,
            // Peso: poke.,

      };
      
    });

      return format;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { getApiData };