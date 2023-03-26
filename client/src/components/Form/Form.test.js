import {
    validate
} from './Form'

describe("Form Tests:", () => {

    const badInputs1 = {
            Nombre: 'pikachu',
            Imagen: 'www.newPokemon.com',
            Vida: 10,
            Ataque: 15,
            Defensa: 6,
            tipos: ['shadow']
    }
    const badInputs2 = {
            Nombre: 'kindAPokemon',
            Imagen: 'www.newPokemon.c',
            Vida: 10,
            Ataque: 15,
            Defensa: 6,
            tipos: ['shadow']
    }

    const validInputs = {
            Nombre: 'myNewPokemon',
            Imagen: 'www.newPokemon.com',
            Vida: 10,
            Ataque: 15,
            Defensa: 6,
            tipos: ['shadow']
    }

    const errors = {
    }

    const pokemons1 = [{
        Nombre: 'pikachu',
    }]

    const pokemons2 = [{
        Nombre: '',
    }]

    const pokemons3 = [{
        Nombre: '',
    }]

    it("Validate function should return an error when the name of pokemon already exists:", () => {
      expect(validate(badInputs1, pokemons1)).toEqual({ "Nombre": `El pokemon pikachu ya existe.`
    });
    });
  
    it('Validate function should return an error when the urlImage doesn´t includes .com:', () => {
      expect(validate(badInputs2, pokemons2)).toEqual(
        {"Imagen":'*URL inválida.'}
      );
    });

    it('Validate function should not return an error when the pokemon is valid:', () => {
      expect(validate(validInputs, pokemons3)).toEqual({});
    });

  });
  