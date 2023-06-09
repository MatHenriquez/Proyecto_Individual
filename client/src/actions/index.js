//Importo los action types.

import { 
    GET_POKEMONS, 
    GET_POKEMON_DETAILS, 
    GET_POKEMONS_TYPES, 
    GET_POKEMONS_BY_NAME,
    ORDER_POKEMONS_BY_ATTACK,
    ORDER_POKEMONS_BY_NAME, 
    FILTER_POKEMONS_BY_ORIGIN,
    FILTER_POKEMONS_BY_TYPE,
    CREATE_POKEMON
} from './types'

import axios from 'axios';

//const URL = 'https://localhost:3001';



// Función que muestra los pokemons de la API y la DB.
export function getPokemons(){
    return async function(dispatch){
        await axios
        .get(`/pokemons`)
        .then((response) =>{
            return dispatch({
                type: GET_POKEMONS,
                payload: response.data
            });
        })
        .catch(error => alert(error.response.data));
    };
};


  

//Función que busca un pokemon por id.
export function getPokemonDetails(id){
    return async function(dispatch){
        await axios
        .get(`/pokemons/${id}`)
        .then((response) =>{
            return dispatch(
                {
                    type: GET_POKEMON_DETAILS,
                    payload: response.data
            });
        })
        .catch(error => alert(error.response.data));
    };
};

//Función que busca un pokemon por su nombre.
export function getPokemonByName(name){
    return async function(dispatch){
        await axios
        .get(`/pokemons/name?name=${name}`)
        .then((response) =>{
            return dispatch({
                type: GET_POKEMONS_BY_NAME,
                payload: response.data
            });
        })
        .catch(error => alert(error.response.data));
    };
};

//Función que obtiene los tipos de pokemons almacenados en la DB.
export function getPokemonsTypes(){
    return async function(dispatch){
        await axios
        .get(`/types`)
        .then((response) =>{
            return dispatch({
                type: GET_POKEMONS_TYPES,
                payload: [...response.data.map((type) => type.Nombre)]
            });
        })
        .catch(error => alert(error.response.data));
    };
};


//Función que crea un pokemon.
export function createPokemon(newPokemon){
    return async function(dispatch){
        await axios
        .post(`/pokemons`, newPokemon)
        .then((response) =>{
            return dispatch({
                type: CREATE_POKEMON,
                payload: response.data
            });
        })
        .catch(error => alert(error.response.data));
    };
};

//Función que ordena pokemons por ataque según un criterio ascendente o descendente.
export function sortPokemonsByAttack(criterion){
    return {
        type: ORDER_POKEMONS_BY_ATTACK,
        payload: criterion
    };
};

//Función que ordena pokemons por nombre alfabéticamente según un criterio ascendente o descendente.
export function sortPokemonsByName(criterion){
    return {
        type: ORDER_POKEMONS_BY_NAME,
        payload: criterion
    };
};

//Función que filtra pokemons basada en su origen (API o DB).
export function filterPokemonsByOrigin(origin){
    return ({
        type: FILTER_POKEMONS_BY_ORIGIN,
        payload: origin
    });
};

//Función que filtra pokemons basada en sus tipos.
export function filterPokemonsByType(type){
    return ({
        type: FILTER_POKEMONS_BY_TYPE,
        payload: type
    });
}


