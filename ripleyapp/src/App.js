import React from 'react';
//import logo from './logo.svg';
import './App.css';
import ApiCall from './ApiCall/ApiCall';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar/>
      <Route exact path='/' component={Main}/>
      <Route exact path='/detail/:id' component={ApiCall}
      />
  </div>
  );
}

export default App;
