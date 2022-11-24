import './App.css';
import React from 'react';
//import Button from 'react-bootstrap/Button';
import {Home} from "./components/Home";
import {Department} from "./components/Department";
import {Employee} from "./components/Employee";
import {Navigation} from "./components/Navigation";
import {BrowserRouter,Route,Routes}from 'react-router-dom' ;



function App() {
  return (
    
    <BrowserRouter>
    
    <h3 className='m-3 d-flex justify-content-center'>
      React js With Boostrap
      
    </h3>
    <h5 className='m-3 d-flex justify-content-center'>
      Employee Management Portal 
    </h5>
    <Navigation/>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/employee" element={ <Employee />} />
      <Route path="/department" element={ <Department />} />
    </Routes>
    </BrowserRouter>
   
    );
}

export default App;
