/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type , conn } = require('../../src/db.js');

const agent = session(app);

const pokemon = {
  Nombre: 'pokemon',
  Imagen: 'www.pokemon.url',
  Vida: 50,
  Ataque: 50,
  Defensa: 50
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe("GET /pokemons", () => {
    it("Si no se recibe más que la ruta devuelve un status 200 con los pokemons.", () => {
      agent.get("/pokemons")
      .then(() => done());
    });
  });

  describe("Obtiene un pokemon por id o name", () => {

    describe("GET /pokemons/:id", () => {
      it("Se espera una respuesta 200 se si pasa un id.", () =>{
        agent.get("/pokemons/10").then(() => done());
    });
  });

    describe("GET /pokemons/name?name=nombre", () => {
        it("Si se recibe un nombre no existente debe devolver un status 404 not found", () =>{
          agent.get("/pokemons/name?name=fakePokemon")
          .then(() => done(new Error("Not found.")))
          .catch(() => done())
      });

  });
});
});


