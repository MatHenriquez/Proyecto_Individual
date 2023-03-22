import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { useParams} from "react-router-dom";
import { getPokemonDetails } from '../actions/index';
import loadingImg from '../resources/loading.gif';


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



      return (<div>{
        loading ? (
          <div>
          <h2>Loading...</h2>
          <img src={loadingImg} alt='loadingImg' />
          </div>
        ) : (
          <div>
            {/* Coloco operador && porque pokemon tarda en buscarse y el código trata de acceder a sus propiedades antes de que cargue, causando un error. */}
            {<h4>Nombre: {pokemon && pokemon.Nombre}</h4>} 
            {pokemon && <img src={pokemon.Imagen} alt={pokemon.Nombre}></img>}
            {<h5>Vida: {pokemon && pokemon.Vida}</h5>}
            {<h5>Ataque: {pokemon && pokemon.Ataque}</h5>}
            {<h5>Defensa: {pokemon && pokemon.Defensa}</h5>}
            {<h5>Velocidad: {pokemon && pokemon.Velocidad}</h5>}
            {<h5>Altura: {pokemon && pokemon.Altura}</h5>}
            {<h5>Peso: {pokemon && pokemon.Peso}</h5>}
            {<h5>Tipos: {pokemon && pokemon.Types.map(type => `*${type} `)}</h5>}
          </div>
        )
      }
      </div>);
    
  }