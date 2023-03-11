
// #### **📍 GET | /types**

// -  Obtiene un arreglo con todos los tipos de pokemones.
// -  En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
// -  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

// Este código importa getApiData desde el archivo getApiData.js y lo ejecuta para obtener la información de todos los pokémon. Luego, utiliza el método map para crear un nuevo array que contenga solo los tipos de cada pokemon. flat se utiliza para "aplanar" este array de arrays y new Set se utiliza para eliminar duplicados. 

const { getApiData } = require('../controllers/saveApiData');
const { Router } = require("express");
const { Type } = require('../db');

const typesRouter = Router();

typesRouter.get('/typesAPI', async (req, res) => {

    try {
        const types = [];
        // Dentro del callback de la ruta, obtener los tipos desde la función getApiData.
        await getApiData().then((PokeInfo) => {
        types = [...new Set(PokeInfo.map((pokemon) => pokemon.types).flat())];
        },
        
        await Type.bulkCreate(types));

        res.status(201).json(types);

    } catch (error) {
        return res.send(error);
    }
    
});

typesRouter.get('/typesDB', async (req, res) => {

    try {

        const tipos = await Type.findAll();

        return res.json(tipos);

    } catch (error) {

        return res.send(error);

    }
    
});


module.exports = typesRouter;


