import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../actions/index';
import styles from '../styles/nav.module.css';
import { Link } from "react-router-dom";

export default function Nav(){

    const dispatch = useDispatch();

    const [name, setName] = useState('')

    const [searchedPokemon, setSearchedPokemon] = useState({})


    function handleInput(event){
        event.preventDefault();
        setName(event.target.value);
    }

    function handleClick(){
        const pokemonName = name.trim().toLowerCase();

        if(!pokemonName){
            alert('No ingresó un nombre.');
        } else if(!pokemonName.match(/^[a-zA-Z]+$/)){
            alert('Ingrese un nombre sin números.');
        } else {
            dispatch(getPokemonByName(pokemonName));
        }
        

    }
    
    return <div className={styles.nav}>
        <Link to='/home'>
         <button className={styles.btn}>HOME</button>
        </Link>

        <div>
            <input type="text" placeholder='Ingrese un nombre...' onChange={handleInput}/>
            <button onClick={handleClick}>Buscar</button>
        </div>
        
    </div>
}