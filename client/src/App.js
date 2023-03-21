import './App.css';

//Imports hechos por mí.
import {  Switch, Route, useLocation } from "react-router-dom";
import Detail from './components/Detail';
import Form from './components/Form';
import Home from './components/Home';
import Landing from './components/Landing';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

function App() {

  const location = useLocation();

  return (
    <div className="App">


      {location.pathname !== "/" && <Nav />  /* Para que la NavBar no se vea en la LandingPage */}
     
      <Switch>
        <Route exact path = '/'><Landing /></Route>
        <Route exact path = '/home'><Home /></Route>
        <Route exact path = '/detail/:idPokemon'><Detail/></Route>
        <Route exact path = '/form'><Form /></Route>
        <Route path = '/*'><NotFound /></Route>
      </Switch>
    </div>
  );
}

export default App;
