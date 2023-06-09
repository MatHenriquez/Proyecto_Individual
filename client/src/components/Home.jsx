import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";
import loadingImg from '../resources/loading.gif';
import styles from '../styles/home.module.css';
import Pagination from './Pagination';

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

export default function Home(){ 

    const dispatch = useDispatch();
    
    const pokemons = useSelector((state) => state.pokemons);

    const types = useSelector((state) => state.types);

    const [loading, setLoading] = useState (true); //Manejo la imagen de carga.

    const [currentSort, setCurrentSort] = useState(null); //Para seleccionar un solo ordenamiento a la vez.
    
    const [currentFilter, setCurrentFilter] = useState(null); //Para seleccionar un solo filtro a la vez.

    const [pokemonsFetched, setPokemonsFetched] = useState(false); // Variable de estado para verificar si ya se obtuvieron los pokemons.


    //PAGINADO:
  const [currentPage, setCurrentPage]= useState(1) //Mi página actual que arraca en 1.
  const pokemonsPerPage = 6; // Mis pokemons por página que son 12.
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon= indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = Array.isArray(pokemons) ? pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : [];  //Constante que guarda todos los pokemons que voy a tener por pagina.


      useEffect(() => {
        if (!pokemonsFetched) { // Verificar si ya se obtuvieron los pokemons.
          dispatch(getPokemons())
            .finally(() => setLoading(false));
          dispatch(getPokemonsTypes());
          setPokemonsFetched(true); // Actualizar el estado de los pokemons.
        }
      }, [dispatch, pokemonsFetched]);

      function handleTypesFilter(event) {
        event.preventDefault();
        setCurrentPage(1);
        setCurrentFilter("type");
        dispatch(filterPokemonsByType(event.target.value));
      }

      function handleOriginFilter(event) {
        event.preventDefault();
        setCurrentPage(1);
        setCurrentFilter("origin");
        dispatch(filterPokemonsByOrigin(event.target.value));
      }

      function handleSortNames(event) {
        event.preventDefault();
        setCurrentPage(1);
        setCurrentSort("name");
        dispatch(sortPokemonsByName(event.target.value));
      }

      function handleSortAttacks(event) {
        event.preventDefault();
        setCurrentPage(1);
        setCurrentSort("attack");
        dispatch(sortPokemonsByAttack(event.target.value));
      }


      const pagination = (pageNumber) =>{  
        setCurrentPage(pageNumber);
       }
      
    return <div className={styles.back}>
        <h1 className={styles.title}>Pokedex:</h1>

       <div className={styles.generalContainer}>

       {loading ? (
        <div>
        </div>
        ) : (
          
          <div className={styles.formContainer}>
            <div className={styles.options}>
      <Link to='/form' className={styles.linkToForm}>Crea tu propio pokemon.</Link>

     
      <hr className={styles.hr} />

        <span className={styles.optionTitle}>Ordenar por:</span>
        <select className={styles.select} onChange={(event) => handleSortNames(event)}>
          <option className={styles.option} disabled selected={!currentSort || currentSort === "attack"}>Nombre</option>
          <option className={styles.option} value="ascendent">Ascendente</option>
          <option className={styles.option} value="descendent">Descendente</option>
        </select>

        <select className={styles.select} onChange={(event) => handleSortAttacks(event)}>
          <option className={styles.option} disabled selected={!currentSort || currentSort === "name"}>Ataque</option>
          <option className={styles.option} value="ascendent">Ascendente</option>
          <option className={styles.option} value="descendent">Descendente</option>
        </select>

        <hr className={styles.hr} />

        <span className={styles.optionTitle}>Filtrar por :</span>
        <select className={styles.select} onChange={(event) => handleOriginFilter(event)} >
          <option className={styles.option} disabled selected={!currentFilter || currentFilter === "type"}>Origen</option>
          <option className={styles.option} value="all">Todos los pokemons</option>
          <option className={styles.option} value="api">Pokemons de la serie</option>
          <option className={styles.option} value="db">Tus pokemons</option>
        </select>

        <select className={styles.select} onChange={(event) => handleTypesFilter(event)}>
        <option className={styles.option} disabled selected={!currentFilter || currentFilter === "origin"}>Tipo</option>
          <option className={styles.option} value ='all'>Todos los tipos</option>
          {types?.map(type => (
                <option className={styles.option} key={type} value={type}>
                  {type}
                </option>
                ))}
        </select>
        </div>
        </div>
        )}
      <div className={styles.orderPagination}>

      {loading ? (
        <div>
        </div>
        ) : (
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            pokemons={pokemons}
            pagination={pagination}
            currentPage={currentPage}
          />    
     )}

    {loading ? (
       
        <div className={styles.loading}>
        <h2 className={styles.loadingTitle}>Capturando pokemons...</h2>
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
      </div>
   
      
    </div>
}

