const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemons = require('./pokemonsRoutes.js')
const types = require('./getTypes.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemons)
router.use('/types', types)


module.exports = router;

