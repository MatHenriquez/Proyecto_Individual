import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";


import { 

    getPokemons,
    getPokemonDetails,
    getPokemonByName,
    getPokemonsTypes,
    createPokemon,
    sortPokemonsByAttack,
    sortPokemonsByName,
    filterPokemonsByOrigin,
    filterPokemonsByType

 } from '../actions/index';

import Card from './Card';
import { Link } from "react-router-dom";


export default function Home(){ //¿props?

    const dispatch = useDispatch();
    
    const pokemons = useSelector((state) => state.filteredPokemons);

    const types = useSelector((state) => state.pokemonTypes);

    useEffect(() => {

        dispatch(getPokemons());
        dispatch(getPokemonsTypes());

      }, [dispatch]);

   
    

      function handleClick(event) {
        event.preventDefault();
        dispatch(getPokemons());
      }

      function handleTypesFilter(event) {
        event.preventDefault();
        dispatch(filterPokemonsByType(event.target.value));
      }

      function handleOriginFilter(event) {
        event.preventDefault();
        dispatch(filterPokemonsByOrigin(event.target.value));
      }

      function handleSortNames(event) {
        event.preventDefault();
        dispatch(sortPokemonsByName(event.target.value));
      }

      function handleSortAttacks(event) {
        event.preventDefault();
        dispatch(sortPokemonsByAttack(event.target.value));
      }

      
    return <div>
        <h1>Buenas, soy la home</h1>
        <div>
      <Link to='/form'>Crea tu propio pokemon.</Link>
      
      <button onClick={(event) => handleClick(event)}>
        Todos los pokemons.
      </button>

      <div>
        <select>
          <option value="ascendent">Ascendente</option>
          <option value="descendent">Descendente</option>
        </select>
        
        <select onClick={(event) => handleOriginFilter(event)} >
          <option value="all">Todos</option>
          <option value="api">Pokemons de la serie</option>
          <option value="db">Tus pokemons</option>
        </select>

        <select onChange={(event) => handleTypesFilter(event)}>
          <option value ='all'>Todos los pokemons</option>
          {types?.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
                ))}
        </select>
        </div>
        </div>
        {pokemons?.map((pokemon) => {
        return (
          <Card
            key={pokemon.ID}
            id={pokemon.ID}
            name={pokemon.Nombre}
            image={pokemon.Imagen}
            types={pokemon.Types}
          />
        );
      })}
    </div>
}