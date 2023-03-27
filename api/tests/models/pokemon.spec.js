const { Pokemon, conn } = require("../../src/db.js");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    it("Arroja un error si el pokemon no tiene nombre.", (done) => {
      Pokemon.create({
        Nombre: null,
        Imagen: "http://www.example.com",
        Vida: 100,
        Ataque: 50,
        Defensa: 30
      })
        .then(() => done(new Error("La validación no funcionó")))
        .catch(() => done());
    });


    it("Arroja un error si el pokemon no tiene ataque.", (done) => {
      Pokemon.create({
        Nombre: 'SantaClaus',
        Imagen: "http://www.example.com",
        Vida: 100,
        Ataque: null,
        Defensa: 30
      })
        .then(() => done(new Error("La validación no funcionó")))
        .catch(() => done());
    });
      

    it("Arroja un error si el pokemon tiene una defensa no válida.", (done) => {
      Pokemon.create({
        Nombre: 'Pokamone',
        Imagen: "http://www.example.com",
        Vida: 100,
        Ataque: 50,
        Defensa: null
      })
        .then(() => done(new Error("La validación no funcionó")))
        .catch(() => done());
    });

    it("Crea el pokemon si los datos son válidos.", (done) => {
      Pokemon.create({
        Nombre: 'Pokamone',
        Imagen: "http://www.example.com",
        Vida: 100,
        Ataque: 50,
        Defensa: 100
      })
        .then(() => done());
    });
  });
  });

  