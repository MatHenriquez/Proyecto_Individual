import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";
import loadingImg from '../resources/loading.gif';
import styles from '../styles/home.module.css';
import Pagination from './Pagination'


import { 

    getPokemons,
    getPokemonsTypes,
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

    const [loading, setLoading] = useState (false);

    //PAGINADO:
  const [currentPage, setCurrentPage]= useState(1) //Mi página actual que arraca en 1.
  const pokemonsPerPage = 12; // Mis pokemons por página que son 12.
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon= indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = Array.isArray(pokemons) ? pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : [];  //Constante que guarda todos los pokemons que voy a tener por pagina.

  

    useEffect(() => {

      setLoading(true);
      dispatch(getPokemons())
        .finally(() => setLoading(false));
      dispatch(getPokemonsTypes());

      }, [dispatch]);

  

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


      const pagination = (pageNumber) =>{  
        setCurrentPage(pageNumber);
       }

      
    return <div>
        <h1>Pokedex:</h1>
        <div>
      <Link to='/form'>Crea tu propio pokemon.</Link>

      <div>
        <span>Ordenar alfabéticamente:</span>
        <select onChange={(event) => handleSortNames(event)}>
          <option value="ascendent">Ascendente</option>
          <option value="descendent">Descendente</option>
        </select>

        <span>Ordenar por Ataque:</span>
        <select onChange={(event) => handleSortAttacks(event)}>
          <option value="ascendent">Ascendente</option>
          <option value="descendent">Descendente</option>
        </select>
        
        <span>Filtrar por origen:</span>
        <select onClick={(event) => handleOriginFilter(event)} >
          <option value="all">Todos</option>
          <option value="api">Pokemons de la serie</option>
          <option value="db">Tus pokemons</option>
        </select>

        <span>Filtrar por tipo:</span>
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
        
        <Pagination  
          pokemonsPerPage={pokemonsPerPage}
          pokemons={pokemons}
          pagination={pagination}
          currentPage={currentPage}
        />    
       
    {loading ? (
        <div>
        <h2>Loading...</h2>
        <img src={loadingImg} alt='loadingImg' />
        </div>
      ) : (
        <div className={styles.CardsContainer}>
          {currentPokemons?.map((pokemon) => (
            
              <Card 
                key={pokemon.ID} 
                id={pokemon.ID} 
                name={pokemon.Nombre} 
                image={pokemon.Imagen} 
                types={pokemon.Types} 
              />
            

          ))}
        </div>
      )}
    
   
      
    </div>
}

