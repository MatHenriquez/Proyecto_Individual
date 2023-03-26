import {
    filterPokemonsByType,
    filterPokemonsByOrigin,
    sortPokemonsByName,
    sortPokemonsByAttack,
  } from "./index";
  
  
  describe("Reducer-Actions Tests:", () => {
    it("Should return an action with the props type FILTER_POKEMONS_BY_TYPE & payload, the value is send as an argument:", () => {
      expect(filterPokemonsByType("normal")).toEqual({
        type: "FILTER_POKEMONS_BY_TYPE",
        payload: "normal",
      });
    });
  
    it('Should return an action with the props type FILTER_POKEMONS_BY_ORIGIN & payload, the value is send as an argument:', () => {
      expect(filterPokemonsByOrigin("db")).toEqual({
        type: "FILTER_POKEMONS_BY_ORIGIN",
        payload: "db",
      });
    });
  
    it('Should return an action with the props type ORDER_POKEMONS_BY_ATTACK & payload, the value is send as an argument:', () => {
      expect(sortPokemonsByAttack("ascendent")).toEqual({
        type: "ORDER_POKEMONS_BY_ATTACK",
        payload: "ascendent",
      });
    });
  
    it('Should return an action with the props type ORDER_POKEMONS_BY_NAME & payload, the value is send as an argument:', () => {
      expect(sortPokemonsByName("descendent")).toEqual({
        type: "ORDER_POKEMONS_BY_NAME",
        payload: "descendent",
      });
    });
  });
  