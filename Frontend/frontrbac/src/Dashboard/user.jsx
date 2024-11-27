import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleAdminRegister = () => {
    navigate("/adminagentregister");
  };

 

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={handleAdminRegister}>Register Admin Agent</button>
    </div>
  );
};

export default UserDashboard;
