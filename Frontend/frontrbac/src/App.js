
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../src/Register'; 
import Login from "../src/Login";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

