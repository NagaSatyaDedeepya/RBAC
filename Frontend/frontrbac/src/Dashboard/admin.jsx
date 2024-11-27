import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAdminRegister = () => {
    navigate("/adminagentregister");
  };

 

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleAdminRegister}>Register Admin Agent</button>
    </div>
  );
};

export default AdminDashboard;
