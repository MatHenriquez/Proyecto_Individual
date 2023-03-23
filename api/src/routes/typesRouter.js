const { Router } = require("express");
const getTypes = require('../controllers/getTypes');

const typesRouter = Router();

typesRouter.get('/', async (req, res) =>{
    try {
        const types = await getTypes();

        res.json(types);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = typesRouter;


