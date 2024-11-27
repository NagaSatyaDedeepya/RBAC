
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../src/Register'; 
import Login from "../src/Login";
import AdminDashboard  from "../src/Dashboard/admin";
import AgentDashboard from "../src/Dashboard/agent";
import UserDashboard from "../src/Dashboard/user";
import AdminAgentRegisterForm from "./adminagentregister";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/agent' element={<AgentDashboard  />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/adminagentregister' element={<AdminAgentRegisterForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

