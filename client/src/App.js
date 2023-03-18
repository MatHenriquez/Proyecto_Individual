import './App.css';

//Imports hechos por mí.
import {  Route } from "react-router-dom";
import Detail from './components/Detail';
import Form from './components/Form';
import Home from './components/Home';
import Landing from './components/Landing';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">


      <Nav />      

   
        <Route exact path = '/' element = {<Landing />} />
        <Route exact path = '/home' element = {<Home />} />
        <Route exact path = '/detail/:idPokemon' element = {<Detail />} />
        <Route exact path = '/form' element = {<Form />} />
        <Route exact path = '*' element = {<NotFound />} />
   
    </div>
  );
}

export default App;
