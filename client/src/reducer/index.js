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
} from '../actions/types'

const initialState = {
    loadedPokemons: [], //Todos los pokemons.
    filteredPokemons: [], //Pokemons reenderizados en home
    pokemonTypes: [], //Todos los tipos de pokemon.
    searchedPokemons: [], //Pokemon buscado por nombre o id.

    currentPage: 1,

    isFilterByPersonalization: false,
    isFilterByType: 'all',
  };

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                loadedPokemons: action.payload,
                filteredPokemons: action.payload,
            };

        case GET_POKEMON_DETAILS:
            return {
                ...state,
                searchedPokemons: action.payload,
            };

        case GET_POKEMONS_TYPES:
            return {
                ...state,
                pokemonTypes: action.payload,
            };

        case GET_POKEMONS_BY_NAME:
            return {
                ...state,
                searchedPokemons: action.payload,
            };

        case CREATE_POKEMON: {
            return {
                ...state,
                loadedPokemons: [...state.loadedPokemons, action.payload],
                filteredPokemons: [...state.loadedPokemons, action.payload],
            };
        }

        case ORDER_POKEMONS_BY_ATTACK:
            const sortedPokemonsByAttack = 
                action.payload === 'ascendent'
                    ? [...state.loadedPokemons].sort((a, b) => a.Ataque - b.Ataque )
                    : [...state.loadedPokemons].sort((a, b) => b.Ataque - a.Ataque );
            const sortedAndFilteredByAttack = 
                action.payload === 'ascendent'
                    ? [...state.filteredPokemons].sort((a, b) => a.Ataque - b.Ataque )
                    : [...state.filteredPokemons].sort((a, b) => b.Ataque - a.Ataque );
            return {
                ...state,
                loadedPokemons: sortedPokemonsByAttack,
                filteredPokemons: sortedAndFilteredByAttack,
            };

        case ORDER_POKEMONS_BY_NAME:
            const sortedPokemonsByName =
                action.payload === 'ascendent'
                    ? [...state.loadedPokemons].sort((a,b) => a.Nombre.toLowerCase() > b.Nombre.toLowerCase() ? 1 : -1 )
                    : [...state.loadedPokemons].sort((a,b) => a.Nombre.toLowerCase() < b.Nombre.toLowerCase() ? 1 : -1 );
            const sortedAndFilteredByName = 
                    action.payload === 'ascendent'
                    ? [...state.filteredPokemons].sort((a,b) => a.Nombre.toLowerCase() > b.Nombre.toLowerCase() ? 1 : -1 )
                    : [...state.filteredPokemons].sort((a,b) => a.Nombre.toLowerCase() < b.Nombre.toLowerCase() ? 1 : -1 );
            return {
                ...state,
                loadedPokemons: sortedPokemonsByName,
                filteredPokemons: sortedAndFilteredByName,
            };

   

        case FILTER_POKEMONS_BY_ORIGIN:
            let filteredPokemonsByOrigin = [...state.loadedPokemons];
            let filtersAppliedByOrigin = [];
            
            if (action.payload === 'all') {
                filteredPokemonsByOrigin = state.loadedPokemons;
            } else if (action.payload === 'api') {
                filteredPokemonsByOrigin = filteredPokemonsByOrigin.filter((pokemon) => typeof pokemon.ID === 'number');
                filtersAppliedByOrigin.push('api');
            } else if (action.payload === 'db') {
                filteredPokemonsByOrigin = filteredPokemonsByOrigin.filter((pokemon) => typeof pokemon.ID === 'string');
                filtersAppliedByOrigin.push('db');
            }
            
            // copia las variables de estado que no cambian
            const newStateByOrigin = {
                ...state,
                filteredPokemons: filteredPokemonsByOrigin,
                filtersApplied: filtersAppliedByOrigin,
                pokemonTypes: state.pokemonTypes,
                searchedPokemons: state.searchedPokemons,
            };
            
            return newStateByOrigin;
              

        case FILTER_POKEMONS_BY_TYPE:
                let filteredPokemonsByType = [...state.filteredPokemons]; // Cambiamos de originPokemons a filteredPokemons.
                let filtersAppliedByType = [...state.filtersApplied];

                if (action.payload === 'all') {
                    filteredPokemonsByType = [...state.originPokemons]; // volvemos a cargar todos los pokemons
                    filtersAppliedByType = filtersAppliedByType.filter((filter) => filter !== 'type'); // eliminamos el filtro de tipo
                } else {
                    filteredPokemonsByType = filteredPokemonsByType.filter((pokemon) =>
                        pokemon.Types.some((type) => type === action.payload)
                    );
                    if (!filtersAppliedByType.includes('type')) {
                        filtersAppliedByType.push('type');
                    }
                }

                const newStateByType = {
                    ...state,
                    filteredPokemons: filteredPokemonsByType,
                    filtersApplied: filtersAppliedByType,
                };

                return newStateByType;

        
        default:
            return state;
    };
};

export default reducer;