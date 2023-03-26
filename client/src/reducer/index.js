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

    isSorted: false, //Esta variable indica si están ordenados o no los pokemons.
    sortedPokemons: [], //Copia de los pokemons ordenados por nombre o por ataque.

    filteredByOrigin: false, //Variable booleana que indica si el filtro por origen está aplicado o no.
    filteredPokemonsByOrigin:[], //Pokemons filtrados por origen.
    
    filteredByType: false, //Variable booleana que indica si el filtro por tipo está aplicado o no.
    filteredPokemonsByType:[], //Pokemons filtrados por tipo.

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

                isSorted: false,
                sortedPokemons: action.payload, 

                filteredByOrigin: false, 
                filteredPokemonsByOrigin: action.payload,

                filteredByType: false, 
                filteredPokemonsByType: action.payload, 
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
            };
        }

        case ORDER_POKEMONS_BY_ATTACK:

            if(action.payload === 'ascendent'){

                const sortedPokemonsByAttack = [...state.pokemons].sort((a,b) => a.Ataque > b.Ataque ? 1 : -1 );

                return{
                    ...state,
                    sortedPokemons: sortedPokemonsByAttack,
                    pokemons: sortedPokemonsByAttack,
                    isSorted: true,
                }
                     
            } else if( action.payload === 'descendent' ){
                const sortedPokemonsByAttack = [...state.pokemons].sort((a,b) => a.Ataque < b.Ataque ? 1 : -1 );
                return{
                    ...state,
                    sortedPokemons: sortedPokemonsByAttack,
                    pokemons: sortedPokemonsByAttack,
                    isSorted: true,
                }
            } else if(action.payload === 'default'){
                return {
                    ...state,
                    sortedPokemons: state.allPokemons,
                    pokemons: state.allPokemons,
                    isSorted: false,
                }
            } else {
                return {...state,}
            }

        case ORDER_POKEMONS_BY_NAME:

            if(action.payload === 'ascendent'){

                const sortedPokemonsByName = [...state.pokemons].sort((a,b) => a.Nombre.toLowerCase() > b.Nombre.toLowerCase() ? 1 : -1 );

                return{
                    ...state,
                    sortedPokemons: sortedPokemonsByName,
                    pokemons: sortedPokemonsByName,
                    isSorted: true,
                }
                    
            } else if( action.payload === 'descendent' ){
                const sortedPokemonsByName = [...state.pokemons].sort((a,b) => a.Nombre.toLowerCase() < b.Nombre.toLowerCase() ? 1 : -1 );
                return{
                    ...state,
                    sortedPokemons: sortedPokemonsByName,
                    pokemons: sortedPokemonsByName,
                    isSorted: true,
                }
            } else {
                return { 
                        ...state,
                        sortedPokemons: state.allPokemons,
                        pokemons: state.allPokemons,
                        isSorted: false,
            };
        }
        

        case FILTER_POKEMONS_BY_TYPE: 

        const type = action.payload; //types debería llegar como un string "flying"

        if (type === 'all'){
            return {
                ...state,
                pokemons: state.sortedPokemons,
                filteredPokemonsByType: state.sortedPokemons,
                filteredByType: false,
            };
        } else {
            let filteredPokemons = state.sortedPokemons.filter((pokemon) => pokemon.Types.includes(type));
            return {
                ...state,
                pokemons: filteredPokemons,
                filteredPokemonsByType: filteredPokemons,
                filteredByType: true,
            };
        }

            
        case FILTER_POKEMONS_BY_ORIGIN: 

            if (action.payload === 'db') {
                const filteredByOrigin = state.sortedPokemons.filter((pokemon) => typeof pokemon.ID === 'string');
                return {
                    ...state,
                    pokemons: filteredByOrigin,
                    filteredByOrigin: true,
                };
            } else if (action.payload === 'api') {
                const filteredByOrigin = state.sortedPokemons.filter((pokemon) => typeof pokemon.ID === 'number');
                return {
                    ...state,
                    pokemons: filteredByOrigin,
                    filteredByOrigin: true,
                };
            } else {
                return { 
                    ...state, 
                    pokemons: state.sortedPokemons,
                    filteredByOrigin: false,
                };
            }

        default:
            return state;
    };
};

export default reducer;