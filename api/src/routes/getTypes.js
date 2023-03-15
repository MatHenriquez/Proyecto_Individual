

const { Router } = require("express");
const { Type } = require('../DataBase/models/Type');
const axios = require('axios');

const typesRouter = Router();

const typesUrl = 'https://pokeapi.co/api/v2/type/';

// //¿Uso async await?
// axios.get(typesUrl)
//     .then((response) => {
//         const types = response.data.results;
//         types.forEach((type) => {
//             Type.create({
//                 name: type.name
//             });
//         });
//     })
//     .catch((err) => res.json('Error getting types', err));

// // typesRouter.get('/typesAPI', async (req, res) => {

// //     try {
// //         const types = [];
// //         // Dentro del callback de la ruta, obtener los tipos desde la función getApiData.
// //         await getApiData().then((PokeInfo) => {
// //         types = [...new Set(PokeInfo.map((pokemon) => pokemon.types).flat())];
// //         },
        
// //         await Type.bulkCreate(types));

// //         res.status(201).json(types);

// //     } catch (error) {
// //         return res.send(error);
// //     }
    
// // });
// typesRouter.get('/types', async (req, res) => {
//     await Type.findAll()
//         .then((types) => {
//             const typeNames = types.map((type) => type.name);
//             res.send(typeNames);
//         })
//         .catch((err) => console.log('Error getting types', err));
// });

// typesRouter.get('/types', async (req, res) => {

//     try {

//         const tipos = await Type.findAll();

//         return res.json(tipos);

//     } catch (error) {

//         return res.send(error);

//     }
    
// });


module.exports = typesRouter;


