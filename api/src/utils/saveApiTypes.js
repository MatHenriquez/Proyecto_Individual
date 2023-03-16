const axios = require('axios');
const { Type } = require('../db');

async function getApiTypes() {
  try {
    let url = 'https://pokeapi.co/api/v2/type';
    let types = [];

    //Hago esta lógica por si algún día añaden más types a la API.
    while (url) {
      const response = await axios.get(url);
      types.push(...response.data.results.map(type => type.name));
      url = response.data.next;
    }

    // Eliminamos duplicados y guardamos los nombres de los tipos de Pokémon en el modelo Type de nuestra base de datos pokemon.
    const uniqueTypes = [...new Set(types)];
    for (const name of uniqueTypes) {
      await Type.create({ Nombre: name });
    }
  } catch (error) {
    return error;
  }
}

module.exports = getApiTypes;
