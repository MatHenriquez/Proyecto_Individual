const { Router } = require("express");

const getPokemons_API = require("../controllers/getPokemons/getPokemons_API");
const getPokemons_DB = require("../controllers/getPokemons/getPokemons_DB");


const findPokemonByID_API = require("../controllers/getPokemonByID/findPokemonByID_API");
const findPokemonByID_DB = require("../controllers/getPokemonByID/findPokemonByID_DB");
const createPokemon = require("../controllers/createPokemon/createPokemon");

const pokemonsRouter = Router();



//Obtener todos los pokemons o buscar por query.
pokemonsRouter.get('/API', getPokemons_API);
pokemonsRouter.get('/DB', getPokemons_DB);



// Buscar pokemon por ID.
pokemonsRouter.get('/API/:idPokemon', findPokemonByID_API);
pokemonsRouter.get('/DB/:idPokemon', findPokemonByID_DB);

//Crear un nuevo Pokemon.
pokemonsRouter.post('/create', createPokemon);

module.exports = pokemonsRouter;





