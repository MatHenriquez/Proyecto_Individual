import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { useParams} from "react-router-dom";
import { getPokemonDetails } from '../actions/index';
import loadingImg from '../resources/loading.gif';
import styles from '../styles/detail.module.css';


export default function Detail(){

  
    const dispatch = useDispatch();
    const { idPokemon } = useParams();
    const pokemon = useSelector(state => state.searchedPokemons[0]);


    const [loading, setLoading] = useState (false);


    useEffect(() => {
      setLoading(true);
      dispatch(getPokemonDetails(idPokemon))
      .finally(() => setLoading(false));
    }, [dispatch, idPokemon]);



      return (<div className={styles.back}>{
        loading ? (
          <div className={styles.loading}>
            <h2 className={styles.loadingTitle}>Investigando pokemon...</h2>
            <img src={loadingImg} alt='loadingImg' />
          </div>
        ) : (
          <div className={styles.details}>
            {/* Coloco operador && porque pokemon tarda en buscarse y el código trata de acceder a sus propiedades antes de que cargue, causando un error. */}
            {<h4 className={styles.name}>Nombre: <br /> {pokemon && <span className={styles.value}>{pokemon.Nombre}</span> }</h4>} 
            {pokemon && <img className={styles.img} src={pokemon.Imagen} alt={pokemon.Nombre}></img>}
            {<h5 className={styles.data}>Vida: {pokemon && <span className={styles.value}>{pokemon.Vida}</span>}</h5>}
            {<h5 className={styles.data}>Ataque: {pokemon && <span className={styles.value}>{pokemon.Ataque}</span> }</h5>}
            {<h5 className={styles.data}>Defensa: {pokemon && <span className={styles.value}>{pokemon.Defensa}</span> }</h5>}
            {<h5 className={styles.data}>Velocidad: {pokemon && <span className={styles.value}>{pokemon.Velocidad}</span> }</h5>}
            {<h5 className={styles.data}>Altura: {pokemon && <span className={styles.value}>{pokemon.Altura}</span> }</h5>}
            {<h5 className={styles.data}>Peso: {pokemon && <span className={styles.value}>{pokemon.Peso}</span> }</h5>}
            {<h5 className={styles.data}>Tipos: {pokemon && pokemon.Types.map(type => <span className={styles.value}><br />-{type}<br /></span>)}</h5>}
          </div>
        )
      }
      </div>);
    
  }