import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", formData);

      // Store the token in local storage
      const { token, role } = response.data;
      localStorage.setItem("authToken", token);

      // Redirect based on role
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Agent") {
        navigate("/agent");
      } else if (role === "User") {
        navigate("/user");
      } else {
        setMessage("Unknown role");
      }

      setMessage("Login successful.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="Email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="Password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
