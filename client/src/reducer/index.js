import { 
    GET_POKEMONS, 
    GET_POKEMON_DETAILS, 
    GET_POKEMONS_TYPES, 
    GET_POKEMONS_BY_NAME,
    ORDER_POKEMONS_BY_ATTACK,
    ORDER_POKEMONS_BY_NAME, 
    FILTER_POKEMONS,
    CREATE_POKEMON
} from '../actions/types'

const initialState = {
    loadedPokemons: [],
    filteredPokemons: [],
    sortedPokemons: [],
    pokemonTypes: [],
    pokemonDetail: {}
  };

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                loadedPokemons: action.payload
            };

        case GET_POKEMON_DETAILS:
            return {
                ...state,
                pokemonDetail: action.payload
            };

        case GET_POKEMONS_TYPES:
            return {
                ...state,
                pokemonTypes: action.payload
            };

        case GET_POKEMONS_BY_NAME:
            return {
                ...state,
                loadedPokemons: action.payload
            };
//----------------------------------------------------------------------------------------------------------------------------

        case CREATE_POKEMON: {
            return {
                ...state,
                loadedPokemons: [...state.loadedPokemons, action.payload]
            };
        }

        case ORDER_POKEMONS_BY_ATTACK:
            const sortedPokemonsByAttack = 
                action.payload === 'ascendent'
                    ? [...state.loadedPokemons].sort((a, b) => a.id - b.id )
                    : [...state.loadedPokemons].sort((a, b) => b.id - a.id );
            return {
                ...state,
                sortedPokemons: sortedPokemonsByAttack,
                loadedPokemons: sortedPokemonsByAttack
            };

        case ORDER_POKEMONS_BY_NAME:
            const sortedPokemonsByName =
                action.payload === 'ascendent'
                    ? [...state.loadedPokemons].sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1 )
                    : [...state.loadedPokemons].sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1 );
            return {
                ...state,
                sortedPokemons: sortedPokemonsByName,
                loadedPokemons: sortedPokemonsByName

            };

        case FILTER_POKEMONS:
            if(action.payload === 'all'){
                return {
                    ...state,
                    filteredPokemons: state.loadedPokemons,
                };
            } else if (action.payload === 'api'){

                const apiPokemons = state.loadedPokemons.filter(
                    (pokemon) => typeof pokemon.id === 'string'
                )
                return {
                    ...state,
                    filteredPokemons: apiPokemons,
                    loadedPokemons: apiPokemons
                };
            } else {

                const dbPokemons = state.loadedPokemons.filter(
                    (pokemon) => typeof pokemon.id === 'number'
                )
                return {
                    ...state,
                    filteredPokemons: dbPokemons,
                    loadedPokemons: dbPokemons
                };
            }
        
        default:
            return state;
    };
};

export default reducer;