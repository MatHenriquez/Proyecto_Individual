/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

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

  describe("GET /pokemons", (done) => {
    it("Si no se recibe mas que la ruta devuelve 200 con los pokemons", (done) => {
      agent.get("/pokemons").then(() => done());
    });
  }).timeout(7000);

  describe("Obtiene un pokemon por id o name", () => {

    describe("GET /pokemons/:id", () => {
      it("Se espera una respuesta 200 se si pasa un id", () =>
        agent.get("/pokemons/10").then(() => done()));
    });

    describe("GET /pokemons?name=xxx", () => {
        it("Si se recibe name devolver 200", () =>
          agent.get("/pokemons?name=pikachu").then(() => done()));
      });

  });
});

describe("Types Routes", () => {
  describe("GET /types", () => {
    it("Se espera una respuesta 200", () => agent.get("/types")
    .then(() => done()));
  });
});

