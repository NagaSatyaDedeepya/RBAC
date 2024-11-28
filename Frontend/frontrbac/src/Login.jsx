import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", formData);

      // Destructure token and role from the response
      const { token, role } = response.data;

      // Store the token and role in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      // Navigate based on role
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

  // Redirect based on role if already logged in
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "Admin") navigate("/admin");
    if (role === "Agent") navigate("/agent");
    if (role === "User") navigate("/user");
  }, [navigate]);

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    navigate("/login");
  };

  const handleRegister = () => {
    // Navigate to the registration page
    navigate("/Register");
  };

  return (
    <div>
      {localStorage.getItem("authToken") ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
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
      )}

      {/* Button to navigate to the Register page */}
      {!localStorage.getItem("authToken") && (
        <button onClick={handleRegister}>Go to Register</button>
      )}
    </div>
  );
};

export default LoginForm;
