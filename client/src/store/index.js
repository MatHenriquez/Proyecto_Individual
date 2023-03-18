import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from '../reducer/index';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Esta línea es para conectar con la extensión del navegador REDUX DEVTOOLS

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // Esta línea es para poder hacer peticiones a un server.
);


export default store;