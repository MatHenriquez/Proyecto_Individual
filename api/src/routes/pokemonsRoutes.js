const { Router } = require("express");

const {Pokemon} = require('../db')
// const getPokemons_API = require("../controllers/getPokemons/getPokemons_API");
// const getPokemons_DB = require("../controllers/getPokemons/getPokemons_DB");
const getPokemons = require("../controllers/getPokemons");

const findPokemonByID = require("../controllers/findPokemonByID");
const createPokemon = require("../controllers/createPokemon");
const searchByName = require("../controllers/searchByName");

const pokemonsRouter = Router();


//Obtener todos los pokemons de la API y la DB.
pokemonsRouter.get('/', async (req, res) => {
    console.log("in");
    try {
        const allPokemons = await getPokemons();

        res.json(allPokemons);
    } catch (error) {
        res.status(500).send(error.message)
    }
});


//Rutas para búsqueda por nombre.
pokemonsRouter.get('/name', async (req, res) => {
    const {name} = req.query;

    try {
        const foundedPokemon = await searchByName(name);

        res.json(foundedPokemon)
        
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Buscar pokemon por ID.
pokemonsRouter.get('/:idPokemon', async (req, res) =>{
    const { idPokemon } = req.params;

    try {
        const foundedPokemon = await findPokemonByID(idPokemon);

        res.json(foundedPokemon);

    } catch (error) {
        res.status(404).send(error.message);
    }
});

//Crear un nuevo Pokemon.
pokemonsRouter.post('/', async (req, res) => {

    const { Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, tipos } = req.body;

    try {
        const createdPokemon = await createPokemon(Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso, tipos);

        res.json(createdPokemon);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

pokemonsRouter.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon !== null) {
        await pokemon.destroy();
        res.json(`Pokemon ${pokemon.Nombre} deleted correctly`);
      }
    } catch (e) {
      return res.status(404).json("Error ---> " + e);
    }
});

module.exports = pokemonsRouter;