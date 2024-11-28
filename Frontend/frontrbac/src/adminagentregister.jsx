import React, { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    MobileNo: "",
    Role: "User", // Default role is 'User'
    Address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      setMessage("No authentication token found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/registeradmin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": token, // Add token to the header
          },
        }
      );

      setMessage(response.data || "User registered successfully");
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        MobileNo: "",
        Role: "User",
        Address: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering user");
    }
  };


  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="MobileNo"
            value={formData.MobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            required
          >
            <option value="User">User</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="Address"
            value={formData.Address}
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

export default RegisterUser;
