import React, { useState } from "react";
import axios from "axios";

const AdminAgentRegisterForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    MobileNo: "",
    Role: "User", // Default role
    Address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/registeradmin", formData);
      setMessage(response.data); // Display success message
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred while registering user");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Register Admin/Agent</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            placeholder="Enter first name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            placeholder="Enter last name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="MobileNo"
            placeholder="Enter mobile number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="Role" value={formData.Role} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            placeholder="Enter address"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminAgentRegisterForm;
