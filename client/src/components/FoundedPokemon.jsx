import React from 'react';
import { useSelector } from "react-redux";
import Card from './Card';
import styles from '../styles/foundedPokemon.module.css'

export default function FoundedPokemon(){ 

    
    const pokemon = useSelector((state) => state.searchedPokemons[0]);

    return (
        <div className={styles.back}>
               
               {/* Corroboro que no ingresen directamente tipeando la dirección /search. */}
              {pokemon 
              ? <Card className={styles.card}
              key={pokemon.ID} 
              id={pokemon.ID} 
              name={pokemon.Nombre} 
              image={pokemon.Imagen} 
              types={pokemon.Types} 
              />
              :<h3 className={styles.warning}>Todavía no has buscado ningún pokemon...</h3>
            }  
        </div>
        )
    }
