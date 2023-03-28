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

    allPokemons: [], //Siempre cuenta con todos los pokemones.

    pokemons: [], // Copia de todos los pokemones, que se irá filtrando y ordenando para ser renderizados en mi home.

    sortedPokemons: [], //Copia de los pokemons ordenados por nombre o por ataque.

    filteredPokemons:[], //Pokemons filtrados por origen o tipo.

    types: [], //todos los tipos de pokemons.

    searchedPokemons:[] //Pokemon buscado por id o nombre.
  };

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case GET_POKEMONS:
            return {

                ...state,

                allPokemons: action.payload,
                pokemons: action.payload,
                sortedPokemons: action.payload, 
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
                types: action.payload,
            };

        case GET_POKEMONS_BY_NAME:
            return {
                ...state,
                searchedPokemons: action.payload,
            };

        case CREATE_POKEMON: {
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload], 
                pokemons: [...state.allPokemons, action.payload]
            };
        }

        

        case ORDER_POKEMONS_BY_ATTACK:
            if (action.payload === 'ascendent') {
                    const filteredAndSortedPokemons = state.filteredPokemons.slice().sort((a, b) => //Utilizo el método slice() para crear una copia del array antes de ordenarlo.
                    a.Ataque > b.Ataque ? 1 : -1
                );
                    const sortedPokemons = state.allPokemons.slice().sort((a, b) =>
                    a.Ataque > b.Ataque ? 1 : -1
                );
                return {
                    ...state,
                    sortedPokemons,
                    pokemons: filteredAndSortedPokemons,
                };
            } else if (action.payload === 'descendent') {
                    const filteredAndSortedPokemons = state.filteredPokemons.slice().sort((a, b) =>
                    a.Ataque < b.Ataque ? 1 : -1
                );
                    const sortedPokemons = state.allPokemons.slice().sort((a, b) =>
                    a.Ataque < b.Ataque ? 1 : -1
                );
                return {
                    ...state,
                    sortedPokemons,
                    pokemons: filteredAndSortedPokemons,
                };
            } else {
                    return {
                    ...state,
                    sortedPokemons: state.allPokemons,
                    pokemons: state.filteredPokemons,
                };
            }

        case ORDER_POKEMONS_BY_NAME:
            if (action.payload === 'ascendent') {
                    const filteredAndSortedPokemons = state.filteredPokemons.slice().sort((a, b) =>
                    a.Nombre.toLowerCase() > b.Nombre.toLowerCase() ? 1 : -1
                );
                    const sortedPokemons = state.sortedPokemons.slice().sort((a, b) =>
                    a.Nombre.toLowerCase() > b.Nombre.toLowerCase() ? 1 : -1
                );
                return {
                    ...state,
                    sortedPokemons,
                    pokemons: filteredAndSortedPokemons,
                };
            } else if (action.payload === 'descendent') {
                    const filteredAndSortedPokemons = state.filteredPokemons.slice().sort((a, b) =>
                    a.Nombre.toLowerCase() < b.Nombre.toLowerCase() ? 1 : -1
                );
                    const sortedPokemons = state.sortedPokemons.slice().sort((a, b) =>
                    a.Nombre.toLowerCase() < b.Nombre.toLowerCase() ? 1 : -1
                );
                return {
                    ...state,
                    sortedPokemons,
                    pokemons: filteredAndSortedPokemons,
                };
            } else {
                return {
                    ...state,
                    sortedPokemons: state.allPokemons,
                    pokemons: state.filteredPokemons,
                };
            }

        case FILTER_POKEMONS_BY_TYPE: 

        const type = action.payload; //types debería llegar como un string "flying"
        console.log(action.payload)

        if (type === 'all'){
            return {
                ...state,
                pokemons: state.sortedPokemons,
                filteredPokemons: state.sortedPokemons,
            };
        } else {
            const filteredPokemons = state.sortedPokemons.slice().filter((pokemon) => pokemon.Types.includes(type));
            console.log(filteredPokemons)
            return {
                ...state,
                pokemons: filteredPokemons,
                filteredPokemons: filteredPokemons,
            };
        }

            
        case FILTER_POKEMONS_BY_ORIGIN: 

            if (action.payload === 'db') {
                const filteredByOrigin = state.sortedPokemons.slice().filter((pokemon) => typeof pokemon.ID === 'string');
                return {
                    ...state,
                    pokemons: filteredByOrigin,
                    filteredPokemons: filteredByOrigin,
                };
            } else if (action.payload === 'api') {
                const filteredByOrigin = state.sortedPokemons.slice().filter((pokemon) => typeof pokemon.ID === 'number');
                return {
                    ...state,
                    pokemons: filteredByOrigin,
                    filteredPokemons: filteredByOrigin,
                };
            } else {
                return { 
                    ...state, 
                    pokemons: state.sortedPokemons,
                    filteredPokemons: state.sortedPokemons,
                };
            }

        default:
            return state;
    };
};

export default reducer;