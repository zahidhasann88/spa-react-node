import React from 'react'
import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbars from './components/Navbars'
import AddData from './components/AddData'

const App = () => {
  return (
<div className="App">
    <Navbars />
    <AddData />
</div>
  );
}

export default App;
