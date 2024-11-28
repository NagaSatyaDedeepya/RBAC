import React from "react";
import { useNavigate } from "react-router-dom";

const AgentDashboard = () => {
  const navigate = useNavigate();

  const handleAdminRegister = () => {
    navigate("/adminagentregister");
  };

 

  return (
    <div>
      <h1>Agent Dashboard</h1>
    </div>
  );
};

export default AgentDashboard;
