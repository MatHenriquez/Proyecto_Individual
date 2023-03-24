import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../actions/index';
import styles from '../styles/nav.module.css';
import { Link, useHistory } from "react-router-dom";
import searchingImg from '../resources/searching.gif'

export default function Nav(){

    const history = useHistory();

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    const [loading, setLoading] = useState (false);

    function handleInput(event){
        event.preventDefault();
        setName(event.target.value);
    }

    async function handleClick(){

        const pokemonName = name.trim().toLowerCase();

        if(!pokemonName){
            alert('No ingresó un nombre.');
        } else if(!pokemonName.match(/^[a-zA-Z]+$/)){
            alert('Ingrese un nombre sin números ni caracteres especiales.');
        } else {
            setLoading(true);
            await dispatch(getPokemonByName(pokemonName))
            setLoading(false);
            history.push(`/search`);
        }
        
        
    }
    
    return <div className={styles.nav}>
        <Link to={`/home`}>
         <button className={styles.btn}>INICIO</button>
        </Link>

        <div className={styles.search}>
            <input type="text" placeholder='Ingrese un nombre...' onChange={handleInput} className={styles.searchName}/>
            <button onClick={handleClick} className={styles.searchBtn}>Buscar</button>
        </div>
        {loading 
            ? (<img src={searchingImg} alt='Buscando...' className={styles.searchingImg}></img>)
            : null
        }
    </div>
}