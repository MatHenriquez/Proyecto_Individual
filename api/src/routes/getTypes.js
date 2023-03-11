
// #### **📍 GET | /types**

// -  Obtiene un arreglo con todos los tipos de pokemones.
// -  En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
// -  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

// Este código importa getApiData desde el archivo getApiData.js y lo ejecuta para obtener la información de todos los pokémon. Luego, utiliza el método map para crear un nuevo array que contenga solo los tipos de cada pokemon. flat se utiliza para "aplanar" este array de arrays y new Set se utiliza para eliminar duplicados. 

const { getApiData } = require('../controllers/saveApiData');
const { Router } = require("express");

const typesRouter = Router();

typesRouter.get('/types', (req, res) => {

    // Dentro del callback de la ruta, obtener los tipos desde la función getApiData.

    getApiData().then((PokeInfo) => {
        const types = [...new Set(PokeInfo.map((pokemon) => pokemon.types).flat())];
        });

    //Acá código para guardar los tipos en una base de datos usando sequelize. 
    res.status(201).json(types);
})




