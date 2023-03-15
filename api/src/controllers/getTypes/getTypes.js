const getApiTypes = require('./saveAPiTypes');
const { Type } = require('../../DataBase/db');

async function getTypes (req, res){
    try {

        const typeCount = await Type.count();
        if (typeCount === 0) { //Verifico si ya está cargado el modelo.
            await getApiTypes();
        }
        const types = await Type.findAll({
            attributes: ['ID', 'Nombre'],
        });
        res.json(types);
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}

module.exports = getTypes;
