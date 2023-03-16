const { Router } = require("express");

// const getPokemons_API = require("../controllers/getPokemons/getPokemons_API");
// const getPokemons_DB = require("../controllers/getPokemons/getPokemons_DB");
const getPokemons = require("../controllers/getPokemons");

const findPokemonByID = require("../controllers/findPokemonByID");
const createPokemon = require("../controllers/createPokemon");
const searchByName = require("../controllers/searchByName");

const pokemonsRouter = Router();


//Obtener todos los pokemons de la API y la DB.
pokemonsRouter.get('/', getPokemons);


//Rutas para búsqueda por nombre.
pokemonsRouter.get('/name', searchByName);

// Buscar pokemon por ID.
pokemonsRouter.get('/:idPokemon', findPokemonByID);

//Crear un nuevo Pokemon.
pokemonsRouter.post('/', createPokemon);



module.exports = pokemonsRouter;