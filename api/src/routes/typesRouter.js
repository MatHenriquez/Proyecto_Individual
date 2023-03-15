const { Router } = require("express");
const getTypes = require('../controllers/getTypes/getTypes');

const typesRouter = Router();

typesRouter.get('/', getTypes);

module.exports = typesRouter;


