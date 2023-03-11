const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

// ### **🖱 BACK-END**

// Para esta parte deberás construir un servidor utilizando **NodeJS** y **Express**. Tendrás que conectarlo con tu base de datos mediante **Sequelize**.

// Tu servidor deberá contar con las siguientes rutas:

// #### **📍 GET | /pokemons**

// -  Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

// #### **📍 GET | /pokemons/:idPokemon**

// -  Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
// -  El pokemon es recibido por parámetro (ID).
// -  Tiene que incluir los datos del tipo de pokemon al que está asociado.
// -  Debe funcionar tanto para los pokemones de la API como para los de la base de datos.

// #### **📍 GET | /pokemons/name?="..."**

// -  Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
// -  Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// -  Si no existe el pokemon, debe mostrar un mensaje adecuado.
// -  Debe buscar tanto los de la API como los de la base de datos.

// #### **📍 POST | /pokemons**

// -  Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
// -  Toda la información debe ser recibida por body.
// -  Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (al menos uno).

// #### **📍 GET | /types**

// -  Obtiene un arreglo con todos los tipos de pokemones.
// -  En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
// -  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.